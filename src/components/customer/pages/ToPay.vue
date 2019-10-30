<template>
    <div>
        <TimeLine class="topay" />
        <div class="pagename">
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
              <li class="breadcrumb-item"><router-link to="/customerproducts">商品頁</router-link></li>
              <li class="breadcrumb-item"><router-link to="/customerorders">購物車</router-link></li>
              <li class="breadcrumb-item active" aria-current="page">結帳</li>
            </ol>
          </nav>
        </div>
        <div class="buylist ">
          <p>
          <a  data-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample">
           + 展開購買清單
          </a>
          </p>
          <div class="collapse" id="collapseExample">
            <div class="card card-body" v-if="cart.carts">
                <div class=" mb-3 bigmedia" v-for="item in cart.carts" :key="item.id"  >
                  <div class="row ">
                    <div class="col-6 text-left">{{ item.product.title }}</div>
                    <div class="col text-left">{{ item.qty }}/{{ item.product.unit }}</div>
                    <div class="col-3 text-left">{{ item.final_total | currency }}
                      <div class="text-success" v-if="item.coupon">
                            已套用優惠券
                      </div>
                    </div>
                </div>
              </div>
              
              <!-- smallmedia -->
              <div v-if="cart.carts">
              <div class="mb-3 smallmedia" v-for="item in cart.carts"   >  
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
              </div>
              </div>
              <hr/>
                <div class="row">
                  <div class="col">共 {{ cartlength }} 筆</div>
                  <div class="col text-right">總計 {{ cart.total | currency}}
                    <div v-if="cart.final_total !== cart.total">
                      <div class="text-success">折扣價 {{ cart.final_total | currency}}</div>
                    </div>
                  </div>
                </div>
            </div>
          </div>
        </div>
        



    <div class="mb-5 mt-2 row justify-content-center">
      <form class="col-md-6 big-customerdetail" @submit.prevent="createOrder">
        <div class="form-group">
          <label for="useremail">Email</label>
          <input type="email" class="form-control" name="email" id="useremail"
            v-validate="'required|email'"
            :class="{'is-invalid': errors.has('email')}"
            v-model="form.user.email" placeholder="請輸入 Email">
          <span class="text-danger" v-if="errors.has('email')">
            {{ errors.first('email') }}
          </span>
        </div>

        <div class="form-group">
          <label for="username">收件人姓名</label>
          <input type="text" class="form-control" name="name" id="username"
            :class="{'is-invalid': errors.has('name')}"
            v-model="form.user.name" v-validate="'required'" placeholder="輸入姓名">
          <span class="text-danger" v-if="errors.has('name')">請輸入姓名</span>
        </div>

        <div class="form-group">
          <label for="usertel">收件人電話</label>
          <input type="text" class="form-control" id="usertel"
            v-model="form.user.tel" placeholder="請輸入電話" name="tel"
            v-validate="'required|digits:10'"
            :class="{'is-invalid': errors.has('tel')}">
            <span class="text-danger" v-if="errors.has('tel')">請輸入電話</span>
        </div>

        <div class="form-group">
          <label for="useraddress">收件人地址</label>
          <input type="text" class="form-control" name="address"
          :class="{'is-invalid': errors.has('address')}"
            id="useraddress" v-model="form.user.address" v-validate="'required'"
            placeholder="請輸入地址">
          <span class="text-danger" v-if="errors.has('address')">地址欄位不得留空</span>
        </div>

        <div class="form-group">
          <label for="useraddress">留言</label>
          <textarea name="" id="" class="form-control" cols="30" rows="10"
            v-model="form.message"></textarea>
        </div>
        <div class="text-right">
          <button class="btn btn-danger">送出訂單</button>
        </div>
      </form>

      <form class="col-md-8  customerdetail" @submit.prevent="createOrder">
        <div class="form-group">
          <label for="useremail">Email</label>
          <input type="email" class="form-control" name="email" id="useremail"
            v-validate="'required|email'"
            :class="{'is-invalid': errors.has('email')}"
            v-model="form.user.email" placeholder="請輸入 Email">
          <span class="text-danger" v-if="errors.has('email')">
            {{ errors.first('email') }}
          </span>
        </div>

        <div class="form-group">
          <label for="username">收件人姓名</label>
          <input type="text" class="form-control" name="name" id="username"
            :class="{'is-invalid': errors.has('name')}"
            v-model="form.user.name" v-validate="'required'" placeholder="輸入姓名">
          <span class="text-danger" v-if="errors.has('name')">請輸入姓名</span>
        </div>

        <div class="form-group">
          <label for="usertel">收件人電話</label>
          <input type="text" class="form-control" id="usertel"
            v-model="form.user.tel" placeholder="請輸入電話" name="tel"
            v-validate="'required|digits:10'"
            :class="{'is-invalid': errors.has('tel')}">
            <span class="text-danger" v-if="errors.has('tel')">請輸入電話</span>
        </div>

        <div class="form-group">
          <label for="useraddress">收件人地址</label>
          <input type="text" class="form-control" name="address"
          :class="{'is-invalid': errors.has('address')}"
            id="useraddress" v-model="form.user.address" v-validate="'required'"
            placeholder="請輸入地址">
          <span class="text-danger" v-if="errors.has('address')">地址欄位不得留空</span>
        </div>

        <div class="form-group">
          <label for="useraddress">留言</label>
          <textarea name="" id="" class="form-control" cols="30" rows="10"
            v-model="form.message"></textarea>
        </div>
        <div class="text-right">
          <button class="btn btn-danger">送出訂單</button>
        </div>
      </form>
    </div>  
    </div>
</template>

<script>
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
      toPay:true,
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
    // this.getCoupons();
  },
};
</script>

<style scoped>
.topay >>> #secondpoint::before {
    content: '';
    position: absolute;
    top: -9px;
    left: 63px;
    width: 17px;
    height: 17px;
    border: 2px solid #7e7e7e;
    border-radius: 8px;
    background:rgb(255, 2, 2);
}

.customerdetail{
  display: none;
}

@media (min-width: 992px) {
.buylist{
  width: 50%;
  margin: 30px auto -2px;
}
.cartlist{
  width: 70%;
  margin: 0 auto;
}
.pagename{
  display: none;
}

.smallmedia{
  display: none;
}

.bigmedia{
  display: block;
}

}




@media (max-width: 991.98px) {

.bigmedia{
  display: none;
}

.smallmedia{
  display: block;
}

.buylist{
  width: 90%;
  margin: 30px auto -2px;
}
.buylist p{
  margin-left: -20px;
}

}

.pagename{
  background-color: white;
  height: 10px;
  margin-bottom: 60px;
  margin-top: -150px;
}

@media (min-width: 768px) and (max-width: 991.98px) {

.buylist{
  width: 60%;
  margin: 30px auto -2px;
}
.customerdetail{
  display: block;
}

.big-customerdetail{
  display: none;
}

}



</style>