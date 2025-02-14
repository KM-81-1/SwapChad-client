<template>
  <Page @loaded="onLoad">
    <ActionBarLocal :text="chatTitle" ref="chatTitle" :back="true" :display-profile-icon="true" 
       :display-save-button="true" @backTapped="onBack" @profileTapped="saveChat"/>
    <DockLayout stretchLastChild="true">
      <FlexboxLayout class="enter-block" flexDirection="row"
                     dock="bottom">
        <GridLayout columns="*2, *" rows="auto, auto">
          <TextView class="input" v-model="newMessage" maxLines="5" minHeight="10%"
                     hint="Enter text..." />
          <Button class="send-btn" @tap="sendMessage" text="Send" verticalAlignment="top"
                  row="0" col="1" />
        </GridLayout>
      </FlexboxLayout>
      <ListView dock="top" ref="list" for="mes in messages">
        <v-template>
          <Message
                   :text="mes.text"
                   :side="mes.author ? 'left' : 'right'" />
        </v-template>
      </ListView>
    </DockLayout>
  </Page>
</template>

<script>
import ActionBarLocal from "~/components/ActionBarLocal";
import Message from "~/components/Message";
// import Main from "~/components/Main";
import getToken from "~/utils/token";
import getHostName from "~/utils/hostName";
import axios from 'axios/dist/axios';
import { Application, AndroidApplication, isAndroid } from "@nativescript/core";
export default {
  components: {
    Message,
    ActionBarLocal
  },
  props: [
    "chatId",
    "saved",
    "chatTitle"
  ],
  data() {
    return {
      newMessage: "",
      messages: [ ],
      socket: null,
    };
  },
  methods: {
    onLoad(){
        console.log(this.chatId);
        if (isAndroid) {
          Application.android.on(AndroidApplication.activityBackPressedEvent, function (args) {
            args.cancel = true;
          });
        }
        const WS = require('@master.technology/websockets');
        const host = getHostName();
        this.socket = new WS(`${host.replace("http", "ws")}/api/chat/${this.chatId}`,
            { timeout: 6000, allowCellular: true});
        const token = localStorage.getItem("jwt-token");
        console.log(token);
        this.socket.on('open', () => { console.log("Hey I'm open") });
        this.socket.on('message', this.receiveOldMessages);
        this.socket.on('close', (socket, code, reason) => {
          console.log("Socket was closed because: ",
                    reason, " code: ", code);
          this.$navigateBack();
        });
        this.socket.on('error', function(socket, error) { console.log("Socket had an error", error);});
        this.socket.open();
        this.socket.send(token);
        console.log("setted up");
    },

    receiveOldMessages(socket, messages) {
      JSON.parse(messages).forEach((message) => {
        this.messages.push({
          author: message["from"] === "ANON",
          text: message["text"]
        });
      });
      
      socket.off('message', this.receiveOldMessages);
      socket.on('message', this.receiveMessage);
      
      this.$nextTick().then(() => {
        this.$refs.list.nativeView.scrollToIndexAnimated(this.messages.length);
      });
    },

    receiveMessage(socket, message){
      console.log("received a message: ", message);
      console.log(typeof message);
      this.messages.push({
        author: 1,
        text: message
      });
      this.$nextTick().then(() => {
        this.$refs.list.nativeView.scrollToIndexAnimated(this.messages.length);
      });
    },

    sendMessage() {
      if (this.newMessage !== "") {
        this.socket.send(this.newMessage);
        this.messages.push({
          author: 0,
          text: this.newMessage
        });
        this.newMessage = "";
        const list = this.$refs.list.nativeView;
        console.log(this.messages.length);
        this.$nextTick().then(() => {
          this.$refs.list.nativeView.scrollToIndexAnimated(this.messages.length);
        });
      }
    },

    saveChat() {
      const host = getHostName();
      const token = getToken();
      console.log(token);
      prompt({
        title: "Save chat",
        message: "Enter title:",
        okButtonText: "Save",
        cancelButtonText: "Cancel"
      }).then(result => {
        if (result.result) {
          axios.post(`${host}/api/chat/${this.chatId}/save`,
          { "title": result.text },
          { headers: token})
          .then(res => {
            if (res.status === 200){
              if (!this.saved) {
                alert({
                  title: "Save chat",
                  message: "Chat was saved!"
                });
              }
              this.saved = true;
              this.chatTitle = result.text;
            }
          })
          .catch(err => console.log(err));
        }
        console.log("Dialog result: " + result.result + ", text: " + result.text);
      });
    },

    onBack(){
      if (this.saved) {
        this.socket.close();
        return;
      }
      confirm({
        title: "End chat",
        message: "Are you sure?",
        okButtonText: "Yes",
        cancelButtonText: "Cancel"
      }).then(result => {
        if (result) {
          this.socket.close();
        }
      });
    }
  },
  name: "Chat"
};
</script>

<style scoped>
.left {
  left: 10px;
}

.right {
  right: 10px;
}

.form {
  width: 70%;
  margin-top: 10%;
  margin-left: 30;
  margin-right: 30;
  flex-grow: 2;
  vertical-align: top;
}

.enter-block {
  background-color: #395f82;
  padding: 10;
}

.input {
  font-size: 18;
  placeholder-color: #A8A8A8;
}

.send-btn {
  color: #ffffff;
  height: 40;
  background-color: #405afd;
  border-radius: 5;
  font-size: 20;
  font-weight: 600;
}
</style>
