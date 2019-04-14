<template>
  <div class="liveImageModal d-inline">
    <base-button size="sm" type="white" @click="liveImageModal = true">
      <i class="fa fa-camera"></i>
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
          <h6 class="m-3">画像投稿</h6>
          <div class="row justify-content-center mt-4">
            <croppa
              placeholder="ここをクリックして画像セット"
              v-model="croppa"
              initial-image
              :width="300"
              :height="300"
              :quality="1"
              @file-choose="isButtonDisabled=false"
              @image-remove="isButtonDisabled=true"
            ></croppa>
          </div>
          <div class="text-center">
            <base-button
              v-bind:disabled="isButtonDisabled"
              @click="uploadCroppedImage()"
              type="primary"
              class="my-4"
            >
              <a v-if="!isButtonDisabled2">画像アップロード</a>
              <a v-else>Loading...</a>
            </base-button>
          </div>
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
        uploadPreset: "liveimage",
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
    uploadCroppedImage() {
      this.isButtonDisabled2 = true;
      var file = this.croppa.generateDataUrl("image/jpeg", 1);

      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", this.cloudinary.uploadPreset);
      formData.append("tags", "gs-vue,gs-vue-uploaded");
      // For debug purpose only
      // Inspects the content of formData
      for (var pair of formData.entries()) {
        console.log(pair[0] + ", " + pair[1]);
      }
      axios.post(this.clUrl, formData).then(res => {
        this.thumbs = res.data.secure_url;
        this.isButtonDisabled2 = false;
        this.imageChange();
      });
    },
    imageChange() {
      var useruid = firebase.auth().currentUser.uid;
      var name = "";
      firebase
        .database()
        .ref("loginuser/" + useruid)
        .on("value", snapshot => {
          var loginuser = snapshot.val();
          name = loginuser.name;
        });

      firebase
        .database()
        .ref(
          "eventList/" +
            this.nowJoinSessionInfo +
            "/liveImage/" +
            this.imageEntrynumber
        )
        .push({
          image: this.thumbs,
          uid: useruid,
          name: name
        });
      this.liveImageModal = false;
    }
  }
};
</script>

<style>
</style>
