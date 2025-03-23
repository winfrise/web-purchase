import { defineStore } from 'pinia'


export const useMaterialMonitorStore = defineStore('materialMonitorStore', {
    state: () => ({
        assemBom: {data: []},
        assemRelate: {data: []},
        stock: {data: []},
        producing: {data: []},
        arrived: {data: []},
        plan: {headers: [], data: []},
        result: {data: []}
        
    }),

    actions: {
        setAssemBom({data}) {
            this.assemBom = {data}
        },
        clearAssemBom() {
            this.assemBom = {data: []}
        },

        setAssemRelate({data}) {
            this.assemRelate = {data}
        },
        clearAssemRelate() {
            this.assemRelate = {data: []}
        },

        setStock({data}) {
            this.stock = {data}
        },
        clearStock() {
            this.stock = {data: []}
        },

        setProducing({data}) {
            this.producing = {data}
        },
        clearProducing() {
            this.producing = {data: []}
        },

        setArrived({data}) {
            this.arrived = {data}
        },
        clearArrived() {
            this.arrived={data: []}
        },

        setPlan({headers, data}) {
            this.plan = {headers, data}
        },
        clearPlan() {
            this.plan = {headers: [], data: []}
        },

        setResultList(list) {
            this.resultList = list
        },
        clearResultList() {
            this.resultList = []
        },
    },
    getters: {
        arrivedMap(state) {
            return state.arrived.data.reduce((acc, item) => {
                acc[item.UDID] = item
                return acc
            }, {})
        },
        assemRelateMap(state) {
            const map = {}

            state.assemRelate.data.forEach(item => {
                item.productList.forEach(productItem => {
                    map[productItem] = item.assem
                })
            })

            return map
        },
        assemBomMap(state) {
            let assem = ''
            return state.assemBom.data.reduce((acc, item) => {
                if (item.assem) {
                    assem = item.assem
                    acc[assem] = []
                }

                acc[assem].push(item)
                return acc
            }, {})
        },
        stockMap(state) {
            return state.stock.data.reduce((acc, item) => {
                const UDID = item.alias || item.UDID
                acc[UDID] = item
                return acc
            }, {})
        },
        producingMap(state) {
            return state.producing.data.reduce((acc, item) => {
                const assemName = item.alias || item.assem
                if (!acc[assemName]) {
                    acc[assemName] = {}
                }

                acc[assemName][item.UDID] = item
                return acc
            }, {})
        },
    },
    persist: true,
})
