<template>
    <div class="homeBtnWrap">
        <svg class="homeBtn" :class="{nightBtn:nightMode, dayBtn:!nightMode}" viewBox="0 0 17 17">
    <path   d="M7.98 1.984l7 6h-2.003v6H9.96V10.97H5.997v3.016H2.982v-6H.979l7-6z"></path>
</svg>
    </div>
</template>

<script>
    export default {
        name:'HomeButton',
        props:{
            nightMode:{type: Boolean},
        }

    }
</script>

<style scoped>
.nightBtn{
  fill: rgba(33, 52, 41, 0.696);
}
.dayBtn{
  fill: rgba(132, 129, 121, 0.321);
  filter: drop-shadow(0px 5px 5px rgb(34, 32, 43));
}
.homeBtnWrap{
position: absolute;
height: 70px;
width: 70px;
bottom: 0;
left: 50%;
transform: translate(-50%,0);
display: flex;
justify-content: center;
align-items: center;

}
.homeBtn{
  height: 55x;
  width: 55px;
  transition: 50ms linear;
  z-index: 99;
}
.homeBtn:active{
  height: 65x;
  width: 65px;
  /* transform: rotate(30deg); */
}
</style>