<template>
  <Page>
    <ActionBar>
      <GridLayout width="100%" columns="auto, *,auto">
        <Label class="fas" :text="'fa-bars' | fonticon" @tap="toggleDrawer()" col="0"/>
        <Label class="title" text="MIS ASISTENCIAS"  col="1"/>
        <Label class="fas" :text="'fa-search' | fonticon" @tap="showModalSearch()" col="2"/>
      </GridLayout>
    </ActionBar>
    <GridLayout id="example-background" ~mainContent>
      <GridLayout id="form-content" class="form-content" rows="auto,*,auto">
        <!--<StackLayout class="top-border" row="0" />-->
        <StackLayout row="1" class="fields-section">
          <RadListView
              ref="listViewMiAsistencia"
              for="asistencia in asistencias_local"
              height="100%"
              loadOnDemandMode="Auto"
              @loadMoreDataRequested="onLoadMoreItemsRequested"
            >
            <v-template>
              <GridLayout columns="2*,*" rows="*" class="item">
                <StackLayout class="list-group-item" row="0" col="0">
                  <Label :text="asistencia.proyecto ? asistencia.proyecto.nombre : 'Sin Operación'" class="list-group-item-heading" textAlignment="left"/>
                  <Label :text="asistencia.fecha_hora" textWrap="true" class="list-group-item-text" textAlignment="left"/>
                </StackLayout>
                <StackLayout class="list-group-item" row="0" col="1" textAlignment="left">
                  <Label :text="asistencia.movimiento.nombre" class="list-group-item-heading" textAlignment="left" :color="asistencia.movimiento.nombre == 'Ingreso' ? '#2e7d32': '#e53935'"/>
                </StackLayout>
              </GridLayout>
            </v-template>
          </RadListView>
        </StackLayout>
      </GridLayout>
      <!-- Picture -->
      <Image v-if="personal.foto" id="image" :src="personal.foto" class="profile-picture" stretch="fill" />
      <Image
            v-else
            id="image"
            src="~/assets/images/user_icon_4.png"
            class="profile-picture" 
            stretch="fill"
          />
    </GridLayout>
  </Page>
</template>
<script>
import Vue from "nativescript-vue";
import { mapActions, mapState, mapMutations, mapGetters } from "vuex";
import sideDrawer from "../../../mixins/sideDrawer";
import SearchModal from "./modal/SearchModal";
import { RadListView } from 'nativescript-ui-listview';

export default {
  mixins: [sideDrawer],
  data() {
    return {
      nombre_completo: '',
      asistencias_local: [],
      filtros: ''
    };
  },
  methods: {
    ...mapMutations("sideDrawer", ["setGesturesEnabled"]),
    ...mapActions("registroMarcacion", ["obtenerMarcacionPersonalLogueado", "siguientePaginaMarcacionPersonalLogueado","siguientePaginaBusquedaMarcacionPersonalLogueado"]),
    showModalSearch(){
      var self = this
      this.$showModal(SearchModal)
          .then((returnvalue) => {
            self.filtros = returnvalue
            self.asistencias_local = self.getPersonalMarcacionLogueado
            self.$refs.listViewMiAsistencia.refresh();
          }
      );
    },
    onLoadMoreItemsRequested(args) {
      const listView = args.object;
      let self = this;
      if (this.getPersonalMarcacionLogueadoCabecera.total > this.asistencias_local.length) {
          setTimeout(function () {
            console.log('Loading more items...');
            self.siguienteMarcacionPersonalLogueadoLocal(listView)
          }, 0);
          args.returnValue = true;
      } else {
          args.returnValue = false;
          listView.notifyAppendItemsOnDemandFinished(0, true);
      }
    },
    async obtenerMarcacionPersonalLogueadoLocal(){
      await this.obtenerMarcacionPersonalLogueado();
      this.asistencias_local = this.asistencias_local.concat(this.getPersonalMarcacionLogueado)
    },
    async siguienteMarcacionPersonalLogueadoLocal(listView){
      if(this.filtros != ''){
        this.filtros.next_page_url = this.getPersonalMarcacionLogueadoCabecera.next_page_url
        await this.siguientePaginaBusquedaMarcacionPersonalLogueado(this.filtros)
      }else{
        await this.siguientePaginaMarcacionPersonalLogueado(this.getPersonalMarcacionLogueadoCabecera.next_page_url)
      }
      const items = this.getPersonalMarcacionLogueado;
      this.asistencias_local.push(...items);
      listView.notifyAppendItemsOnDemandFinished(items.length);
    },
    refresh() {
      this.$refs.listViewMiAsistencia.refresh()
    },
  },
  computed: {
    ...mapState("personalModule", ["personal"]),
    ...mapGetters("registroMarcacion", ["getPersonalMarcacionLogueado", "getPersonalMarcacionLogueadoCabecera"]),
    concatenarNombreCompleto() {
      return (this.nombre_completo =
        this.personal.nombres +
        " " +
        this.personal.apellido_paterno +
        " " +
        this.personal.apellido_materno);
    },
    
    /*asistencias(){
      this.asistencias_local = this.asistencias_local.concat(this.getPersonalMarcacionLogueado)
      return this.asistencias_local
    },*/
  },
  mounted() {
    this.setGesturesEnabled(true)
  },
  created(){
    this.obtenerMarcacionPersonalLogueadoLocal()
  }
};
</script>
<style lang="css" scoped>
#example-background {
  background: linear-gradient(to right, #F1C179, #F1C179);
}
﻿.profile-picture {
  width: 80;
  height: 80;
  border-radius: 40;
  margin-top: 20;
  vertical-align: top;
  horizontal-align: center;
  transform: scale(0.8, 0.8);
  animation-name: picture;
  animation-duration: 0.3;
  opacity: 0;
  animation-delay: 0.7;
  animation-fill-mode: forwards;
}

@keyframes picture {
  from {
    opacity: 0;
    transform: scale(2, 2);
    animation-timing-function: ease-in;
  }
  to {
    opacity: 1;
    transform: scale(1, 1);
  }
}

/*.top-border {
  height: 2;
  background-color: #899bfe;
  margin-bottom: 40;
}*/

@keyframes play {
  from {
    opacity: 0.3;
    transform: scale(0.6, 0.6);
  }
  60% {
    opacity: 0.6;
    transform: scale(1.1, 1.1);
    animation-timing-function: ease-in;
  }
  to {
    opacity: 1;
    transform: scale(1, 1);
  }
}

.form-content {
  background-color: white;
  margin-top: 60;
  /*margin-left: 42;
  margin-right: 42;
  margin-bottom: 30;*/
  opacity: 0.6;
  transform: scale(0.8, 0.8);
  animation-name: play;
  animation-fill-mode: forwards;
  animation-duration: 0.6;
  border-top-left-radius: 60%;
  border-top-right-radius: 60%;
}

.fields-section {
  margin-left: 16;
  margin-right: 16;
  margin-top: 60;
}

.field-title {
  horizontal-align: left;
  font-size: 12;
  color: #1e2d7e;
  margin-top: 6;
}

.field-switch-title {
  font-size: 16;
  margin-top: 6;
}

.field {
  font-size: 14;
}

.field-multiline {
  font-size: 14;
  margin-left: -4;
}

.field-switch {
  horizontal-align: right;
  margin-top: 6;
  background-color: #bbe9ff;
  color: #30bcff;
}

.line {
  visibility: collapse;
}

.checkbox {
  width: 18;
  height: 18;
  margin: 8 10 0 0;
  horizontal-align: left;
}

.update {
  horizontal-align: stretch;
  text-align: center;
  color: white;
  background-color: #30bcff;
  font-size: 16;
  text-transform: uppercase;
}

.qr-picture {
  width: 250;
  height: 250;
  border-radius: 40;
  margin-top: 50;
  vertical-align: top;
  horizontal-align: center;
  transform: scale(0.8, 0.8);
  animation-name: picture;
  animation-duration: 0.3;
  opacity: 0;
  animation-delay: 0.7;
  animation-fill-mode: forwards;
}

.item {
  border-bottom-width : 1;
  border-bottom-color :#8d8a8a;
}

</style>