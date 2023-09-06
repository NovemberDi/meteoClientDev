<template>
   <div class="historyChartsWrap" onselectstart="return false">
      <div class="topBar" >
        <div class="day intervalButton" :class="{current: selector.day}"   @click="setSelector('day')">Сутки</div>
        <div class="week intervalButton" :class="{current: selector.week}"  @click="setSelector('week')" >Неделя</div>
        <div class="month intervalButton" :class="{current: selector.month}"  @click="setSelector('month')" >Месяц</div>
        <div class="year intervalButton" :class="{current: selector.year}"  @click="setSelector('year')" >Год</div>        
      </div>
      
      <BarChart  :dataSet="dataSet" ></BarChart>
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
        dataSet: [],

      }      
      },
      props:{
          queryResult: {type: Object},
          wsAlive:  {type: Boolean},
      },
      methods:{
          getData(){
            if (this.wsAlive)
              {
              this.$emit('onQuery',{startTime:this.startTime, endTime:this.endTime})
            } else{
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
            this.startTime -= 24*3600*1000*this.rangeOfDays;
            this.endTime -= 24*3600*1000*this.rangeOfDays;
            this.getData();
          },
          moveRight(){
            this.startTime += 24*3600*1000*this.rangeOfDays;
            this.endTime += 24*3600*1000*this.rangeOfDays;
            this.getData();
          },
          makeDataSet(newValue){
            this.dataSet = { 
                series: [
                  {name:'Улица', data:[...newValue.map((item) => -(-item.content.outTemp))]},
                  {name:'Дом', data:[...newValue.map((item) => -(-item.content.inTemp))]}
                ],
                categories: newValue.map((item) => item.content.timestamp)
              }
          }
      },

      watch:{
        queryResult(newValue){
          setTimeout(() => {
            this.makeDataSet(newValue)
          },200)
        }
      },
      mounted(){
        this.setNewDate();
        this.getData();   
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