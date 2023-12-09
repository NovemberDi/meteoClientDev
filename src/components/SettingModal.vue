<template>
    <div class="setting">
      <div class="settingBlock" >
        <h1>Настройки</h1>
        <div class="settingContent">
          <div class="settingItem">
            <h3>Режим день/ночь</h3>
            <div class="switchBtnWrap">
              ручной 
              <div class="switchBtn " :class="{switchOn:autoMode}" @click="switchAutoMode" ></div>
               авто
            </div>
            <div class="onOff" v-if="autoMode">
              <div class="interval">день
                <input type="time" :value="dawn" @input="updateDawn">
              </div>
              <div class="interval">ночь
                <input type="time" :value="sunset" @input="updateSunset" >
              </div>
            </div>
          </div>
          
        </div>
        <div class="settingItem">
            <h3>PPM пределы</h3>
            <div class="listIntervals">
              <div class="interval">Первый
                <input type="text" :value="first" @input="updateFirst">
              </div>
              <div class="interval">Второй
                <input type="text" :value="second" @input="updateSecond">
              </div>
              <div class="interval">Третий
                <input type="text" :value="third" @input="updateThirs">
              </div>              
            </div>
          </div>
      </div>
    </div>
</template>

<script>
    export default {
        name:'SettingModal',
        data(){
          return{
            demo: ''
          }
        },
        props:{
            autoMode: {type: Boolean},
            first: {type: Number},
            second: {type: Number},
            third: {type: Number},
            dawn: {type: String},
            sunset: {type: String},

        },
        methods:{
          updateOnOff(){
              this.$emit('updateTimeOfSun')
            },
          updateDawn(event){
              this.$emit('update:dawn', event.target.value);
              this.updateOnOff();
            },
            updateSunset(event){
              this.$emit('update:sunset', event.target.value);
              this.updateOnOff();
            },
            updatePpm(){
              this.$emit('updatePpm')
            },
            updateFirst(event){
              this.$emit('update:first', Number(event.target.value));
              this.updatePpm();
            },
            updateSecond(event){
              this.$emit('update:second', Number(event.target.value))
              this.updatePpm();
            },
            updateThirs(event){
              this.$emit('update:third', Number(event.target.value))
              this.updatePpm();
            },
            switchAutoMode(){
                this.$emit('switchAutoMode'); 
            }
        }
    }
</script>

<style scoped>
.onOff{
  display: flex;
  flex-direction: column;
}
.listIntervals{
  display: flex;
  flex-direction: column;
}
.interval{
  display: flex;
  justify-content: space-between;
  margin: 6px;
}
.interval > input{
  width: 60%;
  background: #e9dcb0;
  box-shadow: inset 0 0 10px 0 #999999;
  border: none;
  box-sizing: border-box;
  text-align: center;
  color: #464140;
  border-radius: 12px;
  font-weight: 600;  
}
.setting{
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  /* background: #1e110765; */
  background: #98a3a729;
  backdrop-filter: blur(3px);
  z-index: 100;
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
margin-bottom: 12px;

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
.switchBtnWrap{
  margin-bottom: 6px;
}
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