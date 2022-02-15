<template lang="html">
  <StackLayout height="100%" width="100%" backgroundImage="~/assets/images/fondo_inicio_sesion2.jpg">
      <StackLayout
          height="200"
          style="text-align: center; vertical-align: center"
          class="drawer-header"
        >
          <Image
            v-if="getPersonal.foto"
            :src="getPersonal.foto"
            height="100"
            width="100"
            borderRadius="100"
            loadMode="async" stretch="fill"
          />
          <Image
            v-else
            src="~/assets/images/user_icon_4.png"
            height="100"
            width="100"
            borderRadius="100"
            loadMode="async" stretch="fill"
          />
          <Label :text="concatenarNombreCompleto" fontWeight="bold" />
          <Label text="Jefe de Ing. de Desarrollo" fontWeight="bold" color="#5f5d5d" />
        </StackLayout>
        <ScrollView height="100%" >
        <StackLayout marginTop="15" >
          <StackLayout v-if="page != null" v-for="(page, i) in pagesComputed">
            <Label class="drawer-item-title" v-if="typeof page.children != 'undefined'" :text="page.name" textWrap="true" />
            <GridLayout
              rows="auto" 
              v-if="typeof page.children != 'undefined'"
              v-for="(page_children, i) in page.children"
              columns="30, auto"
              @tap="goToPage(page_children)"
              class="drawer-item-content"
              v-bind:class="{'drawer-item-content-border' : (i < page.children.length - 1), 'active' : page_children.active }"
              :key="i"
              @touch="touchItem($event,page_children.active)"
            >
              <Label class="drawer-item fas" :text="page_children.icon | fonticon" col="0" v-bind:class="{ 'drawer-item-active' : page_children.active }"/>
              <Label class="drawer-item" v-model="page_children.name" col="1" v-bind:class="{ 'drawer-item-active' : page_children.active }"/>
            </GridLayout>
            <GridLayout
              rows="auto" 
              v-if="typeof page.children === 'undefined'"
              columns="30, auto"
              @tap="goToPage(page)"
              class="drawer-item-content"
              v-bind:class="{'drawer-item-content-border' : (i < pagesComputed.length - 1), 'active' : page.active }"
              :key="i"
              @touch="touchItem($event,page.active)"
            >
              <Label v-if="typeof page.children === 'undefined'" class="drawer-item fas" :text="page.icon | fonticon" col="0" v-bind:class="{ 'drawer-item-active' : page.active }"/>
              <Label v-if="typeof page.children === 'undefined'" class="drawer-item" v-model="page.name" col="1" v-bind:class="{ 'drawer-item-active' : page.active }"/>
            </GridLayout>
          </StackLayout>
        </StackLayout>
        </ScrollView>
  </StackLayout>
</template>

<script>
import Vue from "nativescript-vue";
import { mapActions, mapState, mapGetters, mapMutations } from "vuex";
import sideDrawer from "../../mixins/sideDrawer";
/*import { GridLayout } from "tns-core-modules/ui/layouts/grid-layout";
const myGrid = new GridLayout();*/
export default {
  mixins: [sideDrawer],
  data() {
    return {
      personalLocal: {
        nombre_completo: "",
      },
      pages: [
        {
          name: "Menú Principal",
          component: this.$routes.Modulos,
          icon: "fa-home",
          active: true,
        },
        {
          name: "Mi Perfil",
          component: this.$routes.MiPerfil,
          icon: "fa-address-card",
          active: false,
        },
        {
          name: "Mis Asistencias",
          component: this.$routes.MiAsistencia,
          icon: "fa-user-clock",
          active: false,
        },
        null,
        /*{
          name:"CONTROL DE INGRESO",
          children: [
            {
              name:"Registro de Asistencia",
              component: this.$routes.RegistroAsistencia,
              icon: 'fa-calendar-check',
              active: false
            }
          ]
        },*/
      ],
    };
  },
  methods: {
    ...mapMutations('menuLateral',['setPages']),
    goToPage(page) {
      // use the manual navigation method
      this.pages.forEach((element) => {
        if (element != null) {
          if (typeof element.children != "undefined") {
            element.children.forEach((children) => {
              console.log(children);
              if (children.name == page.name) {
                children.active = true;
              } else {
                children.active = false;
              }
            });
          } else {
            if (element.name == page.name) {
              element.active = true;
            } else {
              element.active = false;
            }
          }
        }
      });
      this.$navigateTo(page.component);
      // and we probably want to close the drawer when changing pages
      this.closeDrawer();
    },
    touchItem(args,page_active) {
      var element = args.object;
      if (args.action === "down" || args.action === "move") {
        element.className = "drawer-item-content-pressed";
      } else {
        if(page_active){
          element.className = "active-pressed";
        }else{
          element.className = "not-active-pressed";
        }
      }
    },
  },
  computed: {
    //...mapState("personalModule", ["personal"]),
    ...mapState("menuPrincipal", ["modulo_menu_lateral"]),
    ...mapGetters("menuLateral", ["getPages"]),
    ...mapGetters("personalModule", ["getPersonal"]),
    concatenarNombreCompleto() {
      return (this.personalLocal.nombre_completo =
        this.getPersonal.nombres +
        " " +
        this.getPersonal.apellido_paterno +
        " " +
        this.getPersonal.apellido_materno);
    },

    pagesComputed() {
      if (this.modulo_menu_lateral != null) {
        this.pages.pop();
        this.pages.push(this.modulo_menu_lateral);
        this.$navigateTo(this.modulo_menu_lateral.children[0].component);
        this.pages.forEach((element) => {
          element.active = false;
        });
      }
      //this.setPages(this.pages)
      //console.log(this.getPages);
      return this.pages;
    },
    mounted(){
      this.setPages(this.pages)
    }
  },
};
</script>

<style lang="css">
.drawer-item-content {
  height: 50;
  padding-top: 15;
  padding-left: 10%;
  padding-right: 10%;
  vertical-align: middle;
}
.drawer-item-content-border {
  border-bottom-width: 1;
  border-bottom-color: #d6d6d6;
}
.drawer-item {
  color: #f47b20;
}
.drawer-item-content-pressed {
  height: 50;
  padding-top: 15;
  padding-left: 10%;
  padding-right: 10%;
  vertical-align: middle;
  background-color: #d6d6d6;
}
.active {
  background-color: #f47b20;
}
.active-pressed {
  height: 50;
  padding-top: 15;
  padding-left: 10%;
  padding-right: 10%;
  vertical-align: middle;
  background-color:#f47b20;
}
.drawer-item-active {
  color: white;
}
.not-active-pressed {
  height: 50;
  padding-top: 15;
  padding-left: 10%;
  padding-right: 10%;
  vertical-align: middle;
  border-bottom-width: 1;
  border-bottom-color: #d6d6d6;
}
.drawer-item-title {
  color: darkgray;
  margin-top: 15;
  font-weight: bold;
  padding-left: 10%;
  padding-right: 10%;
  vertical-align: middle;
}
</style>