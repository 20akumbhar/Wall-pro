<template>
  <div class="home " style="z-index: -999;">
    <div class="back bg-blue-50 fixed inset-0" style="z-index: -99;">
      <div class="bg-blue-900 h-96"></div>
    </div>
    <Wallpaper :data="wallpaperData"/>
    <ItQuiz/>
    <Qoutes/>
    <h1 class="m-4 text-xl font-bold text-blue-400 backdrop-grayscale-0">Admin</h1>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 p-4 gap-4">
      <router-link
        to="/users"
        tag="div"
        class="
         bg-white
          shadow-lg
          rounded-md
          flex
          items-center
          justify-between
          p-3
          text-blue-800
          font-medium
        "
      >
        <div
          class="
             flex
            justify-center
            items-center
            w-14
            h-14
            bg-blue-100
            rounded-full
            transition-all
            duration-300
            border
            
            transform
            group-hover:rotate-12
          "
        >
          
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-7 w-7 text-blue-800 stroke-current"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2"
            />
          </svg>
        </div>
        <div class="text-right">
          <p class="text-2xl">{{ users }}</p>
          <p>Users</p>
        </div>
      </router-link>
    </div>





    <br><br><br><br>
  </div>
</template>

<script>
import firebase from "firebase/app";
import Wallpaper from "../components/Home/Wallpaper.vue";
import Qoutes from "../components/Home/Qoutes.vue";
import ItQuiz from "../components/Home/ItQuiz.vue";
import "firebase/firestore";
//import Wallpaper from '../components/Navigation/Sidebar/Wallpaper.vue';
export default {
  name: "Home",
  data: () => ({
    users: 0,
    wallpaperData:{}
  }),
  components: {Wallpaper,Qoutes,ItQuiz},
  methods: {},
  created() {
    firebase
      .firestore()
      .collection("wallpaper-data")
      .doc("data")
      .onSnapshot((doc) => {
        this.users = doc.data().users;
        this.wallpaperData=doc.data()
      });
  },
};
</script>
