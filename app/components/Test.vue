<template>
  <Page>
    <ActionBar backgroundColor="#395f82">
      <StackLayout orientation="horizontal">
        <label text="Registration" fontSize="24" verticalAlignment="center" color="#ffffff" />
      </StackLayout>
    </ActionBar>

    <FlexboxLayout class="page">
      <StackLayout class="form">
        <Image class="logo" src="~/images/swap_chat_icon.png"/>
        <Label class="header" text="SwapChad"/>
        <StackLayout class="input-field">
          <TextField class="input" hint="Email" keyboardType="email" autocorrect="false" autocapitalizationType="none" />
          <StackLayout class="hr-light"/>
        </StackLayout>

        <StackLayout class="input-field">
          <TextField class="input" hint="Password" secure="true"/>
          <StackLayout class="hr-light"/>
        </StackLayout>
        <Button text="Log In" class="btn btn-primary m-t-20"/>
      </StackLayout>
    </FlexboxLayout>
  </Page>
</template>

<script>
export default {
  name: "Test"
}
</script>

<style scoped>
.page {
  align-items: center;
  flex-direction: column;
}
.form {
  width: 70%;
  margin-left: 30;
  margin-right: 30;
  flex-grow: 2;
  vertical-align: middle;
}
.logo {
  margin-bottom: 12;
  height: 90;
  font-weight: bold;
}
.header {
  horizontal-align: center;
  font-size: 40;
  font-weight: 600;
  margin-bottom: 70;
  text-align: center;
  color: #1a78d5;
}
.input-field {
  margin-bottom: 25;
}
.input {
  font-size: 18;
  placeholder-color: #A8A8A8;
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
</style>
