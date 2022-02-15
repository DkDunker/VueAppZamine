<template>
  <Page androidStatusBarBackground="#bb4c00">
    <ActionBar title="Mis Asistencias" />
    <GridLayout rows="*" height="100%">
      <RadSideDrawer ref="drawer">
        <StackLayout ~drawerContent backgroundColor="rgb(244, 123, 34)">
          <StackLayout
            height="200"
            style="text-align: center; vertical-align: center"
            backgroundColor="white"
          >
            <Image
              src="res://icon"
              loadMode="async"
              height="100"
              width="100"
              borderRadius="100"
            />
            <Label text="Juan Angel Musayón Durand" fontWeight="bold" />
            <Label text="Desarrollador" fontWeight="bold" color="#d6d6d6" />
          </StackLayout>
          <StackLayout>
            <Label
              text="Dashboard"
              padding="10"
              backgroundColor="lightgray"
              borderBottomColor="white"
            />
            <Label text="Detenciones" padding="10" borderBottomColor="white" />
            <Label text="Cerrar Sesión" padding="10" />
          </StackLayout>
          <Label
            text="Close"
            color="lightgray"
            padding="10"
            style="horizontal-align: center"
            @tap="onCloseDrawerTap"
          />
        </StackLayout>
        <StackLayout ~mainContent height="100%">
          <TabView
            height="100%"
            androidTabsPosition="bottom"
            tabBackgroundColor="#f47b20"
            tabTextColor="#ffffff"
            selectedTabTextColor="#d6d6d6"
            highlightColor="#d6d6d6"
          >
            <TabViewItem title="TAREAS">
              <StackLayout orientation="vertical" width="100%" height="100%">
                <GridLayout columns="2*, *" rows="*" width="100%" height="25%">
                  <TextField
                    col="0"
                    row="0"
                    v-model="textFieldValue"
                    hint="Escribir Tarea..."
                    editable="true"
                  />
                  <Button col="1" row="0" text="Agregar" @tap="agregarTarea" />
                </GridLayout>
                <ListView
                  for="tarea in tareas"
                  @itemTap="onItemTap"
                  style="height: 75%"
                >
                  <v-template>
                    <Label
                      id="active-tarea"
                      :text="tarea.nombre"
                      class="list-group-item-heding"
                      textWrap="true"
                    />
                  </v-template>
                </ListView>
              </StackLayout>
            </TabViewItem>
            <TabViewItem title="COMPLETADAS">
              <ListView
                id="completed-list"
                for="completo in completadas"
                @itemTap="onDoneTap"
                style="height: 100%"
              >
                <v-template>
                  <Label
                    id="completed-tarea"
                    :text="completo.nombre"
                    class="list-group-item-heding"
                    textWrap="true"
                  />
                </v-template>
              </ListView>
            </TabViewItem>
            <TabViewItem title="Zamine">
              <StackLayout
                height="100%"
                style="text-align: center; vertical-align: center"
                backgroundColor="white"
              >
                <StackLayout
                  height="20%"
                  style="text-align: center; vertical-align: center"
                  backgroundColor="white"
                >
                  <Image
                    :src="personal.imagen" 
                    loadMode="async"
                    height="100"
                    width="100"
                    borderRadius="100"
                  ></Image>
                  <Label :text="token" fontWeight="bold" />
                  <Label
                    text="Desarrollador"
                    fontWeight="bold"
                    color="#d6d6d6"
                  />
                </StackLayout>
                <ListView
                  for="asistencia in asistencias"
                  @itemTap="onItemTap"
                  style="height: 75%"
                >
                  <v-template>
                    <GridLayout columns="2*,*" rows="*" height="100%">
                      <StackLayout class="list-group-item" row="0" col="0" >
                        <Label :text="asistencia.operacion" class="list-group-item-heading" textAlignment="left"/>
                        <Label :text="asistencia.fecha" textWrap="true" class="list-group-item-text" textAlignment="left"/>
                      </StackLayout>
                      <StackLayout class="list-group-item" row="0" col="1" textAlignment="left">
                        <Label :text="asistencia.tipo" class="list-group-item-heading" textAlignment="left" :color="asistencia.tipo == 'INGRESO' ? '#2e7d32': '#e53935'"/>
                      </StackLayout>
                    </GridLayout>
                  </v-template>
                </ListView>
              </StackLayout>
            </TabViewItem>
          </TabView>
        </StackLayout>
      </RadSideDrawer>
    </GridLayout>
  </Page>
</template>

<script >
import Vue from "nativescript-vue";
import RadSideDrawer from "nativescript-ui-sidedrawer/vue";
import { mapActions,mapState } from 'vuex';
Vue.use(RadSideDrawer);

export default {
  data() {
    return {
      tareas: [],
      completadas: [],
      asistencias: [
        {
          fecha       : '10/12/2020 08:00',
          tipo        : 'INGRESO',
          operacion   : 'Centro de Operaciones'
        },
        {
          fecha       : '10/12/2020 17:00',
          tipo        : 'SALIDA',
          operacion   : 'Centro de Operaciones'
        },
        {
          fecha       : '10/12/2020 08:00',
          tipo        : 'INGRESO',
          operacion   : 'Centro de Operaciones'
        },
        {
          fecha       : '10/12/2020 17:00',
          tipo        : 'SALIDA',
          operacion   : 'Centro de Operaciones'
        },
        {
          fecha       : '10/12/2020 08:00',
          tipo        : 'INGRESO',
          operacion   : 'Centro de Operaciones'
        },
        {
          fecha       : '10/12/2020 17:00',
          tipo        : 'SALIDA',
          operacion   : 'Centro de Operaciones'
        },
        {
          fecha       : '10/12/2020 08:00',
          tipo        : 'INGRESO',
          operacion   : 'Centro de Operaciones'
        },
        {
          fecha       : '10/12/2020 17:00',
          tipo        : 'SALIDA',
          operacion   : 'Centro de Operaciones'
        },
        {
          fecha       : '10/12/2020 08:00',
          tipo        : 'INGRESO',
          operacion   : 'Centro de Operaciones'
        },
        {
          fecha       : '10/12/2020 17:00',
          tipo        : 'SALIDA',
          operacion   : 'Centro de Operaciones'
        },
        {
          fecha       : '10/12/2020 08:00',
          tipo        : 'INGRESO',
          operacion   : 'Centro de Operaciones'
        },
        {
          fecha       : '10/12/2020 17:00',
          tipo        : 'SALIDA',
          operacion   : 'Centro de Operaciones'
        },
        {
          fecha       : '10/12/2020 08:00',
          tipo        : 'INGRESO',
          operacion   : 'Centro de Operaciones'
        },
        {
          fecha       : '10/12/2020 17:00',
          tipo        : 'SALIDA',
          operacion   : 'Centro de Operaciones'
        },
        {
          fecha       : '10/12/2020 08:00',
          tipo        : 'INGRESO',
          operacion   : 'Centro de Operaciones'
        },
        {
          fecha       : '10/12/2020 17:00',
          tipo        : 'SALIDA',
          operacion   : 'Centro de Operaciones'
        },
        {
          fecha       : '10/12/2020 08:00',
          tipo        : 'INGRESO',
          operacion   : 'Centro de Operaciones'
        },
        {
          fecha       : '10/12/2020 17:00',
          tipo        : 'SALIDA',
          operacion   : 'Centro de Operaciones'
        },
        {
          fecha       : '10/12/2020 08:00',
          tipo        : 'INGRESO',
          operacion   : 'Centro de Operaciones'
        },
        {
          fecha       : '10/12/2020 17:00',
          tipo        : 'SALIDA',
          operacion   : 'Centro de Operaciones'
        },
        {
          fecha       : '10/12/2020 08:00',
          tipo        : 'INGRESO',
          operacion   : 'Centro de Operaciones'
        },
        {
          fecha       : '10/12/2020 17:00',
          tipo        : 'SALIDA',
          operacion   : 'Centro de Operaciones'
        },
        {
          fecha       : '10/12/2020 08:00',
          tipo        : 'INGRESO',
          operacion   : 'Centro de Operaciones'
        },
        {
          fecha       : '10/12/2020 17:00',
          tipo        : 'SALIDA',
          operacion   : 'Centro de Operaciones'
        },
      ],
      textFieldValue: "",
      mainContentText:
        "SideDrawer for NativeScript can be easily setup in the XML definition of your page by defining main- and drawer-content. The component" +
        " has a default transition and position and also exposes notifications related to changes in its state. Swipe from left to open side drawer.",
    };
  },
  computed: {
    ...mapState(['token','codigo_qr','personal']),
  },
  methods: {
     ...mapActions([
      'obtenerToken'
    ]),
    onItemTap: function (args) {
      action("¿Que desea hacer con la tarea?", "Cancelar", [
        "Completada",
        "Eliminar",
      ]).then((result) => {
        switch (result) {
          case "Completada":
            this.completadas.unshift(args.item);
            this.tareas.splice(args.index, 1);
            break;
          case "Eliminar":
            this.tareas.splice(args.index, 1);
            break;
          case "Cancelar" || undefined:
            break;
        }
      });
    },
    onDoneTap: function (args) {
      action("¿Que desea hacer con la tarea?", "Cancelar", [
        "Regresar",
        "Eliminar",
      ]).then((result) => {
        switch (result) {
          case "Regresar":
            this.tareas.unshift(args.item);
            this.completadas.splice(args.index, 1);
            break;
          case "Eliminar":
            this.completadas.splice(args.index, 1);
            break;
          case "Cancelar" || undefined:
            break;
        }
      });
    },
    agregarTarea() {
      if (this.textFieldValue === "") return;
      this.tareas.unshift({
        nombre: this.textFieldValue,
      });
      this.textFieldValue = "";
    },
    onSearchSubmit(args) {
      let searchBar = args.object;
      console.log("You are searching for " + searchBar.text);
    },

    onButtonTap() {
      console.log("Button was pressed");
    },

    onOpenDrawerTap() {
      this.$refs.drawer.nativeView.showDrawer();
    },
    onCloseDrawerTap() {
      this.$refs.drawer.nativeView.closeDrawer();
    },
  },
  mounted(){
    this.obtenerToken();
  },
};
</script>

<style scoped>
.message {
  vertical-align: center;
  text-align: center;
  font-size: 20;
  color: #333333;
}
</style>
