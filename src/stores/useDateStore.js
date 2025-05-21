import { defineStore, acceptHMRUpdate } from 'pinia'

export const useDateStore = defineStore('date', {
  state: () => ({
    dateStr: "2024-08-15 23:44"
  }),
  getters: {},
  actions: {
    updateDate(newDateStr) {
      this.dateStr = newDateStr
    }
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useDateStore, import.meta.hot))
}
