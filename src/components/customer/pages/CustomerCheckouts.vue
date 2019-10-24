<template>
<div>
<TimeLine  class="halffinish topay" :class="{ 'finish': isFinish}"/>
<div class="pagename">
     <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><router-link to="/customerproducts">商品頁</router-link></li>
          <li class="breadcrumb-item text-primary">購物車</li>
          <li class="breadcrumb-item text-primary">結帳</li>
          <li class="breadcrumb-item active" aria-current="page">付款</li>
        </ol>
      </nav>
  </div>     
  <div class="my-5  row justify-content-center">
    <form class="col-md-6 colsix" @submit.prevent="payOrder">
      <table class="table">
        <thead>
          <th>品名</th>
          <th>數量</th>
          <th>單價</th>
        </thead>
        <tbody>
          <tr v-for="item in order.products" :key="item.id">
            <td class="align-middle">{{ item.product.title }}</td>
            <td class="align-middle">{{ item.qty }}/{{ item.product.unit }}</td>
            <td class="align-middle text-right">{{ item.final_total | currency}}</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td colspan="2" class="text-right">總計</td>
            <td class="text-right text-danger">{{ order.total | currency }}</td>
          </tr>
        </tfoot>
      </table>

      <table class="table">
        <tbody>
          <tr>
            <th width="100">Email</th>
            <td>{{ order.user.email }}</td>
          </tr>
          <tr>
            <th>姓名</th>
            <td>{{ order.user.name }}</td>
          </tr>
          <tr>
            <th>收件人電話</th>
            <td>{{ order.user.tel }}</td>
          </tr>
          <tr>
            <th>收件人地址</th>
            <td>{{ order.user.address }}</td>
          </tr>
          <tr>
            <th>付款狀態</th>
            <td>
              <span v-if="!order.is_paid">尚未付款</span>
              <span v-else class="text-success">付款完成</span>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="row">
        <div class="mb-4 col">
          <router-link to="/customerproducts"><button type="button" class="btn btn-sm btn-outline-secondary" ><i class="fa fa-angle-double-left" aria-hidden="true"></i> 繼續購物</button></router-link>
        </div>
        <div class="text-right col" v-if="order.is_paid === false">
          <button class="btn btn-danger" @click="toFinish">確認付款去</button>
        </div>
      </div>
      
    </form>

    <form class="col-md-8 coleight" @submit.prevent="payOrder">
      <table class="table">
        <thead>
          <th>品名</th>
          <th>數量</th>
          <th>單價</th>
        </thead>
        <tbody>
          <tr v-for="item in order.products" :key="item.id">
            <td class="align-middle">{{ item.product.title }}</td>
            <td class="align-middle">{{ item.qty }}/{{ item.product.unit }}</td>
            <td class="align-middle text-right">{{ item.final_total | currency}}</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td colspan="2" class="text-right">總計</td>
            <td class="text-right text-danger">{{ order.total | currency }}</td>
          </tr>
        </tfoot>
      </table>

      <table class="table">
        <tbody>
          <tr>
            <th width="100">Email</th>
            <td>{{ order.user.email }}</td>
          </tr>
          <tr>
            <th>姓名</th>
            <td>{{ order.user.name }}</td>
          </tr>
          <tr>
            <th>收件人電話</th>
            <td>{{ order.user.tel }}</td>
          </tr>
          <tr>
            <th>收件人地址</th>
            <td>{{ order.user.address }}</td>
          </tr>
          <tr>
            <th>付款狀態</th>
            <td>
              <span v-if="!order.is_paid">尚未付款</span>
              <span v-else class="text-success">付款完成</span>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="row">
        <div class="mb-4 col">
          <router-link to="/customerproducts"><button type="button" class="btn btn-sm btn-outline-secondary" ><i class="fa fa-angle-double-left" aria-hidden="true"></i> 繼續購物</button></router-link>
        </div>
        <div class="text-right col" v-if="order.is_paid === false">
          <button class="btn btn-danger" @click="toFinish">確認付款去</button>
        </div>
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
      isFinish:'',
      order: {
        user: {},
      },
      orderId: '',
    };
  },
  methods: {
    getOrder() {
      const vm = this;
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/order/${vm.orderId}`;
      vm.isLoading = true;
      this.$http.get(url).then((response) => {
        vm.order = response.data.order;
        console.log(response);
        vm.isLoading = false;
      });
    },
    payOrder() {
      const vm = this;
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/pay/${vm.orderId}`;
      vm.isLoading = true;
      this.$http.post(url).then((response) => {
        console.log(response);
        if (response.data.success) {
          vm.getOrder();
        setTimeout(function(){
            alert("已完成付款");
        },1000);
        }
        vm.isLoading = false;
        vm.finish = true;
      });
      
    },
    toFinish(){
      var vm = this;
      vm.isFinish = true;
    }
    
  },
  created() {
    this.orderId = this.$route.params.orderId;
    this.getOrder();
    console.log(this.orderId);
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

.halffinish >>>#thirdpoint:before {
    content: '';
    position: absolute;
    top: -19px;
    right: 10px;
    width: 17px;
    height: 17px;
    border: 2px solid #fd0000;
    border-radius: 8px;
    background:rgb(255, 255, 255);
}  

.finish >>>#thirdpoint:before {
    content: '';
    position: absolute;
    top: -19px;
    right: 10px;
    width: 17px;
    height: 17px;
    border: 2px solid #7e7e7e;
    border-radius: 8px;
    background:rgb(255, 2, 2);
}

.coleight{
  display: none;
}

@media (min-width: 576px) {
  
.cartlist{
  width: 70%;
  margin: 0 auto;
}
.pagename{
  display: none;
}

}
@media (min-width: 768px) and (max-width: 991.98px) { 

.coleight{
  display: block;
}

.colsix{
  display: none;
}

}

.pagename{
  background-color: white;
  height: 10px;
  margin-top: -150px;
  margin-bottom: 60px;
}
</style>
