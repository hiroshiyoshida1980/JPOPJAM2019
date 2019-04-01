<template>
  <!-- Modals -->
  <div class="SignupModal">
    <div class="col-md pb-3">
      <base-button type="danger" class="mb-3 mb-sm-0" @click="signUpModal = true">
        <a v-if="!isButtonDisabled1">
          <i class="fa fa-play"></i> 新規登録
        </a>
        <a v-else>
          <img src="/img/spin.gif" alt> Loading...
        </a>
      </base-button>

      <modal
        :show.sync="signUpModal"
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
            <div class="text-center text-muted mb-4">
              <small>新規登録</small>
            </div>
            <form role="form">
              <base-input
                alternative
                class="mb-3"
                placeholder="Name"
                addon-left-icon="ni ni-hat-3"
                v-model="artistname"
              ></base-input>
              <base-input
                alternative
                class="mb-3"
                placeholder="Email"
                addon-left-icon="ni ni-email-83"
                v-model="username"
              ></base-input>
              <base-input
                alternative
                type="password"
                placeholder="Password"
                addon-left-icon="ni ni-lock-circle-open"
                v-model="password"
              ></base-input>
            </form>

            <base-button
              v-bind:disabled="isButtonDisabled1"
              @click="signUp()"
              type="primary"
              class="my-4"
            >
              <a v-if="!isButtonDisabled1">新規規録</a>
              <a v-else>Loading...</a>
            </base-button>
          </template>
        </card>
      </modal>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase/app'
import Modal from "@/components/Modal.vue";
import Croppa from "vue-croppa";
import axios from "axios";

export default {
  components: {
    Modal
  },
  data() {
    return {
      artistname: null,
      username: null,
      password: "",
      signUpModal: false,
      isButtonDisabled: true,
      isButtonDisabled1: false,
      isButtonDisabled2: false
    };
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
    nowJoinSessionInfo() {
      return this.$store.state.nowJoinSessionInfo;
    }
  },

  methods: {
    signUp() {
      if (
        this.username == null ||
        this.password == null ||
        this.artistname == null
      ) {
        alert("全てを入力してください");
      } else {
        this.isButtonDisabled1 = true;
        this.signUpModal = false;
        firebase
          .auth()
          .createUserWithEmailAndPassword(this.username, this.password)
          .then(user => {
            firebase
              .auth()
              .signInWithEmailAndPassword(this.username, this.password)
              .then(user => {
                var useruid = firebase.auth().currentUser.uid;

                var userInfo = {
                  getapt: 0,
                  name: this.artistname,
                  uid: useruid,
                  played: 0,
                  image:
                    "https://firebasestorage.googleapis.com/v0/b/jpopjam0813.appspot.com/o/user-circle-solid.svg?alt=media&token=18e86c84-0e94-4d35-933c-13b29c61d50e",
                  status: "not_entry",
                  message: {
                    welcomeMessage: {
                      message: "ようこそJ-POP JAMへ！！",
                      name: "J-POP JAM",
                      image:
                        "https://res.cloudinary.com/jpopjam/image/upload/v1553387057/logo_jpopjam_square_BLK_192.png"
                    }
                  }
                };

                firebase
                  .database()
                  .ref("loginuser/" + useruid)
                  .set(userInfo);

                this.$router.push("/top");
              });
          })
          .catch(error => {
            alert(error.message);
            this.isButtonDisabled1 = false;
          });
      }
    }
  }
};
</script>

<style>
</style>
