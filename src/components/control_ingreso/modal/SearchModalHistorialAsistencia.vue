<template>
  <Page>
    <StackLayout class="content-modal" orientation="vertical">
      <GridLayout class="content-modal-header" columns="*,auto">
        <Label
          class="element-modal-header title"
          text="Búsqueda Asistencias"
          col="0"
        />
        <Label
          class="element-modal-header fas"
          :text="'fa-search' | fonticon"
          col="1"
        />
      </GridLayout>
      <StackLayout class="content-modal-body">
        <TextField
          class="element-modal-body"
          hint="Escriba Nombre del Personal"
          v-model="nombre_personal"
        />
        <StackLayout
        class="element-modal-body content-dropdown"
          >
          <DropDown 
                hint="Seleccione Tipo Movimiento"
                itemsTextAlignment="center"
                :items="items"
                class="changed-styles"
                @selectedIndexChanged="dropDownSelectedIndexChanged($event)">
          </DropDown>
        </StackLayout>
        <TextField
          class="element-modal-body"
          hint="Seleccionar Fecha Inicio"
          :text="fecha_inicio"
          @tap="selectStartDate()"
        />
        <TextField
          class="element-modal-body"
          hint="Seleccionar Fecha Fin"
          :text="fecha_fin"
          @tap="selectEndDate()"
        />
        <Button class="button-modal-search" text="Buscar" @tap="onCloseTap" />
      </StackLayout>
    </StackLayout>
  </Page>
</template>
<script>
import { mapActions, mapState, mapGetters, mapMutations } from "vuex";
import { ValueList } from "nativescript-drop-down";

const ModalPicker = require("nativescript-modal-datetimepicker")
  .ModalDatetimepicker;
const picker = new ModalPicker();

export default {
  data() {
    return {
        fecha_inicio: "",
        fecha_fin: "",
        items: [],
        nombre_personal: "",
        selectedIndex: null,
        selectedId: null
    };
  },
  methods: {
    ...mapActions("tipoMovimiento", [
      "obtenerTiposMovimiento"
    ]),
    ...mapActions("registroMarcacion", [
      "busquedaMarcacionPersonalHistorial"
    ]),
    async onCloseTap() {
      let datos_busqueda = {
        'nombre_personal' : this.nombre_personal,
        'tipo_movimiento_id': this.selectedId,
        'fecha_inicio' : this.fecha_inicio,
        'fecha_fin' : this.fecha_fin
      }
      await this.busquedaMarcacionPersonalHistorial(datos_busqueda)
      this.$modal.close(datos_busqueda)
    },
    selectStartDate() {
      picker
        .pickDate({
          maxDate: new Date(),
        })
        .then((result) => {
          // Note the month is 1-12 (unlike js which is 0-11)
          this.fecha_inicio = result.year + "/" + result.month + "/" + result.day;
          //var jsdate = new Date(result.year, result.month - 1, result.day);
        })
        .catch((error) => {
          console.log("Error: " + error);
        });
    },
    selectEndDate() {
      picker
        .pickDate({
          maxDate: new Date(),
        })
        .then((result) => {
          // Note the month is 1-12 (unlike js which is 0-11)
          this.fecha_fin = result.year + "/" + result.month + "/" + result.day;
          //var jsdate = new Date(result.year, result.month - 1, result.day);
        })
        .catch((error) => {
          console.log("Error: " + error);
        });
    },
    dropDownOpened(args) {
        console.log("Drop Down opened");
    },
    dropDownClosed(args) {
        console.log("Drop Down closed");
    },
    dropDownSelectedIndexChanged(args) {
        console.log(`Drop Down selected index changed from ${args.oldIndex}
    to ${args.newIndex}`);
        this.selectedIndex = args.newIndex;
        console.log(this.items.getValue(this.selectedIndex));
        this.selectedId = this.items.getValue(this.selectedIndex);
    },
    async setItemSelectTipoMovimiento(){
      await this.obtenerTiposMovimiento()
      var itemSource = []; 
      let item = {
        'value' : 0,
        'display' : 'Todos'
      }
      itemSource.push(item)
      await this.getTiposMovimiento.forEach((element)=>{
        let item = {
          'value' : element.id,
          'display' : element.nombre
        }
        itemSource.push(item)
      })
      itemSource = new ValueList(itemSource);
      this.items = itemSource;
    },
  },
  computed: {
    ...mapGetters("tipoMovimiento", ["getTiposMovimiento"]),
  },
  mounted() {
    this.setItemSelectTipoMovimiento();
  },
};
</script>
<style scoped>
.content-modal {
  width: 500;
  border-radius: 10;
}
.content-modal-header {
  width: 100%;
  height: 50;
  margin: auto;
  padding-right: 10;
  background-color: #034649;
  color: #ffffff;
}

.content-modal-body {
  width: 100%;
  padding-top: 10;
  padding-left: 10;
  padding-right: 10;
}

.element-modal-header {
  vertical-align: middle;
}

.button-modal-search {
  margin-top: 10;
  background-color: #5bc0d2;
  color: #ffffff;
}

.element-modal-body {
  margin-top: 10;
  placeholder-color: #b3b3b3;
}

.changed-styles {
  padding-top: 7;
  padding-bottom: 7;
}

.content-dropdown {
  margin-left:15;
  margin-right:15;
  border-bottom-width: 1;
  border-color:  #b3b3b3
}
</style>