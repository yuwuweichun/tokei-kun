<template>
  <div class="carousel-container">
    <q-carousel
      arrows
      animated
      infinite
      v-model="slide"
      height="70vh"
    >
      <q-carousel-slide name="first" img-src="images/snuggled_up.jpg">
        <div class="absolute-bottom custom-caption">
          <div class="text-h2">第{{daysPassed}}天</div>
          <div class="text-subtitle1">Days of us, a dance of love.</div>
        </div>
      </q-carousel-slide>
      <q-carousel-slide name="second" img-src="images/soft_kiss.jpg">
        <div class="absolute-bottom custom-caption">
          <div class="text-h2">第{{weeksPassed}}周</div>
          <div class="text-subtitle1">"Weeks so sweet, like stars above."  </div>
        </div>
      </q-carousel-slide>
      <q-carousel-slide name="third" img-src="images/stay_like_this.jpg">
        <div class="absolute-bottom custom-caption">
          <div class="text-h2">第{{monthsPassed}}个月</div>
          <div class="text-subtitle1">"Months together, a blooming rhyme."  </div>
        </div>
      </q-carousel-slide>
      <q-carousel-slide name="fourth" img-src="images/when_we_hug.jpeg">
        <div class="absolute-bottom custom-caption">
          <div class="text-h2">第{{yearsPassed}}年</div>
          <div class="text-subtitle1">"Years of love, woven in time."  </div>
        </div>
      </q-carousel-slide>
    </q-carousel>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useDateStore } from 'src/stores/date-store.js'

const slide = ref('first')
const dateStore = useDateStore()

// 定义计算属性来存储时间差
const daysPassed = ref(0)
const weeksPassed = ref(0)
const monthsPassed = ref(0)
const yearsPassed = ref(0)

const calculateTimeDifference = () => {
  const currentDate = new Date()
  const dateStr = new Date(dateStore.dateStr)

  // 计算天数差
  const timeDiff = currentDate - dateStr
  daysPassed.value = Math.floor(timeDiff / (1000 * 60 * 60 * 24))+1

  // 计算周数差
  weeksPassed.value = Math.floor(daysPassed.value / 7)

  // 计算月数差
  monthsPassed.value = (currentDate.getFullYear() - dateStr.getFullYear()) * 12 + (currentDate.getMonth() - dateStr.getMonth())
  // if (currentDate.getDate() < dateStr.getDate()) {
  //   monthsPassed.value -= 1
  // }

  // 计算年数差
  yearsPassed.value = currentDate.getFullYear() - dateStr.getFullYear()
  // if (currentDate.getMonth() < dateStr.getMonth() ||
  //     (currentDate.getMonth() === dateStr.getMonth() && currentDate.getDate() < dateStr.getDate())) {
  //   yearsPassed.value -= 1
  // }
}

onMounted(() => {
  calculateTimeDifference()
})

// 监听 dateStore.dateStr 的变化
watch(() => dateStore.dateStr, calculateTimeDifference)
</script>


<style lang="sass" scoped>
.carousel-container
  width: 100vw
  max-width: 680px // 针对PC端


.custom-caption
  text-align: center
  padding: 12px
  color: white
  background-color: rgba(0, 0, 0, .3)
</style>
