<template>
    <div class="setting">
      <div class="settingBlock" >
        <h1>Настройки</h1>
        <div class="settingContent">
          <div class="settingItem">
            <h3>Режим день/ночь</h3>
            <div>
              ручной 
              <div class="switchBtn " :class="{switchOn:autoMode}" @click="switchAutoMode" ></div>
               авто
            </div>
          </div>
          
        </div>
      </div>
    </div>
</template>

<script>
    export default {
        name:'SettingModal',
        props:{
            autoMode: {type: Boolean}
        },
        methods:{
            switchAutoMode(){
                this.$emit('switchAutoMode'); 
            }
        }
    }
</script>

<style scoped>
.setting{
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  /* background: #1e110765; */
  background: #e2b08929;
  backdrop-filter: blur(3px);
}
.settingBlock{
  height: 50%;
  width: 60%;
  max-width: 500px;
  max-height: 400px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  background: #f1eae7;
  box-shadow: 0px 0px 13px 8px rgba(14, 15, 31, 0.338);
  border-radius: 5px;
  color: #464140;
  

}
.settingBlock > h1{
  font-size: 22px;
  margin: 12px auto;
  width: max-content;
}
.settingItem{
width: 80%;
margin: 0px auto;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;

}
.settingItem > h3{
  margin: 0px 0px 12px 0px;
}
.settingItem > div{
  width: 100%;
  display: flex;
  justify-content: space-around;
}
/* Переключатель */
.switchBtn {
            display: inline-block;
            width: 52px; 
            height: 18px; 
            border-radius: 12px; 
            background: #bfbfbf; 
            z-index: 0;
            margin: 0;
            padding: 0;
            border: none;
            cursor: pointer;
            position: relative;
            transition:50ms ease; 
            -webkit-tap-highlight-color: transparent;
        }
        .switchBtn::after {
            content: "";
            height: 26px; 
            width: 26px; 
            border-radius: 18px;
            background: #fff; 
            top:-3px;
            left: -10px;
            transition: 50ms ease;  
            box-shadow: 0 0 10px 0 #999999; 
            position: absolute;
            z-index: 1;
        }
        .switchOn {
            background: #e9dcb0;
            box-shadow: inset 0 0 10px 0 #999999;
        }
        .switchOn::after {
            left: 30px;
            background: #118c46;
        }
    /* <..Переключатель     */
</style>