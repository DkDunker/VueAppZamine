import Vue from 'nativescript-vue'
import store from './store'
import routes from './router/menu_principal'
import sideDrawer from './components/menu_lateral/sideDrawer'
import drawerContent from './components/menu_lateral/drawerContent'
import modulos from './components/menu_principal/Modulos'
import * as frameModule from "tns-core-modules/ui/frame"
import RadListView from 'nativescript-ui-listview/vue'

import TestUnico from './components/preguntas/TestUnico'
Vue.use(RadListView);

Vue.registerElement('RadSideDrawer', () => require('nativescript-ui-sidedrawer').RadSideDrawer)
Vue.registerElement("CardView", () => require("@nstudio/nativescript-cardview").CardView);
Vue.registerElement("RadDataForm", () => require("nativescript-ui-dataform").RadDataForm);
Vue.registerElement("DropDown", () => require("nativescript-drop-down/drop-down").DropDown);
Vue.registerElement(
  'CheckBox',
  () => require('@nstudio/nativescript-checkbox').CheckBox,
  {
    model: {
      prop: 'checked',
      event: 'checkedChange'
    }
  }
);
Vue.registerElement('BarcodeView', () => require('@nativescript-community/ui-barcodeview').BarcodeView);

// Set up routes as a prototype to use throuhout the app.
Vue.prototype.$routes = routes

import { TNSFontIcon, fonticon } from 'nativescript-fonticon';

TNSFontIcon.debug = true;
TNSFontIcon.paths = {
  'fa': './assets/css/fontawesome.css',
  'far': './assets/css/regular.min.css',
  'fas': './assets/css/solid.min.css',
  'fab': './assets/css/brands.min.css'
};
TNSFontIcon.loadCss();

Vue.filter('fonticon', fonticon);

// Prints Vue logs when --env.production is *NOT* set while building
Vue.config.silent = (TNS_ENV === 'production')

const app = new Vue({
  store,
  render(h) {
    return h(
      sideDrawer,
      [
        h( drawerContent, { slot: 'drawerContent' }),
        h( this.$store.getters['auth/getIsLogged'] ? routes.Modulos : routes.Login, { slot: 'mainContent' })
      ]
    )
  }
  //render: h => h('frame',[h(TestUnico)])
});

/*new v({
  render: h => h("frame", [h(loggedIn ? routes.home :
    (applicationSettingsService.getUsername() ? routes.login : routes.onboarding))])
}).$start();*/

Vue.showMyModal = function (component, options) {
  return new Promise((resolve) => {

    const closeCb = function (data) {
      resolve(data);
    }

    const opts = Object.assign({}, options, {
      context: null,
      closeCallback: closeCb
    })

    const modelInstance = new Vue({
      name: 'ModalEntry',
      methods: {
        closeCb: closeCb
      },
      render: function (h) {
        return h(component, {
          props: opts.props
        })
      }
    })
    const modalPage = modelInstance.$mount().$el.nativeView
    frameModule.topmost().showModal(modalPage, opts)
  })
}

app.$start()