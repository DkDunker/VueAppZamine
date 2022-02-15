<template>
  <Page actionBarHidden="true">
    <StackLayout class="container">
      <GridLayout columns="*, 40, 40" rows="auto" class="header">
        <Label
          class="title-header"
          textWrap="true"
          text="PREGUNTAS"
          row="0"
          col="0"
          @loaded="onLabelLoaded"
        />
        <Label
          class="title-header"
          text="SI"
          row="0"
          col="1"
          @loaded="onLabelLoaded"
        />
        <Label
          class="title-header"
          text="NO"
          row="0"
          col="2"
          @loaded="onLabelLoaded"
        />
      </GridLayout>
      <StackLayout class="container-questions">
        <ScrollView height="100%">
          <StackLayout width="100%">
            <GridLayout columns="*, 40, 40" rows="auto" class="fila-pregunta">
              <Label
                class="pregunta"
                text="Posibles valores: Número absoluto (valor fijo de la columna), auto (hace que la columna sea tan ancha como su elemento hijo más ancho) o * (hace que la columna ocupe todo el espacio horizontal disponible."
                row="0"
                col="0"
                textWrap="true"
              />
              <StackLayout
                row="0"
                col="1"
                class="opciones"
                verticalAlignment="center"
              >
                <check-box boxType="circle" fillColor="orange" />
              </StackLayout>
              <StackLayout
                row="0"
                col="2"
                class="opciones"
                verticalAlignment="center"
              >
                <check-box boxType="circle" fillColor="orange" />
              </StackLayout>
            </GridLayout>
          </StackLayout>
        </ScrollView>
      </StackLayout>
    </StackLayout>
  </Page>
</template>
<script>
import Vue from "nativescript-vue";
import { mapActions, mapMutations, mapState, mapGetters } from "vuex";
import * as application from "@nativescript/core/application";
import { isAndroid } from "@nativescript/core";
//import sideDrawer from "../mixins/sideDrawer";
//const app= require("tns-core-modules/application");

export default {
  //mixins: [sideDrawer],
  data() {
    return {
      filas: "auto,auto,auto,auto,auto",
    };
  },
  methods: {
    //...mapActions("auth", ["loginIn"]),
    //...mapMutations("sideDrawer", ["setGesturesEnabled"]),
    loguearse() {},
    showFeedbackError() {},
    showSuccess() {},
    onLabelLoaded(args) {
      if (isAndroid) {
        args.object.nativeView.setGravity(17);
      }
    },
  },
  computed: {
    //...mapState("auth", ["isLogged"]),
    //...mapGetters("menuLateral", ["getPages"]),
  },
  mounted() {
    //this.$store.commit("setGesturesEnabled", false);
    //this.setGesturesEnabled(false)
    //this.onLabelLoaded()
  },
  created() {},
};
</script>
<style lang="scss" scoped>
.container {
  padding-top: 10;
  padding-bottom: 10;
  padding-left: 10;
  padding-right: 10;
  width: 100%;
  height: 100%;
}
.container-questions {
  padding-top: 10;
  padding-bottom: 10;
  padding-left: 10;
  width: 100%;
  height: 100%;
  border-width: 1;
  border-color: darkgoldenrod;
  border-bottom-left-radius: 10;
  border-bottom-right-radius: 10;
}
.header {
  height: 40;
  background-color:#f47b20;
  border-top-left-radius: 10;
  border-top-right-radius: 10;
}
.title-header {
  height: 100%;
  font-weight: bold;
  font-size: 15;
}
.fila-pregunta {
  min-height: 40;
}
.pregunta {
  height: 100%;
  font-size: 14;
}
</style>