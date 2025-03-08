import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

export default pinia

export { useProductStore } from './modules-static/product'
export { useProductConsistStore } from './modules-static/product-consist'
export { usePartStore } from './modules-static/part'