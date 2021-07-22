<template>
  <div class="max-w-md w-full p-2 md:p-4">
    <div
      v-if="err"
      class="
        bg-red-300
        border border-red-500
        text-red-600
        pl-4
        py-1
        mb-2
        rounded
        relative
      "
      role="alert"
    >
      <span class="block sm:inline">Something went wrong.</span>
    </div>
    <div
      v-if="success"
      class="
        bg-green-300
        border border-green-500
        text-green-600 text-sm
        pl-4
        py-1
        mb-2
        rounded
        relative
      "
      role="alert"
    >
      <span class="block sm:inline">Category Added</span>
    </div>
    <div
      v-if="nameError"
      class="
        text-sm
        bg-red-300
        border border-red-500
        text-red-600
        pl-4
        py-1
        mb-2
        rounded
        relative
      "
      role="alert"
    >
      <span class="block sm:inline">Enter Valid Category Name</span>
    </div>
    <label for="categoryName" class="text-xs font-semibold ml-1 text-bgray-600"
      >Category Name</label
    >
    <input
      type="text"
      id="categoryName"
      class="
        border-2 border-bgray-500
        rounded
        px-3
        py-1
        w-full
        focus:outline-none
        focus:border-blue-400
        focus:shadow
      "
      placeholder="Category Name"
      v-model="categoryName"
    />
    <button
      type="button"
      class="
        bg-gray-700
        text-bgray-200
        px-4
        py-1
        rounded
        mt-2
        hover:bg-gray-800
        transition
        duration-200
        each-in-out
        flex
        justify-between
        items-center
        gap-2
        disabled:opacity-60
      "
      @click="addCategory"
      :disabled="adding"
    >
      <span
        v-if="adding"
        class="h-4 w-4 rounded-full border-t-2 border-bgray-500 animate-spin"
      ></span>
      <span v-if="!adding">Add</span>
      <span v-if="adding">Adding</span>
    </button>
  </div>
  <hr />
  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
    <router-link
      v-for="category in categories"
      :key="category"
      tag="div"
      :to="'/q/category/' + category.id"
      class="
        card
        border
        py-3
        px-5
        m-4
        bg-bgray-800
        text-bgray-200
        rounded
        flex
        justify-between
        border-blue-500 border-l-4
      "
    >
     <span> {{ category.data().name }}</span>
     <span> {{ category.data().count }}</span>
    </router-link>
  </div>
  <br><br><br><br>
</template>

<script>
import firebase from "firebase/app";
import "firebase/firestore";
export default {
  data: () => ({
    categoryName: "",
    adding: false,
    err: false,
    nameError: false,
    success: false,
    categories: [],
  }),
  methods: {
    addCategory() {
      this.nameError = false;
      this.success = false;
      if (this.categoryName == "") {
        this.nameError = true;
        return;
      }
      var name = this.categoryName;
      this.adding = true;
      this.err = false;
      var batch = this.QoutesDB.firestore().batch();
      batch.set(this.QoutesDB.firestore().collection("categories").doc(), {
        name: name,
        count: 0,
        userEmail: firebase.auth().currentUser.email,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
      var sfRef = this.QoutesDB.firestore().collection("data").doc("data")
      batch.update(sfRef, { categories: firebase.firestore.FieldValue.increment(1) });
      batch
        .commit()
        .then(() => {
          // ...
          console.log("data added");
          this.success = true;
          this.categoryName = "";
          this.adding = false;
        })
        .catch((err) => {
          console.log(err.message);
          this.err = true;
          this.adding = false;
        });
    },
  },
  created() {
    var obj = JSON.parse(localStorage.getItem("user"));
    if (!obj.isAdmin && obj.access.indexOf("qoutes") == -1) {
      this.$router.push("/");
    }
    this.QoutesDB.firestore()
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