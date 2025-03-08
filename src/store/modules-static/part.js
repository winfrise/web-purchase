import { defineStore } from 'pinia'


export const usePartStore = defineStore({
  id: 'part',
  state: () => ({
    partList: []
  }),
  actions: {
    
  },
  getter: {
    partListMap: () => {}
  },
  persist: true,
})
