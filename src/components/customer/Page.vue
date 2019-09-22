<template>
<nav aria-label="Page navigation example">
              <ul class="pagination justify-content-center">
                <!-- <li class="page-item" :class="{'disabled': !pages.has_pre }">
                  <a class="page-link" href="#" aria-label="Previous"
                    @click.prevent="paginationRenew(pages.current_page - 1)">
                    <span aria-hidden="true">&laquo;</span>
                    <span class="sr-only">Previous</span>
                  </a>
                </li> -->
                <li class="page-item" :class="{active: currentPage === page-1}" v-for="page in filterDatas.length" >
                  <a class="page-link" href="#" @click.prevent="currentPage = page-1">{{ page }}</a>
                </li>
                <!-- <li class="page-item" :class="{'disabled': !pages.has_next }">
                  <a class="page-link" href="#" aria-label="Next"
                    @click.prevent="paginationRenew(pages.current_page + 1)">
                    <span aria-hidden="true">&raquo;</span>
                    <span class="sr-only">Next</span>
                  </a>
                </li> -->
                </ul>
              </nav>
</template>

<script>
export default {
    props: ["page"],
        data() {
            return {
                newData:[],
                currentPage:0,
            };
        },
    computed:{
        //分頁篩選
        filterDatas(){
          const vm = this;
          let items=[];
          //先篩選
          if(vm.search !== '全部'){
            vm.currentPage=0;
            items = vm.products.filter((item,i)=>{
              return item.category==vm.search
            })
          }else{
            items = vm.products;
          }
          //後分頁
          const newData=[];
          items.forEach((item,i) =>{
             if( i % 9 ===0){
                newData.push([])
              }
              const page = parseInt(i/9);
               newData[page].push(item);
          })
          return newData;   
        },
      },
}
</script>
