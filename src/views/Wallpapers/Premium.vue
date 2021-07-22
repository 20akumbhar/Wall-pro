<template>
      <div class="flex justify-between items-center">
      <h1 class="font-bold text-lg ml-4">Premium</h1>
    <router-link
      tag="button"
      to="/wallpapers/new"
      type="button"
      class="
        focus:outline-none
        text-white text-sm
        py-2.5
        px-5
        rounded-md
        bg-bgray-500
        hover:bg-bgray-600
        hover:shadow-lg
        flex
        items-center
        m-2
      "
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="w-4 h-4 mr-2"
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
      Add wallpaper
    </router-link>
  </div>
  <hr>

  <div class="flex p-2 flex-wrap max-w-max gap-2 overflow-hidden">
      <router-link tag="div" :to="'/wallpapers/view/'+wallpaper.id" v-for="wallpaper in wallpapers" :key="wallpaper.id" class="w-36 h-56">
          <img :src="wallpaper.data().thumbnail" alt="image" class="w-full h-full object-center object-cover">
      </router-link>
  </div>
</template>

<script>
import firebase from 'firebase/app';
import 'firebase/firestore'
export default {
    data:()=>({wallpapers:[]}),
  created() {
    var obj = JSON.parse(localStorage.getItem("user"));
    if (!obj.isAdmin) {
      this.$router.push("/");
    }

    firebase
      .firestore()
      .collection("wallpapers")
      .where('isPremium','==',true)
      .onSnapshot((querySnapshot) => {
        var data = [];
        querySnapshot.forEach((doc) => {
          data.push(doc);
        });
        this.wallpapers=data;
      });

  },
};
</script>