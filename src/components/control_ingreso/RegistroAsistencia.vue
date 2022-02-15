<template>
  <Page>
    <ActionBar>
      <GridLayout width="100%" columns="auto, *">
        <Label
          class="fas"
          :text="'fa-bars' | fonticon"
          @tap="toggleDrawer()"
          col="0"
        />
        <Label class="title" text="REGISTRO DE ASISTENCIA" col="1" />
      </GridLayout>
    </ActionBar>
    <StackLayout class="container" orientation="vertical" ~mainContent>
      <Label
        class="title-operation"
        text="Centro de Operaciones"
        textWrap="true"
      />
      <Label
        class="ubicacion"
        text="(Bolivar 650,Lambayeque 14013,Perú)"
        textWrap="true"
      />
      <FlexboxLayout v-if="getPersonalMarcacion.length == 0" class="container-options">
        <StackLayout
          v-for="tipo_marcacion in getTiposMovimiento"
          :key="tipo_marcacion.id"
        >
          <check-box
            :id="tipo_marcacion.id"
            boxType="circle"
            :checked="tipo_marcacion.selected"
            @checkedChange="
              $event.value !== tipo_marcacion.selected &&
                changeCheckedRadio(tipo_marcacion)
            "
            :text="tipo_marcacion.nombre"
            fillColor="orange"
          />
        </StackLayout>
      </FlexboxLayout>
      <FlexboxLayout v-else class="container-options">
        <StackLayout
          v-for="tipo_marcacion in getTiposMovimiento"
          :key="tipo_marcacion.id"
          orientation="horizontal"
        >
          <Label class="option fas" v-if="tipo_marcacion.selected" :text="'fa-dot-circle' | fonticon" v-bind:class="{ 'option-selected' : tipo_marcacion.selected }"/>
          <Label class="option fas" v-else :text="'fa-circle' | fonticon" style="color : #8d8a8a" />
          <Label class="option " v-model="tipo_marcacion.nombre" />
        </StackLayout>
      </FlexboxLayout>
      <FlexboxLayout class="container-options-lectura">
        <Button
          text="Leer Qr"
          class="btn btn-zamine-transparente btn-component"
          @tap="showModalMarcacionQR()"
        />
        <Button
          text="Marcación Manual"
          class="btn btn-zamine-transparente btn-component"
          @tap="showModalMarcacionManual()"
        />
      </FlexboxLayout>
      <Label
        class="title-list"
        text="Marcaciones por confirmar"
        textWrap="true"
      />
      <GridLayout rows="*,auto">
        <StackLayout row="0" class="container-list">
          <GridLayout orientation="vertical"  v-show="getPersonalMarcacion.length > 0" rows="auto, *">
            <RadListView
              ref="listView"
              for="persona_marcacion in getPersonalMarcacion"
              swipeActions="true"
              @itemSwipeProgressStarted="onSwipeStarted"
            >
              <v-template>
                <FlexboxLayout
                  flexWrap="wrap"
                  width="100%"
                >
                  <card-view elevation="20" width="100%" class="item">
                    <GridLayout
                      columns="auto,*"
                      paddingBottom="10"
                      style="text-align: center"
                    >
                      <StackLayout class="item-image" col="0" marginTop="10">
                        <Image
                          v-if="persona_marcacion.imagen_url != ''"
                          :src="persona_marcacion.imagen_url"
                          height="100%"
                          loadMode="async"
                        />
                        <Image
                          v-else
                          src="~/assets/images/user_icon_4.png"
                          height="100%"
                          loadMode="async"
                        />
                      </StackLayout>
                      <StackLayout col="1">
                        <GridLayout
                          rows="30,auto"
                          columns="150,*"
                          width="100%"
                          style="align-items: center"
                        >
                          <Label
                            class="item-nombre"
                            :text="persona_marcacion.nombre_completo"
                            row="0"
                            colSpan="2"
                          />
                          <Label
                            class="item-fecha"
                            :text="persona_marcacion.fecha_hora"
                            row="1"
                            col="0"
                          />
                          <Label
                            class="item-tipo-movimiento"
                            text="Ingreso"
                            row="1"
                            col="1"
                          />
                        </GridLayout>
                      </StackLayout>
                    </GridLayout>
                  </card-view>
                </FlexboxLayout>
              </v-template>
              <v-template name="itemswipe">
                <GridLayout padding="0"  margin="0" columns="auto, *, auto">
                  <StackLayout
                    id="mark-view"
                    col="0"
                    class="swipe-item left"
                    orientation="horizontal"
                  >
                    <Label
                      text="mark"
                      verticalAlignment="center"
                      horizontalAlignment="center"
                    />
                  </StackLayout>
                  <StackLayout
                    id="delete-view"
                    col="2"
                    class="swipe-item right"
                    backgroundColor="#ff4444"
                    orientation="horizontal"
                    marginBottom="10"
                    marginRight="10"
                    borderTopRightRadius="5"
                    borderBottomRightRadius="5"
                    @tap="onRightSwipeClick"
                  >
                    <Label
                      class="fas"
                      :text="'fa-user-minus' | fonticon"
                      color="white"
                      verticalAlignment="center"
                      horizontalAlignment="center"
                    />
                  </StackLayout>
                </GridLayout>
              </v-template>
            </RadListView>
          </GridLayout>
          <FlexboxLayout
            v-show="getPersonalMarcacion.length == 0"
            flexWrap="wrap"
            width="100%"
            height="100%"
            paddingTop="10"
            alignItems="center"
            justifyContent="center"
            paddingBottom="10"
          >
            <Label
              text="Sin Marcaciones"
              verticalAlign="center"
              fontSize="20"
              color="#afafaf"
            />
          </FlexboxLayout>
        </StackLayout>
        <GridLayout row="1" class="footer" columns="*,*">
          <Button text="Cancelar" class="btn btn-cancelar" col="0" @tap="cancelar" :isEnabled="getPersonalMarcacion.length > 0"/>
          <Button text="Confirmar" class="btn btn-confirmar" col="1" @tap="confirmar" :isEnabled="getPersonalMarcacion.length > 0"/>
        </GridLayout>
      </GridLayout>
    </StackLayout>
  </Page>
</template>
<script>
import Vue from "nativescript-vue";
import { mapActions, mapState, mapGetters, mapMutations } from "vuex";
import { Application, Device, Color, isAndroid } from "@nativescript/core";
import MarcacionManualModal from "./modal/MarcacionManualModal";
import MarcacionQR from "./modal/MarcacionQR";
import sideDrawer from "../../mixins/sideDrawer";
import { TNSFancyAlert, TNSFancyAlertButton } from 'nativescript-fancyalert';
import * as geolocation from "nativescript-geolocation";
import {Feedback, FeedbackType, FeedbackPosition} from "nativescript-feedback";

const feedback = new Feedback();

const permissions = require("nativescript-permissions");

export default {
  mixins: [sideDrawer],
  data() {
    return {
      nombre_completo: "",
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
    changeCheckedRadio(tipo_marcacion) {
      tipo_marcacion.selected = !tipo_marcacion.selected;

      if (!tipo_marcacion.selected) {
        return;
      }
      this.cambiarSeleccionTipoMovimiento(tipo_marcacion.id);
    },
    showModalMarcacionManual() {
      this.$showModal(MarcacionManualModal).then((returnvalue) =>
        console.log(returnvalue)
      );
    },
    showModalMarcacionQR() {
      //permiso para acceder a la cámara
      if (permissions.hasPermission(android.Manifest.permission.CAMERA)) {
        //obs.set("message", "You have already granted this permission");
        this.$showModal(MarcacionQR).then((returnvalue) =>
          console.log(returnvalue)
        );
      }
      
      const perm = permissions.requestPermission(android.Manifest.permission.CAMERA, "Se necesita el permiso para acceder a la cámara!");
      perm.then(() => {
          console.log('Concediste el permiso para acceder a la cámara!')
          this.$showModal(MarcacionQR).then((returnvalue) =>
            console.log(returnvalue)
          );
          //checkPerms();
      }).catch(() => {
          console.log("Sin permiso para accedes a la cámara!");
          //checkPerms();
      });
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
    verificarPermisoUbicacion()
    {
      console.log(permissions.hasPermission(android.Manifest.permission.ACCESS_FINE_LOCATION))
      /*if (permissions.hasPermission(android.Manifest.permission.ACCESS_FINE_LOCATION)) {
        this.obtenerTiposMovimiento();
      }else{*/
        permissions.requestPermission(android.Manifest.permission.ACCESS_FINE_LOCATION, "Se necesita el permiso para acceder a la ubicación actual!")
        .then((resultado) => {
          console.log(resultado)
            console.log('Concediste el permiso para acceder a la ubicación actual!')
            this.obtenerTiposMovimiento()
            this.habilitarUbicacion()
        }).catch((resultado) => {
          console.log(resultado)
            console.log("Sin permiso para acceder a la ubicación actual!");
            this.verificarPermisoUbicacion()
        });
      /*}*/
    },
    habilitarUbicacion()
    {
      console.log(geolocation.isEnabled())
      var self = this
      geolocation.isEnabled().then(function (isEnabled) {
          if (!isEnabled) {
              geolocation.enableLocationRequest(true, true).then(() => {
                  console.log("El usuario ha habilitado el servicio de Ubicación");
              }, (e) => {
                  console.log("Error: " + (e.message || e));
                  self.messageUbicacionNoHabilitada();
              }).catch(ex => {
                  console.log("No se puede habiitar la Ubicación", ex);
                  self.messageUbicacionNoHabilitada();
              });
          }
      }, function (e) {
          console.log("Error: " + (e.message || e));
          self.messageUbicacionNoHabilitada();
      });
    },
    messageUbicacionNoHabilitada()
    {
      feedback.warning({
          message: "El GPS no ha sido habilitado"
      });
    }
  },
  computed: {
    ...mapGetters("personalModule", ["getPersonal"]),
    ...mapGetters("tipoMovimiento", ["getTiposMovimiento"]),
    ...mapGetters("registroMarcacion", ["getPersonalMarcacion"]),
    concatenarNombreCompleto() {
      return (this.nombre_completo =
        this.getPersonal.nombres +
        " " +
        this.getPersonal.apellido_paterno +
        " " +
        this.getPersonal.apellido_materno);
    },
  },
  mounted() {
    this.setGesturesEnabled(true);
    this.verificarPermisoUbicacion();
  },
};
</script>
<style lang="css" scoped>
.container {
  width: 100%;
  height: 100%;
  padding-top: 10;
  padding-right: 10;
  padding-left: 10;
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