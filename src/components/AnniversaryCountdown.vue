<template>
  <div class="container">
    <h1 id="headline">{{ headline }}</h1>
    <div id="countdown" v-if="!isAnniversary">
      <ul>
        <li><span id="days">{{ days }}</span>days</li>
        <li><span id="hours">{{ hours }}</span>Hours</li>
        <li><span id="minutes">{{ minutes }}</span>Minutes</li>
        <li><span id="seconds">{{ seconds }}</span>Seconds</li>
      </ul>
    </div>
    <div id="content" class="emoji" v-else>
      <span>🥳</span>
      <span>🎉</span>
      <span>🎂</span>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useDateStore } from 'src/stores/date-store.js'

const dateStore = useDateStore()

const days = ref(0)
const hours = ref(0)
const minutes = ref(0)
const seconds = ref(0)
const isAnniversary = ref(false)
const headline = ref("Countdown to next anniversary")
const anniversary = ref(calculateAnniversary())

function calculateAnniversary() {
  const today = new Date()
  const dd = String(today.getDate()).padStart(2, "0")
  const mm = String(today.getMonth() + 1).padStart(2, "0")
  const yyyy = today.getFullYear()
  let nextYear = yyyy + 1

  // 从dateStore.dateStr解析日期（格式：2004-08-15 23:44）
  const [datePart] = dateStore.dateStr.split(' ') // 分离日期和时间
  const [yearStr, monthStr, dayStr] = datePart.split('-') // 分解年月日
  
  // 直接使用store中的月份和日期（已包含前导零）
  const dayMonth = `${monthStr}/${dayStr}/` // 结果示例："08/15/"
  
  let anniversary = dayMonth + yyyy
  
  // 比较逻辑
  const todayStr = mm + "/" + dd + "/" + yyyy
  if (todayStr > anniversary) {
    anniversary = dayMonth + nextYear
  }
  
  return new Date(anniversary).getTime()
}

function startCountdown() {
  const second = 1000
  const minute = second * 60
  const hour = minute * 60
  const day = hour * 24

  const timer = setInterval(() => {
    const now = new Date().getTime()
    const distance = anniversary.value - now

    days.value = Math.floor(distance / day)
    hours.value = Math.floor((distance % day) / hour)
    minutes.value = Math.floor((distance % hour) / minute)
    seconds.value = Math.floor((distance % minute) / second)

    if (distance < 0) {
      headline.value = "It's our anniversary!"
      isAnniversary.value = true
      clearInterval(timer)
    }
  }, 1000)
}

onMounted(() => {
  startCountdown()
})

// 监听 dateStore.dateStr 的变化
watch(() => dateStore.dateStr, calculateAnniversary)
</script>

<style scoped>
.container {
  color: #333;
  margin: 0 auto;
  text-align: center;
}

h1 {
  font-weight: normal;
  letter-spacing: .125rem;
  text-transform: uppercase;
}

li {
  display: inline-block;
  font-size: 1.5em;
  list-style-type: none;
  padding: 1em;
  text-transform: uppercase;
}

li span {
  display: block;
  font-size: 4.5rem;
}

.emoji {
  padding: 1rem;
}

.emoji span {
  font-size: 4rem;
  padding: 0 .5rem;
}

/** 针对移动端的显示 */
@media all and (max-width: 768px) { 
  h1 {
    font-size: calc(1.5rem * var(--smaller));
  }
  
  li {
    /* 调试用边框 */
    /* border: 2px dashed blue;  */

    font-size: calc(1.125rem * var(--smaller));
    transform: translateX(-6%);
  }
  
  li span {
    font-size: calc(3.375rem * var(--smaller));
  }
  ul {
    /* 调试用边框 */
    /* border: 2px dashed red;  */

    display: flex;
    flex-direction: column;
  }
}
</style>