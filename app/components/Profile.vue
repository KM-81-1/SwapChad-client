<template>
  <Page @loaded="onLoad">
    <ActionBarLocal text="Profile" :back="true" @backTapped="onBack"/>
    <ActivityIndicator :busy="loading" class="activity-indicator"/>
    <FlexboxLayout class="page" flexDirection="column" v-if="!loading">
      <Image class="profile_icon" src="~/images/profile_icon.png" />
      <StackLayout class="form">
        <Label class="header" text="Your information" />
        <InfoLabel :text="displayedName" class="disp-name" @startEditing="edit"/>
        <Label text="Incorrect display name" horizontalAlignment="center" class="error-message" v-if="incorrectDisplayName"/>
        <Button text="Sign Out" class="btn" @tap="signOut"/>
      </StackLayout>
    </FlexboxLayout>
  </Page>
</template>

<script>
import ActionBarLocal from "~/components/ActionBarLocal";
import InfoLabel from "~/components/InfoLabel";
import axios from 'axios/dist/axios';
import getHostName from "~/utils/hostName";
import getToken from "~/utils/token";
import Authentication from "~/components/Authentication";
import InputField from "~/components/InputField";
export default {
  name: "Profile",
  components: {
    InputField,
    ActionBarLocal,
    InfoLabel
  },
  data(){
    return{
      displayedName: null,
      username: null,
      loading: true,
      incorrectDisplayName: false,
    }
  },
  methods: {
    onBack(){
      this.$navigateBack();
    },

    edit(){
      this.incorrectDisplayName = false;
      prompt('Change displayed name', this.displayedName)
          .then(result => {
            if (result.text !== "") {
              console.log("res:", result.text);
              const host = getHostName();
              const token = getToken();
              console.log("username: ", this.username)
              axios.put(`${host}/api/profile`, {
                    "public": {
                      "displayed_name": result.text,
                    },
                    "private": {
                      "username": this.userName,
                    }
              },
              {
                headers: token
              })
              .then(res => {
                if (res.status === 200){
                  this.displayedName = result.text;
                }
              })
              .catch(err => console.log(err));
            }
            else {
              this.incorrectDisplayName = true;
            }
          });

    },
    onLoad(){
      const host = getHostName();
      const token = getToken();
      axios.get(`${host}/api/profile`, {headers: token})
      .then(res => {
        console.log(res.data);
        this.displayedName = res.data.public.displayed_name;
        this.userName = res.data.private.username;
        this.loading = false;
      })
      .catch(() => this.$navigateTo(Authentication));
    },
    signOut(){
      localStorage.setItem("jwt-token", "");
      this.$navigateTo(Authentication);
    }
  }
};
</script>

<style scoped>
.page {
  align-items: center;
  flex-direction: column;
}

.profile_icon {
  margin-top: 5%;
  height: 150;
  font-weight: bold;
}

.header {
  horizontal-align: center;
  font-size: 25;
  font-weight: 600;
  margin-bottom: 10%;
  text-align: center;
  color: #1a78d5;
}

.form {
  width: 85%;
  margin-top: 10%;
  margin-left: 30;
  margin-right: 30;
  flex-grow: 2;
  vertical-align: top;
}

.btn {
  color: #ffffff;
  height: 50;
  margin: 30 5 15 5;
  background-color: #ff4b4b;
  border-radius: 5;
  font-size: 20;
  font-weight: 600;
}

.error-message{
  font-size: 20;
  color: red;
}
</style>
