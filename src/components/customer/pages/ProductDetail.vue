<template>
    <div class="container contain">
            <loading :active.sync="isLoading"></loading>
            <div class="return">
                <router-link to="/customerproducts"><button type="button" class="btn btn-sm btn-outline-secondary" ><i class="fa fa-angle-double-left" aria-hidden="true"></i> 返回商品頁</button></router-link>
            </div>
            <div class="bigmedia">
                <div class="row">
                    <div class="col-sm-6 ">
                        <div>
                            <img :src="product.imageUrl" class="productimage">
                        </div>      
                    </div>
                    <div class="col-sm-6">
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
                <div class="maybelike">
                    <p>別人也看了...</p>
                    <hr>
                    <div class="row" >
                        <div class="col-4 maybelikecontent" v-for="(item,index) in maybeLike" >
                            <div v-if="index<3">
                            <button class="maybelikepic" :style="{backgroundImage:`url(${item.imageUrl})`}" @click="toDetailPage(item.id)"> </button>
                            <h6>{{ item.title }}  {{ item.price | currency }} 元</h6>
                            </div>
                        </div>

                    </div>

                </div>
            </div>

            <div class="sm-media">
                <div class="picblock">
                    <img :src="product.imageUrl" class="smallpic">
                </div> 
                <div class="smdetail">
                    <h2>{{product.title}}</h2>
                        <p class="description">{{product.description}}</p>
                        <p class="price">{{product.price|currency}}元</p>
                        <p class="text-right"><del class="text-muted " v-if="product.price">{{ product.origin_price |currency }} 元</del></p>
                        <select class="form-control"  v-model="qty">
                            <option selected disabled>-請選擇數量-</option>
                            <option v-for="qty in 10" :value="qty" :key="qty">{{ qty}} {{ product.unit }}</option>
                        </select>
                        <a href="#" class="btn btn-outline-secondary btn-lg float-right mt-4 " :disabled="isDisabled" @click.prevent="addtoCart(product.id,qty)">購入行程</a>

                    <div class="sm-maybelike">
                    <p>別人也看了...</p>
                    <hr>
                    <div class="row">
                        <div class="col-4 sm-maybelikecontent" v-for="(item,index) in maybeLike" >
                            <div v-if="index<3">
                            <button class="sm-maybelikepic" :style="{backgroundImage:`url(${item.imageUrl})`}" @click="toDetailPage(item.id)"> </button>
                            <h6>{{ item.title }}  {{ item.price | currency }} 元</h6>
                            </div>
                        </div>

                        </div>

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
            products:[],
            product:[],
            category:"",
            id:"",
            isLoading: false,
            status:{
              loadingItem:'', //上傳圖片的動畫讀取的變數 在index.html中使用CDN方式載入動畫
            },
            qty: 1,
            cart: [],
            cartlength:'',
            isDisabled:false,
            
        }

    },
    methods:{
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
        getProductDetail() {
          const id = this.$route.params.productId;
          const vm = this;
          const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/product/${id}`;
          vm.status.loadingItem = id;
          this.$http.get(url).then((response) => {
            vm.product = response.data.product;
            vm.category = response.data.product.category;
            vm.id = response.data.product.id;
            // $('#productModal').modal('show');
            
            console.log(vm.category);
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
        toDetailPage(id) {
          console.log(id);
          this.$router.push(`/ProductDetail/${id}`);
          this.getProductDetail()
    
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
        computed:{
            maybeLike(){
            return this.products.filter((item,i)=>{
            return item.category==this.category && item.id != this.id
            });
           
        

      }

        },
        created() {
            this.getProductDetail();
            this.getCart();
            this.getProductAll();
            
        },
}
</script>

<style >
.productimage{
    width: 400px;
    height: 300px;
}

.contain{
    margin-top: 50px;
    margin-bottom: 70px
}

.detail{
    font-size: 20px;
}

.description{
    height: 50px;
    margin-top: 50px;
    font-size: 18px;
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
.maybelike{
    display: none;
}


@media (min-width: 992px) {

.maybelike{
    display: block;
    margin: 0 auto;
    height: 200px;
    text-align: center;
    border-style:groove;
    border-color:  rgba(211, 210, 210, 0.466);
    margin-top: 130px;
   

}

.maybelike p{
    color: rgb(155, 155, 155);
    margin-left: 8px;
    margin-top: 3px;
}
.maybelike hr{
    margin-top: -10px;
}
.maybelikepic{
    width: 200px;
    height: 100px;
    background-size: cover;
    margin-left: 20px;
}
.maybelikecontent{
    margin-top: 10px;
    
}

.sm-media{
    display: none;
}

}

@media (max-width: 991.98px){

.sm-media{
    text-align: center;
    display: block;
    margin: 0 auto;
}

.smallpic{
    width: 80%;
    height: 80%;
}

.bigmedia{
    display: none;
}

.smdetail{
    margin-top: 35px;
}

.sm-maybelike{
    display: block;
    margin: 0 auto;
    height: 170px;
    border-color:  rgba(211, 210, 210, 0.466);
    margin-top: 180px;
}

.sm-maybelike p{
    color: rgb(155, 155, 155);
    margin-left: 8px;
    margin-top: 3px;
    text-align: left;
}
.sm-maybelike hr{
    margin-top: -10px;
}
.sm-maybelikepic{
    width: 100%;
    height: 150%;
    background:center center;
    -moz-background-size: cover;
    background-size: cover;
    margin: 0 auto;
}
.sm-maybelikecontent{
    margin:0 auto;
    
}



}

@media (max-width: 767.98px) {

.return{
    margin-bottom: 50px;
    margin-top: -150px;
}

}

@media (max-width: 575.98px) {

.sm-media{
    text-align: center;
    display: block;
    margin: 0 auto;
}

 .sm-maybelikepic{
    height:90%;
    background:center center;
    -moz-background-size: cover;
    background-size: cover;
    margin: 0 auto;
}

.sm-maybelike{
    display: block;
    margin: 0 auto;
    height: 130px;
    margin-top: 180px;
}

}

@media (max-width: 370px){
.sm-maybelike{
    display: none;
}

.contain{
    margin-bottom: 120px;
}
}
</style>