
import Vue from "vue";
import Router from "vue-router";
import Header from "./layout/JPJheader";
import Footer from "./layout/JPJfooter";
import Top from "./views/Top.vue";
import event from "./views/event.vue";
import members from "./views/members.vue";
import UserInfoEdit from "./views/UserInfoEdit.vue";
import SessionControl from "./views/SessionControl.vue";
import toMonitor from "./views/toMonitor.vue";
import Scores from "./views/Scores.vue";
import Hero from "./views/Hero.vue";
import access from "./views/access.vue";
import tunes from "./views/Tunes.vue";



Vue.use(Router);

let router = new Router({
  mode: 'history',
  routes: [
    {
      path: "/",
      name: "Hero",
      components: {
        header: Header,
        default: Hero,
      }
    },
    {
      path: "/event",
      name: "event",
      components: {
        header: Header,
        default: event,
        footer: Footer
      }
    },
    {
      path: "/members",
      name: "members",
      components: {
        header: Header,
        default: members,
        footer: Footer
      }
    },
    {
      path: "/access",
      name: "access",
      components: {
        header: Header,
        default: access,
        footer: Footer
      }
    },
    {
      path: "/top",
      name: "Top",
      components: {
        header: Header,
        default: Top,
        footer: Footer
      },

    },
    {
      path: "/userinfoedit",
      name: "UserInfoEdit",
      components: {
        header: Header,
        default: UserInfoEdit,
        footer: Footer
      },

    },
    {
      name: 'Scores',
      path: '/scores/:trackid',
      component: Scores,
    },

    {
      path: "/tunes",
      name: "tunes",
      components: {
        header: Header,
        default: tunes,
        footer: Footer
      },

    },
    {
      path: "/sessioncontrol",
      name: "SessionControl",
      components: {
        header: Header,
        default: SessionControl,
        footer: Footer
      },

    },
    {
      path: "/toMonitor",
      name: "toMonitor",
      components: {
        default: toMonitor,
      },

    },

  ],

});



export default router
