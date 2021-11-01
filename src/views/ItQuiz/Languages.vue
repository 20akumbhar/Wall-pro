<template>
  <div class="p-4 flex">
    <span class="text-lg font-bold">Languages</span>
    <router-link
      class="bg-bgray-600 rounded hidden py-2 px-4 text-bgray-50 ml-auto"
      to="/it-quiz/languages/add"
      >Add Language</router-link
    >
  </div>
  <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
    <router-link
    tag="div"
    :to="'/it-quiz/languages/'+lang.id+'/levels'"
      v-for="lang in languages"
      :key="lang.id"
      class="p-2 py-4 w-40 m-3 border hover:shadow-lg relative"
    >
      <img
        class="w-full h-auto px-6 py-2"
        :src="lang.data().imageURL"
        alt="lang.name"
      />
      <p class="text-sm font-semibold text-center py-2">{{ lang.data().name }}</p>
      <div class="absolute top-2 right-2" v-if="lang.data().show">
        <div class="relative">
        <div class="h-2 w-2 animate-ping rounded-full bg-green-400"></div>
        <div class="h-2 w-2 rounded-full bg-green-600 absolute top-0"></div>
        </div>
      </div>
    </router-link>
  </div>
</template>
<script>
// import firebase from "firebase/app";
import "firebase/firestore";
export default {
  data: () => ({
    languages: []
  }),
  created() {
    var obj = JSON.parse(localStorage.getItem("user"));
    if (!obj.isAdmin && obj.access.indexOf("itquiz") == -1) {
      this.$router.push("/");
      return;
    }
    this.ItQuizDB.firestore()
      .collection("languages")
      .orderBy("timestamp","desc")
      .onSnapshot((querySnapshot) => {
        var data = [];
        querySnapshot.forEach((doc) => {
          data.push(doc);
        });
        this.languages = data;
      });
  },
};
</script>