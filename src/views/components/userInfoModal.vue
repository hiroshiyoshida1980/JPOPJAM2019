<template>
  <div class="item-image userInfoModal d-inline">
    <img
      class="m-1"
      :src="userInfo1(artistuid).image"
      width="30"
      height="30"
      @click="userInfoModal = true"
    >
    <modal
      :show.sync="userInfoModal"
      body-classes="p-0"
      modal-classes="modal-dialog-centered modal-sm"
    >
      <template>
        <card shadow>
          <div class="row justify-content-center">
            <div class="item-image mt-3">
              <img :src="userInfo1(artistuid).image" width="100" height="100">
            </div>
          </div>
          <div class="text-center mt-1">
            <h3 class="m-3">{{userInfo1(artistuid).name}}</h3>
            <div class="mb-4">
              <i class="ni education_hat"></i>
              {{userInfo1(artistuid).pr}}
            </div>
          </div>
        </card>
      </template>
    </modal>
  </div>
</template>

<script>
import firebase from "firebase/app";
import Modal from "@/components/Modal.vue";

export default {
  components: {
    Modal
  },
  props: ["artistuid"],
  data() {
    return {
      userInfoModal: false
    };
  },

  methods: {
    userInfo1(uid) {
      var user = "";
      firebase
        .database()
        .ref("loginuser/" + uid)
        .on("value", snapshot => {
          user = snapshot.val();
        });
      return user;
    }
  }
};
</script>

<style>
.item-image img {
  border-radius: 50%;
  border: solid 2px rgb(245, 245, 232);
}
</style>
