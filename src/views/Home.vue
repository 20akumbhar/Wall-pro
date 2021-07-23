<template>
  <div class="home">
    <h1 class="m-4 text-xl font-bold">Wallpapers</h1>
    <hr class="mx-5 my-2" />
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 p-4 gap-4">
      <router-link
        tag="div"
        to="/categories"
        class="
          bg-blue-500
          shadow-lg
          rounded-md
          flex
          items-center
          justify-between
          p-3
          border-b-4 border-blue-600
          text-white
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
            bg-white
            rounded-full
            transition-all
            duration-300
            transform
            group-hover:rotate-12
          "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="stroke-current h-7 w-7 text-blue-800"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"
            />
          </svg>
        </div>
        <div class="text-right">
          <p class="text-2xl">{{ categories }}</p>
          <p>Categories</p>
        </div>
      </router-link>
      <router-link
        tag="div"
        to="/wallpapers"
        class="
          bg-blue-500
          shadow-lg
          rounded-md
          flex
          items-center
          justify-between
          p-3
          border-b-4 border-blue-600
          text-white
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
            bg-white
            rounded-full
            transition-all
            duration-300
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
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </div>
        <div class="text-right">
          <p class="text-2xl">{{ wallpapers }}</p>
          <p>Wallpapers</p>
        </div>
      </router-link>
      <router-link
        to="/wallpapers/popular"
        tag="div"
        class="
          bg-blue-500
          shadow-lg
          rounded-md
          flex
          items-center
          justify-between
          p-3
          border-b-4 border-blue-600
          text-white
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
            bg-white
            rounded-full
            transition-all
            duration-300
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
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        </div>
        <div class="text-right">
          <p class="text-2xl">{{ popularWallpaper }}</p>
          <p>Popular</p>
        </div>
      </router-link>
      <router-link
        to="/wallpapers/premium"
        tag="div"
        class="
          bg-blue-500
          shadow-lg
          rounded-md
          flex
          items-center
          justify-between
          p-3
          border-b-4 border-blue-600
          text-white
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
            bg-white
            rounded-full
            transition-all
            duration-300
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
              d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
            />
          </svg>
        </div>
        <div class="text-right">
          <p class="text-2xl">{{ premiumWallpaper }}</p>
          <p>Premium</p>
        </div>
      </router-link>
      <div
        class="
          bg-blue-500
          shadow-lg
          rounded-md
          flex
          items-center
          justify-between
          p-3
          border-b-4 border-blue-600
          text-white
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
            bg-white
            rounded-full
            transition-all
            duration-300
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
              d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>
        </div>
        <div class="text-right">
          <p class="text-2xl">{{ clients }}</p>
          <p>Downloads</p>
        </div>
      </div>
    </div>
    <h1 class="m-4 text-xl font-bold">Admin</h1>
    <hr class="mx-5 my-2" />
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 p-4 gap-4">
      <router-link
        to="/users"
        tag="div"
        class="
          bg-blue-500
          shadow-lg
          rounded-md
          flex
          items-center
          justify-between
          p-3
          border-b-4 border-blue-600
          text-white
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
            bg-white
            rounded-full
            transition-all
            duration-300
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
import "firebase/firestore";
export default {
  name: "Home",
  data: () => ({
    categories: 0,
    wallpapers: 0,
    users: 0,
    clients: 0,
    popularWallpaper: 0,
    premiumWallpaper: 0,
  }),
  components: {},
  methods: {},
  created() {
    firebase
      .firestore()
      .collection("wallpaper-data")
      .doc("data")
      .onSnapshot((doc) => {
        this.wallpapers = doc.data().wallpapers;
        this.categories = doc.data().categories;
        this.users = doc.data().users;
        this.clients = doc.data().clients;
        this.popularWallpaper = doc.data().popular;
        this.premiumWallpaper = doc.data().premium;
      });
  },
};
</script>
