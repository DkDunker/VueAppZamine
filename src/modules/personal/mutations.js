export function setPersonal(state, personal){
    state.personal.id = personal.id
    state.personal.apellido_paterno = personal.apellido_paterno
    state.personal.apellido_materno = personal.apellido_materno
    state.personal.nombres = personal.nombres
    state.personal.documento_identidad_tipo_id = personal.documento_identidad_tipo_id
    state.personal.documento_identidad_numero = personal.documento_identidad_numero
    state.personal.fecha_nacimiento = personal.fecha_nacimiento
    state.personal.telefono_celular = personal.telefono_celular
    state.personal.telefono_corporativo = personal.telefono_corporativo
    state.personal.direccion = personal.direccion
    state.personal.email_principal = personal.email_principal
    state.personal.email_opcional = personal.email_opcional
    state.personal.direccion_residencia = personal.direccion_residencia
}

export function setQRCodeUrl(state, qr_code_url){
    state.personal.qr_code_url = qr_code_url
}

export function setQRCode(state, qr_code){
    state.personal.qr_code = qr_code
}

export function setfoto(state, imagen){
    if(imagen != null){
        state.personal.foto = 'data:image/png;base64, ' +imagen.data.imagen_base64;
    }else{
        state.personal.foto = '';
    }
}



