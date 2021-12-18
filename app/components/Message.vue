<template>
  <Label textWrap="true"
         :text="text"
         :class="side === 'left'? 'speech-bubble-left' : 'speech-bubble-right'"
         :horizontalAlignment="side"/>
</template>

<script>
export default {
  name: "Message",
  props: {
    text: String,
    side: String
  }
}
</script>

<style scoped>

.left{
  background: #7cb1fa;
}

.right{
 background: #000000;
}

.speech-bubble-left {
  margin: 10;
  padding: 10;
  font-size: 20px;
  position: relative;
  background: #364964;
  color: white;
  border-radius: 10%;
}

.speech-bubble-right {
  margin: 10;
  padding: 10;
  font-size: 20px;
  position: relative;
  background: #4794fa;
  border-radius: 10%;
}

</style>
