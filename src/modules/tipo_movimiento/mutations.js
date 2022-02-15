export function setTipoMovimiento(state, tipos_movimiento = []){
    tipos_movimiento.forEach((element, index) => {
        let movimiento = '';
        if(index == 0){
            movimiento = {
                id : element.id,
                nombre : element.nombre,
                selected: true
            }
        }else{
            movimiento = {
                id : element.id,
                nombre : element.nombre,
                selected: false
            }
        }
        state.tipos_movimiento.push(movimiento);
    })
}

export function cambiarSeleccionTipoMovimiento(state, tipo_movimiento_id){ 
    state.tipos_movimiento.forEach((element) => {
        if (element.id != tipo_movimiento_id) {
            element.selected = false;
        }else{
            element.selected = true;
        }
    })
}

export function getTipoMovimientoSeleccionado(state){
    let tipo_movimiento_seleccionado = ''
    state.tipos_movimiento.forEach((element) => {
        if (element.selected == true) {
            tipo_movimiento_seleccionado = element.id
        }
    })
    return tipo_movimiento_seleccionado != '' ? tipo_movimiento_seleccionado : state.tipos_movimiento[0].id
}

/*function objetoTipoMovimiento(element,selected){
    let movimiento = {
        id : element.id,
        nombre : element.nombre,
        selected: selected
    }
    return movimiento;
}*/
