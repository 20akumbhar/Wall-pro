<template>
  <div class="main relative">
    <Navbar v-if="isLoginPage" @on-toggle="toggleSidebar" />
    <Sidebar v-if="isLoginPage" :toggle="sidebarToggle" @on-toggle="toggleSidebar" />
    <div class="main md:ml-64">
      <router-view />
    </div>
  </div>
</template>
<script>
import Navbar from "./Navigation/Navbar.vue";
import Sidebar from "./Navigation/Sidebar.vue";
export default {
  components: { Navbar, Sidebar },
  data: () => ({ isLoginPage: false, sidebarToggle: true }),
  methods: {
    add() {},
    toggleSidebar() {
      this.sidebarToggle = !this.sidebarToggle;
    },
  },
  watch: {
    $route: function () {
      // Check if given route is true, if it is then hide Nav.
      if (this.$route.path === "/login") {
        this.isLoginPage = false;
      } else {
        this.isLoginPage = true;
      }
    },
  },
};
</script>