<template>
  <div class="top mt-5">
    <div class="container">
      <tabs pills class="flex-column flex-md-row">
        <card shadow>
          <tab-pane key="tab1">
            <template slot="title">
              <i class="fa fa-comment-o mr-2"></i>HOME
            </template>
            <Chat/>
          </tab-pane>

          <tab-pane key="tab2">
            <template slot="title">
              <i class="ni ni-button-play mr-2"></i>ENTRY
            </template>

            <EntryPage/>
          </tab-pane>

          <tab-pane key="tab3">
            <template slot="title">
              <i class="ni ni-like-2 mr-2"></i>
              いいね！
            </template>
            <fromIineList/>
          </tab-pane>
        </card>
      </tabs>
      <div class="mt-2">
        <mainEntryList/>
                    <joinedList/>
      </div>
    </div>
    <footer class="fixed-bottom p-1"></footer>
  </div>
</template>
<script>
import EntryPage from "./components/EntryPage";
import Chat from "./components/Chat";
import joinedList from "./components/joinedList";
import finishedEvent from "./components/finishedEvent";
import fromIineList from "./components/fromIineList";
import PrivateChat from "./components/PrivateChat";
import mainEntryList from "./components/mainEntryList";
import Landing from "./Landing";
import firebase from "firebase";
import Tabs from "@/components/Tabs/Tabs.vue";
import TabPane from "@/components/Tabs/TabPane.vue";
//window.onbeforeunload = function(e) {
//    e.returnValue = "ページを離れようとしています。よろしいですか？";}
export default {
  components: {
    Tabs,
    fromIineList,
    TabPane,
    EntryPage,
    Chat,
    PrivateChat,
    mainEntryList,
    joinedList
  },
  data() {
    return {
      isAuth: false,
      user: {}
    };
  },
  computed: {
    nowJoinSessionInfo() {
      return this.$store.state.nowJoinSessionInfo;
    }
  }
};
</script>
<style>
</style>
