import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

export default pinia

export { useProductGZStore } from './modules-static/productGZ.js'
export { useProductConsistStore } from './modules-static/product-consist.js'
export { usePartStore } from './modules-static/part.js'