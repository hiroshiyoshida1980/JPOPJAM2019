<template>
  <div class="liveImageModal d-inline">
    <base-button type="white" @click="liveImageModal = true">
      <i class="fa fa-camera"></i> 終了後写真アップロード
    </base-button>
    <modal
      :show.sync="liveImageModal"
      body-classes="p-0"
      modal-classes="modal-dialog-centered modal-sm"
    >
      <card
        type="secondary"
        shadow
        header-classes="bg-white pb-5"
        body-classes="px-lg-5 py-lg-5"
        class="border-0"
      >
        <template>
          <div class="file">
            <label class="file-label">
              <input
                type="file"
                class="file-input"
                v-on:change="upload($event.target.files)"
                accept="image/*"
                multiple="multiple"
              >

              <b-button class="file-label" v-bind:disabled="isButtonDisabled2">画像ファイルを選ぶ</b-button>
            </label>
          </div>

          <a v-if="isButtonDisabled2">しばらくお待ちください・・</a>
        </template>
      </card>
    </modal>
  </div>
</template>

<script>
import firebase from "firebase/app";
import Croppa from "vue-croppa";
import axios from "axios";
import Modal from "@/components/Modal.vue";

export default {
  components: {
    Modal
  },
  props: ["imageEntrynumber"],
  data() {
    return {
      isButtonDisabled: true,
      isButtonDisabled1: false,
      isButtonDisabled2: false,
      liveImageModal: false,
      croppa: {},
      cloudinary: {
        uploadPreset: "JPOPJAM20190410",
        apiKey: "729365936866655",
        cloudName: "jpopjam"
      },
      thumb: {
        url: ""
      },
      thumbs: ""
    };
  },
  computed: {
    clUrl: function() {
      return `https://api.cloudinary.com/v1_1/${
        this.cloudinary.cloudName
      }/upload`;
    },
    user() {
      return this.$store.state.user;
    },
    nowJoinSessionInfo() {
      return this.$store.state.nowJoinSessionInfo;
    }
  },

  methods: {
    upload: function(file) {
      for (var i = 0; i < file.length; i++) {
        const formData = new FormData();
        formData.append("file", file[i]);
        formData.append("upload_preset", this.cloudinary.uploadPreset);
        formData.append("tags", "gs-vue,gs-vue-uploaded");

        axios.post(this.clUrl, formData).then(res => {
          this.thumbs = res.data.secure_url;
          var useruid = firebase.auth().currentUser.uid;
          firebase
            .database()
            .ref("eventList/" + this.nowJoinSessionInfo + "/liveImage/all")
            .push({
              image: this.thumbs,
              name: "yoichi",
              url: "https://www.instagram.com/yoichi_photograph/?hl=ja"
            });
        });
      }
    }
  }
};
</script>

<style>
</style>
