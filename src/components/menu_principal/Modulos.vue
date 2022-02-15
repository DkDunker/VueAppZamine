<template lang="html">
  <Page actionBarHidden="true" xmlns:Card="@nstudio/nativescript-cardview">
    <StackLayout height="100%" ~mainContent backgroundImage="~/assets/images/fondo_menu_principal2.jpg" >
      <ScrollView class="container">
        <FlexboxLayout  flexWrap="wrap" width="100%" marginTop="50">
          <card-view
            v-if="modulo.id==172"
            elevation="40"
            v-for="modulo in modulos"
            :key="modulo.id"
            radius="50"
            width="46%"
            class="item"
            @tap="selectModule(modulo)"
          >
            <GridLayout 
                rows="3*, 20,20,20" 
                columns="*" 
                paddingBottom="10" 
                style="text-align: center"
                >
              <Image v-if="modulo.id==172" src="~/assets/images/control-icon.png" row="0" col="0" />
              <Label :text="modulo.nombre" row="1" col="0" />
              <Label v-if="modulo.id==172" text="チェックポイント制御" row="2" col="0" />
              <Label v-if="modulo.id==172" text="Checkpoint control" row="3" col="0" />
            </GridLayout>
          </card-view>
        </FlexboxLayout>
      </ScrollView>
    </StackLayout>
    
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
    };
  },
  computed: {
    ...mapState("menuPrincipal", ["modulos"]),
  },
  methods: {
    ...mapMutations("menuPrincipal", ["setSelectedModule"]),
    ...mapMutations("sideDrawer", ["setGesturesEnabled"]),
    selectModule(modulo){
      /*if(id_modulo = 172){
        
      }*/
        this.setSelectedModule(modulo)
    }
  },
  mounted() {
    //this.$store.commit('sideDrawer/setGesturesEnabled', true)
    this.setGesturesEnabled(true)
  }
};
</script>
<style lang="scss" scoped>
.container {
  padding-top: 50;
  padding-bottom: 50;
  width: 100%;
  height: 100%;
}

.full-height {
  height: 100%;
}

.item {
  height: 200;
  margin-top: 10;
  margin-bottom: 10;
  margin-left: 2%;
  margin-right: 2%;
}
</style>