<template>
<div class="header" @click="toFull" onselectstart="return false">
      <div class="date">
        {{ time.date }}.{{ time.month }}.{{ time.year }}
        {{time.day }}
      </div>
      <div class="clock"><div>{{time.hour}}</div>
      <div class="blink"> 
            <div  v-show="time.blink">:</div>
      </div>
       <div>{{time.min}}</div>
      </div>
    </div>
</template>

<script>
    export default {
        name: 'MainClock',
        props: {
        time: {type: Object},
        },
        methods:{
        async toFull(){
            try {
              let screenLock = await navigator.wakeLock.request('screen')}
            catch(err) {
                console.log(err);
                alert('Удержание экрана недоступно!') } 
              document.documentElement.webkitRequestFullscreen();
            },
        }    
    }
    

</script>

<style scoped>
.header{
  display: flex;
  height: 200px;
  justify-content:space-between;
  flex-direction: column;
  align-items: center;
  /* color: rgb(70, 66, 55); */
  /* background: rgba(44, 43, 40, 0.551); */
  padding-bottom: 12px;
}
.date{
  font-size: 22px;
  font-weight: 700;
  margin-top: 8px;
}
.clock{
line-height: 60px;  
font-size: 165px;
font-weight: 500;

line-height: 160px;

display: flex;
justify-content: flex-end;
align-items: center;
padding: 0;
margin: 5px;

}
.blink{
min-width: 35px;
width: 15px;
text-align:end
}

@media screen and (max-width: 450px){
  .clock{
    font-size: 143px;
  }
}
@media only screen and (max-height: 650px) {
  .clock{
    font-size: 100px;
    line-height: 50px;
  }
  .header{
  height: 120px;
  }
}
</style>