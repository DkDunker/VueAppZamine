export function setPersonalMarcacion(state, {personal,image_url,fecha_hora,marcacion_tipo_id,comentario}){
    state.personal_marcacion.push({
        'personal_id' : personal.id,
        'nombre_completo' : personal.nombres + " " + personal.apellido_paterno + " " + personal.apellido_materno,
        'imagen_url' : image_url,
        'fecha_hora' : fecha_hora,
        'marcacion_tipo_id' : marcacion_tipo_id,
        'tipo_movimiento_id' : state.tipo_movimiento_id,
        'comentario' : comentario
    })
}

export function setTipoMovimiento(state, tipo_movimiento_id){
    state.tipo_movimiento_id = tipo_movimiento_id
}

export function setImageError(state){
    state.personal_marcacion[state.personal_marcacion.length - 1].imagen_url = ''
}

export function deletePersonaMarcacion(state,id){
    state.personal_marcacion.splice(state.personal_marcacion.findIndex( (persona) => persona.personal_id === id ),1);
}

export function deleteArrayPersonalMarcacion(state){
    state.personal_marcacion = []
}

export function setPersonalMarcacionLogueado(state,marcaciones){
    state.personal_marcacion_logueado_cabecera.total = marcaciones.total
    state.personal_marcacion_logueado_cabecera.per_page = marcaciones.per_page
    state.personal_marcacion_logueado_cabecera.current_page = marcaciones.current_page
    state.personal_marcacion_logueado_cabecera.last_page = marcaciones.last_page
    state.personal_marcacion_logueado_cabecera.next_page_url = marcaciones.next_page_url
    state.personal_marcacion_logueado_cabecera.prev_page_url = marcaciones.prev_page_url
    state.personal_marcacion_logueado_cabecera.from = marcaciones.from
    state.personal_marcacion_logueado_cabecera.to = marcaciones.to

    state.personal_marcacion_logueado = marcaciones.data
}

export function setPersonalMarcacionDiario(state,marcaciones){
    state.personal_marcacion_diario_cabecera.total = marcaciones.total
    state.personal_marcacion_diario_cabecera.per_page = marcaciones.per_page
    state.personal_marcacion_diario_cabecera.current_page = marcaciones.current_page
    state.personal_marcacion_diario_cabecera.last_page = marcaciones.last_page
    state.personal_marcacion_diario_cabecera.next_page_url = marcaciones.next_page_url
    state.personal_marcacion_diario_cabecera.prev_page_url = marcaciones.prev_page_url
    state.personal_marcacion_diario_cabecera.from = marcaciones.from
    state.personal_marcacion_diario_cabecera.to = marcaciones.to

    state.personal_marcacion_diario = marcaciones.data
}

export function setPersonalMarcacionHistorial(state,marcaciones){
    state.personal_marcacion_historial_cabecera.total = marcaciones.total
    state.personal_marcacion_historial_cabecera.per_page = marcaciones.per_page
    state.personal_marcacion_historial_cabecera.current_page = marcaciones.current_page
    state.personal_marcacion_historial_cabecera.last_page = marcaciones.last_page
    state.personal_marcacion_historial_cabecera.next_page_url = marcaciones.next_page_url
    state.personal_marcacion_historial_cabecera.prev_page_url = marcaciones.prev_page_url
    state.personal_marcacion_historial_cabecera.from = marcaciones.from
    state.personal_marcacion_historial_cabecera.to = marcaciones.to

    state.personal_marcacion_historial = marcaciones.data
}




