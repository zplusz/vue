
//官方元件
import Vue from 'vue';
import VueRouter from 'vue-router';


//自訂的分頁元件
// import Home from '@/components/HelloWorld';
//後台
import TravelUp from '@/components/customer/TravelUp';
import Dashboard from '@/components/manager/Dashboard';
import Products from '@/components/manager/pages/Products';
import Login from '@/components/manager/pages/Login';
import Coupons from '@/components/manager/pages/Coupons';
import Orders from '@/components/manager/pages/Orders';
import CustomerOrder from '@/components/manager/pages/CustomerOrders';
import CustomerCheckout from '@/components/manager/pages/CustomerCheckout';
import CustomerDashboard from '@/components/customer/CustomerDashboard';
import CustomerProducts from '@/components/customer/pages/CustomerProducts';


Vue.use(VueRouter);

export default new VueRouter({
    linkActiveClass: 'active',
    routes:[
        {
            path:'*', //避免用戶輸入不存在的路徑
            redirect:'login', //將重新導向login頁面

        },

        {   
            name:'TravelUp',   //元件呈現的名稱
            path:'/',      //對應的虛擬路徑
            component: TravelUp ,  //對應的元件

        },

        {   
            name:'CustomerDashboard',   //元件呈現的名稱
            path:'/CustomerDashboard',      //對應的虛擬路徑
            component: CustomerDashboard ,  //對應的元件
            children:[
                {
                  name:'CustomerProducts',   //元件呈現的名稱
                  path:'/CustomerProducts',      //對應的虛擬路徑
                  component: CustomerProducts , 
                },

            ]
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
            path: '/back',
            name: 'Dashboard',
            component: Dashboard,
            children: [
              {
                path: 'customer_order',
                name: 'CustomerOrder',
                component: CustomerOrder,
              },
              {
                path: 'customer_checkout/:orderId',
                name: 'CustomerCheckout',
                component: CustomerCheckout,
              },
            ],
          },



    ]


});