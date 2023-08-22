<template>
    <div class="historyBtnWrap">
        <svg class="historyBtn" :class="{nightBtn:nightMode, dayBtn:!nightMode}" viewBox="0 0 16 16">
    <path  d="M14 .978H4.062l-2.03 2.006h-.006v12h10v-12H3.002l1.06-1h8.954v11.928l.984-1V.978z" ></path>
</svg>
    </div>
</template>

<script>
    export default {
        name:'HistoryButton',
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
  fill: rgba(255, 242, 188, 0.321);
  filter: drop-shadow(0px 5px 5px rgb(34, 32, 43));
}
.historyBtnWrap{
position: absolute;
height: 70px;
width: 70px;
bottom: 0;
right: 0;
/* transform: translate(-50%,0); */
display: flex;
justify-content: center;
align-items: center;

}
.historyBtn{
  height: 45x;
  width: 45px;
  transition: 50ms linear;
  z-index: 99;
}
.historyBtn:active{
  height: 50px;
  width: 50px;
  transform: rotate(-20deg);
}
</style>