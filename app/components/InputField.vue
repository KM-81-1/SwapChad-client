<template>
  <StackLayout class="input-field">
    <TextField class="input" :class="error ? 'input-error': ''"
               v-model="inputData"
               @textChange="debug"
               :hint="hint"
               :secure="secure"
               :keyboardType="keyboardType"
               :autocorrect="autocorrect"
               :autocapitalizationType="autocapitalizationType" />
    <StackLayout class="hr-light"/>
  </StackLayout>
</template>

<script>
export default {
  name: "InputField",
  props: {
    hint: String,
    secure: Boolean,
    keyboardType: String,
    autocorrect: Boolean,
    autocapitalizationType: String,
    error: Boolean
  },
  data(){
    return {
      inputData: ""
    }
  },
  methods: {
    debug(){
      this.$emit("textChange", this.inputData);
    }
  }
}
</script>

<style scoped>
.input-field {
  margin-bottom: 25;
}
.input {
  font-size: 18;
  placeholder-color: #A8A8A8;
}

.input-error{
  color: red;
  placeholder-color: red;
  border-color: red;
}

</style>
