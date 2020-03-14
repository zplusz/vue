<template>
    <div class="pdmain">
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
            <div class="album py-5" style="min-height:450px">
                <div class="container">
                  <div :class="{'notmatch':isNotMatch}" v-if="isNotMatch">
                    <p v-if="!isLoading">沒有符合的內容</p>
                  </div>
                <div class="row">
                    <div class="col-md-4 cardmain" v-for="(item,key) in filterDatas[currentPage]" :key="item.id">
                    <div class="card mb-4 shadow-sm border border-secondary " style="height:430px" >
                        <div class="bd-placeholder-img card-img-top pictureeffect "  :style="{backgroundImage:`url(${item.imageUrl})`}"></div>
                        <button class="pictureeffected" @click="toDetailPage(item.id)"> LOOK</button>
                        <div class="card-body">
                        <p class="item-title">{{ item.title }}</p>
                        <p class="card-text item-description">{{ item.description }}</p>
                        <div class="d-flex justify-content-between align-items-center moneynbt">
                            <p class="h5 text-danger ">{{ item.price | currency }}</p>
                            <div class="btn-group mediabutton">
                            <button type="button" class="btn btn-sm btn-outline-secondary" @click="toDetailPage(item.id)" >查看行程</button>
                            <button type="button" class="btn btn-sm btn-outline-secondary" :disabled="status.loadingItem  !== '' " @click="addtoCart(item.id)" >購入行程</button>
                            </div>
                        </div>
                        <div class="rangemediabutton">
                              <div class="btn-group">
                                <button type="button" class="btn btn-sm btn-outline-secondary" @click="toDetailPage(item.id)" >查看行程</button>
                                <button type="button" class="btn btn-sm btn-outline-secondary" :disabled="status.loadingItem  !== '' " @click="addtoCart(item.id)" >購入行程</button>
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
          const cart = {
            product_id: id,
            qty,
          };
          this.$http.post(url, { data: cart }).then((response) => {
            console.log(cart);
            this.$bus.$emit('messsage:push', "已加入購物車", 'success');
            vm.status.loadingItem = '';
            vm.getCart();
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
  background-color: #002b53;
  color:white !important;
}

.search{
  color: #002b53;
}



.notmatch{
  text-align: center;
  tab-size: 20px;
}

.pictureeffect{
  background-size: cover;
  height:211px; 
  position:relative;

}

.pictureeffected{
  display: none;
}

.rangemediabutton{
  display: none;
}

@media (min-width: 1200px){

.pictureeffected{
  background-color: rgba(0, 0, 0, 0.397);
  height:208px; 
  width: 336px;
  position:absolute; 
  bottom:219px; 
  left:1px;
  color: rgb(214, 214, 214);
  font-size: 20px;
  text-align: center;
  line-height: 220px;
  letter-spacing:3px;
  opacity:0;
  display: block;
}

.pictureeffected:hover{
  opacity: 1;
 
}

.cardmain{
  height: 450px;
}

}

.item-title{
  font-size: 23px;
  font-weight: bold;
}


.mediabutton{
  margin-top: -5px;
}



@media (min-width: 768px) and (max-width: 991.98px){

.rangemediabutton{
  display: block;
  text-align: center;
}

.mediabutton{
  display: none !important;
}

.item-title{
  font-size: 15px;
}
.item-description{
  white-space: nowrap;
  overflow:hidden;
  text-overflow:ellipsis;
}

}

@media (min-width: 992px) and (max-width: 1199.98px){


.item-description{
  width: 15em;
  white-space: nowrap;
  overflow:hidden;
  text-overflow:ellipsis;
}

.moneynbt{
  margin-top: 40px;
}

}

@media (max-width: 767.98px) {

.pdmain{

margin-top:-140px
}

}

@media (min-width: 768px) { 

.pdmain{

margin-top:-70px
}

}



</style>