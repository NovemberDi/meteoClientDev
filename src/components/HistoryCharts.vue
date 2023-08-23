<template>
    <div class="historyChartsWrap">
        <button @click="getData"> Жми</button>
        <a v-for="item in queryResult" :key="item.content.timestamp">
            {{ item.content.outTemp }}||{{ new Date(item.content.timestamp) }} 
        </a>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                startTime: '',
                endTime: '',
            }
            
        },
        props:{
            queryResult: {type: Object}
        },
        methods:{
            getData(){
                let point =  new Date();
                this.startTime = point.setHours(point.getHours()-124);
                this.endTime = Date.now();
                this.$emit('onQuery',{startTime:this.startTime, endTime:this.endTime})
            }
        }
    }
       
</script>

<style scoped>
.historyChartsWrap{
    display: flex;
    align-items: center;
    /* justify-content: center; */
    flex-direction: column;
    height: 60%;
}
.chartsMain{
    height: 100%;
    width: 100%;
    
}
</style>