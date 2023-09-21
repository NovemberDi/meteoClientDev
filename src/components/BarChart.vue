<template >
  <div id="chart" class="chart">
    <apexchart   type="area" height="250px" :options="chartOptions" :series="series"></apexchart>
  </div>
</template>

<script>
export default {
    name: 'BarChart',
    props:{
      dataSet:{type:Object},
    },
    data() {
      return { 
            series: [{
              name: 'Улица',
              data: []
            }, {
              name: 'Дом',
              data: []
            }],
            chartOptions: {
              chart: {
                type: 'area'
              },
              dataLabels: {
                enabled: true,
                enabledOnSeries: [0],
                // formatter: function (val) {
                // if (val > 0) return  val.toFixed()+'°C';
                // if (val == Math.max( ...data.series[0].data)) return  val.toFixed()+'°C';
                
              // },
              },
              colors:['#008110', '#F1c063'],
              stroke: {
                curve: 'smooth'
              },
              legend: {
                labels: {
                    // colors: '#fffde0',
                    useSeriesColors: true
                },
              },
              yaxis:{
                
                labels: {

                  formatter: (value) => { return  value?value.toFixed(1):value},

                  style: {
                      colors: '#fffde0',
                  },
                },
              },
              xaxis: {
                type: 'datetime',
                categories: [new Date().toISOString()], // или просто Date.now() :)
                // tickPlacement: 'on',
                labels: {
                  datetimeUTC: false, // системный часовой пояс
                  style: {
                      colors: '#fffde0',
                  },
                  
                },
              
                
              },
              tooltip: {
                x: {
                  format: 'dd.MM.yyyy HH:mm'
                }
              },
              noData: {
                text: 'Нет данных',
              },
              chart: {
                toolbar: {
                  show: true,
                  tools: {
                    zoomin: false, 
                    zoomout: false,    
                  }
                },
                animations: {
                  enabled: false,
                  easing: 'easeinout',
                  speed: 800,
                  animateGradually: {
                      enabled: false,
                      delay: 150
                  },
                  dynamicAnimation: {
                      enabled: true,
                      speed: 350
                  }
                },
                locales: [{
                  "name": "ru",
                  "options": {
                    "months": ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"],
                    "shortMonths": ["Янв", "Фев", "Мар", "Апр", "Май", "Июн", "Июл", "Авг", "Сен", "Окт", "Ноя", "Дек"],
                    "days": ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                    "shortDays": ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
                  }
                }],
                defaultLocale: "ru"
              }
            },
               
      }
    },
    methods:{
    },
    watch:{
          dataSet(newValue){   
              this.chartOptions = { xaxis: { categories: newValue.categories}};
              this.series = newValue.series;
              this.chartOptions.dataLabels =  {
              formatter: function (val) {
                if (val == Math.max( ...newValue.series[0].data)) { return  val.toFixed()+'°C'};
                if (val.toFixed() == Math.min( ...newValue.series[0].data).toFixed()) return  val.toFixed()+'°C';
              }
          }
        }
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
width: 100%;
color: #333333;
}
</style>