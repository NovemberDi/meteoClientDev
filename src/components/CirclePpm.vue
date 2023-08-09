<template>
    <svg :class="{nightSvg:nightMode}" class="circleSvg">
        <circle :class="{current: ppmState.green}"  :cx="circleSize.cxy" :cy=circleSize.cxy :r=circleSize.r transform='rotate(112)' stroke='#7dff63' ></circle>
        <circle :class="{current: ppmState.yellow}" :cx="circleSize.cxy" :cy=circleSize.cxy :r=circleSize.r transform='rotate(194)' stroke='#fffc63' ></circle>
        <circle :class="{current: ppmState.orange}" :cx="circleSize.cxy" :cy=circleSize.cxy :r=circleSize.r transform='rotate(276)' stroke='#f74c23' ></circle>
        <circle :class="{current: ppmState.red}" :cx="circleSize.cxy" :cy=circleSize.cxy :r=circleSize.r transform='rotate(-2)' stroke='#f70000' ></circle>
    </svg> 
</template>

<script>
    export default {
        name:'CirclePpm',
        props:{
            ppmState:{type: Object},
            circleSize:{type: Object},
            nightMode: {type: Boolean}
        },
        methods:{
          setCircleSize(){
              // console.log('res');
              let width = document.documentElement.clientWidth;
              let height = document.documentElement.clientHeight;
              if (width>450 && width<=900 && height > 800) {this.circleSize.cxy = 180; this.circleSize.r = 160}
                else {
                  this.circleSize.cxy = 125; this.circleSize.r = 100
                }
            },
        },
        mounted(){
          this.setCircleSize();
          window.addEventListener('resize', this.setCircleSize) 
        }
    }
</script>

<style scoped>
.nightSvg{
  filter: sepia(30%);
  opacity: 0.5;
}
.circleSvg {
  position: absolute;
  width: 250px;
  height: 250px;
  top: 0;
  left: 0;
  transition: 1s linear;
  /* transform: rotate(73deg); */

}

circle {
  opacity: 0.2;
  width: 100%;
  height: 100%;
  fill: none;
  stroke-width: 10;
  stroke-linecap: round;
  stroke-dasharray: 635;
  stroke-dashoffset:510;
  transform-origin: 50% 50%;
  /* stroke: #fffc63; */
  /* transform: rotate(108deg); */
  transition: 1s linear;
  
}
.current{
  opacity: 1;
  filter: drop-shadow(0 0 5px rgba(255, 255, 255, 0.584));
  stroke-width: 11;
}
@media screen and (max-width: 901px) and (min-height:  800px) and (min-width: 450px){
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
</style>