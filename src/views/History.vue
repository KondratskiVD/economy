<template>
  <div>
    <div class="page-title">
      <h3>История записей</h3>
    </div>

    <div class="history-chart">
      <canvas ref="canvas"></canvas>
    </div>
    <Loader v-if="loading"></Loader>
    <p class="center" v-else-if="!records.length">Записей нет</p>
    <section v-else>
      <HistoryTable :records="records"></HistoryTable>
    </section>
  </div>
</template>
<script>
  import HistoryTable from '@/components/HistoryTable'
  import { Pie } from 'vue-chartjs'
  export default {
    name: 'history',
    data: ()=>({
      loading: true,
      records: [],
      categories: [],
      bill: 2000
    }),
    extends: Pie,
    async mounted(){
      const records = await this.$store.dispatch('fetchRecords')
      this.categories = await this.$store.dispatch('fetchCategories')
      this.records = records.map(record => {
        return{
          ...record,
          categoryName: this.categories.find( c => c.id === record.categoryId).title,
          typeClass: record.type === 'income' ? 'green' : 'red',
          typeText: record.type === 'income' ? 'Доход' : 'Расход'
        }
      })
      this.setUp(this.categories)
      this.loading = false
    },
    methods: {
      setUp(categories){
        console.log(categories)
        this.renderChart({
          labels: categories.map(c => c.title),
          datasets: [{
            label: 'Расходы по категориям',
            data: categories.map(c => {
              return this.records.reduce((total, r)=> {
                if(r.categoryId ===c.id && r.type === 'outcome'){
                  total += +r.amount
                }
                return total
              },0)
            }),
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
          }]
        })
      }
    },
    components: {
      HistoryTable
    },
  }
</script>