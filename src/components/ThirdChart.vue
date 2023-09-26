<template >
  <div  class="chart">
    <apexchart  type="line"  height="150px" :options="chartOptions" :series="series"></apexchart>
  </div>
</template>

<script>
export default {
    name: 'ThirdChart',
    props:{
      dataSet:{type:Object},
    },
    data() {
      return { 
        yaxis:
              [{
              // title: {
              //   text: 'мм.рт.ст',
              //   margin: 0,  
              //   floating: true,
              //   style: {
              //     fontSize:  '12px',
              //     fontFamily:  'Jura',
              //     color:  '#4eabda'
              //   }, 
              // },
              labels: { 
                  formatter: (value) => { return  value?value.toFixed(0):value},
                  style: {
                      colors: '#fffde0',
                  },
                },
            
            }, {
              opposite: true,
              logarithmic: false,
              logBase: 10,
              tickAmount: 4,
              floating: true,
              // title: {
              //   text: 'ppm',
              //   style: {
              //     fontSize:  '12px',
              //     fontFamily:  'Jura',
              //     color:  '#405505'
              //   },
              // },
               labels: { 
                  formatter: (value) => { return  value?value.toFixed(0):value},
                  style: {
                      colors: '#fffde0',
                      
                  },
                },

            }],
            series: [{
              name: 'Влажность',
              data: [],
              type: 'column',
            },
            {
              name: 'CO₂',
              data: [],
              type: 'line',
            },],
            chartOptions: {
              chart: {
                type: 'line'
              },

              title: {
                text: 'Влажность и CO₂',
                align: 'left',
                margin: 10,
                offsetX: 40,
                offsetY: 5,
                floating: true,
                style: {
                  fontSize:  '14px',
                  fontWeight:  'bold',
                  fontFamily:  'Jura',
                  color:  '#fffde0'
                },
            },
              // plotOptions: {
              // bar: {
              //   borderRadius: 4,
              //   dataLabels: {
              //     position: 'center', // top, center, bottom
              //   }}},
              
              dataLabels: {
              enabled: true,
              enabledOnSeries: [1],
              formatter: function (val) {
                return   val.toFixed();
              },
            },
              // colors:['#405505'], // болотный
              colors:['#4eabda','#40af05'],
              stroke: {
                curve: 'smooth'
              },
              legend: {
                labels: {
                    // colors: '#fffde0',
                    useSeriesColors: true
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
                text: 'Нет данных..',
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
            this.yaxis[1].min = function(){ return Math.min(...newValue.series[1].data.map(item => item[1]))}; 
            this.chartOptions = {yaxis:this.yaxis};
            this.series = newValue.series;

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
color: #4eabda;
}
</style>