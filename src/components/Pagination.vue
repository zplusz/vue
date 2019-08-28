<template>
  <nav aria-label="Page navigation example">
      <ul class="pagination justify-content-center">
        <li class="page-item" :class="{'disabled': !pages.has_pre }">
          <a class="page-link" href="#" aria-label="Previous"
            @click.prevent="paginationRenew(pages.current_page - 1)">
            <span aria-hidden="true">&laquo;</span>
            <span class="sr-only">Previous</span>
          </a>
        </li>
        <li class="page-item" v-for="page in pages.total_pages" :key="page"
          :class="{'active': pages.current_page === page}">
          <a class="page-link" href="#" @click.prevent="paginationRenew(page)">{{ page }}</a>
        </li>
        <li class="page-item" :class="{'disabled': !pages.has_next }">
          <a class="page-link" href="#" aria-label="Next"
            @click.prevent="paginationRenew(pages.current_page + 1)">
            <span aria-hidden="true">&raquo;</span>
            <span class="sr-only">Next</span>
          </a>
        </li>
      </ul>
    </nav>
</template>

<script>
export default {
    props: ["pages"],
        data() {
            return {
                page: 1
            };
        },
    methods: {
        paginationRenew(page) {
            const vm = this;
            vm.page = page;
            this.$emit("emitPages", Number(vm.page));
            // console.log(vm.page);
        }
    }
}
</script>
