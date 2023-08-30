<template >
  <div id="chart" class="chart">
    <apexchart @mouseMove="click" id="suka" ref="radar" type="area" height="350" :options="chartOptions" :series="series"></apexchart>
  </div>
</template>

<script>
export default {
    name: 'BarChart',
    props:{
      chartOptions:{type:Object},
      series:{type:Object},
    },
    data: function() {
      return {      
      }
    },
    methods:{
    },
    // watch:{
    //   chartOptions:{
    //     handler(newValue){
    //       this.$refs.radar.updateOptions({
    //           xaxis: {
    //           categories: newValue.xaxis.categories
    //           }
    //       });
    //       console.log('PFKEGF')
    //     },
    //     deep: true
    //   }
    // }  
}
</script>

<style scoped>
.chart{
width: 80%;

}
</style>