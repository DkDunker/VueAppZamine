<template>
  <Page actionBarHidden="true">
    <FlexboxLayout
      flexDirection="column"
      justifyContent="center"
      class="full-height"
      backgroundImage="~/assets/images/fondo_inicio_sesion3.jpg"
      ~mainContent
    >
      <Image src="~/assets/images/logo_zapcod.png" class="logo-container" />
      <StackLayout class="container">
        <FlexboxLayout alignItems="center" class="border-bottom">
          <Image src="~/assets/images/user_icon_4.png" width="16" height="16" />
          <TextField
            v-model="login.usernameInput"
            hint="Usuario"
            class="form-input"
            maxlength="10"
          />
        </FlexboxLayout>
        <Label
          v-show="usernameInputError"
          :text="usernameInputError"
          color="red"
          class="error-input"
        />
        <FlexboxLayout
          alignItems="center"
          justifyContent="space-between"
          class="border-bottom"
        >
          <StackLayout orientation="horizontal">
            <Image
              src="~/assets/images/lock_icon_2.png"
              width="16"
              height="16"
            />
            <TextField
              v-model="login.passwordInput"
              hint="Contraseña"
              :secure="secure_input"
              class="form-input"
            />
          </StackLayout>
          <Label 
            class="label-password h3 fas" 
            :text="(secure_input ? 'fa-eye-slash' : 'fa-eye') | fonticon " 
            @tap="verContrasenia"
          />
        </FlexboxLayout>
        <Label
          v-show="passwordInputError"
          :text="passwordInputError"
          color="red"
          class="error-input"
        />
        <Button text="Iniciar Sesión" @tap="loguearse" class="my-buttom" />
        <FlexboxLayout
          alignItems="center"
          justifyContent="space-between"
          class="auth-buttons"
        >
          <Label text="Crear Cuenta" horizontalAlignment="left" />
          <Label text="Recordar Contraseña" horizontalAlignment="right" />
        </FlexboxLayout>
      </StackLayout>
    </FlexboxLayout>
  </Page>
</template>
<script>
import Vue from "nativescript-vue";
import { mapActions, mapMutations, mapState, mapGetters } from "vuex";
import * as application from '@nativescript/core/application';
import sideDrawer from "../mixins/sideDrawer";
//const app= require("tns-core-modules/application");

/*import { RadDataForm, PropertyGroup } from "nativescript-ui-dataform";

Vue.registerElement(
  "RadDataForm",
  () => require("nativescript-ui-dataform").RadDataForm
);*/

export default {
  mixins: [sideDrawer],
  data() {
    return {
      login: {
        usernameInput: "candrade",
        passwordInput: "123456789",
      },
      usernameInputError: "",
      passwordInputError: "",
      secure_input: true,
    };
  },
  methods: {
    ...mapActions("auth", ["loginIn"]),
    ...mapMutations("sideDrawer", ["setGesturesEnabled"]),
    loguearse() {
      var username = this.login.usernameInput;
      var password = this.login.passwordInput;
      if (username && password) {
        this.loginIn({ username, password });
      } else {
        if (!username) {
          this.usernameInputError = "El usuario es requerido";
        } else {
          this.usernameInputError = "";
        }
        if (password.length < 6) {
          this.passwordInputError =
            "La contraseña debe tener almenos 6 caracteres";
        } else {
          this.passwordInputError = "";
        }
      }
      //this.showFeedbackError();
    },
    /*onPageLoaded(args) {
      const sideDrawer = args.object.page.getViewById("sideDrawer"); 
      console.log(args.object.page.getViewById("sideDrawer"));
      sideDrawer.gesturesEnabled = false;
    },*/
    showFeedbackError() {},
    showSuccess() {
      TNSFancyAlert.showSuccess(
        "Success!",
        "Fancy alerts are nice.",
        "Yes they are!"
      )
        .then(() => {
          // console.log("shown");
        })
        .catch((error) => {
          console.error(error);
        });
    },
    verContrasenia() {
      if (this.secure_input) {
        this.secure_input = false;
      } else {
        this.secure_input = true;
      }
    },
  },
  computed: {
    ...mapState("auth", ["isLogged"]),
    ...mapGetters("menuLateral", ["getPages"]),
  },
  mounted() {
    //this.$store.commit("setGesturesEnabled", false);
    this.setGesturesEnabled(false)
  },
  created() {
    /*if (this.isLogged && application.android) {
      application.android.on(
        application.AndroidApplication.activityResumedEvent,
        () => {
          setTimeout(() => {
            let pagina_actual = "";
            this.getPages.forEach((element) => {
              if (element != null) {
                if (typeof element.children != "undefined") {
                  element.children.forEach((children) => {
                    if (children.active) {
                      pagina_actual = children.component;
                    }
                  });
                } else {
                  if (element.active) {
                    pagina_actual = element.component;
                  }
                }
              }
            });
            this.$navigateTo(pagina_actual);
          }, 0);
        },
        this
      );
    }*/
  },
};
</script>
<style lang="scss" scoped>
.border-bottom {
  border-bottom-width: 1;
  border-bottom-color: #5f5d5d;
  margin-bottom: 40;
  padding-bottom: 8;
}
.form-input {
  color: #5f5d5d;
  placeholder-color: #5f5d5d;
}

.icon-margin {
  margin-right: 10;
}

.my-buttom {
  background-color: #f47b20;
  color: white;
  font-weight: bold;
  border-radius: 25;
  padding-top: 14;
  padding-bottom: 14;
  text-transform: uppercase;
  letter-spacing: 0.1;
  margin-bottom: 20;
  margin-top: 10;
}

.auth-buttons {
  color: #5f5d5d;
  font-size: 14;
}

.full-height {
  height: 100%;
  background: linear-gradient(to bottom, #bb4c00, #ffe7ce);
}

.logo-container {
  width: 150;
  height: 150;
  margin-bottom: 60;
}
.container {
  margin-left: 34;
  margin-right: 34;
}
.label-password {
  align-self: flex-end;
  color: #5f5d5d;
  margin-right: 10;
  font-weight: bold;
}
.error-input {
  margin-top: -40;
}
</style>