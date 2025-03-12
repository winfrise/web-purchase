import { defineStore } from 'pinia'


export const useArrivedStore = defineStore('arrivedStore', {
    state: () => ({
        arrivedList: [],
        columnCount: 0
    }),

    actions: {
        setArrivedList(arrivedList) {
            this.arrivedList = arrivedList
        },
        clearArrivedList() {
            this.arrivedList = []
        },
    },
    getters: {
        arrivedListMap(state) {
            return state.arrivedList.reduce((acc, item) => {
                acc[item.UDID] = item
                return acc
            }, {})
        }
    },
    persist: true,
})
