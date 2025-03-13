import { defineStore } from 'pinia'


export const useRelateStore = defineStore('relateStore', {
    state: () => ({
        stockList: [],
        producingSplitList: [] // 原始数据，没有对重复的数据进行合并
    }),

    actions: {
        setStockList(stockList) {
            this.stockList = stockList
        },
        clearStockList() {
            this.stockList = []
        },
        setProducingSplitList(producingSplitList) {
            this.producingSplitList = producingSplitList
        },
        clearProducingSplitList() {
            this.producingSplitList = []
        }
    },
    getters: {
        stockListMap(state) {
            return state.stockList.reduce((acc, item) => {
                acc[item.UDID] = item
                return acc
            }, {})
        },
        producingSplitListMap (state) {
          const listMap = state.producingSplitList.reduce((acc, item, index) => {
              const {productUDID, partName, partUDID, count, remark} = item
              if (!acc[partUDID]) {
                acc[partUDID] = {partName, partUDID, count: 0, detail:''}
              }

              acc[partUDID].count += count
              const detailSplit = acc[partUDID].detail ? ' , ' : ''
              acc[partUDID].detail += `${detailSplit}${productUDID}/${count}`
             return acc
          }, {})
          return listMap
        }
    },
    persist: true,
})
