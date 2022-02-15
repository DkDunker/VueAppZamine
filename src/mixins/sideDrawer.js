export default {
    /*data() {
        return {
            // we'll use this to enable gestures on our sideDrawer.
            //gesturesEnabled: this.$store.getters.gesturesEnabled
            
        }
    },*/
    computed: {
        //drawerElement apunta al nodo del cajón usando vue $ refs
        drawerElement() {
            //4
            return (this.$refs && this.$refs.drawer_global) || null
        },
        // drawer is responsible for getting and setting the sideDrawer property in vuex state.
        drawer_global: {
            get() { 
                //3
                return  this.$store.getters['sideDrawer/sideDrawer']
            },
            set(v) {
                return this.$store.commit('sideDrawer/setSideDrawer', v)
            }
        },
        gesturesEnabled (){
            return this.$store.getters['sideDrawer/gesturesEnabled']
        }
    },
    watch: {
        // Observamos el accesorio del cajón para ver si hay cambios y abrimos / cerramos el cajón lateral en consecuencia
        //3
        drawer_global (v) {
            if (this.drawerElement) {
                return v ?
                this.drawerElement.nativeView.showDrawer() :
                this.drawerElement.nativeView.closeDrawer()
            }
        }
    },
    methods: {
        // algunos métodos útiles para abrir y cerrar el cajón desde la instancia de vue.
        openDrawer() {
            //1
            this.drawer_global = true
        },
        closeDrawer() {
            if(this.drawer_global){
                this.drawer_global = false
            }else{
                this.drawer_global = true
                setTimeout(this.closeDrawer,100);
            }
        },
        toggleDrawer() {
            if (this.drawer_global) {
                this.drawer_global = false
                setTimeout(this.toggleDrawer,100);
            } else {
                this.drawer_global = true
            }
        }
    },
}