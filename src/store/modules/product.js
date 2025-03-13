import { defineStore } from 'pinia'


export const useProductStore = defineStore('productStore', {
    state: () => ({
        productList: [],
        productConsist: [],
        partList: [],
        supplierList: [] // 供应商型号对照表
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
        },
        setSupplierList(supplierList) {
            this.supplierList = supplierList
        },
        clearSupplierList() {
            this.supplierList = []
        },
    },
    getters: {
        productListMap (state) {
            return state.productList.reduce((acc, item) => {
                acc[item.UDID] = item
                return acc
            }, {})
        },
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
        },
        supplierMapByUDID (state) {
            return state.supplierList.reduce((acc, item) => {
                acc[item.UDID] = item
                return acc
            }, {})
        }
    },
    persist: true,
})
