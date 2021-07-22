<template>
  <div
    @click="close"
    v-if="!toggle"
    class="md:hidden fixed inset-0 bg-bgray-600 bg-opacity-10 z-40"
  ></div>

  <div @click="close" class="sidebae z-50 max-w-min fixed top-0 left-0">
    <!-- component -->
    <!-- component -->
    <div
      class="
        min-h-screen
        flex flex-col flex-auto flex-shrink-0
        antialiased
        max-w-min
        text-gray-800
        z-10
      "
    >
      <div
        class="
          md:ml-0
          fixed
          flex flex-col
          top-0
          left-0
          w-64
          bg-gray-900
          h-full
          shadow-lg
          transform
          duration-500
        "
        :class="toggle ? '-ml-64' : 'ml-0'"
      >
        <div class="flex items-center pl-6 h-20 border-b border-gray-800">
          <div class="ml-1">
            <p
              class="
                ml-1
                text-md
                font-medium
                tracking-wide
                truncate
                text-gray-100
                font-sans
                w-52
              "
            >
              {{ emailId }}
            </p>
            <div class="badge">
              <span
                class="
                  px-2
                  py-0.5
                  ml-auto
                  text-xs
                  font-medium
                  tracking-wide
                  text-blue-800
                  bg-blue-100
                  rounded-full
                "
                >{{ isAdmin ? "Admin" : "User" }}</span
              >
            </div>
          </div>
        </div>
        <div class="overflow-y-auto overflow-x-hidden flex-grow">
          <ul class="flex flex-col py-6 space-y-1">
            <li class="px-5">
              <div class="flex flex-row items-center h-8">
                <div
                  class="
                    flex
                    font-semibold
                    text-sm text-gray-300
                    my-4
                    font-sans
                    uppercase
                  "
                >
                  Dashboard
                </div>
              </div>
            </li>
            <li>
              <router-link
                active-class="bg-gray-700 text-bgray-200 border-blue-500"
                to="/"
                class="
                  relative
                  flex flex-row
                  items-center
                  h-11
                  focus:outline-none
                  hover:bg-gray-700
                  text-gray-500
                  hover:text-gray-200
                  border-l-4 border-transparent
                  hover:border-blue-500
                  pr-6
                "
              >
                <span class="inline-flex justify-center items-center ml-4">
                  <svg
                    class="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    ></path>
                  </svg>
                </span>
                <span
                  class="
                    ml-2
                    font-semibold
                    text-sm
                    tracking-wide
                    truncate
                    font-sans
                  "
                  >Home</span
                >
              </router-link>
            </li>
            <Wallpaper v-if="wallpaper" :isAdmin="isAdmin" />
            <Qoutes v-if="qoute"/>
            <Users v-if="isAdmin" />
            <li class="mt-auto">
              <a
                @click="logout"
                href="#"
                class="
                  relative
                  flex flex-row
                  items-center
                  h-11
                  focus:outline-none
                  hover:bg-gray-700
                  text-gray-500
                  hover:text-gray-200
                  border-l-4 border-transparent
                  hover:border-red-500
                  pr-6
                "
              >
                <span
                  class="
                    inline-flex
                    justify-center
                    items-center
                    ml-4
                    text-red-400
                  "
                >
                  <svg
                    class="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    ></path>
                  </svg>
                </span>
                <span
                  class="
                    ml-2
                    font-semibold
                    text-sm
                    tracking-wide
                    truncate
                    font-sans
                  "
                  >Logout</span
                >
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import firebase from "firebase/app";
import "firebase/auth";
import Wallpaper from "./Sidebar/Wallpaper.vue";
import Users from "./Sidebar/Users.vue";
import Qoutes from "./Sidebar/Qoutes.vue";
export default {
  components: { Wallpaper, Users,Qoutes },
  data: () => ({ email: "", isAdmin: false, wallpaper: false,qoute:false }),
  props: {
    toggle: { type: Boolean, default: true },
  },
  emits: ["on-toggle"],
  methods: {
    close() {
      this.$emit("on-toggle");
    },
    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          localStorage.removeItem("user");
          this.$router.push("/");
        });
    },
  },
  created() {
    this.emailId = firebase.auth().currentUser.email;
    var user = JSON.parse(localStorage.getItem("user"));
    this.isAdmin = user.isAdmin;
    this.wallpaper = user.isAdmin || user.access.indexOf("wallpapers") != -1;
    this.qoute = user.isAdmin || user.access.indexOf("qoutes") != -1;
  },
};
</script>
<style scoped>
/* width */
::-webkit-scrollbar {
  width: 4px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #888;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>