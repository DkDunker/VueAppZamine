<template>
  <Page>
    <ActionBar>
      <GridLayout width="100%" columns="auto, *">
        <Label class="fas" :text="'fa-bars' | fonticon" @tap="toggleDrawer()" col="0"/>
        <Label class="title" text="MI PERFIL"  col="1"/>
      </GridLayout>
    </ActionBar>
    <GridLayout id="example-background" ~mainContent>
      <GridLayout id="form-content" class="form-content" rows="auto,*,auto">
        <!--<StackLayout class="top-border" row="0" />-->
        <ScrollView row="1" class="fields-section">
          <StackLayout>
            <!-- Username -->
            <GridLayout ios:columns="auto,*" android:rows="auto, auto" verticalAlignment="top">
              <Label text="Nombre" class="field-title" />
              <Label :text="concatenarNombreCompleto" class="field" ios:col="1" android:row="1" />
            </GridLayout>
            <StackLayout class="line" />
            <!-- Email -->
            <GridLayout ios:columns="auto,*" android:rows="auto, auto" verticalAlignment="top">
              <Label text="Correo" class="field-title" />
              <Label :text="personal.email_principal" class="field" ios:col="1" android:row="1" />
            </GridLayout>
            <StackLayout class="line" />
            <!-- Password -->
            <GridLayout ios:columns="auto,*" android:rows="auto, auto" verticalAlignment="top">
              <Label text="Operación Actual" class="field-title" />
              <Label text="Centro de Operaciones" class="field" ios:col="1" android:row="1" />
            </GridLayout>
            <StackLayout class="line" />
            <GridLayout ios:columns="auto,*" android:rows="auto, auto" verticalAlignment="top">
              <Label text="Cargo Actual" class="field-title" />
              <Label text="Jefe de Ing. de Desarrollo" class="field" ios:col="1" android:row="1" />
            </GridLayout>
            <Image id="img-qr" :src="personal.qr_code_url" class="qr-picture" />
          </StackLayout>
        </ScrollView>
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
import { mapActions, mapState, mapMutations } from "vuex";
import sideDrawer from "../../mixins/sideDrawer";

export default {
  mixins: [sideDrawer],
  data() {
    return {
      nombre_completo: "",
    };
  },
  methods: {
    ...mapMutations("sideDrawer", ["setGesturesEnabled"]),
  },
  computed: {
    ...mapState("personalModule", ["personal"]),
    concatenarNombreCompleto() {
      return (this.nombre_completo =
        this.personal.nombres +
        " " +
        this.personal.apellido_paterno +
        " " +
        this.personal.apellido_materno);
    },
    mounted() {
      //this.$store.commit('setGesturesEnabled', true)
      this.setGesturesEnabled(true)
    }
  },
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
  border-top-left-radius: 60%;
  border-top-right-radius: 60%;
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
  /*margin-left: 42;*/
  /*margin-right: 42;*/
  /*margin-bottom: 30;*/
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
</style>