<template >
  <div class="texture"></div>
  <div class="filter" :class="{nightFilter:nightMode}"></div>
  <div class="nightFilter" :class="{nightFilterOn:nightMode}"></div>
  <div class="root" :class="{night:nightMode}" onselectstart="return false">
    <div class="offline" v-show="!isAliveSensor">сенсор недоступен</div>
   
     <router-view class="router"
        :time = "time"

        @onChangeMode="nightMode = !nightMode"
        :autoMode="autoMode"
        :nightMode="nightMode"
        :sensors="sensors"
        :circleSize="circleSize"

        :queryResult="queryResult"
        :wsAlive="wsAlive"
        @onQuery="getData"
        >
      </router-view>
      <div class="navPanel">
          <SettingButton 
              @click="settingView=!settingView"
              :nightMode="nightMode">
          </SettingButton>
          <HomeButton 
              :nightMode="nightMode"
              @click="$router.push('/')"
          ></HomeButton>
          <HistoryButton
              :nightMode="nightMode"
              @click="$router.push('/history')"
          ></HistoryButton>

      </div>
      <SettingModal  
              @click.self="settingView = false"
              :autoMode="autoMode"
              v-show="settingView"
              @switchAutoMode="autoMode = !autoMode"
              >
          </SettingModal>
  </div>  
</template>

<script>


  export default {

    data(){
      return {
        nightMode: false,
        autoMode: true,
        settingView: false,
        queryResult: [],
        timeOfSun:{
          dawn: 7,
          sunset: 21
        },
        sensors:{
          inTemp: null,
          inTempAHT: null,
          hum: null,
          outTemp: null,
          press: null,
          ppm: null,
          ppmState:{
            green: false,
            yellow: false,
            orange: false,
            red: false
            },  
        },
        
        isAliveSensor: false,

        ws: null,
        wsAlive: false,
        
        time:{
          blink:false,
          hour:'',
          min:'',
          day:'',
          date:'',
          month: '',
          year:'', 
      },
      circleSize:{
        cxy:125,
        r:100 
      }
      }
    },

    methods:{
          connect(){
          this.ws = new WebSocket('wss://peredaifile.ru:3031');
          this.ws.onopen = () => {this.wsAlive = true}
            this.ws.onmessage =  (event) => {
              let message = JSON.parse(event.data);
              // console.log("сообщение от сервера!");
                if (message.type == 'sensors') {

                  this. sensors.inTemp = -(-message.value.inTemp).toFixed(1);
                  this. sensors.outTemp = -(-message.value.outTemp).toFixed(1);
                  this. sensors.press =-(-message.value.press).toFixed();

                  this. sensors.inTempAHT = message.value.inTempAHT;
                  this. sensors.hum = -(-message.value.hum).toFixed();
                  this.sensors.ppm = -(-message.value.ppm).toFixed();

                  this.isAliveSensor = message.value.isAlive;

                  if (this.sensors.ppm<600) {for (let key in this.sensors.ppmState){this.sensors.ppmState[key] = false}; this.sensors.ppmState.green = true};
                  if (this.sensors.ppm>600 && this.sensors.ppm<1201) {for (let key in this.sensors.ppmState){this.sensors.ppmState[key] = false}; this.sensors.ppmState.yellow = true};
                  if (this.sensors.ppm>1200 && this.sensors.ppm<5001) {for (let key in this.sensors.ppmState){this.sensors.ppmState[key] = false}; this.sensors.ppmState.orange = true; }; 
                  if (this.sensors.ppm>5000) {for (let key in this.sensors.ppmState){this.sensors.ppmState[key] = false}; this.sensors.ppmState.red = true};
                };
                if (message.type == 'queryResult') {
                  this.queryResult = message.value
                }
              }
              this.ws.onerror =  (event) => {
                console.log('WSerror');
                // alert('Error WS')
               // this.reconnect();
              };
              this.ws.onclose =  (event) => {
                console.log('WSclose');
                this.reconnect();
              };
            },
            getData(event){
              this.ws.send(JSON.stringify({type:'getData', value:{startTime:event.startTime, endTime:event.endTime}}))
            },
            getTime(){
              let nowTime = new Date();
              let days = {
                0: 'ВС', 1: 'ПН', 2: 'ВТ', 3: 'СР', 4: 'ЧТ', 5: 'ПТ', 6: 'СБ',
              };
              let timer = ()=>{
                this.time.hour = nowTime.getHours();
                this.time.min = nowTime.getMinutes();
                this.time.hour/10<1?this.time.hour='0'+this.time.hour:this.time.hour;
                this.time.min/10<1?this.time.min='0'+this.time.min:this.time.min;
                this.time.blink = !this.time.blink;
                this.autoMode? this.autoModePlay(this.time.hour):'';
              };
              let dater = ()=>{
                this.time.date = nowTime.getDate();
                this.time.month = nowTime.getMonth()+1;
                this.time.year = nowTime.getFullYear();
                this.time.day = days[nowTime.getDay()];
                this.time.date/10<1?this.time.date='0'+this.time.date:this.time.date;
                this.time.month/10<1?this.time.month='0'+this.time.month:this.time.month;
                
              };
              timer();
              dater();
            setInterval(()=>{
              nowTime = new Date();
              timer();
              dater();
              },1000);
            
            },
            reconnect(){
              this.ws = null;
                try {
                  setTimeout(()=> this.connect(),10000);
                }
                catch {console.log('Не удачно!')}
                            
            },
            
            autoModePlay(hour){
              if (hour >= this.timeOfSun.dawn && hour <= this.timeOfSun.sunset) this.nightMode = false
              else this.nightMode = true;
            },

      },
    mounted(){
    this.getTime();
    this.connect();
    setInterval(() => {
      try{
        this.ws.send(JSON.stringify({type:'ping'}))
      } catch(err){
        console.log('WS is down: ', err)
      }
    }, 600000);

    }   
  }
  
</script>

<style>

#app{
  
  min-height: 100vh;
  /* height: 100vh; */
  margin: 0;
  padding: 0;
  font-family: 'jura', arial;
  position: relative;


/* голубой */
  /* background: conic-gradient(from 60deg at 40%  60%, transparent 0%, #63CFEF75 30%, #86D6EC40 100%) 50% 20%/120% 130%, linear-gradient(20deg, #8EACF5 0%, #67DDE6 30%, #2187CB 70%, #55EDDF 100%); */
/* темный */
  /* #3a3a3a  #292c31       #0c0c0c #472a23 #946a62*/
  /* background: conic-gradient(from 60deg at 40%  60%, transparent 0%, #24282975 30%, #7e7c7b40 100%) 50% 20%/120% 130%, linear-gradient(20deg, #110404 0%, #343431 30%, #626262 70%, #333333 100%); */
  background: conic-gradient(from 60deg at 50%  55%, transparent 0%, #29303275 30%, #7b7d7e40 100%) 50% 20%/120% 130%, linear-gradient(20deg, #040811 0%, #313334 30%, #626262 70%, #333333 100%);


  background-position: center;
  background-size:cover; 
}
</style>
<style scoped>
.router{
  position: relative;
  z-index: 100;
}
.texture {
  height:100%;
  width: 100%;
  position:absolute;
  z-index: 0;
/* клетка */
  background-image: -webkit-repeating-linear-gradient(315deg,  
  #232323, #232323 10%,  
  transparent 10%, transparent 50%
  ),
  -webkit-repeating-linear-gradient(225deg,  
  #232323, #232323 10%,  
  transparent 10%, transparent 50%
  );

  /* background-size: 25px 25px; */
  /* background-size: 35px 35px; */
  background-size: 45px 45px;
  opacity: 0.3;

}

.filter{
  
  backdrop-filter: blur(1px);
  /* background: radial-gradient(circle, rgba(20,38,39,0) 20%, rgba(5, 69, 97, 0.329) 150%); */
  /* background: radial-gradient(circle, rgba(20,38,39,0) 20%, rgba(5, 69, 97, 0.769) 150%); */

  /* background: radial-gradient(circle, rgba(20,38,39,0) 20%, rgba(5, 69, 97, 0.39) 70%); */
  background: radial-gradient(circle, rgba(20,38,39,0) 20%, rgba(0, 0, 0, 0.39) 70%); 
  background-color: #24242446;

  height: 100%;
  width: 100%;
  position:absolute;
  z-index: 0;
  
}
.nightFilter{
  background: radial-gradient(circle, rgb(13, 23, 23) 20%, rgb(0, 0, 0) 150%);

  /* background: radial-gradient(circle, rgb(9, 16, 16) 20%, rgb(0, 0, 0) 150%); */
  transition:  0.5s linear;
  height: 100%;
  width: 100%;
  position:absolute;
  z-index: 1;
  opacity: 0;



}
.nightFilterOn{
  opacity: 1;
}
.root{
  height: 100%;
  /* width: 100%; */
  /* color: #ffffff; */
  /* color: #ecf7ff; */
  color: #fffde0;

  z-index: 500;
  /* position: absolute;
  top:0;
  left: 0; */
  transition: color 1s linear;


}
.night{
  color: #c6763d;
}
.offline{
  position: absolute;
  top: 0;
  margin: 0;
  height: 12px;
  background-color: #9b0000a0;
  width: 100%;
  text-align: center;
  padding: auto;
  font-weight: 700;
  font-size: 12px;
  line-height: 8px;
}
.navPanel{
  /* display: none; */
  position: absolute;
  width: 100%;
  bottom: 0;
  left: 0;
  z-index: 1000;
}
</style>
