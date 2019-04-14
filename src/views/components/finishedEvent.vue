<template>
  <div>

  </div>
</template>
<script>
import firebase from "firebase/app";

export default {
  name: "finishedEvent",
  data() {
    return {
      board: [],
      message: "",
      user:{}
    };
  },

  computed: {
    nowJoinSessionInfo() {
      return this.$store.state.nowJoinSessionInfo;
    }
  },

  methods: {

  }
};
</script>


<style>


</style>