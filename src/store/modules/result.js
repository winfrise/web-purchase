import { defineStore } from 'pinia'


export const useResultStore = defineStore('resultStore', {
    state: () => ({
        stampList: [],
        otherList: [],
        tubeList: [],
        gzProductList: []
    }),

    actions: {
        setStampList(stampList) {
            this.stampList = stampList
        },
        setOtherList(otherList) {
            this.otherList = otherList
        },
        setTubeList(tubeList) {
            this.tubeList = tubeList
        },
        clearNeedData() {
            this.stampList = []
            this.otherList = []
            this.tubeList = []
        },
        setGzProductList(gzProductList) {
            this.gzProductList = gzProductList
        },
        clearGzProductList() {
            this.gzProductList = []
        }
    },
    getters: {

    },
    persist: true,
})
