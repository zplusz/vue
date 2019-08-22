import Vue from 'vue';
import VueRouter from 'vue-router';
//官方元件
// import Home from '@/components/HelloWorld';
import Dashboard from '@/components/Dashboard';
import Products from '@/components/pages/Products';
import Login from '@/components/pages/Login';
//自訂的分頁元件

Vue.use(VueRouter);

export default new VueRouter({
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
            name:'HelloWorld',   //元件呈現的名稱
            path:'/admin',      //對應的虛擬路徑
            component: Dashboard ,  //對應的元件
            children:[
                {
                    name:'Products',   //元件呈現的名稱
                    path:'Products',      //對應的虛擬路徑
                    component: Products , 
                    meta: { requiresAuth: true },
                },
            ]
    
        },



    ]


});