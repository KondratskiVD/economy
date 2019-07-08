<template>
  <div>
    <div class="page-title">
      <h3>Категории</h3>
    </div>
    <section>
      <Loader v-if="loading"></Loader>
      <div class="row" v-else>
        <category-create @created="addNewCategory"></category-create>
        <category-edit :categories="categories"
          @updated="updateCategories"
          :key="categories.length + updateCount"
          v-if="categories.length"
        ></category-edit>
        <p v-else class="center">Категорий нет</p>
      </div>
    </section>
  </div>

</template>
<script>
  import CategoryCreate from '@/components/CategoryCreate'
  import CategoryEdit from '@/components/CategoryEdit'
  export default {
    name: 'categories',
    data: ()=>({
      categories:[],
      loading: true,
      updateCount: 0
    }),
    components:{
      CategoryCreate, CategoryEdit
    },
    async mounted(){
      this.categories = await this.$store.dispatch('fetchCategories')
      this.loading = false
    },
    methods: {
      addNewCategory(category){
        this.categories.push(category)
      },
      updateCategories(category){
        const idx = this.categories.findIndex(c=>c.id ===category.id)
        this.categories[idx].title = category.title
        this.categories[idx].limit = category.limit
        this.updateCount++
      }
    }
  }
</script>