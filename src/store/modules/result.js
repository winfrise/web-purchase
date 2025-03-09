import { defineStore } from 'pinia'


export const useResultStore = defineStore('resultStore', {
    state: () => ({
        stampList: [],
        otherList: [],
        tubeList: []
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
        clearData() {
            this.stampList = []
            this.otherList = []
            this.tubeList = []
        }
    },
    getters: {

    },
    persist: true,
})
