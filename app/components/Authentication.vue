<template>
  <Page>
    <ActionBarLocal text = "Authentication"/>
    <FlexboxLayout class="page">
      <StackLayout class="form">
        <Image class="logo" src="~/images/swap_chat_icon.png"/>
        <Label class="header" text="SwapChad"/>
        <Label class="error-message" horizontalAlignment="center" :text="errorMessage"/>
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
        <Button text="Sign In" class="btn btn-primary m-t-20" @tap="onSignIn"/>
        <Label text="Are you a new user?" class="login-label" @tap="onLabelRTap"/>
      </StackLayout>
    </FlexboxLayout>
  </Page>
</template>

<script>
import Registration from "~/components/Registration";
import InputField from "~/components/InputField";
import ActionBarLocal from "~/components/ActionBarLocal";
import axios from 'axios/dist/axios';
import getHostName from "~/utils/hostName";
import Main from "~/components/Main";
export default {
  components: {InputField, Registration, ActionBarLocal},
  data(){
    return {
      correctData: true,
      userData: {
        username: "",
        password: ""
      },
      notImputedYet: true,
      errorMessage: ""
    }
  },

  computed: {
    usernameError(){
      return !this.correctData || (!this.notImputedYet && this.userData.username === "");
    },
    passwordError(){
      return !this.correctData || (!this.notImputedYet && this.userData.password === "");
    }
  },

  methods: {

    onLabelRTap() {
      this.$navigateTo(Registration);
    },
    onUserNameChange(value){
      this.correctData = true;
      this.errorMessage = "";
      this.userData.username = value;
    },
    onPasswordChange(value){
      this.correctData = true;
      this.errorMessage = "";
      this.userData.password = value;
    },

    validateData(){
      let res = true;
      if (this.userData.username === ""){
        res = false;
      }
      if (this.userData.password === ""){
        res = false;
      }
      return res
    },

    onSignIn(){
      this.notImputedYet = false;
      const validated = this.validateData();
      if(validated){
        const host = getHostName();
        console.log(localStorage.getItem("jwt-token"));
        axios.post(`${host}/api/auth/login`, this.userData)
            .then(response => {
              if(response.status === 200) {
                require("nativescript-localstorage");
                localStorage.setItem("jwt-token", response.data.token);
                this.$navigateTo(Main);
              }
            }).catch(err => {
            if (err.response.status === 401) {
              this.correctData = false;
              this.errorMessage = "Invalid username or password.";
            }
        });
      }
    }
  },
  name: "Authentication",
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
  margin-bottom: 30;
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
