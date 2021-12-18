<template>
  <Page>
    <ActionBarLocal text = "Registration"/>

    <FlexboxLayout class="page">
      <StackLayout class="form">
        <Image class="logo" src="~/images/swap_chat_icon.png"/>
        <Label class="header" text="SwapChad"/>
        <Label class="error-message" horizontalAlignment="center" :text="errorMessage"/>
        <InputField
            hint="Display name"
            :autocorrect="false"
            autocapitalization-type="None"
            @textChange="onDisplayNameChange"
            :error="displayNameError"
        />
        <InputField
            hint="Username"
            :autocorrect="false"
            autocapitalization-type="None"
            @textChange="onUserNameChange"
            :error="usernameError"
        />
        <InputField
            hint="Password"
            :secure="true"
            @textChange="onPasswordChange"
            :error="passwordError"
        />
        <InputField
            hint="Confirm password"
            :secure="true"
            @textChange="onConfPasswordChange"
            :error="confPasswordError"
        />
        <Button text="Sign Up" class="btn btn-primary m-t-20" @tap="signUp"/>
        <Label text="Already have an account?" class="login-label" @tap="$navigateBack"/>
      </StackLayout>
    </FlexboxLayout>
  </Page>
</template>

<script>
// import Authentication from "~/components/Authentication";
import InputField from "~/components/InputField";
import ActionBarLocal from "~/components/ActionBarLocal";
import axios from 'axios/dist/axios';
import getHostName from "~/utils/hostName";
import Main from "~/components/Main";
export default {
  components: {InputField, ActionBarLocal},
  data(){
    return{
      displayName: "",
      userName: "",
      password: "",
      confPassword: "",
      correctData: true,
      notImputedYet: true,
      errorMessage: "",
    }
  },

  computed: {
    displayNameError(){
      return !this.correctData || (!this.notImputedYet && this.displayName === "");
    },
    usernameError(){
      return !this.correctData || (!this.notImputedYet && this.userName === "");
    },
    passwordError(){
      return !this.correctData || (!this.notImputedYet && (this.password === "" || this.password !== this.confPassword));
    },
    confPasswordError(){
      return !this.correctData || (!this.notImputedYet && (this.confPassword === "" || this.password !== this.confPassword));
    }
  },

  methods: {
    onDisplayNameChange(value){
      this.displayName = value;
    },
    onUserNameChange(value){
      this.correctData = true;
      this.errorMessage = "";
      this.userName = value;
    },
    onPasswordChange(value){
      this.password = value;
    },
    onConfPasswordChange(value){
      this.confPassword = value;
    },

    validateData(){
      return !(this.displayName === ""
          || this.userName === ""
          || this.password === ""
          || this.confPassword === ""
          || this.password !== this.confPassword)
    },
    signUp() {
      this.notImputedYet = false;
      if (this.validateData()) {
        const userData = {
          "displayed_name": this.displayName,
          "username": this.userName,
          "password": this.password
        }
        const hostname = getHostName();
        console.log(userData);
        axios.post(`${hostname}/api/auth/signup`,
            userData
        )
            .then(res => {
              if (res.status === 200) {
                const token = res.data.token;
                console.log(token);
                require("nativescript-localstorage");
                localStorage.setItem("jwt-token", token);
                this.$navigateTo(Main);
              }
            })
            .catch(err => {
              console.log("hop");
              this.correctData = false;
              this.errorMessage = err.response.data.detail;
            });
      }
    }
  },
  name: "Registration"
}
</script>

<style scoped>
.page {
  align-items: center;
  flex-direction: column;
}
.form {
  width: 70%;
  margin-top: 10%;
  margin-left: 30;
  margin-right: 30;
  flex-grow: 2;
  vertical-align: top;
}
.logo {
  margin-bottom: 12;
  height: 70;
  font-weight: bold;
}
.header {
  horizontal-align: center;
  font-size: 30;
  font-weight: 600;
  margin-bottom: 0;
  text-align: center;
  color: #1a78d5;
}
.btn-primary {
  color: #ffffff;
  height: 50;
  margin: 30 5 15 5;
  background-color: #405afd;
  border-radius: 5;
  font-size: 20;
  font-weight: 600;
}
.login-label {
  horizontal-align: center;
  color: #808080;
  font-size: 16;
}
.error-message{
  font-size: 20;
  color: red;
}

</style>
