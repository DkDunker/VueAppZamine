<template>
  <Page>
    <ActionBar>
      <GridLayout width="100%" columns="auto, *,auto">
        <Label class="fas" :text="'fa-bars' | fonticon" @tap="toggleDrawer()" col="0"/>
        <Label class="title" text="ASISTENCIAS"  col="1"/>
        <Label class="fas" :text="'fa-search' | fonticon" @tap="showModalSearch()" col="2"/>
      </GridLayout>
    </ActionBar>
    <StackLayout class="container" orientation="vertical" ~mainContent>
      <TabView
        height="100%"
        androidTabsPosition="bottom"
        tabBackgroundColor="#f47b20"
        tabTextColor="#ffffff"
        selectedTabTextColor="#d6d6d6"
        highlightColor="#d6d6d6"
        @selectedIndexChange="onSelectedIndexchanged"
      >
        <TabViewItem title="ASISTENCIA DIARIA" @tap="selectedIndex = 0">
          <StackLayout orientation="vertical" width="100%" height="100%">
            <AsistenciaDiaria ref="childMethodsAsistenciaDiaria"></AsistenciaDiaria>
          </StackLayout>
        </TabViewItem>
        <TabViewItem title="HISTORIAL ASISTENCIA" @tap="selectedIndex = 1">
          <StackLayout orientation="vertical" width="100%" height="100%">
            <HistorialAsistencia ref="childMethodsHistorialAsistencia"></HistorialAsistencia>
          </StackLayout>
        </TabViewItem>
      </TabView>
    </StackLayout>
  </Page>
</template>
<script>
import Vue from "nativescript-vue";
import { mapActions, mapState, mapGetters, mapMutations } from "vuex";
import { Application, Device, Color, isAndroid } from "@nativescript/core";
import sideDrawer from "../../mixins/sideDrawer";
import { TNSFancyAlert, TNSFancyAlertButton } from 'nativescript-fancyalert';
import AsistenciaDiaria from './components/AsistenciaDiaria';
import HistorialAsistencia from './components/HistorialAsistencia';
import SearchModalAsistenciaDiaria from './modal/SearchModalAsistenciaDiaria';
import SearchModalHistorialAsistencia from './modal/SearchModalHistorialAsistencia';


export default {
  mixins: [sideDrawer],
  components : {
    AsistenciaDiaria,
    HistorialAsistencia
  },
  data() {
    return {
      nombre_completo: "",
      selectedIndex:0,
    };
  },
  methods: {
    ...mapActions("tipoMovimiento", [
      "obtenerTiposMovimiento",
      "cambiarSeleccionTipoMovimiento",
    ]),
    ...mapActions("registroMarcacion", [
      "eliminarMarcacionPersonal",
      "eliminarArrayMarcacionPersonal",
      "guardarPersonalMarcacion"
    ]),
    ...mapMutations("sideDrawer", ["setGesturesEnabled"]),
    showModalSearch() {
      let self = this
      if(this.selectedIndex == 0){
        this.$showModal(SearchModalAsistenciaDiaria).then((returnvalue) =>{
            //self.filtros = returnvalue
            //self.asistencias_local = self.getPersonalMarcacionLogueado
            //self.$refs.listViewMiAsistencia.refresh();
            self.$refs.childMethodsAsistenciaDiaria.search(returnvalue)
          }
        );
      }else {
        this.$showModal(SearchModalHistorialAsistencia).then((returnvalue) =>{
            /*self.filtros = returnvalue
            self.asistencias_local = self.getPersonalMarcacionLogueado
            self.$refs.listViewMiAsistencia.refresh();*/
            console.log(returnvalue)
            self.$refs.childMethodsHistorialAsistencia.search(returnvalue)
          }
        );
      }
      
    },
    /*onItemTap({item}) {
      console.log(`Tapped on ${item.nombre_completo}`);
    },*/
    onSwipeStarted ({ data, object }) {
      const swipeLimits = data.swipeLimits
      const swipeView = object
      const leftItem = swipeView.getViewById('mark-view')
      const rightItem = swipeView.getViewById('delete-view')
      swipeLimits.right = rightItem.getMeasuredWidth()
      swipeLimits.threshold = leftItem.getMeasuredWidth() / 2
    },
    onRightSwipeClick ({ object }) {
      this.eliminarMarcacionPersonal((object.bindingContext).id)
    },
    refresh() {
      this.$refs.listView.refresh()
    },
    cancelar(){
      TNSFancyAlert.showColorDialog(
          "Advertencia!", 
          "Se eliminará la lista de marcaciones", 
          "Aceptar", 
          "Cancelar",
          "#f8f9fa",
          "#ffc107",
          "#000000",
          ).then(
        () => {
         this.eliminarArrayMarcacionPersonal()
        }
      );
    },
    confirmar(){
      TNSFancyAlert.showColorDialog(
          "Advertencia!", 
          "Se guardarán las marcaciones", 
          "Aceptar", 
          "Cancelar",
          "#f8f9fa",
          "#ffc107",
          "#000000"
          ).then(
        () => {
          this.guardarPersonalMarcacion(this.getPersonalMarcacion)
        }
      );
    },
    onSelectedIndexchanged(event){
      this.selectedIndex = event.value
      console.log(this.selectedIndex)
    }
  },
  computed: {
    
  },
  mounted() {
    this.setGesturesEnabled(true);
  },
};
</script>
<style lang="css" scoped>
.container {
  width: 100%;
  height: 100%;
}
.title-operation {
  horizontal-alignment: center;
  font-weight: bold;
  font-size: 20;
  margin-bottom: 5;
}
.ubicacion {
  horizontal-alignment: center;
  font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
  margin-bottom: 20;
}
.container-options {
  width: 100%;
  justify-content: space-around;
  margin-bottom: 20;
}
.container-options-lectura {
  width: 100%;
  justify-content: space-between;
  margin-bottom: 20;
}
.btn-component {
  width: 200;
}
.item {
  height: 80;
  margin-bottom: 10;
  margin-left: 10;
  margin-right: 10;
}
.title-list {
  horizontal-alignment: center;
  font-weight: bold;
  font-size: 20;
  font-family: Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;
}
.container-list {
  border-width: 1;
  border-color: #f47b20;
  border-radius: 15;
  margin-top: 10;
  padding-top: 10;
  padding-bottom: 10;
  margin-bottom: 10;
  margin: 0;
}
.item-image {
  height: 100%;
  width: 80;
  align-items: center;
}

.item-nombre {
  font-size: 16;
  font-weight: bold;
}

.item-tipo-movimiento {
  font-weight: bold;
}

.item-fecha,
.item-tipo-movimiento {
  font-size: 14;
  color: #000000;
}

.footer {
  width: 100%;
  margin-left: -10;
  margin-right: -10;
}

.btn-cancelar {
  width: 100%;
  border-top-left-radius: 10;
  border-bottom-left-radius: 10;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}

.btn-confirmar {
  width: 100%;
  border-top-right-radius: 10;
  border-bottom-right-radius: 10;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}
.option-selected {
  color:#f47b20;
}
.option {
  font-size:18;
  margin-right: 2;
}
</style>