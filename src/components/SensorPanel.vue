<template>
      <div class="panel" >
      <div class="sensor inTemp">
        <div class="value">
        Дом <br><p class="textData"> {{ sensors.inTemp }} </p> °C
          
        </div>
        <div class="icon">

        </div>
      </div>
      <div class="sensor outTemp">
        <div class="value">
        Улица <br> <p class="textData">{{  sensors.outTemp }} </p> °C
        </div>
        <div class="icon"></div>
      </div>
      <div class="sensor hum">
        <div class="value">
        Влажность  <br> <p class="textData">{{  sensors.hum }} </p> %
        </div>
        <div class="icon">

        </div>
      </div>
      <div class="sensor ppm">
        
            <CirclePpm 
            :ppmState="sensors.ppmState"
            :circleSize="circleSize"
            :nightMode="nightMode"
            ></CirclePpm>
            
        
        <div class="value__ppm ">
          CO₂ <br> <p class="textData__ppm">{{  sensors.ppm }}  </p> <br> ppm
        </div>
        <div class="icon">

        </div>
      </div>
      <div class="sensor press">
        <div class="value">
        Давление <br> <p class="textData">{{  sensors.press }} </p> мм
        </div>
        <div class="icon"></div>
      </div>
    </div>
</template>

<script>
    export default {
        name: 'SensorPanel',
        props:{
            nightMode:{type: Boolean},
            sensors: {type: Object},
            circleSize: {type: Object},
        }
    }
</script>

<style scoped>
.panel{
  height: 60%;
  display: grid;
  grid-template: 1fr 1fr 1fr / 1fr 1fr ; 
}
.sensor{
 display: flex;
  justify-content: center;
  align-items: center;

  font-size: 30px;
  text-align: center;
  height: 100%;
  width: 100%;
  line-height: 44px;
  cursor: default;

  margin: auto;
}
.textData{
margin: 0;
padding: 0;
font-size: 54px;
display: inline;
}
.inTemp{
  grid-area: 1 / 1 / 1 / 1;
}
.outTemp{
  grid-area: 1 / 2 / 1 / 2;
}
.press{
  grid-area: 3 / 2 / 3 / 2;
}
.hum{
  grid-area: 3 / 1 / 3 / 1;
}
.ppm{
  grid-area: 2 / 1 / 2 / 3;
  position: relative;
  height: 250px;
  width: 250px; 
}
.value{
  /* display: flex; */
}
.value__ppm{
  padding-top: 25px;
  font-size: 24px;
  line-height: 12px;
}
.textData__ppm{
  font-size: 64px;
  line-height: 14px;
}
.icon{
  display: none;
}

@media screen and (max-width: 901px) and (min-height:  800px) and (min-width: 450px){
  

  .panel{
    height: 75%;
  }
  .textData__ppm{
  font-size: 104px;
  line-height: 14px;
  }
  .textData{
    font-size: 82px;
    line-height: 74px;
  }
  .value{
    font-size: 34px;
    line-height: 40px;
  }
  .value__ppm{
    font-size: 38px;
    line-height: 22px;
  }
  .ppm{
  height: 360px;
  width: 360px; 
}
.circleSvg {
  width: 360px;
  height: 360px;
}
circle {
  stroke-width: 15;

  stroke-dasharray: 850;
  stroke-dashoffset:650;
}
.current{
  filter: drop-shadow(0 0 5px rgba(255, 255, 255, 0.584));
  stroke-width: 16;
}


}
@media screen and (max-width: 450px){

}
@media only screen and (max-height: 650px) {
  .textData__ppm{
  font-size: 50px;
  line-height: 34px;
  }
  .textData{
    font-size: 40px;
    line-height: 20px;
  }
  .value{
    font-size: 18px;
    line-height: 40px;
  }
}
</style>