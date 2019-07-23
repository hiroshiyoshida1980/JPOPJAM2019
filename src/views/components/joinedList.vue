<template>
  <div>
    <h3>ホストバンド</h3>
    <div
      style="width:100%; background-color:#FFFFFF; text-align:left; padding:10px; border-radius: 3px;"
    >
      <li
        class="text-base"
        v-for="(item,index) in fromiineList"
        :key="index"
        style="list-style: none;"
      >
        <a class="item-image pr-2">
          <img class="m-1" :src="item.image" width="40" height="40" v-b-modal="artistInfoId(index)">
          <!-- Modal Component -->
          <b-modal hide-footer :id="'artistInfo3' + index ">
            <img class="m-1" :src="item.image" width="100" height="100">
            <h1>{{item.name}}</h1>
            {{item.pr}}
          </b-modal>
        </a>
        <B>{{item.name}}</B>
      </li>
    </div>
  </div>
</template>
<script>
import firebase from "firebase/app";

export default {
  name: "fromIineList",
  data() {
    return {
      fromiineList: [],
      iine: 0,
      hostlist: [
        "t2xkI2CwWZZZeQEDs09HjXovL0v2",
        "Bk8H0nh2W9gy5vl5AcZv6Ej5jsX2",
        "8J99aarTaRPHXjUOj9iK2aBGv3X2",
        "G5KcuI4VMWexkFwaZsT0hFrNN0f2",
        "xQBM49gteSTou6nkvupKUcgjTvD2",
        "lEmuBc7RlqVD1OVoWUYZ52LVtFc2",
        "1gigqUuB7FQ2L5TGWetMPRqoxM62"
      ]
    };
  },
  computed: {
    nowJoinSessionInfo() {
      return this.$store.state.nowJoinSessionInfo;
    }
  },
  created() {
    //認証
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.fromiinelisten();
      } else {
        this.$router.push("/");
      }
    });
    //認証

    firebase
      .database()
      .ref("loginuser/")
      .on("value", snapshot => {
        this.fromiinelisten();
      });
  },
  methods: {
    artistInfoId(index) {
      return "artistInfo3" + index;
    },
    fromiinelisten() {
      var list = this.hostlist;
      var iinelist = [];

      for (var i = 0; i < list.length; i++) {
        firebase
          .database()
          .ref("loginuser/" + list[i])
          .on("value", snapshot => {
            iinelist.push(snapshot.val());
          });
      }
      this.fromiineList = iinelist;
    }
  }
};
</script>


<style>
.item-image img {
  border-radius: 50%;
  vertical-align: top;
  border: solid 2px rgb(245, 245, 232);
}
</style>