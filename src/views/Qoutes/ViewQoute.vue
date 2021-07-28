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
      <span class="block sm:inline">Qoute Updated</span>
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
    <div class="ispopular flex space-x-4 my-4">
      <p>popular :</p>
      <div
        class="
          relative
          rounded-full
          w-12
          h-6
          transition
          duration-200
          ease-linear
        "
        :class="isPopular ? 'bg-blue-500' : 'bg-gray-400'"
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
            isPopular
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
          @click="isPopular = !isPopular"
        />
      </div>
    </div>
    <div class="buttons flex gap-4">
      <button
        @click="deleteQoute"
        class="
          bg-red-700
          text-red-200
          px-4
          py-1
          rounded
          mt-2
          hover:bg-red-800
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
        @click="updateQoute"
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
  <hr />
</template>
<script>
import firebase from "firebase/app";
import "firebase/firestore";
export default {
  data: () => ({
    qoute: "",
    category: "0",
    updating: false,
    err: false,
    nameError: false,
    success: false,
    categories: [],
    baseCategory: "",
    deleteDisabled: false,
    isPopular:false
  }),
  methods: {
    updateQoute() {
      this.nameError = false;
      this.success = false;
      if (this.qoute == "" || this.category == "0") {
        this.nameError = true;
        return;
      }
      var name = this.qoute;
      this.updating = true;
      this.err = false;

      var batch = this.QoutesDB.firestore().batch();
      batch.update(
        this.QoutesDB.firestore()
          .collection("qoutes")
          .doc(this.$route.params.id),
        {
          category: this.category,
          qoute: name,
          isPopular:this.isPopular,
          updatedBy: firebase.auth().currentUser.email,
        }
      );
      var sfRef = this.QoutesDB.firestore()
        .collection("categories")
        .doc(this.baseCategory);
      batch.update(sfRef, {
        count: firebase.firestore.FieldValue.increment(-1),
      });
      var countRef = this.QoutesDB.firestore()
        .collection("categories")
        .doc(this.category);
      batch.update(countRef, {
        count: firebase.firestore.FieldValue.increment(1),
      });
      batch
        .commit()
        .then(() => {
          // ...
          console.log("data added");
          this.success = true;
          this.updating = false;
          this.baseCategory = this.category;
        })
        .catch((err) => {
          console.log(err.message);
          this.err = true;
          this.updating = false;
        });
    },
    deleteQoute() {
      if (this.deleteDisabled) {
        return;
      }
      this.deleteDisabled = true;
      var batch = this.QoutesDB.firestore().batch();
      batch.delete(
        this.QoutesDB.firestore()
          .collection("qoutes")
          .doc(this.$route.params.id)
      );
      var countRef = this.QoutesDB.firestore()
        .collection("categories")
        .doc(this.baseCategory);
      batch.update(countRef, {
        count: firebase.firestore.FieldValue.increment(-1),
      });
      var countRef2 = this.QoutesDB.firestore().collection("data").doc("data");
      batch.update(countRef2, {
        qoutes: firebase.firestore.FieldValue.increment(-1),
      });

      batch.commit().then(() => {
        this.$router.push("/q/qoutes");
        this.deleteDisabled = false;
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
    this.QoutesDB.firestore()
      .collection("qoutes")
      .doc(this.$route.params.id)
      .get()
      .then((doc) => {
        this.category = doc.data().category;
        this.baseCategory = doc.data().category;
        this.qoute = doc.data().qoute;
        this.isPopular=Boolean(doc.data().isPopular)
      });
  },
};
/*
You save Money To Party
On Weekends 
I Save it to build my empire. 
We are not the same bro.
*/
</script>