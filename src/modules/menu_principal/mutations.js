import Vue from 'nativescript-vue'
export function setMenu(state, menus = []){
    //console.log(menus);
    state.modulos = [];
    menus.forEach((element) => {
        state.id = element.id
        state.nombre = element.nombre
        state.operacion_tipo_id = element.operacion_tipo_id
        state.default_menu_id = element.default_menu_id
        let modulo = {
            id : state.id,
            nombre : state.nombre,
            operacion_tipo_id : state.operacion_tipo_id,
            default_menu_id : state.default_menu_id,
            //selected : state.selected,
        }
        state.modulos.push(modulo);

        state.id                = ''
        state.nombre            = ''
        state.operacion_tipo_id = ''
        state.default_menu_id   = ''
    })
}

export function setSelectedModule(state,modulo){
    /*state.modulos.forEach((element)  => {
        if(element.id == id){
            element.selected = true
        }else{
            element.selected = false
        }
    })
    state.selected_module_id = id*/
    state.modulo_menu_lateral = 
        {
            id : modulo.id,
            name: modulo.nombre,
            children: []
        }
    if(modulo.id == 172){
        state.modulo_menu_lateral.children.push({
            name:"Registro de Asistencia",
            component: Vue.prototype.$routes.RegistroAsistencia,
            icon: 'fa-registered',
            active: true
        })
        state.modulo_menu_lateral.children.push({
            name:"Asistencias",
            component: Vue.prototype.$routes.Asistencia,
            icon: 'fa-calendar-check',
            active: false
        })
    }
}

