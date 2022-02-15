export async function obtenerPersonalCondiciones(context,{dni,marcacion_tipo_id,fecha_hora,comentario}) {
    try {
        context.commit('setLoading', true, { root: true })
        const data = await fetch(context.state.obtener_personal_url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': context.rootState.auth.token
            },
            body: JSON.stringify({
                dni                 : dni,
                marcacion_tipo_id    : marcacion_tipo_id,
                tipo_movimiento     : context.state.tipo_movimiento_id
            })
        })
        let datos = await data.json()
        if(datos.error){
            context.commit('showMessageError', datos.error, { root: true })
        }else{
            const personal = await datos.data.personal
            const image_url = await datos.data.image_url
            const datos_guardar = {
                'personal' : personal,
                'image_url' : image_url,
                'fecha_hora' : fecha_hora,
                'marcacion_tipo_id' : marcacion_tipo_id,
                'comentario'    : comentario
            }
            await context.commit('setPersonalMarcacion',datos_guardar)
            await context.dispatch('obtenerFotoPersonal')
        }
    } catch (e) {
        console.log(e.message);
        //context.commit('authError', e.message)
    } finally {
        context.commit('setLoading', false, { root: true }) // deshabilitar el loader
    }
}

export async function obtenerFotoPersonal(context) {
    try {
        const data = await fetch(context.state.personal_marcacion[context.state.personal_marcacion.length - 1].imagen_url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })
        let datos = await data.json()
        console.log(datos);
        if(datos.error){
            await context.commit('setImageError');
        }
    } catch (e) {
        console.log(e.message);
        //context.commit('authError', e.message)
    } finally {
    }
}

export async function eliminarMarcacionPersonal(context,id) {
    try {
        await context.commit('deletePersonaMarcacion',id);
    } catch (e) {
        console.log(e.message);
        //context.commit('authError', e.message)
    } finally {
    }
}
export async function eliminarArrayMarcacionPersonal(context) {
    try {
        await context.commit('deleteArrayPersonalMarcacion');
    } catch (e) {
        console.log(e.message);
        //context.commit('authError', e.message)
    } finally {
    }
}

export async function guardarPersonalMarcacion(context,personal){
    try {
        context.commit('setLoading', true, { root: true }) 
        const data = await fetch(context.state.guardar_personal_marcacion_url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': context.rootState.auth.token
            },
            body: JSON.stringify({
                personal : personal
            })
        })
        let datos = await data.json()
        if(datos.error){
            context.commit('showMessageError', datos.error, { root: true })
        }else{
            await context.commit('deleteArrayPersonalMarcacion');
            context.commit('showMessageSuccess', datos.data.message, { root: true })
        }
    } catch (e) {
        console.log(e.message);
    } finally {
        context.commit('setLoading', false, { root: true })
    }
}

export async function obtenerMarcacionPersonalLogueado(context){
    console.log('personal logueado')
    try {
        await context.commit('setLoading', true, { root: true }) 
        const data = await fetch(context.state.obtener_marcacion_persona_logueada_url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': context.rootState.auth.token
            }
        })
        let datos = await data.json()
        if(datos.error){
            context.commit('showMessageError', datos.error, { root: true })
        }else{
            let marcaciones = await datos.data.my_assits
            await context.commit('setPersonalMarcacionLogueado',marcaciones);
        }
    } catch (e) {
        console.log(e.message);
    } finally {
        await context.commit('setLoading', false, { root: true })
    }
}

export async function siguientePaginaMarcacionPersonalLogueado(context,url){
    console.log('next')
    try {
        const data = await fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': context.rootState.auth.token
            }
        })
        let datos = await data.json()
        if(datos.error){
            context.commit('showMessageError', datos.error, { root: true })
        }else{
            let marcaciones = await datos.data.my_assits
            await context.commit('setPersonalMarcacionLogueado',marcaciones);
        }
    } catch (e) {
        console.log(e.message);
    } finally {
    }
}

export async function busquedaMarcacionPersonalLogueado(context, {tipo_movimiento_id, fecha_inicio, fecha_fin}){
    try {
        await context.commit('setLoading', true, { root: true }) 
        const data = await fetch(context.state.obtener_marcacion_persona_logueada_url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': context.rootState.auth.token
            },
            body: JSON.stringify({
                tipo_movimiento: tipo_movimiento_id,
                start_date: fecha_inicio,
                end_date: fecha_fin
            })
        })
        let datos = await data.json()
        if(datos.error){
            context.commit('showMessageError', datos.error, { root: true })
        }else{
            let marcaciones = await datos.data.my_assits
            await context.commit('setPersonalMarcacionLogueado',marcaciones);
        }
    } catch (e) {
        console.log(e.message);
    } finally {
        await context.commit('setLoading', false, { root: true })
    }
}

export async function siguientePaginaBusquedaMarcacionPersonalLogueado(context,{tipo_movimiento_id, fecha_inicio, fecha_fin, next_page_url}){
    console.log('next')
    try {
        const data = await fetch(next_page_url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': context.rootState.auth.token
            },
            body: JSON.stringify({
                tipo_movimiento: tipo_movimiento_id,
                start_date: fecha_inicio,
                end_date: fecha_fin
            })
        })
        let datos = await data.json()
        if(datos.error){
            context.commit('showMessageError', datos.error, { root: true })
        }else{
            let marcaciones = await datos.data.my_assits
            await context.commit('setPersonalMarcacionLogueado',marcaciones);
        }
    } catch (e) {
        console.log(e.message);
    } finally {
    }
}

export async function obtenerMarcacionPersonalDiario(context){
    console.log('personal diario')
    try {
        await context.commit('setLoading', true, { root: true }) 
        const data = await fetch(context.state.obtener_marcacion_personal_diario, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': context.rootState.auth.token
            }
        })
        let datos = await data.json()
        if(datos.error){
            context.commit('showMessageError', datos.error, { root: true })
        }else{
            let marcaciones = await datos.data.checkpoint_per_day
            await context.commit('setPersonalMarcacionDiario',marcaciones);
        }
    } catch (e) {
        console.log(e.message);
    } finally {
        await context.commit('setLoading', false, { root: true })
    }
}

export async function obtenerMarcacionPersonalHistorial(context){
    console.log('personal historial')
    try {
        await context.commit('setLoading', true, { root: true }) 
        const data = await fetch(context.state.obtener_marcacion_personal_historial, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': context.rootState.auth.token
            }
        })
        let datos = await data.json()
        if(datos.error){
            context.commit('showMessageError', datos.error, { root: true })
        }else{
            let marcaciones = await datos.data.checkpoint_history
            await context.commit('setPersonalMarcacionHistorial',marcaciones);
        }
    } catch (e) {
        console.log(e.message);
    } finally {
        await context.commit('setLoading', false, { root: true })
    }
}

export async function busquedaMarcacionPersonalDiario(context, {nombre_personal, tipo_movimiento_id}){
    try {
        await context.commit('setLoading', true, { root: true }) 
        const data = await fetch(context.state.obtener_marcacion_personal_diario, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': context.rootState.auth.token
            },
            body: JSON.stringify({
                tipo_movimiento : tipo_movimiento_id,
                personal : nombre_personal
            })
        })
        let datos = await data.json()
        if(datos.error){
            context.commit('showMessageError', datos.error, { root: true })
        }else{
            let marcaciones = await datos.data.checkpoint_per_day
            await context.commit('setPersonalMarcacionDiario',marcaciones);
        }
    } catch (e) {
        console.log(e.message);
    } finally {
        await context.commit('setLoading', false, { root: true })
    }
}

export async function busquedaMarcacionPersonalHistorial(context, {nombre_personal, tipo_movimiento_id, fecha_inicio, fecha_fin}){
    try {
        await context.commit('setLoading', true, { root: true }) 
        const data = await fetch(context.state.obtener_marcacion_personal_historial, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': context.rootState.auth.token
            },
            body: JSON.stringify({
                tipo_movimiento : tipo_movimiento_id,
                personal : nombre_personal,
                start_date : fecha_inicio,
                end_date : fecha_fin
            })
        })
        let datos = await data.json()
        if(datos.error){
            context.commit('showMessageError', datos.error, { root: true })
        }else{
            let marcaciones = await datos.data.checkpoint_history
            console.log(marcaciones)
            await context.commit('setPersonalMarcacionHistorial',marcaciones);
        }
    } catch (e) {
        console.log(e.message);
    } finally {
        await context.commit('setLoading', false, { root: true })
    }
}

export async function siguientePaginaMarcacionPersonalDiario(context,url){
    console.log('next')
    try {
        const data = await fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': context.rootState.auth.token
            }
        })
        let datos = await data.json()
        if(datos.error){
            context.commit('showMessageError', datos.error, { root: true })
        }else{
            let marcaciones = await datos.data.checkpoint_per_day
            await context.commit('setPersonalMarcacionDiario',marcaciones);
        }
    } catch (e) {
        console.log(e.message);
    } finally {
    }
}

export async function siguientePaginaMarcacionPersonalHistorial(context,url){
    console.log('next')
    try {
        const data = await fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': context.rootState.auth.token
            }
        })
        let datos = await data.json()
        if(datos.error){
            context.commit('showMessageError', datos.error, { root: true })
        }else{
            let marcaciones = await datos.data.checkpoint_history
            await context.commit('setPersonalMarcacionHistorial',marcaciones);
        }
    } catch (e) {
        console.log(e.message);
    } finally {
    }
}

export async function siguientePaginaBusquedaMarcacionPersonalDiario(context,{nombre_personal, tipo_movimiento_id, next_page_url}){
    console.log('next')
    try {
        const data = await fetch(next_page_url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': context.rootState.auth.token
            },
            body: JSON.stringify({
                personal: nombre_personal,
                tipo_movimiento: tipo_movimiento_id
            })
        })
        let datos = await data.json()
        if(datos.error){
            context.commit('showMessageError', datos.error, { root: true })
        }else{
            let marcaciones = await datos.data.checkpoint_per_day
            await context.commit('setPersonalMarcacionDiario',marcaciones);
        }
    } catch (e) {
        console.log(e.message);
    } finally {
    }
}

export async function siguientePaginaBusquedaMarcacionPersonalHistorial(context,{nombre_personal, tipo_movimiento_id, fecha_inicio, fecha_fin, next_page_url}){
    console.log('next')
    try {
        const data = await fetch(next_page_url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': context.rootState.auth.token
            },
            body: JSON.stringify({
                personal: nombre_personal,
                tipo_movimiento: tipo_movimiento_id,
                start_date: fecha_inicio,
                end_date: fecha_fin
            })
        })
        let datos = await data.json()
        if(datos.error){
            context.commit('showMessageError', datos.error, { root: true })
        }else{
            let marcaciones = await datos.data.checkpoint_history
            await context.commit('setPersonalMarcacionHistorial',marcaciones);
        }
    } catch (e) {
        console.log(e.message);
    } finally {
    }
}

