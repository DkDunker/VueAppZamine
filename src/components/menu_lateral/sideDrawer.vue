<template lang="html">
  <RadSideDrawer id="sideDrawer" ref="drawer_global" drawerLocation="Left" :gesturesEnabled="gesturesEnabled">
    <StackLayout ~drawerContent>
      <slot name="drawerContent"></slot>
    </StackLayout>
    <Frame ~mainContent>
      <slot name="mainContent"></slot>
    </Frame>
  </RadSideDrawer>
</template>
<script>
import sideDrawer from "../../mixins/sideDrawer";

export default {
  mixins: [sideDrawer],
  data() {
    return {
    };
  },
  computed: {
    
  },
  methods: {
  },
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