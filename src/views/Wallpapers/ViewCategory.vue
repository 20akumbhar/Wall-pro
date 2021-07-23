<template>
  <h1 class="m-4 font-bold">Edit First Category</h1>
  <div class="px-4 grid grid-cols-1 md:grid-cols-2 w-full gap-2">
    <div class="all">
      <label for="category-name" class="ml-1 text-sm mb-2 block"
        >Category Name</label
      >
      <input
        id="category-name"
        class="
          w-full
          text-base
          p-2
          border border-gray-300
          rounded
          focus:outline-none
          focus:border-indigo-500
        "
        v-model="categoryName"
        type="text"
        placeholder="Category Name"
      />
      <img
        v-if="url"
        :src="url"
        alt=""
        class="max-w-xs w-full h-auto block my-4 md:hidden"
      />

      <label class="ml-1 text-sm block mt-4 mb-2">Change Image</label>
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
        Change Image
      </label>
      <input
        id="file-upload"
        class="sr-only"
        type="file"
        accept="image/png, image/jpeg, image/jpg"
        @change="onFileChange($event)"
      />
      <br />
      <button
        type="button"
        class="
          focus:outline-none
          text-white text-sm
          py-2.5
          px-5
          mt-4
          rounded-md
          bg-gray-700
          hover:bg-gray-900
          hover:shadow-lg
        "
        @click="addImage"
      >
        Edit Category
      </button>

      <div class="progress mt-4" v-if="uploading">
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

      <div
        v-if="success"
        class="
        mt-4
          bg-green-300
          border border-green-500
          text-green-600
          pl-4
          pr-8
          py-3
          rounded
          relative
        "
        role="alert"
      >
        <span class="block sm:inline">Category Updated.</span>
      </div>
    </div>
    <img
      v-if="url"
      :src="url"
      alt=""
      class="max-w-xs h-auto w-full hidden md:block"
    />
    <br /><br /><br /><br /><br />
  </div>
</template>
<script>
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";
import "firebase/auth";
export default {
  data: () => ({
    categoryName: "",
    url: null,
    blob: null,
    disabled: false,
    progress: 0,
    uploading: false,
    err: false,
    success: false
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
    addImage() {
      if(this.disabled){
        return;
      }
      this.disabled = true;
      if (this.categoryName == "") {
        return;
      }
      var name = this.categoryName;

      if (this.blob == null) {
        this.addToDB(name, null);
        return;
      }

      var storage = firebase
        .storage()
        .ref()
        .child("category/category" + Date.now() + ".jpg");
      var uploadTask = storage.put(this.blob);
      this.uploading = true;
      this.err = false;
      this.success = false;
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
          this.success = false;
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
      var obj;
      if (downloadURL == null) {
        obj = {
          name: name,
          userEmail: firebase.auth().currentUser.email,
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        };
      } else {
        obj = {
          name: name,
          downloadURL,
          userEmail: firebase.auth().currentUser.email,
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        };
      }

      console.log(name, downloadURL);
      var washingtonRef = firebase
        .firestore()
        .collection("categories")
        .doc(this.$route.params.categoryId);
      return washingtonRef
        .update(obj)
        .then(() => {
          console.log("Document successfully updated!");
          this.disabled = false;
          this.err = false;
          this.success=true;
          this.uploading = false;
        })
        .catch((error) => {
          // The document probably doesn't exist.
          this.disabled = false;
          this.err = true;
          this.success=false;
          this.uploading = false;
          console.error("Error updating document: ", error);
        });
    },
  },
  created() {
    var obj=JSON.parse(localStorage.getItem('user'));
    if(!obj.isAdmin){
      this.$router.push('/');
    }
    this.err = false;
    firebase
      .firestore()
      .collection("categories")
      .doc(this.$route.params.categoryId)
      .get()
      .then((doc) => {
        if (doc.exists) {
          this.url = doc.data().downloadURL;
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