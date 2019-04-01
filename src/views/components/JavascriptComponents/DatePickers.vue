<template>
  <div class="row">
    <base-input addon-left-icon="ni ni-calendar-grid-58">
      <flat-picker
        slot-scope="{focus, blur}"
        @on-open="focus"
        @on-close="blur"
        :config="{allowInput: true}"
        class="form-control datepicker"
        v-model="simple"
      ></flat-picker>
    </base-input>
  </div>
</template>
<script>
import flatPicker from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";
export default {
  components: {
    flatPicker
  },
  data() {
    return {
      simple: "2018-07-17"
    };
  },
  watch: {
    simple: function() {
      //ボタンをクリックするとこのメソッドが起動する
      this.$emit("date", this.simple); //親へイベント発火を伝える
    }
  }
};
</script>
