import { defineStore } from 'pinia'


export const useRelateStore = defineStore('relateStore', {
    state: () => ({
        stockList: [],
        producingSplitList: []
    }),

    actions: {
        setStockList(stockList) {
            this.stockList = stockList
        },
        clearStockList(stockList) {
            this.stockList = stockList
        },
        setProducingSplitList(producingSplitList) {
            this.producingSplitList = producingSplitList
        },
        clearProducingSplitList() {
            this.producingSplitList = []
        }
    },
    getters: {
        producingSplitListMap (state) {
            return state.producingSplitList.reduce((acc, item) => {
                acc[item.UDID] = item
                return acc
            }, {})
        },
        stockListMap(state) {
            return state.stockList.reduce((acc, item) => {
                acc[item.UDID] = item
                return acc
            }, {})
        }
    },
    persist: true,
})
