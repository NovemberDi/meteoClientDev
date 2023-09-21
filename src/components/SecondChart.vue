<template >
  <div  class="chart">
    <apexchart  type='area'  height="150px" :options="chartOptions" :series="series"></apexchart>
  </div>
</template>

<script>
export default {
    name: 'SecondChart',
    props:{
      dataSet:{type:Object},
    },
    data() {
      return { 
            series: [{
              name: 'Улица',
              data: []
            },],
            chartOptions: {
              chart: {
                type: 'area'
              },
              dataLabels: {
              enabled: true,
              formatter: function (val) {
                return   val.toFixed()+' мм';
              },
              // offsetY: 10,
              // style: {
              //   fontSize: '12px',
              //   colors: ["#fffde0"]
              // }
            },
              // colors:['#F20063'],
              colors:['#ED3B83'],
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
                  
                  formatter: (value) => { return  value?value.toFixed(0):value},

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
            this.chartOptions = { xaxis: { categories: newValue.categories}};
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
}
</style>