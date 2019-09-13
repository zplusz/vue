<template>
    <div>
      <loading :active.sync="isLoading"></loading>
        <div class="nav-scroller py-1 mb-2">
    <select v-model="input.category">
      <option class="p-2 text-muted" href="#" >全部</option>
      <option class="p-2 text-muted" href="#">東北亞</option>
      <option class="p-2 text-muted" href="#" >東南亞</option>
      <option class="p-2 text-muted" href="#">港澳大陸</option>
      <option class="p-2 text-muted" href="#">歐洲</option>
      <option class="p-2 text-muted" href="#">紐澳</option>
    </select>
  </div>
            <div class="album py-5 bg-light">
                <div class="container">
                <div class="row">
                    <div class="col-md-4" v-for="(item,key) in categoryMenu" :key="item.id">
                    <div class="card mb-4 shadow-sm" style="height:450px">
                        <svg class="bd-placeholder-img card-img-top " width="100%" height="225" :style="{backgroundImage:`url(${item.imageUrl})`}" style="background-size: cover;height:220px"></svg>
                        <div class="card-body">
                        <h3>{{ item.title }}</h3>
                        <p class="card-text">{{ item.description }}</p>
                        <div class="d-flex justify-content-between align-items-center ">
                            <p class="h4 text-danger ">{{ item.price | currency }}</p>
                            <div class="btn-group">
                            <button type="button" class="btn btn-sm btn-outline-secondary">購入行程</button>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            <Pagination :pages="pagination" @emitPages="getProducts"></Pagination>
    </div>
</template>

<script>
import $ from 'jquery';
import Pagination from '@/components/manager/Pagination';

export default {
  components:{
    Pagination,
  },
  data() {
        return {
            products:[], //抓取後端產品資料
            tempProduct:[], //建立新增或修改資料
            pagination:{}, //抓取後端頁數資料
            isNew:false, //新增與修改時的變數
            isLoading: false, //一般動畫讀取的變數 
            status:{
              fileUploading:false, //上傳圖片的動畫讀取的變數 在index.html中使用CDN方式載入動畫
            },
            input:{
              category:'全部'
            }
        };
    },
  methods:{
       //取得api資料
        getProducts(page){ 
            const api =`${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/products?page=${page}`;
            const vm = this;
            vm.isLoading = true;//啟用讀取動畫
            console.log(process.env.APIPATH , process.env.CUSTOMPATH);
            this.$http.get(api).then((response) => {
            console.log(response.data);
            if (response.data.success) {
              vm.isLoading = false; //資料讀取完成後再停用動畫
              vm.products = response.data.products;
              vm.pagination = response.data.pagination; //存取API提供的頁數
            }
            });  
        },
      
        getProduct(id) {
          const vm = this;
          const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/product/${id}`;
          vm.status.loadingItem = id;
          this.$http.get(url).then((response) => {
            vm.product = response.data.product;
            $('#productModal').modal('show');
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
            console.log(response);
            vm.status.loadingItem = '';
            vm.getCart();
            $('#productModal').modal('hide');
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
        addCouponCode() {
          const vm = this;
          const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/coupon`;
          const coupon = {
            code: vm.coupon_code,
          };
          vm.isLoading = true;
          this.$http.post(url, { data: coupon }).then((response) => {
            console.log(response);
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
        categoryMenu(){
          if(this.input.category != '全部'){
            console.log(this.input.category)
            return this.products.filter(item =>{
              return item.category === this.input.category
            })
          }else{
            return this.products
          }
        },
      },
      created() {
        this.getProducts();
        this.getCart();
      },
    }
</script>