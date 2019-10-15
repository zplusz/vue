<template>
    <div style="margin-top:-70px">
      <loading :active.sync="isLoading"></loading>
      <form class="form-inline mb-5 mt-4 justify-content-end">
        <input class="form-control mr-sm-2" placeholder="Search" aria-label="Search" type="text" v-model.trim='keyword' id="search">
      
      </form>
        <div class="nav-scroller mb-2 search">
            <nav class="nav d-flex justify-content-between"  >
              <a class="p-2 search" href="" style="text-decoration:none"
              @click.prevent="change('全部')" :class="{'searchbt' : search =='全部'}">全部</a>
              <a class="p-2 search" href="#" style="text-decoration:none"
              @click.prevent="change('東北亞')" :class="{'searchbt':search=='東北亞'}" >東北亞</a>
              <a class="p-2 search" href="#" style="text-decoration:none"
              @click.prevent="change('東南亞')" :class="{'searchbt':search=='東南亞'}" >東南亞</a>
              <a class="p-2 search" href="#" style="text-decoration:none"
              @click.prevent="change('港澳大陸')" :class="{'searchbt':search=='港澳大陸'}" >港澳大陸</a>
              <a class="p-2 search" href="#" style="text-decoration:none"
              @click.prevent="change('歐洲')" :class="{'searchbt':search=='歐洲'}" >歐洲</a>
              <a class="p-2 search" href="#" style="text-decoration:none"
              @click.prevent="change('紐澳')" :class="{'searchbt':search=='紐澳'}" >紐澳</a>
              </nav>                  
          </div>    
            <div class="album py-5 bg-light" style="min-height:450px">
                <div class="container">
                  <div :class="{'notmatch':isNotMatch}" v-if="isNotMatch">
                    沒有符合的內容
                  </div>
                <div class="row">
                    <div class="col-md-4 cardmain" v-for="(item,key) in filterDatas[currentPage]" :key="item.id">
                    <div class="card mb-4 shadow-sm border border-secondary " style="height:400px" >
                        <svg class="bd-placeholder-img card-img-top pictureeffect" width="100%" height="225" :style="{backgroundImage:`url(${item.imageUrl})`}"></svg>
                        <div class="card-body">
                        <h3>{{ item.title }}</h3>
                        <p class="card-text">{{ item.description }}</p>
                        <div class="d-flex justify-content-between align-items-center ">
                            <p class="h4 text-danger ">{{ item.price | currency }}</p>
                            <div class="btn-group bigmedia">
                            <button type="button" class="btn btn-sm btn-outline-secondary" @click="toDetailPage(item.id)" >查看行程</button>
                            <button type="button" class="btn btn-sm btn-outline-secondary" :disabled="isDisabled" @click="addtoCart(item.id)" >購入行程</button>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
              <!-- 分頁 -->
             <nav aria-label="Page navigation example">
              <ul class="pagination justify-content-center">
                <li class="page-item" :class="{active: currentPage === page-1}" v-for="page in filterDatas.length" >
                  <a class="page-link" href="#" @click.prevent="currentPage = page-1">{{ page }}</a>
                </li>
                </ul>
              </nav>
            
            <ShoppingCart :cartlength="cartlength" />
             
            
            <div id="show">   
              <v-goTop></v-goTop>
            </div>
            

          
    </div>
</template>

<script>
import $ from 'jquery';
import GoTop from '@/components/customer/GoTop';
import ShoppingCart from '@/components/customer/ShoppingCart';

export default {
  components:{
    'v-goTop': GoTop,
    ShoppingCart,
  },
  data() {
        return {
            products:[], //抓取後端產品資料
            tempProduct:[], //建立新增或修改資料
            pagination:{}, //抓取後端頁數資料
            isNew:false, //新增與修改時的變數
            isLoading: false, //一般動畫讀取的變數 
            search:'全部',
            isBackShow:{value:false},
            cart:{},
            cartlength:'',
            status:{
              loadingItem:'', //上傳圖片的動畫讀取的變數 在index.html中使用CDN方式載入動畫
            },
            currentPage:0,
            keyword:'',
            newData:[],
            isNotMatch:false,
            isDisabled:false,

            
        };
    },
  methods:{
       //取得api資料
        getProductAll(){
          const api=`${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/products/all`;
          const vm =this;
          vm.isLoading=true;
          this.$http.get(api).then((response) => {
            console.log(response.data)
            vm.products = response.data.products;
            // vm.pagination = response.data.pagination;
            vm.isLoading=false;
          })
        },
        change(item){
          this.search = item;
        },
  
        toDetailPage(id) {
          // console.log(id);
          this.$router.push(`/ProductDetail/${id}`);
        },

        getProduct(id) {
          const vm = this;
          const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/product/${id}`;
          vm.status.loadingItem = id;
          this.$http.get(url).then((response) => {
            vm.product = response.data.product;
            // $('#productModal').modal('show');
            console.log(response);
            vm.status.loadingItem = '';
          });
        },
        addtoCart(id, qty = 1) {
          const vm = this;
          const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
          vm.status.loadingItem = id;
          vm.isDisabled=true;
          const cart = {
            product_id: id,
            qty,
          };
          this.$http.post(url, { data: cart }).then((response) => {
            console.log(cart);
            this.$bus.$emit('messsage:push', "已加入購物車", 'success');
            vm.status.loadingItem = '';
            vm.getCart();
            vm.isDisabled=false;
          });
        },
        getCart() {
          const vm = this;
          const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
          vm.isLoading = true;
          this.$http.get(url).then((response) => {
            // vm.products = response.data.products;
            vm.cart = response.data.data;
            console.log(response);
            console.log(vm.cart.carts.length);
            vm.cartlength = vm.cart.carts.length;
            vm.isLoading = false;
          });
        },
        removeCartItem(id) {
          const vm = this;
          const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart/${id}`;
          vm.isLoading = true;
          this.$http.delete(url).then(() => {
            vm.getCart();
            vm.isLoading = false;
          });
        },
        getCoupons() {
          const vm = this;
          const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/coupons`;
          this.$http.get(url, vm.tempProduct).then((response) => {
            vm.coupons = response.data.coupons;
            console.log(vm.coupons);
          });
        },
        
      },
      computed:{
       
       filterDatas(){
         let items=[];
         // 先分類
        if(this.search !== '全部'){
          this.currentPage=0;
          items = this.products.filter((item,i)=>{
          return item.category==this.search
          })
        }else{
          items=this.products;
        }

        //篩選關鍵字
        if(this.keyword){
          this.currentPage=0;
          items=items.filter(item=> {
          return item.title.indexOf(this.keyword) != -1;
          })   
        }

        if(items.length !='0'){
            this.isNotMatch=false
            console.log(this.isNotMatch)
        }else{
          this.isNotMatch=true
        }
         
      
          // 後分頁
            const newData=[];
            items.forEach((item,i) =>{
              if( i % 9 ===0){
                  newData.push([])
                }
                const page = parseInt(i/9);
                newData[page].push(item);
            })
            return newData;   
       },

      },
      created() {
        this.getProductAll();
        this.getCart();
       
      },
    }
</script>
<style>
.searchbt{
  background-color: rgb(176, 247, 243);
  /* color:rgb(255, 255, 255) !important; */
}

.search{
  color: rgb(134, 134, 134);
}

.search:hover {
  color: rgb(134, 134, 134);
}

.notmatch{
  text-align: center;
  tab-size: 20px;
}

.pictureeffect{
  background-size: cover;
  height:220px;
  
}

.cardmain{
  height: 450px;
 

}
.cardmain:hover{
-webkit-transform: translate(3px, -14px) rotate(0deg) skew(0deg, 0deg) scale(1, 1);
-moz-transform: translate(3px, -14px) rotate(0deg) skew(0deg, 0deg) scale(1, 1);
-o-transform: translate(3px, -14px) rotate(0deg) skew(0deg, 0deg) scale(1, 1);
-ms-transform: translate(3px, -14px) rotate(0deg) skew(0deg, 0deg) scale(1, 1);
transform: translate(3px, -14px) rotate(0deg) skew(0deg, 0deg) scale(1, 1);
}



</style>