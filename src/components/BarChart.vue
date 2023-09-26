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
            series: [
                {
                name: 'Улица',
                data: [],
              }, {
                name: 'Дом',
                data: [],
              },
            ],
            chartOptions: {
              chart: {
                type: 'area'
              },
            title: {
                text: 'Температура',
                align: 'left',
                margin: 10,
                offsetX: 50,
                offsetY: 5,
                floating: true,
                style: {
                  fontSize:  '14px',
                  fontWeight:  'bold',
                  fontFamily:  'Jura',
                  color:  '#fffde0'
                },
            },
              dataLabels: {
                enabled: true,
                enabledOnSeries: [2,3],
                formatter: function (val) {
                return  val.toFixed(1)+' °C';
                
              },
              },
              colors:['#F1c063', '#008110', '#2e80c7', '#c75e2e'],
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
              // this.chartOptions = { xaxis: { categories: newValue.categories}};
              this.series = newValue.series;
          //     this.chartOptions.dataLabels =  {
          //     formatter: function (val) {
          //       if (val == Math.max( ...newValue.series[0].data)) { return  val.toFixed(1)+'°C'};
          //       if (val == Math.min( ...newValue.series[0].data)) return  val.toFixed(1)+'°C';
          //     }
          // }
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
color: #2e80c7;
}
</style>