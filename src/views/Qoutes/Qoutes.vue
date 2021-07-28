<template>
  <div class="flex justify-end">
    <router-link
      tag="button"
      to="/q/qoutes/new"
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
      New Qoute
    </router-link>
  </div>
  <hr />
  <div
    class="
      grid grid-cols-1
      sm:grid-cols-2
      md:grid-cols-3
      lg:grid-cols-4
      gap-4
      m-4
      row-auto
      mb-8
    "
  >
    <router-link
      :to="'/q/qoutes/' + qoute.id"
      tag="div"
      class="border sm:h-48 p-4 shadow bg-bgray-900 text-bgray-200 rounded-md overflow-y-hidden"
      v-for="qoute in qoutes"
      :key="qoute"
    >
      <span class="block text-xs text-bgray-400 mb-2" v-if="categories.findIndex((category) => category.id == qoute.data().category) != -1">
        {{
          categories
            .find((category) => category.id == qoute.data().category)
            .data().name
        }}
      </span>
     <span v-html="'<span>'+qoute.data().qoute.replaceAll('\n','<br>')+'</span>'"></span>
    </router-link>
  </div>
</template>
<script>
import "firebase/firestore";
export default {
  data: () => ({
    qoutes: [],
    categories: [],
  }),
  created() {
    this.QoutesDB.firestore()
      .collection("qoutes")
      .onSnapshot((querySnapshot) => {
        var data = [];
        querySnapshot.forEach((doc) => {
          data.push(doc);
        });
        this.qoutes = data;
      });
    this.QoutesDB.firestore()
      .collection("categories")
      .orderBy("name")
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