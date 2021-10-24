<template>
  <div class="p-4 sm:w-9/12 md:w-6/12">
    <h1 class="font-semibold text-bgray-900 mb-6">Add New App</h1>
    <label class="font-semibold text-bgray-800 text-sm">App Name</label>
    <input
      v-model="appName"
      class="
        block
        border border-bgray-400
        w-full
        px-3
        py-2
        my-2
        focus:outline-none
        rounded-md
        text-sm
        focus:ring-1
        text-bgray-700
      "
      type="text"
      placeholder="App name"
    />
    <label class="font-semibold text-bgray-800 text-sm">App Id</label>
    <input
      v-model="appId"
      class="
        block
        border border-bgray-400
        w-full
        px-3
        py-2
        my-2
        focus:outline-none
        rounded-md
        text-sm
        focus:ring-1
        text-bgray-700
      "
      type="text"
      placeholder="App id"
    />
    <label class="font-semibold text-bgray-800 text-sm">App Version</label>
    <input
      v-model="appVersion"
      class="
        block
        border border-bgray-400
        w-full
        px-3
        py-2
        my-2
        focus:outline-none
        rounded-md
        text-sm
        focus:ring-1
        text-bgray-700
      "
      type="text"
      placeholder="App Version"
    />
    <label class="font-semibold text-bgray-800 text-sm">App Icon</label><br />
    <div>
      <label
        for="f"
        type="button"
        class="
          cursor-pointer
          mt-2
          bg-white
          py-2
          px-3
          border border-gray-300
          rounded-md
          shadow-sm
          text-sm
          leading-4
          font-medium
          text-gray-700
          hover:bg-gray-50
          focus:outline-none
          focus:ring-2 focus:ring-indigo-500
        "
      >
        Change
      </label>
      <input
        id="f"
        type="file"
        class="max-w-0"
        @change="onFileChange($event)"
        accept="image/png, image/jpeg, image/jpg"
      />

      <img v-if="url" :src="url" alt="logo" class="h-36 mt-2 w-36" />
    </div>

    <br />
    <div class="alert p-4 bg-red-100 rounded-md" v-if="isError">
      <p class="text-red-500 font-semibold tracking-wider">Error :</p>
      <p class="text-red-500 text-sm">{{ errorMessage }}</p>
    </div>
    <div class="alert p-4 bg-green-100 rounded-md" v-if="isSuccess">
      <p class="text-green-500 font-semibold tracking-wider">Success :</p>
      <p class="text-green-500 text-sm">App added successfully</p>
    </div>

    <button
      type="button"
      class="
        my-2
        float-right
        py-2
        px-3
        border border-blue-500
        rounded-md
        shadow-sm
        text-sm
        leading-4
        font-medium
        text-gray-50
        focus:outline-none
        focus:ring-2 focus:ring-indigo-500
        flex
        gap-x-2
        items-center
      "
      @click="addAppData"
      :class="
        isLoading
          ? 'bg-blue-400 cursor-not-allowed'
          : 'bg-blue-600 hover:bg-blue-500'
      "
    >
      <PlusSmIcon class="h-5 w-5" v-if="!isLoading" />
      <span class="animate-spin" v-if="isLoading">
        <svg class="h-5 w-5" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M12,6V9L16,5L12,1V4A8,8 0 0,0 4,12C4,13.57 4.46,15.03 5.24,16.26L6.7,14.8C6.25,13.97 6,13 6,12A6,6 0 0,1 12,6M18.76,7.74L17.3,9.2C17.74,10.04 18,11 18,12A6,6 0 0,1 12,18V15L8,19L12,23V20A8,8 0 0,0 20,12C20,10.43 19.54,8.97 18.76,7.74Z"
          />
        </svg>
      </span>
      <span v-if="!isLoading">Add</span>
      <span v-if="isLoading">Adding..</span>
    </button>
  </div>
</template>
<script>
import { PlusSmIcon } from "@heroicons/vue/outline";
import firebase from "firebase/app";
import "firebase/storage";
import "firebase/firestore";
import "firebase/auth";
export default {
  components: { PlusSmIcon },
  data: () => ({
    isError: false,
    isSuccess: false,
    isLoading: false,
    appName: "",
    appId: "",
    appVersion: "",
    errorMessage: "Something went wrong",
    url: null,
    blob: null,
  }),
  methods: {
    addAppData() {
      this.isError = false;
      this.isSuccess = false;
      if (this.isLoading) {
        return;
      }
      if (this.appName == "") {
        this.errorMessage = "App Name required";
        this.isError = true;
        return;
      }
      if (this.appId == "") {
        this.errorMessage = "App Id required";
        this.isError = true;
        return;
      }
      if (this.appVersion == "") {
        this.errorMessage = "App version required";
        this.isError = true;
        return;
      }
      if (this.blob == null) {
        this.errorMessage = "App Icon required";
        this.isError = true;
        return;
      }
      this.isLoading = true;
      this.addToDB();
    },
    onFileChange(e) {
      const file = e.target.files[0];
      if (!file) {
        return;
      }
      this.blob = file;
      this.url = URL.createObjectURL(file);
    },
    addToDB() {
      try {
        this.QoutesDB.firestore()
          .collection("apps")
          .doc(this.appId)
          .set({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            appName: this.appName,
            appId: this.appId,
            appVersion: this.appVersion,
            addedBy: firebase.auth().currentUser.email,
            downloadURL: "downloadURL",
          })
          .then(() => {
            var ref = this.QoutesDB.storage()
              .ref()
              .child("apps/app_" + Date.now() + ".jpg");

            ref.put(this.blob).then((snapshot) => {
              snapshot.ref.getDownloadURL().then((downloadURL) => {
                console.log("File available at", downloadURL);
                // this.addToDB();
                var washingtonRef = this.QoutesDB.firestore()
                  .collection("apps")
                  .doc(this.appId);

                // Set the "capital" field of the city 'DC'
                return washingtonRef
                  .update({
                    downloadURL: downloadURL,
                  })
                  .then(() => {
                    this.isSuccess = true;
                    this.isError = false;
                    this.isLoading = false;
                    this.appId=""
                    this.appName=""
                    this.appVersion=""
                    this.url=""
                    this.blob=null
                  })
                  .catch((error) => {
                    // The document probably doesn't exist.
                    this.isSuccess = false;
                    this.isError = true;
                    this.errorMessage = error.message;
                    this.isLoading = false;
                    console.error("Error updating document: ", error);
                  });
              });
            });
          })
          .catch((err) => {
            this.isSuccess = false;
            this.isError = true;
            this.errorMessage = err.message;
            this.isLoading = false;
          });
      } catch (e) {
        console.log(e);
        this.isLoading = false;
      }
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
