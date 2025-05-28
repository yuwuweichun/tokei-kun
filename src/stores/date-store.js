import { defineStore, acceptHMRUpdate } from 'pinia'

// 定义一个名为 'date' 的 Pinia 存储
export const useDateStore = defineStore('date', {
  
  state: () => ({ // 存储的初始状态
    dateStr: "2024-08-15 23:44"
  }),
  
  getters: { // 存储的计算属性（当前为空）

  }, 
  
  actions: { // 存储的方法
    updateDate(newDateStr) { // 更新日期字符串的方法
      this.dateStr = newDateStr
    }
  }
})

// 热模块替换（HMR）相关代码，用于开发环境
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useDateStore, import.meta.hot))
}
