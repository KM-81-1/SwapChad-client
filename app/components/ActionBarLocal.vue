<template>
  <ActionBar backgroundColor="#395f82">
    <NavigationButton text="Go back" android.systemIcon="ic_menu_back" @tap="$emit('backTapped')" v-if="back"/>
    <StackLayout orientation="horizontal">
      <label :text="text" fontSize="24" verticalAlignment="center" color="#ffffff"/>
    </StackLayout>
    <ActionItem ios.position="left" v-if="displayProfileIcon" @tap="$emit('profileTapped')">
      <Image class="profile" src="~/images/profile_icon.png"/>
    </ActionItem>
  </ActionBar>
</template>

<script>
//import Profile from "~/components/Profile";
export default {
  //components:{Profile},
  methods: {
  },
  name: "ActionBarLocal",
  props: {
    text: String,
    back: Boolean,
    displayProfileIcon: Boolean
  },
}
</script>

<style scoped>
.profile_layout {
  /*width: 100%;*/
}
.profile {
  height: 50;
  padding-right: 5%;
}
</style>
