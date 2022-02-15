import Vue from 'nativescript-vue'
import SearchModalMiAsistencia from './components/menu_principal/mi_asistencia/modal/SearchModal'

export class DialogService {
    openSearchModalMiAsistencia(){
        //Vue.$showModal(SearchModalMiAsistencia)
        Vue.showMyModal(SearchModalMiAsistencia)
    }
}