<template>
  <div class="historyChartsWrap">
      <!-- <button @click="getData"> Жми</button> -->
      <!-- <a v-for="item in queryResult" :key="item.content.timestamp">
          {{ item.content.outTemp }}||{{ new Date(item.content.timestamp) }} 
      </a> -->
      <BarChart :chartOptions="chartOptions" :series="series"></BarChart>
  </div>
</template>

<script>
  export default {
      data(){
          return {
              startTime: '',
              endTime: '',

              series: [{
          name: 'Улица',
          data: []
        }, {
          name: 'Дом',
          data: []
        }],
        chartOptions: {
          chart: {
            height: 350,
            type: 'area'
          },
          dataLabels: {
            enabled: false
          },
          stroke: {
            curve: 'smooth'
          },
          xaxis: {
            type: 'datetime',
            categories: [new Date().toISOString()],
            tickPlacement: 'on',
            labels: {
              datetimeUTC: false
            }
            
          },
          tooltip: {
            x: {
              format: 'dd.MM.yyyy HH:mm'
            },
          },
          noData: {
            text: 'Загрузка..',
          },
          // chart: {
          //   toolbar: {
          //     show: true,
          //     tools: {
          //       pan: true,    
          //     }
          //   }
          // }
        },
          }
          
      },
      props:{
          queryResult: {type: Object}
      },
      methods:{
          getData(){
            setTimeout(() => {
              let point =  new Date();
              this.startTime = point.setHours(point.getHours()-224);
              this.endTime = Date.now();
              try{
              this.$emit('onQuery',{startTime:this.startTime, endTime:this.endTime})
            } catch{
              this.getData()
            }
          }, 500)
          },

      },
      watch:{
          queryResult(newValue){
              // this.chartOptions.xaxis.categories = newValue.map((item) => new Date(item.content.timestamp).toISOString());
              this.chartOptions = { xaxis: {
                  categories: newValue.map((item) => new Date(item.content.timestamp).toISOString())
                  }}
              setTimeout(() => {
                this.series[0].data = newValue.map((item) => -(-item.content.outTemp));
                this.series[1].data = newValue.map((item) => -(-item.content.inTemp));
              },0)
          }
      },
      mounted(){
        this.getData()
      }
  }
     
</script>

<style scoped>
.historyChartsWrap{
  display: flex;
  align-items: center;
  /* justify-content: center; */
  flex-direction: column;
  height: 60%;
  color:#2f281f
}
.chartsMain{
  height: 100%;
  width: 100%;
  
}
</style>