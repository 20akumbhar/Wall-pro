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
      <span class="block sm:inline">Qoute Added</span>
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
      <span class="block sm:inline">Invalid Qoute or Category</span>
    </div>
    <label for="category" class="text-xs font-semibold ml-1 text-bgray-600"
      >Select Category</label
    >
    <select
    v-model="category"
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
    >
    <option value="0" disabled>Select Category</option>
      <option
        v-for="category in categories"
        :key="category"
        :value="category.id"
      >
        {{ category.data().name }}
      </option>
    </select>
    <label for="qoute" class="text-xs font-semibold ml-1 text-bgray-600"
      >Enter Qoute</label
    >
    <textarea
      type="text"
      id="qoute"
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
      rows="8"
      placeholder="Qoute here .."
      v-model="qoute"
    >
    </textarea>
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
      @click="addQoute"
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
</template>
<script>
import firebase from "firebase/app";
import "firebase/firestore";
export default {
  data: () => ({
    qoute: "",
    category:"0",
    adding: false,
    err: false,
    nameError: false,
    success: false,
    categories: [],
  }),
  methods: {
    addQoute() {
      this.nameError = false;
      this.success = false;
      if (this.qoute == "" || this.category=="0") {
        this.nameError = true;
        return;
      }
      var name = this.qoute;
      this.adding = true;
      this.err = false;

      var batch = this.QoutesDB.firestore().batch();
      batch.set(this.QoutesDB.firestore().collection("qoutes").doc(), {
        category: this.category,
        qoute: name,
        userEmail: firebase.auth().currentUser.email,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
      var sfRef = this.QoutesDB.firestore().collection("categories").doc(this.category);
      batch.update(sfRef, {
        count: firebase.firestore.FieldValue.increment(1),
      });
      var countRef2 = this.QoutesDB.firestore().collection("data").doc("data");
      batch.update(countRef2, {
        qoutes: firebase.firestore.FieldValue.increment(1),
      });
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