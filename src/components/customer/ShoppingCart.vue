<template>
     <div class="fixed">
        <router-link to="/customerorders" >
          <div class="cart">
            <i class="fa fa-shopping-cart fa-2x navi carticon" aria-hidden="true"></i>
            <p class="cartlength" v-if="cartlength != 0">{{cartlength}}</p>
           </div>
        </router-link>
           <div class="ticket" @click.prevent='isShow = !isShow'>
             <a href="#" style="text-decoration: none"><div class="ticketicon">折％</div></a>
              
            </div>
            <router-link to="/customerorders" >
              
              </router-link>
              <div v-if="isShow" class="salecode"> 
                今日折扣碼：{{coupons}}
              </div>
       </div>        

       
            
</template>

<script>
export default {
  props: ['cartlength'],
  data(){
    return{
      isShow:false,
      coupons:'sale8585',
      }
  }, 
}
</script>

<style>

.fixed {
  position: fixed;
  bottom: 250px;
  right: 0;
  background-color:gainsboro;
  width:45px;
  height:120px; 
}

.cart{
  width:45px;
  height: 60px;
  background-color:gainsboro;
}

.carticon{
  
  padding-left: 4px;
  padding-top: 20px;
  position: relative;
}

.cart:hover{
  background-color:#002b53;
}

.cartlength{
  color:red;
  font-size: 18px;
  position: absolute;
  left:45%;
  bottom: 60%;
  font-weight:bold;
 
}

.ticket{
  width:45px;
  height: 60px;
  background-color:gainsboro;
}

.ticketicon{
  padding-left: 4px;
  padding-top: 15px;
  position: relative;
  color: white;
  font-size: 20px;
  font-weight: bold;
  
}

.ticket:hover{
  background-color:#002b53;
}

.salecode{
  background-color:#002b53;
  position: relative;
  margin-left: -200px;
  margin-top: -60px;
  padding-left: 10px;
  padding-top: 20px;
  width: 200px;
  height: 60px;
  color: rgb(255, 255, 255);
}



</style>