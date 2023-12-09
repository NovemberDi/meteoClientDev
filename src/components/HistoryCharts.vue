<template>
   <div class="historyChartsWrap" onselectstart="return false">
      <div class="topBar" >
        <div class="day intervalButton" :class="{current: selector.day}"   @click="setSelector('day')">Сутки</div>
        <div class="week intervalButton" :class="{current: selector.week}"  @click="setSelector('week')" >Неделя</div>
        <div class="month intervalButton" :class="{current: selector.month}"  @click="setSelector('month')" >Месяц</div>
        <div class="year intervalButton" :class="{current: selector.year}"  @click="setSelector('year')" >Год</div>        
      </div>
      <div class="bottomBar">
        <LeftButton @click="moveLeft"></LeftButton>
        <div class="inputWrap" :class="{wrongInput:wrongInput}">
          <input class="input" :class="{currentInput: selector.interval}" type="date" v-model="startInput" @input="updateStart" @click="setSelector('interval')">
        </div>
        <div class="inputWrap" :class="{wrongInput:wrongInput}">
          <input class="input" :class="{currentInput: selector.interval}" type="date" v-model="endInput" @input="updateEnd" @click="setSelector('interval')">
        </div>
        <RightButton @click="moveRight" ></RightButton>
      </div>
      
      <BarChart  :dataSet="dataSet.temp" :class="{loading: loadingData}" > </BarChart>
      <SecondChart :dataSet="dataSet.press" :class="{loading: loadingData}"></SecondChart>
      <ThirdChart :dataSet="dataSet.hum" :class="{loading: loadingData}"> </ThirdChart>
      <my-preloader class="preload" v-if="loadingData"></my-preloader>

  </div>
</template>


<script>
  export default {
    data() {
        return {
          loadingData: false,
          wrongInput: false,
            selector: {
                day: true,
                week: false,
                month: false,
                year: false,
                interval: false,
            },
            startInput: '',
            endInput: '',
            startTime: '',
            endTime: '',
            rangeOfDays: 1,
            dataSet: {
                temp: {},
                press: {},
                humPpm: {}
            },
        };
    },
    props: {
        queryResult: { type: Object },
        wsAlive: { type: Boolean },
    },
    methods: {
        updateStart(event) {
          let time = Date.parse(event.target.value)+24*3600*1000;
            if (this.checkWrong(time,  this.endTime)) return
            this.startTime = Date.parse(event.target.value);
            this.getData();
        },
        updateEnd(event) {
          let time = Date.parse(event.target.value)+24*3600*1000;
            if (this.checkWrong(this.startTime, time)) return
            this.endTime = time;
            this.getData();
        },
        getData() {
          this.loadingData = true;
            if (this.wsAlive) {
                this.$emit('onQuery', { startTime: this.startTime, endTime: this.endTime });
            }
            else {
                setTimeout(() => {
                    this.getData();
                }, 100);
            }
        },
        setSelector(val) {
            for (let key in this.selector) {
                this.selector[key] = false;
            }
            ;
            this.selector[val] = true;
            if (!this.selector.interval) {
                this.setNewDate();
                this.getData();
            }
        },
        setNewDate() {
            if (this.selector.day)
                this.rangeOfDays = 1;
            if (this.selector.week)
                this.rangeOfDays = 7;
            if (this.selector.month)
                this.rangeOfDays = 31;
            if (this.selector.year)
                this.rangeOfDays = 366;
            this.startTime = new Date().setHours(new Date().getHours() - 24 * this.rangeOfDays);
            this.endTime = Date.now();
            // this.startInput = new Date(this.startTime).toISOString().slice(0, 10);
            // this.endInput = new Date(this.endTime).toISOString().slice(0, 10);
        },
        moveLeft() {
            this.startTime -= 24 * 3600 * 1000 * this.rangeOfDays;
            this.endTime -= 24 * 3600 * 1000 * this.rangeOfDays;
            this.getData();
        },
        moveRight() {
            this.startTime += 24 * 3600 * 1000 * this.rangeOfDays;
            this.endTime += 24 * 3600 * 1000 * this.rangeOfDays;
            this.getData();
        },
        makeDataSet(newValue) {
            if (newValue.length > 0) {
                let temp = newValue.filter((item, index, arr) => {
                    if (this.selector.day)
                        return true;
                    if (index == 0 || index == arr.length - 1)
                        return true; //включаем первый элемент всегда
                    if ((item.content.outTemp > arr[index - 1].content.outTemp && item.content.outTemp > arr[index + 1].content.outTemp)
                        ||
                            (item.content.outTemp < arr[index - 1].content.outTemp && item.content.outTemp < arr[index + 1].content.outTemp))
                        return true;
                });
                let splitter = 1;
                if (this.selector.day)
                    splitter = 4;
                if (this.selector.week)
                    splitter = 20;
                if (this.selector.month)
                    splitter = 50;
                if (this.selector.year)
                    splitter = 70;
                if (this.selector.interval)
                    splitter = (-(-((new Date(this.endTime) - new Date(this.startTime)) / (24 * 3600 * 1000)).toFixed()) + 1) * 2;
                // console.log(splitter)
                let press = newValue.filter((item, index, arr) => { if ((index + 1) % splitter == 0)
                    return true; });
                let extremum = temp.reduce(function (accumulator, item, index, array) {
                    if (index == 0)
                        return {
                            max: -(-item.content.outTemp),
                            min: -(-item.content.outTemp),
                            categories: [item.content.timestamp, item.content.timestamp]
                        };
                    let max = accumulator.max;
                    let min = accumulator.min;
                    let categories = accumulator.categories;
                    if (-(-item.content.outTemp) > accumulator.max) {
                        max = -(-item.content.outTemp);
                        categories[0] = item.content.timestamp;
                    }
                    ;
                    if (-(-item.content.outTemp) < accumulator.min) {
                        min = -(-item.content.outTemp);
                        categories[1] = item.content.timestamp;
                    }
                    ;
                    return {
                        max: max,
                        min: min,
                        categories: categories
                    };
                }, {});
                this.dataSet.temp = {
                    series: [
                        { name: 'Дом', data: [...temp.map((item) => [item.content.timestamp, -(-item.content.inTemp)])] },
                        { name: 'Улица', data: [...temp.map((item) => [item.content.timestamp, -(-item.content.outTemp)])] },
                        { name: 'min', data: [[extremum.categories[1], extremum.min]] },
                        { name: 'max', data: [[extremum.categories[0], extremum.max]] },
                    ],
                    categories: temp.map((item) => item.content.timestamp)
                };
                this.dataSet.press = {
                    series: [{ name: 'Дом', data: [...press.map((item) => -(-item.content.press))] }],
                    categories: press.map((item) => item.content.timestamp)
                };
                this.dataSet.hum = {
                    series: [
                        // {name:'Дом', data:[...temp.map((item) => [item.content.timestamp,-(-item.content.inTemp)])]}
                        { name: 'Влажность', data: [...press.map((item) => [item.content.timestamp, -(-item.content.hum)])] },
                        { name: 'CO₂', data: [...press.map((item) => [item.content.timestamp, -(-item.content.ppm)])] }
                    ],
                    // series: [{name:'CO₂', data:[...press.map((item) => [item.content.timestamp,-(-item.content.ppm)])]}],
                    // categories: press.map((item) => item.content.timestamp)
                };
                this.loadingData = false;
            }
        },
        checkWrong(start, end){          
            if (start<=end) return
            document.getElementsByClassName('bottomBar')[0].focus();
            this.wrongInput = true;
              setTimeout(() => {
                this.wrongInput = false;
              }, 1500);
             return true;
          },
    },
    watch: {
        queryResult(newValue) {
            setTimeout(() => {
                this.makeDataSet(newValue);
            }, 200);
            
        },
        startTime(newValue) {
            this.startInput = new Date(newValue).toISOString().slice(0, 10);
        },
        endTime(newValue) {
            this.endInput = new Date(newValue).toISOString().slice(0, 10);
        }
    },
    mounted() {
        this.setNewDate();
        this.getData();
    },
    
}
     
</script>

<style scoped>
.loading{
  opacity: 0.4;
}
.preload{
  position: absolute;
  top: 50%;
  left: 50%;
}
.wrongInput::after{
  background: rgb(188, 78, 78);
 border-radius: 20px;
  z-index:1;
}
.topBar{
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 12px;
}
.bottomBar{
  height: 40px;
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
.input{
background:none;
color: #fffde0;
border: none;
margin: 5px;
opacity: 0.4;
width: fit-content;
z-index: 10;
position: relative;

}
.inputWrap{
padding-right: 10px;
height: 24px;
z-index: 0;
position: relative;
display: flex;
align-items: center;
}
.input:hover{
  opacity: 0.8;
}
.currentInput{
  opacity: 1;
}
.inputWrap::after{
  content: "";
  position: absolute;
  bottom: 0px;
  left: 0px;
  height: 100%;
  width: 100%;
  transform: skewX(-30deg);
  box-shadow: 7px 7px 5px 1px #11111186;
  z-index: 0;
}
.input::-webkit-calendar-picker-indicator { 
  -webkit-filter: invert(80%);
  filter: invert(80%) sepia(100%);

    width: 20px;
    height: 20px;
}
.historyChartsWrap{
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 80%;
  min-height: 100%;
  margin-left: auto;
  margin-right: auto;
  color: #fffde0;
  -webkit-tap-highlight-color: transparent;
  padding: 20px 0 100px 0;
}
</style>