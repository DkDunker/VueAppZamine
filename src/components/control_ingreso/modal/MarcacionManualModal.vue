<template>
  <Page>
    <StackLayout class="content-modal" orientation="vertical">
      <GridLayout class="content-modal-header" columns="*,auto">
        <Label
          class="element-modal-header title"
          text="Marcación Manual"
          col="0"
        />
        <Label
          class="element-modal-header fas"
          :text="'fa-plus-square' | fonticon"
          col="1"
        />
      </GridLayout>
      <StackLayout class="content-modal-body">
        <TextField
          class="element-modal-body"
          hint="Escriba DNI"
          keyboardType="number"
          maxLength="8"
          v-model="dni"
        />
        <Label
          v-show="dniInputError"
          :text="dniInputError"
          color="red"
          class="error-input-form"
        />
        <TextField
          class="element-modal-body"
          hint="Seleccionar Fecha "
          :text="fecha"
          @tap="selectDate()"
        />
        <Label
          v-show="fechaInputError"
          :text="fechaInputError"
          color="red"
          class="error-input-form"
        />
        <TextField
          class="element-modal-body"
          hint="Seleccionar Hora"
          :text="hora"
          @tap="selectTime()"
        />
        <Label
          v-show="horaInputError"
          :text="horaInputError"
          color="red"
          class="error-input-form"
        />
        <TextField
          class="element-modal-body"
          hint="Comentario"
          v-model="comentario"
        />
        <Label
          v-show="comentarioInputError"
          :text="comentarioInputError"
          color="red"
          class="error-input-form"
        />
        <Button class="button-modal-search" text="Aceptar" @tap="onCloseTap" />
      </StackLayout>
    </StackLayout>
  </Page>
</template>
<script>
import { mapActions, mapMutations, mapState } from "vuex";
import formatoFecha from "../../../mixins/formatoFecha";
const ModalPicker = require("nativescript-modal-datetimepicker")
  .ModalDatetimepicker;
const picker = new ModalPicker();

export default {
  mixins: [formatoFecha],
  data() {
    return {
      fecha : "",
      hora  : "",
      dni   : "",
      comentario: "",
      dniInputError : "",
      fechaInputError : "",
      horaInputError : "",
      comentarioInputError : "",
    };
  },
  methods: {
    ...mapActions('registroMarcacion',['obtenerPersonalCondiciones']),
    onCloseTap: function () {
      //validamos
      let validate = true; 
      if(!this.dni){
        this.dniInputError = "Este campo es requerido"
        validate = false
      }
      if(!this.fechaInputError){
        this.fechaInputError = "Este campo es requerido"
        validate = false
      }
      if(!this.hora){
        this.horaInputError = "Este campo es requerido"
        validate = false
      }
      if(!this.comentario){
        this.comentarioInputError = "Este campo es requerido"
        validate = false
      }

      if(!validate)
        return
      //lamar al metodo de guardar marcacion manual en el vuex
      let datos_personal_condiciones = {
        dni :  this.dni,
        marcacion_tipo_id : 634,
        fecha_hora : this.fecha + " " +this.hora,
        comentario : this.comentario
      }
      this.obtenerPersonalCondiciones(datos_personal_condiciones)
      this.$modal.close({
        fecha       : this.fecha,
        hora        : this.hora,
        dni         : this.dni,
        comentario  : this.comentario
      });
    },
    selectDate() {
      picker
        .pickDate({
          maxDate: new Date(),
        })
        .then((result) => {
            // Note the month is 1-12 (unlike js which is 0-11)
            this.fecha = result.year + "/" + result.month + "/" + result.day;
            this.fecha = this.insertarCeroFecha(this.fecha)
            //var jsdate = new Date(result.year, result.month - 1, result.day);
        })
        .catch((error) => {
            console.log("Error: " + error);
        });
    },
    selectTime () {
        picker
            .pickTime()
            .then(result => {
                this.hora = result.hour + ":" + result.minute;
                this.hora = this.insertarCeroHora(this.hora)
            })
            .catch(error => {
                console.log("Error: " + error);
            });
    }
  },
};
</script>
<style scoped>
.content-modal {
  width: 500;
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
}
</style>