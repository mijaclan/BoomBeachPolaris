<template>
  <div class="energy">
    <div class="card">
      <div>我的能量</div>
      <div>
        <input type="number" placeholder="请输入能量" v-model="getEnergy">
      </div>
    </div>
    <div class="card">
      <div>需要能量</div>
      <div class="energyNum">{{needEnergy}}</div>
    </div>
    <div class="card">
      <div>剩余能量</div>
      <div class="energyNum">{{surplusEnergy}}</div>
    </div>
  </div>
  <div class="time">
    <div class="tips">
      空中总滞留时间（70格距离）： {{holdUpTime.total}} s
    </div>
    <div class="tips">
      空中平均滞留时间（70格距离）：  {{holdUpTime.average}} s
    </div>
    <div class="tips">
      空中单个最长滞留时间（70格距离）： {{holdUpTime.longest}} s
    </div>
    <div class="tips" style="font-size: 12px">
      小提示：记得提前丢技能，防止团灭。
    </div>
    <div>
    </div>
  </div>
  
  <van-list finished-text="没有更多了" class="list">
    <div class="cell" v-for="item in baseDataList" :key="item.id">
      <div class="handle">
        <button class="add" @click="add(item)">+</button>
        <button disabled class="count">{{item.count}}</button>
        <button class="reduce" @click="subtract(item)" :style="{'background-color': item.count > 0 ? 'cornflowerblue' : '#9eb6e8' }">-</button>
      </div>
      <div class="arms">
        {{item.name}}
      </div>
      <div class="holdup" >
      <span :style="{ 'display': item.retention ? '' : 'none'}">
        滞留 ≈ {{item.retentionTime}} s
      </span>
      </div>
    </div>
  </van-list>
  
  <div class="clearDiv" @click="clear()">
    <button type="button" class="clear">
      <van-icon name="replay" size="30" />
    </button>
  </div>
  
</template>

<script>
import {Icon, List} from 'vant';
import baseData from "./baseData";
import {computed, onMounted, ref, watch} from 'vue';

export default {
  components: {
    vanList: List,
    VanIcon: Icon,
  },
  setup() {
    const myEnergy = ref(75)
    const needEnergy = ref(0)
    const surplusEnergy = ref(myEnergy.value)
    const baseDataList = ref(baseData)
    const holdUpTime = ref({
      total: 0,
      average: 0,
      longest:0
    })
    
    // 获取本地保存的能量值
    onMounted(() => {
      if(localStorage.getItem('localEnergy') !== null) {
        myEnergy.value = localStorage.getItem('localEnergy') * 1
        surplusEnergy.value = localStorage.getItem('localEnergy') * 1
      }
    })
    
    function keepLocalEnergy(val) {
      window.localStorage.setItem('localEnergy',val);
    }
    
    // v-model
    const getEnergy = computed({
      get: () => myEnergy.value,
      set: (value) => {
        if(value === null || value === undefined) {
          myEnergy.value = 0
        } else {
          myEnergy.value = value
          keepLocalEnergy(value)
        }
      },
    })
    
    function add(value) {
      value.count++
      // 这发 nextEnergy 保存入数组
      value.consumedEnergy.push(value.nextEnergy)
      // 下一发的值
      value.nextEnergy = value.nextEnergy + value.incrementEnergy
    }
    
    function subtract(value) {
      if(value.count > 0) {
        value.count--
        value.nextEnergy = value.consumedEnergy.pop()
      }
    }
    
    // 计算和
    function getSum(num1,num2) {
      return num1 + num2;
    }
    
    // 监听值得变化
    watch(baseDataList,(newValue) => {
      const arr = newValue.filter( val => val.count > 0)
      // 计算能量
      const armsEnergy = arr.map(item => item.consumedEnergy.reduce(getSum),0).reduce(getSum,0).toString() * 1;
      needEnergy.value = armsEnergy;
      surplusEnergy.value = myEnergy.value - armsEnergy;
      
      // 计算滞留时间
      const holdUpTimeArr = arr.map(item => {
        if(item.retention === true) {
         return item.count * item.retentionTime
        } else {
          return 0
        }
      })
  
      // 返回有滞留的时间项
      const allTime = arr.map(item => {
        if (item.retention === true) {
          return item.retentionTime
        } else {
          return 0
        }
      })
      
      // 总时间
      holdUpTime.value.total = holdUpTimeArr.reduce(getSum, 0) === 0 ? 0 : holdUpTimeArr.reduce(getSum, 0).toFixed(3)
      
      // 平均时间
      // 去掉无滞留的
      const avgTempArr = arr.map(item => {
        if (item.retention === true) {
          return {
            count: item.count,
            time: item.retentionTime
          }
        } else {
          return {
            count: item.count,
            time: 0
          }
        }
      }).filter(val => val.time > 0)
      // 每个武器的个数总和
      const sumCount = avgTempArr.map(item => item.count).reduce(getSum,0)
      // 每个武器的时间总和
      const sumTime = avgTempArr.map(item => item.count * item.time).reduce(getSum,0)
      
      holdUpTime.value.average = isNaN(sumTime / sumCount) ? 0 : (sumTime / sumCount).toFixed(3);
      
      // 单个最长时间
      holdUpTime.value.longest = allTime.reduce((pro, cur) => pro > cur ? pro : cur,0)
      
    },{
      deep:true
    })
  
    
    // 复位
    function clear() {
      baseDataList.value = baseDataList.value.map(item => {
        item.consumedEnergy = [];
        item.count = 0;
        item.nextEnergy = item.initialEnergy;
        return item
      })
    }
    
    return {
      baseDataList,
      myEnergy,
      needEnergy,
      surplusEnergy,
      getEnergy,
      holdUpTime,
      clear,
      add,
      subtract
    }
  }
}
</script>

<style scoped>
  .energy {
    margin-top: 10px;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
  }
  
  .card {
    width: 30%;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 63px;
    border-radius: 8px;
    background: #e8e8e8;
    box-shadow: 0 3px 5px #f6c2c2;
  }

  .energyNum {
    padding-top: 4px;
  }
  
  .card div {
    margin-top: 5px;
  }
  
  .card input {
    transform: translateX(9%);
    text-align: center;
    border: 2px solid #9eb6e8;
    border-radius: 10px;
    width: 80%;
  }

  .time {
    margin: 13px 13px 20px 7px;
    border-radius: 8px;
    background: #e8e8e8;
    box-shadow: 0 3px 5px #f6c2c2;
    
  }
  
  .tips {
    font-size: 14px;
    padding: 5px 0 10px 5px;
  }
  
  .clearDiv {
    position: fixed;
    right: 50px;
    bottom: 100px;
  }
  
  .clear {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: #e8e8e8;
    box-shadow: 0 3px 5px #f6c2c2;
    border: none;
  }
  
  /**/

  .cell {
    display: flex;
    flex-direction: row;
    justify-content:space-between;
    align-items: center;
    padding-top: 7px;
    padding-bottom: 7px;
    border-bottom: solid #f6c2c2;
  }
  
  .list {
    margin-bottom: 30px;
  }

  .handle {
    display: flex;
  }

  .handle button {
    margin: 0 10px;
  }

  .add {
    color: white;
    width: 30px;
    height: 30px;
    background-color: cornflowerblue;
    border-radius: 5px;
    border-width: 0;
    margin: 0;
    outline: none;
    text-align: center;
    font-size: 26px;
  }

  .count {
    border: none;
    border-radius: 7px;
  }

  .reduce {
    color: white;
    width: 30px;
    height: 30px;
    /*background-color: cornflowerblue;*/
    background-color: #9eb6e8;
    border-radius: 5px;
    border-width: 0;
    margin: 0;
    outline: none;
    text-align: center;
    font-size: 26px;
  }

  .holdup {
    margin-right: 13px;
  }





</style>
