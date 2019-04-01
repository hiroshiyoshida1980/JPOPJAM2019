<template>
  <div class="tab-pane" v-show="active" :id="id || title" :class="{active: active}">
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: "tab-pane",
  props: {
    title: {
      type: Object,
      default: "",
      description: "Tab pane title"
    },
    id: {
      type: Object,
      default: null,
      description: "Tab pane id"
    }
  },
  inject: ["addTab", "removeTab"],
  data() {
    return {
      active: false
    };
  },
  mounted() {
    this.addTab(this);
  },
  destroyed() {
    if (this.$el && this.$el.parentNode) {
      this.$el.parentNode.removeChild(this.$el);
    }
    this.removeTab(this);
  }
};
</script>
<style>
</style>
