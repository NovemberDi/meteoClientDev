<template>
   <div class="historyChartsWrap" onselectstart="return false">
      <div class="topBar" >
        <div class="day intervalButton" :class="{current: selector.day}"   @click="setSelector('day')">Сутки</div>
        <div class="week intervalButton" :class="{current: selector.week}"  @click="setSelector('week')" >Неделя</div>
        <div class="month intervalButton" :class="{current: selector.month}"  @click="setSelector('month')" >Месяц</div>
        <div class="year intervalButton" :class="{current: selector.year}"  @click="setSelector('year')" >Год</div>        
      </div>
      
      <BarChart :chartOptions="chartOptions" :series="series"></BarChart>
      <div class="bottomBar">
        <LeftButton @click="moveLeft"></LeftButton>
        <RightButton @click="moveRight" ></RightButton>
      </div>
  </div>
</template>


<script>
  export default {
    data(){
      return {
        selector:{
             day: true,
             week: false,
             month: false,
             year: false
        },
        startTime:  '',
        endTime: '',
        rangeOfDays: 1,

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
          // colors:['#F95936', '#F1c063'],
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
            text: 'Загрузка..',
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
              enabled: true,
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
      props:{
          queryResult: {type: Object}
      },
      methods:{
          getData(){

              try{
              this.$emit('onQuery',{startTime:this.startTime, endTime:this.endTime})
            } catch{
              setTimeout(()=>{
                this.getData()
              },100)
            }

          },
          setSelector(val){
            for (let key in this.selector) {
              this.selector[key] = false;
            };
            this.selector[val] = true;
            this.setNewDate();
            this.getData()

          },
          setNewDate(){
            if (this.selector.day) this.rangeOfDays = 1;
            if (this.selector.week) this.rangeOfDays = 7;
            if (this.selector.month) this.rangeOfDays = 31;
            if (this.selector.year) this.rangeOfDays = 366;
            this.startTime =  new Date().setHours(new Date().getHours()-24*this.rangeOfDays);
            this.endTime = Date.now();
          },
          moveLeft(){
            // this.startTime = new Date(this.startTime).setHours(new Date(this.startTime).getHours()-24*this.rangeOfDays);
            // this.endTime = new Date(this.endTime).setHours(new Date(this.endTime).getHours()-24*this.rangeOfDays);
            this.startTime -= 24*3600*1000*this.rangeOfDays;
            this.endTime -= 24*3600*1000*this.rangeOfDays;
            this.getData();
          },
          moveRight(){
            this.startTime += 24*3600*1000*this.rangeOfDays;
            this.endTime += 24*3600*1000*this.rangeOfDays;
            this.getData();
          }
      },

      watch:{
          queryResult(newValue){
              // this.chartOptions.xaxis.categories = newValue.map((item) => new Date(item.content.timestamp).toISOString());
              this.chartOptions = { xaxis: {
                  // categories: newValue.map((item) => new Date(item.content.timestamp).toISOString())
                  categories: newValue.map((item) => item.content.timestamp)

                  }}
              setTimeout(() => {
                this.series[0].data = newValue.map((item) => -(-item.content.outTemp));
                this.series[1].data = newValue.map((item) => -(-item.content.inTemp));
              },100)
          }
      },
      mounted(){
        this.setNewDate(),
        setTimeout(()=>{
          this.getData()
        },100)
        
      }
  }
     
</script>

<style scoped>
.topBar{
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 12px;
}
.bottomBar{
  height: 50px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* border: #fffde0 1px solid ; */
}
.intervalButton{
  width: 25%;
  height: 25px;
  font-size: 18px;
  cursor: pointer;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  /* transition: 0.1s ease; */
  opacity: 0.4;
}
.intervalButton:hover{
  opacity: 0.8;
}
.current{
  opacity: 1;
  font-size: 20px;
  font-weight: 600;
  /* height: 28px; */
}
.intervalButton::after{
  content: "";
  position: absolute;
  display: block;
  bottom: -5px;
  left: 0;
  transform: translate(-50%, 0);
  height: 100%;
  width: 100%;
  /* border-bottom: #fffde0 solid 2px;
  border-right: #fffde0 solid 2px; */
  transform: skewX(-30deg);
  box-shadow: 7px 7px 5px 1px #11111186;
  

  /* border-radius: 50%; */
  
  
}
.historyChartsWrap{
  display: flex;
  align-items: center;
  /* justify-content: center; */
  flex-direction: column;
  width: 80%;
  height: 60%;
  margin-top: 20px;
  margin-left: auto;
  margin-right: auto;
  color: #fffde0;
  -webkit-tap-highlight-color: transparent;
}
</style>