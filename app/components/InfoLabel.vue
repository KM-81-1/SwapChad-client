<template>
  <StackLayout class="info-block">
    <GridLayout columns="*2, *" rows="50%">
      <Label class = "label-info" :text="text" row="0" col="0"/>
      <Button class = "change-btn" text="Сhange" row="0" col="1" @tap="$emit('startEditing')"/>
    </GridLayout>
  </StackLayout>
</template>

<script>
export default {
  name: "InfoLabel",
  props:{
    text: String,
  }
}
</script>

<style scoped>
.info-block {
  margin-bottom: 4%;
}
.label-info {
  border-radius: 30;
  background-color: #efefef;
  height: 40;
  padding: 8%;
  font-size: 16;
  text-align: center;
  color: #15152d;

}
.change-btn {
  color: #ffffff;
  height: 40;
  background-color: #405afd;
  border-radius: 5;
  font-size: 20;
  font-weight: 600;
}
</style>
