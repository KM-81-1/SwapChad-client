<template>
  <Page @loaded="onLoad">
    <ActionBarLocal text="Main Menu" :back="false"
                    :display-profile-icon="true"
                    @profileTapped="openProfile"
    />
    <ActivityIndicator :busy="loading" class="activity-indicator"/>
    <FlexboxLayout class="page" v-if="!loading">

      <StackLayout class="form" verticalAlignment="center">
        <Label class="header" :text="`Hello, ${displayedName}`" />
        <Button text="Start Chat"
                class="btn_start"
                v-if="!searching"
                @tap="startChat"/>
        <Button text="Stop searching"
                v-if="searching"
                class="btn_searching"
                @tap="stopSearching"/>
        <Label :text="chatId" v-if="chatId" fontSize="24"/>
        <ActivityIndicator :busy="searching" class="activity-indicator" verticalAlignment="center"/>
      </StackLayout>
    </FlexboxLayout>
  </Page>
</template>

<script>
import Profile from '~/components/Profile';
import ActionBarLocal from "~/components/ActionBarLocal";
import Chat from "~/components/Chat";
import axios from 'axios/dist/axios';
import getHostName from "~/utils/hostName";
import getToken from "~/utils/token";
import Authentication from "~/components/Authentication";

export default {
  data() {
    return {
      searching: false,
      loading: true,
      displayedName: null,
      chatId: null,
      socket: null
    }
  },
  name: "Main",
  components: {
    ActionBarLocal, Chat, Authentication
  },
  methods: {
    openProfile(){
      this.$navigateTo(Profile);
    },

    startChat() {
      this.searching = true;
      let token = getToken();
      const host = getHostName();
      fetch(`${host}/api/chats/start-search`, {method: "POST", headers: token})
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        const chatId = data.chat_id;
        if (chatId) {
          this.$navigateTo(Chat, {
            props: {
              chatId: chatId
            }
          });
        }
      });
    },

    stopSearching(){

      const token = getToken();
      const host = getHostName();
      fetch(`${host}/api/chats/abort-search`, {method: "POST", headers: token})
      .then(res => {
        if (res.status === 200){
          this.searching = false;
        }
      })
      .catch(err => console.log(err));
    },

    onLoad() {
      const host = getHostName();
      const token = getToken();
      console.log(token);
      const url = `${host}/api/profile`;
      console.log("Profile");
      console.log(url)
      console.log( {headers: token});

      axios.get(`${host}/api/profile`, {headers: token})
          .then(res => {
            if (res.status === 403){
              this.$navigateTo(Authentication);
            }
            else if (res.status === 200) {
              this.displayedName = res.data.public.displayed_name;
              this.loading = false;
              this.searching = false;
              console.log(this.displayedName);
            }
          })
          .catch(() => this.$navigateTo(Authentication));
    }
  }
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
  margin-bottom: 15%;
  flex-grow: 2;
  vertical-align: bottom;
}

.btn_start{
  color: #ffffff;
  height: 50;
  margin: 30 5 15 5;
  background-color: #405afd;
  border-radius: 5;
  font-size: 20;
  font-weight: 600;
}
.btn_searching{
  color: #ffffff;
  height: 50;
  margin: 30 5 15 5;
  background-color: #ff4b4b;
  border-radius: 5;
  font-size: 20;
  font-weight: 600;
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

.header {
  horizontal-align: center;
  font-size: 25;
  font-weight: 600;
  margin-bottom: 10%;
  text-align: center;
  color: #1a78d5;
}
</style>
