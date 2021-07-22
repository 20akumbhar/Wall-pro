<template>
  <div class="max-w-md w-full p-2 md:p-4">
    <div
      v-if="err"
      class="
        bg-red-300
        border border-red-500
        text-red-600 text-sm
        pl-4
        py-1
        mb-2
        rounded
        relative
      "
      role="alert"
    >
      <span class="block">Something went wrong.</span>
    </div>
    <div
      v-if="nameError"
      class="
        bg-red-300
        border border-red-500
        text-red-600 text-sm
        pl-4
        py-1
        mb-2
        rounded
        relative
      "
      role="alert"
    >
      <span class="block">Invalid Name</span>
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
      <span class="block">Category Updated</span>
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
    <div class="buttons flex gap-4 mt-2">
      <button
        @click="deleteCategory"
        class="
          bg-red-700
          text-bgray-200
          px-4
          py-1
          rounded
          mt-2
          hover:bg-red-800
          inline-block
          transition
          duration-200
          each-in-out
        "
      >
        Delete
      </button>
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
        @click="updateCategory"
        :disabled="updating"
      >
        <span
          v-if="updating"
          class="h-4 w-4 rounded-full border-t-2 border-bgray-500 animate-spin"
        ></span>
        <span v-if="!updating">Update</span>
        <span v-if="updating">Updating</span>
      </button>
    </div>
  </div>
</template>
<script>
import firebase from "firebase/app";
import "firebase/firestore";
export default {
  data: () => ({
    categoryName: "",
    updating: false,
    success: false,
    err: false,
    nameError: false,
  }),
  methods: {
    deleteCategory() {
      var c = confirm(
        "Do you want to delete " + this.categoryName + " category"
      );
      if (c) {
        var batch = this.QoutesDB.firestore().batch();
        batch.delete(
          this.QoutesDB.firestore()
            .collection("categories")
            .doc(this.$route.params.id)
        );
        var sfRef = this.QoutesDB.firestore().collection("data").doc("data");
        batch.update(sfRef, {
          categories: firebase.firestore.FieldValue.increment(-1),
        });

        batch.commit().then(() => {
          this.$router.push("/q/categories");
        }).catch((err)=>{
            console.log(err);
        });
      }
    },
    updateCategory() {
      this.updating = true;
      this.success = false;
      this.nameError = false;
      if (this.categoryName == "") {
        this.nameError = true;
        return;
      }
      var name = this.categoryName;
      this.QoutesDB.firestore()
        .collection("categories")
        .doc(this.$route.params.id)
        .update({ name })
        .then(() => {
          this.success = true;
          this.updating = false;
        })
        .catch((err) => {
          console.log(err);
          this.updating = false;
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
      .doc(this.$route.params.id)
      .get()
      .then((doc) => {
        if (doc.exists) {
          this.categoryName = doc.data().name;
        } else {
          this.err = true;
        }
      })
      .catch((error) => {
        this.err = true;
        console.log("Error getting document:", error);
      });
  },
};
</script>