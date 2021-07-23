<template>
  <div class="flex justify-end">
    <router-link
     v-if="isAdmin"
      tag="button"
      to="/categories/new"
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
      New Category
    </router-link>
  </div>
  <hr />
  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
    <router-link
      v-for="category in categories"
      :key="category"
      tag="div"
      :to="isAdmin?{ name: 'ViewCategory', params: { categoryId: category.id }}:'/categories'"
      class="
        card
        border
        py-3
        px-5
        m-4
        bg-bgray-800
        text-bgray-200
        rounded
        border-blue-500 border-l-4
      "
    >
      {{ category.data().name }}
    </router-link>
  </div>
</template>
<style scoped>
</style>
<style scoped>
</style>
<script>
import firebase from "firebase/app";
import "firebase/firestore";
export default {
  data: () => ({
    categories: [],
    isAdmin:false
  }),
  created() {
    var obj = JSON.parse(localStorage.getItem("user"));
    if (!obj.isAdmin && obj.access.indexOf("wallpapers") == -1) {
      this.$router.push("/");
    }
    this.isAdmin=Boolean(obj.isAdmin);
    firebase
      .firestore()
      .collection("categories")
      .onSnapshot((querySnapshot) => {
        var data = [];
        querySnapshot.forEach((doc) => {
          data.push(doc);
        });
        this.categories = data;
      });
  },
};
</script>
