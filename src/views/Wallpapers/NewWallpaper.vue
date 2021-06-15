<template>
  <h1 class="m-4 font-bold text-lg">Add Wallpaper</h1>
  <div class="grid grid-cols-1 md:grid-cols-2">
    <div class="h-full p-4">
      <div class="w-full mb-3">
        <label class="font-semibold text-gray-600 py-2"
          >Category<abbr title="required">*</abbr></label
        >
        <select
          v-model="category"
          class="
            block
            w-full
            bg-grey-lighter
            text-grey-darker
            border border-grey-lighter
            rounded-lg
            h-10
            px-4
            md:w-full
          "
        >
          <option value="0" disabled>Seleted Category</option>
          <option
            v-for="category in categories"
            :key="category"
            :value="category.id"
          >
            {{ category.name }}
          </option>
        </select>
      </div>
      <div class="source">
        <label
          class="block ml-1 mb-1 text-sm font-bold text-gray-700 tracking-wide"
          >Source</label
        >
        <input
          v-model="source"
          class="
            w-full
            text-base
            p-2
            border border-gray-300
            rounded-lg
            focus:outline-none
            focus:border-indigo-500
          "
          type="text"
          placeholder="Image Source"
        />
      </div>
      <label class="font-semibold text-gray-600 block"
        >Image<abbr title="required">*</abbr></label
      ><br />
      <label class="cursor-pointer">
        <span
          class="
            focus:outline-none
            text-white text-sm
            py-2
            px-4
            rounded-full
            bg-blue-400
            hover:bg-blue-500
            hover:shadow-lg
          "
          >Browse</span
        >
        <input
          type="file"
          class="hidden"
          @change="onFileChange($event)"
          accept="image/png, image/jpeg, image/jpg"
        />
      </label>
      <br />
      <button
        @click="addWallpaper"
        type="button"
        class="
          mt-4
          focus:outline-none
          text-white text-sm
          py-2.5
          px-5
          rounded-md
          bg-gray-700
          hover:bg-gray-900
          hover:shadow-lg
        "
        :disabled="disabled"
      >
        Add Category
      </button>
    </div>
    <div class="border-t md:border-l md:border-t-0 text-center">
      <img
        v-if="url"
        :src="url"
        alt="Wallpaper-image"
        class="p-4 w-full h-auto max-w-xs"
      />
    </div>
  </div>
</template>
<script>
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";
import { ImageCompressor } from "image-compressor";
const imageCompressor = new ImageCompressor();

export default {
  components: {},
  data: () => ({
    blob: null,
    url: null,
    source: "",
    category: "0",
    disabled: false,
    compressed: "",
    err: false,
    categories: [],
    uploading: false,
    progress: 0,
  }),
  methods: {
    getFiles(obj) {
      this.blob = obj.compressed.blob;
      this.url = URL.createObjectURL(obj.compressed.file);
      console.log(obj);
    },
    onFileChange(e) {
      const file = e.target.files[0];
      if (!file) {
        return;
      }
      this.blob = file;
      this.url = URL.createObjectURL(file);
      const compressorSettings = {
        toWidth: 250,
        mimeType: "image/jpeg",
        mode: "strict",
        quality: 0.2,
        grayScale: false,
        threshold: false,
        speed: "high",
      };
      imageCompressor.run(
        this.url,
        compressorSettings,
        this.proceedCompressedImage
      );
    },
    addWallpaper() {
      this.err = false;

      if (this.category == "0") {
        return;
      }
      if (this.blob == null) {
        return;
      }
      if (this.compressed == "") {
        this.err = true;
        return;
      }
      this.disabled = true;
      this.addToStorage(this.category, this.source, this.blob, this.compressed);
      this.disabled = false;
    },
    proceedCompressedImage(compressedSrc) {
      this.compressed = compressedSrc;
    },
    addToStorage(category, source, blob, compressed) {
      var storage = firebase
        .storage()
        .ref()
        .child("wallpapers/images/wallpaper_" + Date.now() + "a.jpg");
      var uploadTask = storage.put(blob);
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
            this.addThumbnail(category, source, downloadURL, compressed);
          });
        }
      );
    },
    addThumbnail(category, source, downloadURL, compressed) {
      var storage = firebase
        .storage()
        .ref()
        .child("wallpapers/thumbnails/wallpaper_" + Date.now() + "a.jpg");
      var uploadTask = storage.putString(compressed,'data_url',{contentType: 'image/jpeg'});
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
          uploadTask.snapshot.ref.getDownloadURL().then((compressedURL) => {
            this.addToDB(category, source, downloadURL, compressedURL);
          });
        }
      );
    },
    addToDB(category, source, downloadURL, compressedURL){
        firebase.firestore().collection('wallpapers')
        .add({
            categoryId: category,
            source:source,
            image:downloadURL,
            thumbnail:compressedURL,
            isPopular:false,
            userId:firebase.auth().currentUser.email,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        }).then((docRef) => {
          console.log(docRef.id);
          var dataRef = firebase.firestore().collection("wallpaper-data").doc("data");
          dataRef.update({
            wallpapers: firebase.firestore.FieldValue.increment(1),
          });
          this.err = false;
          this.$router.push("/");
        })
        .catch((err) => {
          console.log(err.message);
          this.err = true;
        })
        .finally(() => {
          this.disabled = false;
          this.uploading = false;
        });
    }
  },
  created() {
    var obj = JSON.parse(localStorage.getItem("user"));
    if (!obj.isAdmin && obj.access.indexOf("wallpapers") == -1) {
      this.$router.push("/");
    }
    firebase
      .firestore()
      .collection("categories")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          this.categories.push({ id: doc.id, name: doc.data().name });
        });
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
  },
};
</script>
