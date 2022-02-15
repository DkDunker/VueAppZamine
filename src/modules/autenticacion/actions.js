import Vue from 'nativescript-vue'; //si utilizamos axios
import Modulos from '../../components/menu_principal/Modulos.vue';

export async function loginIn(context, { username, password }) {
  try {
    await context.commit('setLoading', true, { root: true }) // si queremos colocar un loader
    const data = await fetch(context.state.url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: username,
        password: password
      })
    })

    const login = await data.json()
    if (login.error) {
      await context.commit('authError', login.error)
      context.commit('showMessageError', login.error, { root: true })
    } else {
      context.commit('setUser', {
        username,
        login,
      })
      const menus = await login.data.modulos
      await context.commit('menuPrincipal/setMenu', menus, { root: true })

      const personal = await login.data.personal.personal
      await context.commit('personalModule/setPersonal', personal, { root: true })

      const qr_code_url = await login.data.qr_image_url
      await context.commit('personalModule/setQRCodeUrl', qr_code_url, { root: true })

      await context.dispatch('personalModule/setFoto', null, { root: true })

      Vue.prototype.$navigateTo(Modulos)
    }
  } catch (e) {
    //console.log(e.message);
    context.commit('authError', e.message)
    context.commit('showMessageError', e.message, { root: true })
  } finally {
    context.commit('setLoading', false, { root: true }) // deshabilitar el loader
  }
}