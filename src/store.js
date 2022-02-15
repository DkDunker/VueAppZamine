import Vue from 'nativescript-vue';
import Vuex from 'vuex';
import auth from './modules/autenticacion';
import personalModule from './modules/personal';
import menuPrincipal from './modules/menu_principal';
import tipoMovimiento from './modules/tipo_movimiento';
import registroMarcacion from './modules/registro_marcacion';
import { TNSFancyAlert, TNSFancyAlertButton } from 'nativescript-fancyalert';
import sideDrawer from './modules/side_drawer';
import menuLateral from './modules/menu_lateral';

Vue.use(Vuex);

const LoadingIndicator = require('@nstudio/nativescript-loading-indicator')
  .LoadingIndicator;
const Mode = require('@nstudio/nativescript-loading-indicator').Mode;

const loader = new LoadingIndicator();

const options = {
  /*message: 'Iniciando Sesión...',
  details: 'Conectando al servidor',
  progress: 0.60,
  margin: 10,*/
  dimBackground: true,
  color: '#1D16C3', // color of indicator and labels
  // background box around indicator
  // hideBezel will override this if true
  backgroundColor: 'white',
  userInteractionEnabled: true, // default true. Set false so that the touches will fall through it.
  //hideBezel: true, // default false, can hide the surrounding bezel
  /*mode: Mode.Indeterminate, // see options below
  android: {
    elevation: 50,
    progressStyle : 10,
    secondaryProgress: 5
  },*/
  
  /*ios: {
    view: UIView, // Target view to show on top of (Defaults to entire window)
  },*/
};

export default new Vuex.Store({
  state: {
    loading: false,
  },
  modules:{
    auth, 
    personalModule,
    menuPrincipal,
    sideDrawer,
    tipoMovimiento,
    registroMarcacion,
    menuLateral
  },
  mutations: {
    setLoading(state,bool){
      state.loading = bool
      if(state.loading){
        loader.show(options); 
      }else{
        loader.hide();
      }
    },
    showMessageError(state,messageError){
      TNSFancyAlert.showError(
        "Error!",
        messageError,
        "Cerrar"
      ).then(() => {
        /* user pressed the button */
      });
    },
    showMessageSuccess(state,messageSuccess){
      TNSFancyAlert.showSuccess(
        "¡Éxito!",
        messageSuccess,
        "Cerrar"
      ).then(() => {
        /* user pressed the button */
      });
    }
    
  },
  actions:{
    
  }
});

