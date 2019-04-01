<template>
  <div>
    もらったいいね！！: {{user.getapt}}
    <div
      style="height:150px; width:100%; overflow-y:auto; background-color:#FFFFFF; text-align:left; padding:10px; border-radius: 3px;"
    >
      <li class="text-base" v-for="item in fromiineList" :key="item.uid" style="list-style: none;">
        <a class="item-image pr-2" @click="isImageModalActive = true">
          <img class="m-1" :src="item.image" width="40" height="40">
        </a>
        <B>{{item.name}}</B>から
        <i class="fa fa-thumbs-up"></i>いいね！
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
      fromiineList: {},
      iine: 0,
      user: {}
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
        firebase
          .database()
          .ref("loginuser/" + user.uid)
          .on("value", snapshot => {
            this.user = snapshot.val();
            this.fromiinelisten();
          });
      } else {
        this.$router.push("/");
      }
    });
    //認証
  },
  methods: {
    fromiinelisten() {

      var list=[]
      firebase
        .database()
        .ref(
          "eventList/" +
            this.nowJoinSessionInfo +
            "/fromiineList/" +
            this.user.uid
        )
        .on("value", snapshot => {
          if (snapshot.val()) {
            var rootList = snapshot.val();
            Object.keys(rootList).forEach(function(val, key) {
              if (rootList[val].iine) {
                firebase
                  .database()
                  .ref("loginuser/" + val)
                  .on("value", snapshot => {
                    if (snapshot.val()) {
                      var loginuser = snapshot.val();
                      list.push(loginuser);
                    }
                  });
              }
            });
            this.fromiineList = list;
          }
        });
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