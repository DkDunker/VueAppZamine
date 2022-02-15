<template>
  <Page>
    <StackLayout class="content-modal" orientation="vertical">
      <GridLayout class="content-modal-header" columns="*,auto">
        <Label
          class="element-modal-header title"
          text="Marcación QR"
          col="0"
        />
        <Label
          class="element-modal-header fas"
          :text="'fa-qrcode' | fonticon"
          col="1"
        />
      </GridLayout>
      <StackLayout class="content-modal-body">
        <GridLayout height="300" >
            <BarcodeView ref="cameraView" class="scanner-round"  beepOnScan="true" reportDuplicates="false" @scanResult="onScanResult" />
            <Image src="~/assets/images/crosshair.png" width="140" height="140" style="margin-top: 14; opacity: 0.3" horizontalAlignment="center" verticalAlignment="center" />
        </GridLayout>
      </StackLayout>
    </StackLayout>
  </Page>
</template>
<script>
import { mapActions, mapMutations, mapState } from "vuex";
const ModalPicker = require("nativescript-modal-datetimepicker")
  .ModalDatetimepicker;
const picker = new ModalPicker();

export default {
  data() {
    return {
      dni   : ""
    };
  },
  methods: {
    ...mapActions('registroMarcacion',['obtenerPersonalCondiciones']),
    onShownInBottomSheet() {
        //console.log('onShownInBottomSheet');
        this.$refs.cameraView.nativeView.resumeScanning();
    },
    toggleTorch() {
        this.$refs.cameraView.nativeView.torchOn = !this.$refs.cameraView.nativeView.torchOn;
    },
    onScanResult(evt) {
      //console.log(`onScanResult: ${evt.text} (${evt.format})`)
      this.dni = evt.text
      this.onCloseTap()
    },
    onCloseTap: function () {
      var hoy = new Date()
      var fecha_hora = hoy.getDate() + "/" + (hoy.getMonth() +1) + "/" + hoy.getFullYear() +" "+ hoy.getHours() + ":" + hoy.getMinutes();
        let datos_personal_condiciones = {
        dni :  this.dni,
        marcacion_tipo_id : 634,
        fecha_hora : fecha_hora,
        comentario : null
      }
      this.obtenerPersonalCondiciones(datos_personal_condiciones)
      this.$modal.close({
        dni     : this.dni
      });
    },
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
  padding-bottom:10;
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