<template>
  <div>
    <card
      type="secondary"
      shadow
      header-classes="bg-white pb-5"
      body-classes="px-lg-5 py-lg-5"
      class="border-0"
    >
      <template>
        <div class="text-center text-muted mb-4">
          <small>登録内容変更</small>
        </div>
        <form role="form">
          <h6 class="m-3">名前を変更 ：{{ user.name }}</h6>
          <base-input
            class="mb-3"
            placeholder="Name"
            addon-left-icon="ni ni-hat-3"
            v-model="user.name"
          ></base-input>
          <div>
            <h6 class="m-3">PRなどあれば入力してください。</h6>

            <b-form-textarea
              id="textarea"
              v-model="user.pr"
              placeholder="PR"
              rows="3"
              max-rows="6"
            />
          </div>

          <h6 class="m-3">アイコン画像変更</h6>

          <div class="row justify-content-center m-4">
            <croppa
              placeholder="クリックして画像変更"
              v-model="croppa"
              :width="200"
              :height="200"
              :quality="1"
              @file-choose="isButtonDisabled=false"
              @image-remove="isButtonDisabled=true"
            >
              <img crossorigin="anonymous" :src="this.user.image" slot="initial">
            </croppa>
          </div>
          <div class="text-center">
            <!--      <base-button
              v-bind:disabled="isButtonDisabled"
              @click="uploadCroppedImage()"
              type="primary"
              class="my-4"
            >
              <a v-if="!isButtonDisabled2">画像アップロード</a>
              <a v-else>Loading...</a>
            </base-button>-->
          </div>
        </form>
        <card shadow>
          <div class="row justify-content-center">
            <div class="item-image mt-3">
              <img :src="this.thumbs||this.user.image" width="70" height="70">
            </div>
          </div>
          <div class="text-center mt-1">
            <h3>{{user.name}}</h3>
            <div class="mb-4">
              <i class="ni education_hat"></i>
              {{user.pr}}
            </div>

            <base-button
              v-bind:disabled="isButtonDisabled1"
              @click="uploadCroppedImage()"
              type="primary"
              class="my-4"
            >
              <a v-if="!isButtonDisabled1">登録</a>
              <a v-else>Loading...</a>
            </base-button>
          </div>
        </card>
      </template>
    </card>
  </div>
</template>

<script>
import firebase from "firebase";
import Croppa from "vue-croppa";
import axios from "axios";

export default {
  data() {
    return {
      user: {},
      isButtonDisabled: true,
      isButtonDisabled1: false,
      isButtonDisabled2: false,
      croppa: {},
      cloudinary: {
        uploadPreset: "jpopjamicon",
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
    nowJoinSessionInfo() {
      return this.$store.state.nowJoinSessionInfo;
    }
  },
  created() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        firebase
          .database()
          .ref("loginuser/" + user.uid)
          .on("value", snapshot => {
            this.user = snapshot.val();
          });
      } else {
        this.$router.push("/");
      }
    });
  },

  methods: {
    uploadCroppedImage() {
      this.isButtonDisabled1 = true;
      var file = this.croppa.generateDataUrl("image/jpeg", 1);

      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", this.cloudinary.uploadPreset);
      formData.append("tags", "gs-vue,gs-vue-uploaded");
      // For debug purpose only
      // Inspects the content of formData
      for (var pair of formData.entries()) {
      }
      axios.post(this.clUrl, formData).then(res => {
        this.thumbs = res.data.secure_url;
        this.userInfoChange();
      });
    },

    userInfoChange() {
      var pr = this.user.pr || "";
      var userInfo = {
        name: this.user.name,
        image: this.thumbs || this.user.image,
        pr: this.user.pr
      };

      var message = {
        name: this.user.name,
        image: this.thumbs || this.user.image,
        messege: this.user.pr
      };

      firebase
        .database()
        .ref("loginuser/" + this.user.uid)
        .update(userInfo, function(error) {
          if (error) {
            alert(
              "更新できませんでした。通信状態の良いところでトライしてみてください。"
            );
          } else {
            alert("更新しました");
          }
        });
      this.isButtonDisabled1 = false;
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

.jpjradio .option-input {
  position: relative;
  position: relative;
  top: 13.33333px;
  right: 0;
  bottom: 0;
  left: 0;
  width: 30px;
  height: 30px;
  margin-right: 0.5rem;
  cursor: pointer;
  transition: all 0.15s ease-out 0s;
  color: #ffffff;
  border: none;
  outline: none;
  background: #d7d5cb;
  -webkit-appearance: none;
  appearance: none;
}
.jpjradio .option-input:hover {
  background: #fff1b5;
}
.jpjradio .option-input:checked {
  background: #fdd007;
}
.jpjradio .option-input:checked::before {
  font-size: 20px;
  line-height: 30px;
  position: absolute;
  display: inline-block;
  width: 30px;
  height: 30px;
  content: "✔";
  text-align: center;
}
.jpjradio .option-input:checked::after {
  position: relative;
  display: block;
  content: "";
  -webkit-animation: click-wave 0.65s;
  animation: click-wave 0.65s;
  background: #fdd007;
}
.jpjradio .option-input.radio {
  border-radius: 50%;
}
.jpjradio .option-input.radio::after {
  border-radius: 50%;
}
.jpjradio label {
  line-height: 4px;
  padding: 5px;
}
.jpjradio .option-input:disabled {
  cursor: not-allowed;
  background: #b8b7b7;
}
.jpjradio .option-input:disabled::before {
  font-size: 20px;
  line-height: 30px;
  position: absolute;
  display: inline-block;
  width: 30px;
  height: 30px;
  content: "✖︎";
  text-align: center;
}
.jpjradio .disabled {
  color: #9e9e9e;
}
</style>
