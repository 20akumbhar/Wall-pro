<template>
  <div class="flex justify-between items-center">
    <h1 class="font-bold text-lg ml-4">Popular</h1>
    <router-link
      tag="button"
      to="/wallpapers/new"
      type="button"
      class="
        focus:outline-none
        text-white text-sm
        py-2.5
        px-4
        rounded-md
        bg-bgray-900
        hover:bg-bgray-800
        hover:shadow-lg
        flex
        items-center
        m-2
      "
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="w-4 h-4 mr-1"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
        />
      </svg>
      New Wallpaper
    </router-link>
  </div>
  <hr />
  <!-- <div class="grid px-1 grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-7 max-w-max gap-2 overflow-hidden"> -->
  <div class="flex p-2 flex-wrap max-w-max gap-2 overflow-hidden">
    <router-link
      tag="div"
      :to="'/wallpapers/view/' + wallpaper.id"
      v-for="wallpaper in wallpapers"
      :key="wallpaper.id"
      class="w-36 h-56"
    >
      <img
        :src="wallpaper.data().thumbnail"
        alt="image"
        class="w-full h-full object-center object-cover"
      />
    </router-link>
  </div>

  <div class="flex justify-center my-5" v-if="loadMore">
    <button
      @click="loadMoreWallpapers"
      class="
        bg-bgray-800
        focus:outline-none
        text-bgray-300
        py-1
        px-3
        rounded-lg
        flex
        items-center
        hover:bg-bgray-900
      "
    >
      <div
        v-if="loadingMore"
        class="h-4 w-4 border border-t-2 animate-spin rounded-full mr-2"
      ></div>
      {{ loadingMore ? "Loading" : "Load More" }}
    </button>
  </div>
</template>
<script>
import firebase from "firebase/app";
import "firebase/firestore";
export default {
  data: () => ({
    wallpapers: [],
    loadMore: false,
    loadingMore: true,
    lastVisible: null,
  }),
  created() {
    var obj = JSON.parse(localStorage.getItem("user"));
    if (!obj.isAdmin) {
      this.$router.push("/");
    }

    firebase
      .firestore()
      .collection("wallpapers")
      .where("isPopular", "==", true)
      .orderBy("timestamp", "desc")
      .limit(14)
      .onSnapshot((querySnapshot) => {
        var data = [];
        querySnapshot.forEach((doc) => {
          data.push(doc);
          this.lastVisible = doc;
        });
        this.wallpapers = data;
        if (data.length >= 14) {
          this.loadMore = true;
        } else {
          this.loadMore = false;
        }
        this.loadingMore = false;
      });
  },
  methods:{
 loadMoreWallpapers() {
    console.log("loading more");
    this.loadingMore = true;
    firebase
      .firestore()
      .collection("wallpapers")
      .where("isPopular", "==", true)
      .orderBy("timestamp", "desc")
      .startAfter(this.lastVisible)
      .limit(14)
      .onSnapshot((querySnapshot) => {
        var data = [];
        querySnapshot.forEach((doc) => {
          data.push(doc);
          this.lastVisible = doc;
        });
        this.wallpapers.push(...data);
        if (data.length >= 14) {
          this.loadMore = true;
        } else {
          this.loadMore = false;
        }
        this.loadingMore = false;
      });
  },
  }
 
};
</script>