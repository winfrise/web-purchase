import { defineStore } from 'pinia'


export const useBatchResultStore = defineStore('batchResultStore', {
    state: () => ({
        resultList: [],
        columnCount: 0
    }),

    actions: {
        setResultList(resultList) {
            this.resultList = resultList
        },
        clearResultList() {
            this.resultList = []
        },
        setColumnCount(count) {
            this.columnCount = count
        },
        clearColumnCount() {
            this.columnCount = 0
        }
    },
    getters: {

    },
    persist: true,
})
