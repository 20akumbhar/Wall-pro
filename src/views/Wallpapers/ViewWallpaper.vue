<template>
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
      m-4
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
    <span class="block sm:inline">Wallpaper Updated.</span>
  </div>
  <div class="grid sm:grid-cols-2">
    <div class="w-full p-4" v-if="data">
      <img
        v-if="data"
        :src="data.image"
        alt="img"
        class="w-full h-auto max-w-xs"
      />
    </div>
    <div class="dd p-4">
      <div class="ispopular flex space-x-4">
        <p>popular :</p>
        <div
          v-if="data"
          class="
            relative
            rounded-full
            w-12
            h-6
            transition
            duration-200
            ease-linear
          "
          :class="data.isPopular ? 'bg-blue-500' : 'bg-gray-400'"
        >
          <label
            for="toggle"
            class="
              absolute
              left-0
              bg-white
              border-2
              mb-2
              w-6
              h-6
              rounded-full
              transition
              transform
              duration-100
              ease-linear
              cursor-pointer
            "
            :class="
              data.isPopular
                ? 'translate-x-full border-blue-500'
                : 'translate-x-0 border-gray-400'
            "
          ></label>
          <input
            type="checkbox"
            id="toggle"
            name="toggle"
            class="
              appearance-none
              w-full
              h-full
              active:outline-none
              focus:outline-none
            "
            @click="data.isPopular = !data.isPopular"
          />
        </div>
      </div>
      <div class="ispremium mt-4 flex space-x-4">
        <p>Premium :</p>
        <div
          v-if="data"
          class="
            relative
            rounded-full
            w-12
            h-6
            transition
            duration-200
            ease-linear
          "
          :class="data.isPremium ? 'bg-blue-500' : 'bg-gray-400'"
        >
          <label
            for="toggle"
            class="
              absolute
              left-0
              bg-white
              border-2
              mb-2
              w-6
              h-6
              rounded-full
              transition
              transform
              duration-100
              ease-linear
              cursor-pointer
            "
            :class="
              data.isPremium
                ? 'translate-x-full border-blue-500'
                : 'translate-x-0 border-gray-400'
            "
          ></label>
          <input
            type="checkbox"
            id="toggle"
            name="toggle"
            class="
              appearance-none
              w-full
              h-full
              active:outline-none
              focus:outline-none
            "
            @click="data.isPremium = !data.isPremium"
          />
        </div>
      </div>

      <div class="category mt-4" v-if="data">
        <select
          v-model="data.categoryId"
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
      <div class="source" v-if="data">
        <label for="category-name" class="ml-1 text-sm mb-2 block"
          >Source</label
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
          v-model="data.source"
          type="text"
          placeholder="source (optional)"
        />
      </div>

      <button
        @click="editWallpaper"
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
        Edit
      </button>

      <button
        @click="deleteWallpaper"
        type="button"
        class="
          mt-4
          ml-4
          focus:outline-none
          text-white text-sm
          py-2.5
          px-5
          rounded-md
          bg-red-700
          hover:bg-red-900
          hover:shadow-lg
        "
      >
        Delete
      </button>
    </div>
  </div>
  <br /><br /><br /><br /><br />
</template>
<script>
import firebase from "firebase/app";
import "firebase/firestore";
export default {
  data: () => ({
    data: null,
    err: false,
    success: false,
    categories: [],
    disabled: false,
  }),
  methods: {
    editWallpaper() {
      this.disabled = true;
      this.err = false;
      this.success = false;
      firebase
        .firestore()
        .collection("wallpapers")
        .doc(this.$route.params.wallpaperId)
        .update({
          categoryId: this.data.categoryId,
          isPopular: this.data.isPopular,
          isPremium: this.data.isPremium,
          source: this.data.source,
        })
        .then(() => {
          this.disabled = false;
          this.success = true;
          this.err = false;
        })
        .catch((error) => {
          this.disabled = false;
          this.err = true;
          this.success = false;
          console.log(error);
        });
    },
    deleteWallpaper() {
      firebase.firestore().collection("wallpapers")
        .doc(this.$route.params.wallpaperId)
        .delete()
        .then(() => {
          console.log("Document successfully deleted!");
          var dataRef = firebase.firestore().collection("wallpaper-data").doc("data");
          dataRef.update({
            wallpapers: firebase.firestore.FieldValue.increment(-1),
          });
          this.$router.push('/wallpapers')
        })
        .catch((error) => {
          console.error("Error removing document: ", error);
        });
    },
  },
  created() {
    var obj = JSON.parse(localStorage.getItem("user"));
    if (!obj.isAdmin && obj.access.indexOf("wallpapers") == -1) {
      this.$router.push("/");
    }
    firebase
      .firestore()
      .collection("wallpapers")
      .doc(this.$route.params.wallpaperId)
      .get()
      .then((snapshot) => {
        this.err = false;
        if (!snapshot.data()) {
          this.err = true;
        } else {
          this.data = snapshot.data();
        }
      })
      .catch((err) => {
        this.err = true;
        console.log(err);
      });

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