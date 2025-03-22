import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

export default pinia

export { useProductStore } from './modules/product.js'
export { useRelateStore } from './modules/relate.js'
export { useResultStore } from './modules/result.js'
export { useBatchResultStore } from './modules/batch-result.js'
export { useArrivedStore } from './modules/arrived.js'
export { useMonthPlanStore } from './modules/month-plan.js'
export { useMaterialMonitorStore } from './modules/material-monitor.js'