/*export async function setQRCode(context) {
    console.log(context.rootState.auth.token);
    try {
        //context.commit('setLoading', true, { root: true }) // si queremos colocar un loader
        const data = await fetch(context.state.qr_code_url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': context.rootState.auth.token
            },
        })

        const qr_code = await data.json()
        console.log(qr_code)
        context.commit('setQRCode', qr_code)
    } catch (e) {
        console.log(e.message);
        //context.commit('authError', e.message)
    } finally {
        //context.commit('setLoading', false, { root: true }) // deshabilitar el loader
    }
}*/

export async function setFoto (context){
    console.time("t1");
    const url_foto =  context.state.personal.url_foto + context.state.personal.id
    const data      = await fetch(url_foto ,{
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': context.rootState.auth.token
      },
    }).catch(function(error) {
      console.log('Hubo un problema con la petición Fetch:' + error.message);
    });

    let datos = await data.json()
    if(datos.error){
        const imagen    = null;
        context.commit('setfoto',imagen);
    }else{
        const imagen    = datos;
        context.commit('setfoto',imagen);
    }
    console.timeEnd("t1");
    
}