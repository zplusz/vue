<template>
    <div>  
        <Navbar/>
        <main role="main" class="container">
            <router-view></router-view>
        </main>
        <Footer/>
    </div>
</template>    

<script>
import Navbar from './Navbar';
import Footer from './Footer'



export default {
    components:{
        Navbar,
        Footer,
       
    },
    
}
</script>
