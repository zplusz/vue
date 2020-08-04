<template>
    <div>   
        <div class="timeline">
            <ul class="time-horizontal disappear">
                <li class="firstpoint" ref="firstpoint" id="firstpoint">購物車</li>
                <li class="secondpoint" ref="secondpoint" id="secondpoint">結帳</li>
                <li class="thirdpoint" ref="thirdpoint" id="thirdpoint">付款</li>
            </ul>
        </div>     
    </div>
</template>

<script>
export default {
    
    data(){
        return{
            toPay:'',
            finish:'',
        
        }
        
    },

    
}
</script>

<style>
.timeline{
  width: 200px;
  margin: 0 auto;
  padding-bottom: 30px;
}

.time-horizontal {
    list-style-type: none;
    border-top: 2px solid rgb(163, 163, 163);
    width: 500px;
    padding: 0px;
    margin-left: -145px;
}
 
.firstpoint {
    float: left;
    position: relative;
    text-align: left;
    width: 200px;
    padding-top: 10px;
    margin-left: -25px;
}
 
.secondpoint{
    float: left;
    position: relative;
    text-align: left;
    width: 200px;
    padding-top: 10px;
    padding-left: 55px;
}

.thirdpoint{
    float: left;
    position: relative;
    text-align: left;
    width: 200px;
    margin-top: -21px;
    margin-left: 320px;
    padding-left: 165px;
}

#firstpoint:before {
    content: '';
    position: absolute;
    top: -9px;
    left:10px;
    width: 15px;
    height: 15px;
    border: 2px solid #7e7e7e;
    border-radius: 8px;
    background:rgb(255, 2, 2);
}
#secondpoint:before {
    content: '';
    position: absolute;
    top: -9px;
    left: 63px;
    width: 17px;
    height: 17px;
    border: 2px solid #7e7e7e;
    border-radius: 8px;
    background:rgb(255, 255, 255);
}
#thirdpoint:before {
    content: '';
    position: absolute;
    top: -19px;
    right: 10px;
    width: 17px;
    height: 17px;
    border: 2px solid #7e7e7e;
    border-radius: 8px;
    background:rgb(255, 255, 255);
}
@media (max-width: 575.98px){

.disappear{
    display: none;
}

}



    
</style>