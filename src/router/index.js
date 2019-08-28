import Vue from 'vue';
import VueRouter from 'vue-router';
//官方元件
// import Home from '@/components/HelloWorld';
import Dashboard from '@/components/Dashboard';
import Products from '@/components/pages/Products';
import Login from '@/components/pages/Login';
import Coupons from '@/components/pages/Coupons';
import Orders from '@/components/pages/Orders';
import CustomerOrder from '@/components/pages/CustomerOrders';
//自訂的分頁元件

Vue.use(VueRouter);

export default new VueRouter({
    linkActiveClass: 'active',
    routes:[
        {
            path:'*',
            redirect:'login',

        },

        {   
            name:'Login',   //元件呈現的名稱
            path:'/login',      //對應的虛擬路徑
            component: Login ,  //對應的元件

        },

        {   
            name:'Dashboard ',   //元件呈現的名稱
            path:'/admin',      //對應的虛擬路徑
            component: Dashboard ,  //對應的元件
            children:[
                {
                    name:'Products',   //元件呈現的名稱
                    path:'Products',      //對應的虛擬路徑
                    component: Products , 
                    meta: { requiresAuth: true },
                },
                {
                    path: 'coupons',
                    name: 'Coupons',
                    component: Coupons,
                    meta: { requiresAuth: true },
                  },
                  {
                    path: 'orders',
                    name: 'Orders',
                    component: Orders,
                    meta: { requiresAuth: true },
                  },
            ],
    
        },

        {
            path: '/',
            name: 'Dashboard',
            component: Dashboard,
            children: [
              {
                path: 'customer_order',
                name: 'CustomerOrder',
                component: CustomerOrder,
              },
            ],
          },



    ]


});