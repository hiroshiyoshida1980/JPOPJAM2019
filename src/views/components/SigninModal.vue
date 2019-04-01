<template>
  <!-- Modals -->
  <div class="row">
    <div class="col-md mt-3 mb-3">
      <base-button type="warning" class="mb-3 mb-sm-0" @click="signInModal = true">
        <a v-if="!isButtonDisabled">
          <i class="fa fa-play"></i>
          LOGIN
        </a>
        <a v-else>
          <img src="/img/ajax-loader2.gif" alt> Loading...
        </a>
      </base-button>

      <modal
        :show.sync="signInModal"
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
          <div class="text-center text-muted mb-4">
            <small>ログイン</small>
          </div>
          <form role="form">
            <base-input
              alternative
              v-model="username"
              class="mb-3"
              placeholder="Email"
              addon-left-icon="ni ni-email-83"
            ></base-input>
            <base-input
              alternative
              v-model="password"
              type="password"
              placeholder="Password"
              addon-left-icon="ni ni-lock-circle-open"
            ></base-input>
            <div class="text-center">
              <base-button
                v-bind:disabled="isButtonDisabled"
                @click="signIn()"
                type="primary"
                class="my-4"
              >
                <a v-if="!isButtonDisabled">Sign in</a>
                <a v-else>Loading...</a>
              </base-button>
            </div>
          </form>
        </card>
      </modal>
    </div>
  </div>
</template>
<script>
import firebase from 'firebase/app'
import Modal from "@/components/Modal.vue";

export default {
  components: {
    Modal
  },
  data() {
    return {
      username: "",
      password: "",
      signInModal: false,
      isButtonDisabled: false
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
    signIn() {
      this.isButtonDisabled = true;
      this.signInModal = false;

      firebase
        .auth()
        .signInWithEmailAndPassword(this.username, this.password)
        .then(
          user => {
            this.isButtonDisabled = false;
            this.$router.push("/top");
          },
          err => {
            alert(err + "ログインに失敗しました");
            this.isButtonDisabled = false;
            this.signInModal = false;
          }
        );
    }
  }
};
</script>
<style>
</style>
