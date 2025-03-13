import { defineStore } from 'pinia'


export const useMonthPlanStore = defineStore('monthPlanStore', {
    state: () => ({
        monthPlanHeaders: [],
        monthPlanList: [],
    }),

    actions: {
        setMonthPlanList(planHeaders, planList) {
            this.monthPlanHeaders = planHeaders
            this.monthPlanList = planList
        },
        clearMonthPlanList() {
           this.monthPlanHeaders = []
           this.monthPlanList = []
        }
    },
    getters: {

    },
    persist: true,
})
