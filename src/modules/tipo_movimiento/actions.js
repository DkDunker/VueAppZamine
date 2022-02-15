import Vue from 'nativescript-vue'; //si utilizamos axios

export async function obtenerTiposMovimiento(context) {
  console.log(context.getters.getTiposMovimiento)
  if(context.getters.getTiposMovimiento.length === 0) { 
    try {
      context.commit('setLoading', true, { root: true }) // si queremos colocar un loader
      const url_get_tipos_movimiento =  context.state.url_get_tipos_movimiento
      const data = await fetch(url_get_tipos_movimiento, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': context.rootState.auth.token
        },
      })
      let tipos_movimiento = await data.json()
      
      if (tipos_movimiento.error) {
        context.commit('showMessageError', tipos_movimiento.error, { root: true })
      } else {
        tipos_movimiento = await tipos_movimiento.data.type_movement
        await context.commit('tipoMovimiento/setTipoMovimiento', tipos_movimiento, { root: true })
  
        const tipo_movimiento_seleccionado = await context.commit('getTipoMovimientoSeleccionado')
        await context.commit('registroMarcacion/setTipoMovimiento', tipo_movimiento_seleccionado, { root: true })
      }
    } catch (e) {
      context.commit('showMessageError', e.message, { root: true })
    } finally {
      context.commit('setLoading', false, { root: true }) // deshabilitar el loader
    }
  }
}

export async function cambiarSeleccionTipoMovimiento(context,tipo_movimiento_id){
    await context.commit('tipoMovimiento/cambiarSeleccionTipoMovimiento', tipo_movimiento_id, { root: true })
    await context.commit('registroMarcacion/setTipoMovimiento', tipo_movimiento_id, { root: true })
}