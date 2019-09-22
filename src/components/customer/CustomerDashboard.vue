<template>
    <div>  
        <Navbar/>
        <Alert/>
        <main role="main" class="container">
            <router-view></router-view>
        </main>
        <Footer/>
    </div>
</template>    

<script>
import Navbar from './Navbar';
import Footer from './Footer';
import Alert from '@/components/manager/AlertMessage';



export default {
    components:{
        Navbar,
        Footer,
        Alert,
       
    },
    
}
</script>
