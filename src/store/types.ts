import { NuxtAxiosInstance } from '@nuxtjs/axios'
import { ActionTree } from 'vuex'

export interface IRootState {
  version: string
}
export interface INuxtActionTree<S, R> extends ActionTree<S, R> {
  $axios?: NuxtAxiosInstance | any
}
