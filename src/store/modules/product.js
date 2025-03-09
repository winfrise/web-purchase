import { defineStore } from 'pinia'


export const useProductStore = defineStore('productStore', {
    state: () => ({
        productList: [],
        productConsist: [],
        partList: []
    }),

    actions: {
        setProductList(productList) {
            this.productList = productList
        },
        clearProductList() {
            this.productList = []
        },
        setProductConsist(productConsist) {
            this.productConsist = productConsist
        },
        clearProductConsist() {
            this.productConsist = []
        },
        setPartList(partList) {
            this.partList = partList
        },
        clearPartList() {
            this.partList = []
        }
    },
    getters: {
        productConsistMap(state) {
            return state.productConsist.reduce((acc, item) => {
                const UDID = item.belong
                if (!acc[UDID]) {
                    acc[UDID] = []
                }
                acc[UDID].push(item)
                return acc
            }, {})
        },
        partListMap (state) {
            return state.partList.reduce((acc, item) => {
                acc[item.UDID] = item
                return acc
            }, {})
        }
    },
    persist: true,
})
