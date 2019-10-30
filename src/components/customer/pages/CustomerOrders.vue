<template>
  <div class="container">
    <loading :active.sync="isLoading"></loading>
    <TimeLine/>
    <div class="pagename">
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><router-link to="/customerproducts">商品頁</router-link></li>
          <li class="breadcrumb-item active" aria-current="page">購物車</li>
        </ol>
      </nav>
    </div>
    <div class="cartlist">
      <div class="card  my-5">
      <div class="card-header text-center" >
        購買清單
      </div>
      <div class="card-body " v-if="cart.carts">
        <div v-if="!cartlength" class="text-center my-5">目前沒有購買任何行程!</div>
          <div class="mb-3 odbigmedia" v-for="item in cart.carts" :key="item.id"  > 
            <div class="row">
              <div class="col-5 text-left">{{ item.product.title }}</div>
            <div class="col-2 text-left">{{ item.qty }}/{{ item.product.unit }}</div>
            <div class="col-3 text-left">{{ item.final_total | currency }}
              <div class="text-success" v-if="item.coupon">
                  已套用優惠券
              </div>
            </div>
            <div class="col pb-3 text-right"><button type="button" class="btn btn-outline-danger btn-sm"
                  @click="removeCartItem(item.id)">
                  <i class="far fa-trash-alt"></i>
                </button>
            </div>
            </div>
          </div>
          
          <div v-if="cart.carts">
          <div class="mb-3 odsmallmedia" v-for="item in cart.carts">  
            <div class="row">
              <div class="col-2 pb-3 text-right"><button type="button" class="btn btn-outline-danger btn-sm"
                    @click="removeCartItem(item.id)">
                    <i class="far fa-trash-alt"></i>
                  </button>
              </div>
              <div class="col-10 text-left">{{ item.product.title }}</div>
              
            </div>
            <div class="row">
              <div class="col-5"></div>
              <div class=" col-7 text-right">{{ item.qty }}/{{ item.product.unit }} {{ item.final_total | currency }}
                <div class="text-success" v-if="item.coupon">已套用優惠券</div>
              </div>
            </div>
            <hr/>
          </div>
          </div>
            

        <div class=" mt-5">
          <div class="text-danger" v-if="coupons">今日優惠碼：{{coupons}} 
            <button class="couponbtn" @click="copycoupon">領取優惠</button>
          </div>
        </div>
        <div class="input-group mt-3 mb-4 input-group-sm">
          <input type="text" class="form-control" v-model="coupon_code" placeholder="請輸入優惠碼">
          <div class="input-group-append">
            <button class="btn btn-outline-secondary" type="button" @click="addCouponCode">
              套用優惠碼
            </button>
          </div>
        </div>
        <div class="row h6">
          <div class="col">共 {{ cartlength }} 筆</div>
          <div class="col text-right">總計 {{ cart.total | currency}}
            <div v-if="cart.final_total !== cart.total">
              <div class="text-success">折扣價 {{ cart.final_total | currency}}</div>
            </div>
          </div>
        </div>
  
      </div>
      
      <div class="card-footer text-muted">
        <div class="row">
          <div class="col mt-1">
            <router-link to="/customerproducts"><button type="button" class="btn btn-sm btn-outline-secondary" >
              <i class="fa fa-angle-double-left" aria-hidden="true"></i> 繼續購物</button>
            </router-link>
          </div>
          <div class="col text-right" >
            <router-link to="/topay" v-if="cartlength">
              <button class="btn btn-danger">結帳</button>
            </router-link>
          </div>
        </div>
        
        
      </div>
    </div>
    
    </div>
  
  </div>
</template>

<script>
import $ from 'jquery';
import TimeLine from '@/components/customer/TimeLine';

export default {
  components:{
    TimeLine,
  },
  data() {
    return {
      products: [],
      isLoading: false,
      product: {},
      cart: {},
      coupon_code: '',
      coupons:'sale8585',
      cartlength:'',
      toPay:false,
      status: {
        loadingItem: '',
      },
      form: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: '',
        },
        message: '',
      },
    };
  },
  methods: {
    getProducts() {
      const vm = this;
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/products`;
      vm.isLoading = true;
      this.$http.get(url).then((response) => {
        vm.products = response.data.products;
        console.log(response);
        vm.isLoading = false;
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
        console.log(vm.cart );
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
        vm.coupon_code ='';
        vm.isLoading = false;
      });
    },
    copycoupon(){
      const vm =this ;
      vm.coupon_code = vm.coupons;
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
              vm.$router.push(`/customercheckout/${response.data.orderId}`);
            }
            // vm.getCart();
            vm.isLoading = false;
          });
        } else {
          console.log('欄位不完整');
        }
      });
    },

  },
  created() {
    this.getProducts();
    this.getCart();
  },
};
</script>

<style>
@media (min-width: 992px) {
.cartlist{
  width: 60%;
  margin: 0 auto;
}

}


@media (min-width: 576px) {
  

.pagename{
  display: none;
}

.odsmallmedia{
  display: none;
}

}

@media (max-width: 575.98px){

.odbigmedia{
  display: none;
}

}

.pagename{
  background-color: white;
  height: 10px;
  margin-top: -170px;
}



.gobackshop{
  padding-left: 290px;
}

.gobackshopping{
  padding-left: 270px;
  margin-bottom: -60px;
}

.couponcode{
  float: left;
}

.toptable{
  width: 550px;
}

.couponbtn{
  margin-left: 10px;
}

</style>