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
// import CustomerOrder from '@/components/manager/pages/CustomerOrder';
// import CustomerCheckout from '@/components/manager/pages/CustomerCheckout';
import CustomerDashboard from '@/components/customer/CustomerDashboard';
import CustomerProducts from '@/components/customer/pages/CustomerProducts';
import ProductDetail from '@/components/customer/pages/ProductDetail';
import CustomerOrders from '@/components/customer/pages/CustomerOrders';
import CustomerCheckouts from '@/components/customer/pages/CustomerCheckouts';
import ToPay from '@/components/customer/pages/ToPay';

Vue.use(VueRouter);

export default new VueRouter({
    linkActiveClass: 'active',
    routes:[
        
        {
            path:'*', //避免用戶輸入不存在的路徑
            redirect:'/', 

        },

        {   
            name:'travelup',   //元件呈現的名稱
            path:'/',      //對應的虛擬路徑
            component: TravelUp ,  //對應的元件

        },

        { 
            name:'customerdashboard',   //元件呈現的名稱
            path:'',      //對應的虛擬路徑 
            component: CustomerDashboard ,  //對應的元件
            children:[
                {
                  name:'customerproducts',   //元件呈現的名稱
                  path:'customerproducts',      //對應的虛擬路徑
                  component: CustomerProducts , 
                },
                {
                  name:'customerorders',   //元件呈現的名稱
                  path:'customerorders',      //對應的虛擬路徑
                  component: CustomerOrders , 
                },
                {
                  name:'topay',   //元件呈現的名稱
                  path:'topay',      //對應的虛擬路徑
                  component: ToPay , 
                },
                {
                  path: 'customercheckout/:orderId',
                  name: 'customercheckouts',
                  component: CustomerCheckouts,
                },
                {
                  name:'productdetail',   //元件呈現的名稱
                  path:'productdetail/:productId',      //對應的虛擬路徑
                  component: ProductDetail , 
                },

            ]
        },    

        {   
            name:'login',   //元件呈現的名稱
            path:'/login',      //對應的虛擬路徑
            component: Login ,  //對應的元件

        },

        {   
            name:'dashboard ',   //元件呈現的名稱
            path:'/admin',      //對應的虛擬路徑
            component: Dashboard ,  //對應的元件
            children:[
                {
                    name:'products',   //元件呈現的名稱
                    path:'products',      //對應的虛擬路徑
                    component: Products , 
                    meta: { requiresAuth: true },
                },
                {
                    path: 'coupons',
                    name: 'coupons',
                    component: Coupons,
                    meta: { requiresAuth: true },
                  },
                  {
                    path: 'orders',
                    name: 'orders',
                    component: Orders,
                    meta: { requiresAuth: true },
                  },
            ],
    
        },

        // {
        //     path: '/',
        //     name: 'Dashboard',
        //     component: Dashboard,
        //     children: [
        //       {
        //         path: 'customer_order',
        //         name: 'CustomerOrder',
        //         component: CustomerOrder,
        //       },
        //       {
        //         path: 'customer_checkout/:orderId',
        //         name: 'CustomerCheckout',
        //         component: CustomerCheckout,
        //       },
        //     ],
        //   },



    ]


});