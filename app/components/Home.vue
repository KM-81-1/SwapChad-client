<!--<template>-->
<!--  <Page @loaded="onLoad">-->
<!--    <ActionBar backgroundColor="#395f82">-->
<!--      <StackLayout orientation="horizontal">-->
<!--        <label text="Home" fontSize="24" verticalAlignment="center" color="#ffffff" />-->
<!--      </StackLayout>-->
<!--    </ActionBar>-->
<!--    <StackLayout>-->
<!--      <Label :text="`Hello, ${user}`" class="info"/>-->
<!--      <Button text="Registration" @tap="onRegTap"/>-->
<!--      <Button text="Authentication" @tap="onLoginTap"/>-->
<!--      <Button text="Button" @tap="onButtonTap"/>-->
<!--      <Button text="Profile" @tap="onProfileTap"/>-->
<!--      <Button text="Test" @tap="onTestTap"/>-->
<!--      <Button text="Main" @tap="onMainTap"/>-->
<!--    </StackLayout>-->
<!--  </Page>-->
<!--</template>-->

<!--<script>-->
<!--import Chat from "~/components/Chat";-->
<!--import Test from "~/components/Test";-->
<!--import Registration from "~/components/Registration";-->
<!--import Authentication from "~/components/Authentication";-->
<!--// import * as http from "http";-->
<!--import axios from 'axios/dist/axios';-->
<!--// import getToken from "~/utils/token";-->
<!--import getHostName from "~/utils/hostName";-->
<!--import Main from "~/components/Main";-->
<!--import Profile from "~/components/Profile";-->

<!--export default {-->
<!--  components: {Chat, Test, Registration, Authentication, Main, Profile},-->
<!--  methods: {-->
<!--    onMainTap() {-->
<!--      this.$navigateTo(Main);-->
<!--    },-->
<!--    onProfileTap() {-->
<!--      this.$navigateTo(Profile);-->
<!--    },-->
<!--    onLoginTap() {-->
<!--      this.$navigateTo(Authentication);-->
<!--    },-->
<!--    onRegTap() {-->
<!--      this.$navigateTo(Registration);-->
<!--    },-->
<!--    onTestTap() {-->
<!--      this.$navigateTo(Test);-->
<!--    },-->
<!--    onButtonTap() {-->
<!--      this.$navigateTo(Chat);-->
<!--    },-->
<!--    kektap: function () {-->
<!--      console.log(getHostName());-->
<!--    },-->
<!--  },-->
<!--  data() {-->
<!--    return {-->
<!--      isBusy: true,-->
<!--      user: "SallyFrisk",-->
<!--      debug: null-->
<!--    }-->
<!--  },-->
<!--  computed: {-->
<!--    message() {-->
<!--      return "Hello!!!";-->
<!--    },-->
<!--    onLoad(){-->
<!--      const host = getHostName();-->
<!--      axios.get(`${host}/`).then(res => console.log(res.data));-->
<!--      require("nativescript-localstorage");-->
<!--      const token = localStorage.getItem("jwt-token");-->
<!--      console.log("I'm from home page");-->
<!--      console.log(token);-->
<!--    }-->
<!--  },-->
<!--};-->
<!--</script>-->

<!--<style scoped lang="scss">-->

<!--// Custom styles-->
<!--.fas {-->
<!--  //background-color: blue;-->
<!--  //color: blue;-->

<!--}-->

<!--.info {-->
<!--  color: red;-->
<!--  font-size: 40;-->
<!--  horizontal-align: center;-->
<!--  vertical-align: center;-->
<!--}-->
<!--</style>-->
