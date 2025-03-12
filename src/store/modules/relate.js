import { defineStore } from 'pinia'


export const useRelateStore = defineStore('relateStore', {
    state: () => ({
        stockList: [],
        stockHeaders: [],
        producingSplitList: []
    }),

    actions: {
        setStockList(stockHeaders, stockList) {
            this.stockHeaders = stockHeaders
            this.stockList = stockList
        },
        clearStockList() {
            this.stockList = []
            this.stockHeaders = []
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
