<template>
  <div id="app">
    <router-view name="header"></router-view>

    <main>
      <fade-transition origin="center" mode="out-in" :duration="250">
        <router-view/>
      </fade-transition>
    </main>
    <router-view name="footer"></router-view>
  </div>
</template>
<script>
import { FadeTransition } from "vue2-transitions";
import firebase from "firebase/app";

export default {
  components: {
    FadeTransition
  },
  data() {
    return {
    };
  },
  computed: {
    nowJoinSessionInfo() {
      return this.$store.state.nowJoinSessionInfo;
    }
  },

  //認証
  created() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        firebase
          .database()
          .ref("loginuser/" + user.uid)
          .on("value", snapshot => {
            var user = snapshot.val();
            this.$store.commit("onAuthStateChanged", user);
          });
      } else {
        
      }
    });
  }
  //認証
};
</script>

