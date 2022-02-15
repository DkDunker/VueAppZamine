<template>
  <GridLayout id="form-content" class="form-content" >
    <StackLayout v-if="asistencias_local.length > 0" class="fields-section">
      <RadListView
        ref="listViewHistorialAsistencia"
        for="asistencia in asistencias_local"
        height="100%"
        loadOnDemandMode="Auto"
        @loadMoreDataRequested="onLoadMoreItemsRequested"
      >
        <v-template>
          <GridLayout columns="2*,*" rows="auto,*" class="item">
            <Label
                :text="asistencia.personal ? asistencia.personal.nombres + ' ' + asistencia.personal.apellido_paterno+ ' ' + asistencia.personal.apellido_materno : 'Sin Personal'"
                class="list-item-heading"
                textAlignment="center"
                row="0" colSpan="2"
            />  
            <StackLayout class="list-group-item" row="1" col="0">
              <Label
                :text="asistencia.proyecto ? asistencia.proyecto.nombre : 'Sin Operación'"
                class="list-group-item-text"
                textAlignment="left"
              />
              <Label
                :text="asistencia.fecha_hora"
                textWrap="true"
                class="list-group-item-text"
                textAlignment="left"
              />
            </StackLayout>
            <StackLayout
              class="list-group-item"
               height="100%"
               row="1" 
               col="1"
            >
              <Label
                :text="asistencia.movimiento.nombre"
                class="list-group-item-right"
                textAlignment="center"
                :color="
                  asistencia.movimiento.nombre == 'Ingreso'
                    ? '#2e7d32'
                    : '#e53935'
                "
              />
            </StackLayout>
          </GridLayout>
        </v-template>
      </RadListView>
    </StackLayout>
    <StackLayout v-else class="fields-section">
        <Label text="Sin Registros" height="100%" textWrap="true" fontSize="20"
              color="#afafaf" @loaded="onLabelLoaded" />
        
    </StackLayout>
  </GridLayout>
</template>
<script>
import Vue from "nativescript-vue";
import { mapActions, mapState, mapGetters, mapMutations } from "vuex";
import { Application, Device, Color, isAndroid } from "@nativescript/core";
import { TNSFancyAlert, TNSFancyAlertButton } from "nativescript-fancyalert";
import { RadListView } from 'nativescript-ui-listview';

export default {
  data() {
    return {
      asistencias_local: [],
      filtros: ''
    };
  },
  
  methods: {
    ...mapActions("registroMarcacion", ["obtenerMarcacionPersonalHistorial", "siguientePaginaMarcacionPersonalHistorial","siguientePaginaBusquedaMarcacionPersonalHistorial"]),
    onLoadMoreItemsRequested(args) {
      const listView = args.object;
      let self = this;
      if (this.getPersonalMarcacionHistorialCabecera.total > this.asistencias_local.length) {
          setTimeout(function () {
            console.log('Loading more items...');
            self.siguienteMarcacionPersonalHistorialLocal(listView)
          }, 0);
          args.returnValue = true;
      } else {
          args.returnValue = false;
          listView.notifyAppendItemsOnDemandFinished(0, true);
      }
    },
    async obtenerMarcacionPersonalHistorialLocal(){
      await this.obtenerMarcacionPersonalHistorial();
      this.asistencias_local = this.asistencias_local.concat(this.getPersonalMarcacionHistorial)
    },
    async siguienteMarcacionPersonalHistorialLocal(listView){
      if(this.filtros != ''){
        this.filtros.next_page_url = this.getPersonalMarcacionHistorialCabecera.next_page_url
        await this.siguientePaginaBusquedaMarcacionPersonalHistorial(this.filtros)
      }else{
        await this.siguientePaginaMarcacionPersonalHistorial(this.getPersonalMarcacionHistorialCabecera.next_page_url)
      }
      const items = this.getPersonalMarcacionHistorial;
      this.asistencias_local.push(...items);
      listView.notifyAppendItemsOnDemandFinished(items.length);
    },
    search(filtros){
      console.log(filtros)
        this.filtros = filtros
        this.asistencias_local = this.getPersonalMarcacionHistorial
        this.$refs.listViewHistorialAsistencia.refresh();
    },
    onLabelLoaded(args) {
      if (isAndroid) {
        args.object.nativeView.setGravity(17);
      }
    },
  },
  computed: {
      ...mapGetters("registroMarcacion", ["getPersonalMarcacionHistorial", "getPersonalMarcacionHistorialCabecera"]),
  },
  mounted() {},
  created() {
    this.obtenerMarcacionPersonalHistorialLocal()
  }
};
</script>
<style lang="css" scoped>
.form-content {
  background-color: rgb(255, 255, 255);
  padding-top: 20;
  height: 100%;
}

.fields-section {
  margin-left: 16;
  margin-right: 16;
  height: 100%;
}

.item {
  border-bottom-width : 1;
  border-bottom-color :#8d8a8a;
}

.list-item-heading{
    font-size: 16;
    font-weight: bold;
    margin: 0;
    padding:0
}
.list-group-item{
    padding-top:0
}
.list-group-item-right{
    font-weight: bold;
}
</style>