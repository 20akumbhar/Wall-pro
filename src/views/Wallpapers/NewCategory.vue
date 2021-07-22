<template>
  <!-- component -->
  <div class="ml-8">
    <h2 class="mt-2 text-xl font-bold text-gray-900">Add New Category</h2>
  </div>
  <div class="grid gap-2 md:gap-8 px-4 md:px-6 mt-4 grid-cols-1 md:grid-cols-2">
    <div class="block">
      <label
        class="block ml-1 mb-1 text-sm font-bold text-gray-700 tracking-wide"
        >Category Name</label
      >
      <input
        class="
          w-full
          text-base
          p-2
          border border-gray-300
          rounded-lg
          focus:outline-none
          focus:border-indigo-500
        "
        v-model="categoryName"
        type="text"
        placeholder="Category Name"
      />

      <label
        class="block ml-1 mb-1 text-sm font-bold text-gray-700 tracking-wide"
        >Upload Image</label
      >
      <label
        for="file-upload"
        type="button"
        class="
          px-4
          py-2
          text-gray-600
          transition-colors
          duration-200
          transform
          border
          rounded-lg
          cursor-pointer
          dark:text-gray-200
          dark:border-gray-200
          hover:bg-gray-100
          dark:hover:bg-gray-700
          focus:outline-none
        "
      >
        Upload Image
      </label>
      <input
        @change="onFileChange($event)"
        id="file-upload"
        class="sr-only"
        type="file"
        accept="image/png, image/jpeg, image/jpg"
      />
    </div>
    <div class="block image md:row-span-3">
      <img v-if="url" class="max-w-xs w-full h-auto" :src="url" alt="image" />
    </div>
    <div class="h-10">
      <button
        @click="addCategory"
        type="button"
        class="
          focus:outline-none
          text-white text-sm
          py-2.5
          px-5
          rounded-md
          bg-gray-700
          hover:bg-gray-900
          hover:shadow-lg
        "
      >
        Add Category
      </button>
    </div>
    <div class="progress" v-if="uploading">
      <div class="py-4 border px-4">
        <div class="flex text-sm justify-between mb-2">
          <p>Uploading..</p>
          <p>{{ progress }} %</p>
        </div>
        <div class="relative">
          <div class="base bg-bgray-400 absolute w-full h-1"></div>
          <div
            class="base bg-bgray-900 absolute h-1"
            :style="{ width: progress + '%' }"
          ></div>
        </div>
      </div>
    </div>

    <div
      v-if="err"
      class="
        bg-red-300
        border border-red-500
        text-red-600
        pl-4
        pr-8
        py-3
        rounded
        relative
      "
      role="alert"
    >
      <span class="block sm:inline">Something went wrong.</span>
    </div>
  </div>
  <br /><br /><br /><br /><br />
</template>
<style scoped>
.has-mask {
  position: absolute;
  clip: rect(10px, 150px, 130px, 10px);
}
</style>
<script>
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/storage";
import "firebase/firestore";
export default {
  data: () => ({
    url: null,
    categoryName: "",
    blob: null,
    disabled: false,
    progress: 0,
    uploading: false,
    err: false,
  }),
  methods: {
    onFileChange(e) {
      const file = e.target.files[0];
      if (!file) {
        return;
      }
      this.blob = file;
      this.url = URL.createObjectURL(file);
    },
    addCategory() {
      if (this.categoryName == "") {
        return;
      }
      if (this.blob == null) {
        return;
      }
      if (this.disabled) {
        return;
      }
      this.url = null;
      var name = this.categoryName;
      this.disabled = true;
      var storage = firebase
        .storage()
        .ref()
        .child("category/category" + Date.now() + ".jpg");
      var uploadTask = storage.put(this.blob);
      this.uploading = true;
      this.err = false;
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          var progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          this.progress = Math.round(progress);
        },
        (error) => {
          console.log(error.message);
          this.err = true;
          this.uploading = false;
          this.disabled = false;
        },
        () => {
          uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
            this.addToDB(name, downloadURL);
          });
        }
      );
    },
    addToDB(name, downloadURL) {
      firebase
        .firestore()
        .collection("categories")
        .add({
          name: name,
          downloadURL: downloadURL,
          userEmail: firebase.auth().currentUser.email,
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        })
        .then((docRef) => {
          console.log(docRef.id);
          var dataRef = firebase.firestore().collection("wallpaper-data").doc("data");
          dataRef.update({
            categories: firebase.firestore.FieldValue.increment(1),
          });
          this.err = false;
          this.$router.push("/categories");
        })
        .catch((err) => {
          console.log(err.message);
          this.err = true;
        })
        .finally(() => {
          this.disabled = false;
          this.uploading = false;
        });
    },
  },
  created() {
    var obj = JSON.parse(localStorage.getItem("user"));
    if (!obj.isAdmin) {
      this.$router.push("/");
    }
  },
};
</script>