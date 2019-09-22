<template>
    <div>
      <loading :active.sync="isLoading"></loading>
        <!-- <div class="nav-scroller py-1 mb-2">
    <select v-model="input.category">
      <option class="p-2 text-muted" href="#" >全部</option>
      <option class="p-2 text-muted" href="#">東北亞</option>
      <option class="p-2 text-muted" href="#" >東南亞</option>
      <option class="p-2 text-muted" href="#">港澳大陸</option>
      <option class="p-2 text-muted" href="#">歐洲</option>
      <option class="p-2 text-muted" href="#">紐澳</option>
    </select>
  </div> -->
  <div class="nav-scroller py-1 mb-2">
      <nav class="nav d-flex justify-content-between"  >
        <a class="p-2 text-muted" href="#" style="text-decoration:none"
        @click.prevent="change('全部')" :class="{'searchbt' : search =='全部'}">全部</a>
        <a class="p-2 text-muted" href="#" style="text-decoration:none"
        @click.prevent="change('東北亞')" :class="{'searchbt':search=='東北亞'}" >東北亞</a>
        <a class="p-2 text-muted" href="#" style="text-decoration:none"
        @click.prevent="change('東南亞')" :class="{'searchbt':search=='東南亞'}" >東南亞</a>
        <a class="p-2 text-muted" href="#" style="text-decoration:none"
        @click.prevent="change('港澳大陸')" :class="{'searchbt':search=='港澳大陸'}" >港澳大陸</a>
        <a class="p-2 text-muted" href="#" style="text-decoration:none"
        @click.prevent="change('歐洲')" :class="{'searchbt':search=='歐洲'}" >歐洲</a>
        <a class="p-2 text-muted" href="#" style="text-decoration:none"
        @click.prevent="change('紐澳')" :class="{'searchbt':search=='紐澳'}" >紐澳</a>
        </nav>                  
    </div>    
            <div class="album py-5 bg-light ">
                <div class="container">
                <div class="row">
                    <div class="col-md-4 " v-for="(item,key) in filterDatas[currentPage] " :key="item.id">
                    <div class="card mb-4 shadow-sm border border-secondary " style="height:400px">
                        <svg class="bd-placeholder-img card-img-top " width="100%" height="225" :style="{backgroundImage:`url(${item.imageUrl})`}" style="background-size: cover;height:220px"></svg>
                        <div class="card-body">
                        <h3>{{ item.title }}</h3>
                        <p class="card-text">{{ item.description }}</p>
                        <div class="d-flex justify-content-between align-items-center ">
                            <p class="h4 text-danger ">{{ item.price | currency }}</p>
                            <div class="btn-group">
                            <button type="button" class="btn btn-sm btn-outline-secondary" @click="toDetailPage(item.id)" >查看行程</button>
                            <button type="button" class="btn btn-sm btn-outline-secondary" @click="addtoCart(item.id)" >購入行程</button>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
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
import GoTop from '@//components/customer/GoTop';
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
            newData:[],
            currentPage:0,
            
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
            // $('#productModal').modal('hide');
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
            vm.isLoading = false;
            console.log(vm.cart.carts.length);
            vm.cartlength = vm.cart.carts.length;
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
        createOrder() {
          const vm = this;
          const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/order`;
          const order = vm.form;
          // vm.isLoading = true;
          this.$validator.validate().then((result) => {
            if (result) {
              this.$http.post(url, { data: order }).then((response) => {
                console.log('訂單已建立', response);
                if (response.data.success) {
                  vm.$router.push(`/customer_checkout/${response.data.orderId}`);
                }
                // vm.getCart();
                vm.isLoading = false;
              });
            } else {
              console.log('欄位不完整');
            }
          });
        }
      },
      computed:{
        //分頁篩選
        filterDatas(){
          const vm = this;
          let items=[];
          //先篩選
          if(vm.search !== '全部'){
            vm.currentPage=0;
            items = vm.products.filter((item,i)=>{
              return item.category==vm.search
            })
          }else{
            items = vm.products;
          }
          //後分頁
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
  background-color: rgb(83, 193, 197);
  color:white !important;
}

</style>