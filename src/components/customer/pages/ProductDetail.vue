<template>
    <div class="contain">
            <loading :active.sync="isLoading"></loading>
            <div class="return">
                <router-link to="/customerproducts"><button type="button" class="btn btn-sm btn-outline-secondary" ><i class="fa fa-angle-double-left" aria-hidden="true"></i> 返回商品頁</button></router-link>
            </div>
            <div class="row">
                <div class="col-sm-5">
                    <div class="" >
                        <img :src="product.imageUrl" class="productimage">
                    </div>      
                </div>
                <div class="col-sm-7">
                    <div class="detail">
                        <h2>{{product.title}}</h2>
                        <p class="description">{{product.description}}</p>
                        <p class="price">{{product.price|currency}}元</p>
                        <p class="text-right"><del class="text-muted " v-if="product.price">{{ product.origin_price |currency }} 元</del></p>
                        <select class="form-control"  v-model="qty">
                            <option selected disabled>-請選擇數量-</option>
                            <option v-for="qty in 10" :value="qty" :key="qty">{{ qty}} {{ product.unit }}</option>
                        </select>
                        <a href="#" class="btn btn-outline-secondary btn-lg float-right mt-4" :disabled="isDisabled" @click.prevent="addtoCart(product.id,qty)">購入行程</a>
                    </div>
                </div>   
            </div>
            <ShoppingCart :cartlength="cartlength" />
            
       
    </div>
</template>

<script>
import ShoppingCart from '@/components/customer/ShoppingCart';

export default {
    components:{
    ShoppingCart,
    },
    
    data(){
        return{
            product:{},
            isLoading: false,
            status:{
              loadingItem:'', //上傳圖片的動畫讀取的變數 在index.html中使用CDN方式載入動畫
            },
            qty: 1,
            cart: {},
            cartlength:'',
            isDisabled:false,
            
        }

    },
    methods:{
        getProductDetail() {
          const id = this.$route.params.productId;
          const vm = this;
          const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/product/${id}`;
          vm.status.loadingItem = id;
          this.$http.get(url).then((response) => {
            vm.product = response.data.product;
            // $('#productModal').modal('show');
            
            console.log(response);
            vm.status.loadingItem = false;
          });
        },
        addtoCart(id, qty) {
          const vm = this;
          const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
          vm.status.loadingItem = id;
          vm.isDisabled=true;
          const cart = {
            product_id: id,
            qty,
          };
          this.$http.post(url, { data: cart }).then((response) => {
            console.log(response);
            this.$bus.$emit('messsage:push', "已加入購物車", 'success');
            vm.status.loadingItem = '';
            vm.getCart();
          });
           vm.isDisabled=false;
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
            vm.cartlength = vm.cart.carts.length;
          });
        },
        },
        created() {
            this.getProductDetail();
            this.getCart();
        },
}
</script>

<style>
.productimage{
    width: 400px;
    height: 300px;
}

.contain{
    margin-top: 50px;
    margin-bottom: 250px
}

.detail{
    font-size: 20px;
}

.description{
    height: 50px;
    margin-top: 50px;
}

.price{
    color: red;
    text-align: right;
    font-size: 30px;
    margin-top: 60px;
    margin-bottom: -5px;
}

.return{
    margin-bottom: 50px;
    margin-top: -50px;
}


</style>