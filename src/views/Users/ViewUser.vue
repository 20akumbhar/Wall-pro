<template>
  <div class="w-full p-2">
    <strong class="m-2">Information :</strong>
    <div
      v-if="show"
      class="
        grid
        self-center
        grid-cols-1
        sm:grid-cols-2
        max-w-md
        m-2
        p-2
        border
      "
    >
      <p>User :</p>
      <strong class="">{{ email }}</strong>
      <p>Role :</p>
      <strong v-if="user.isAdmin">Admin</strong>
      <strong v-if="!user.isAdmin">User</strong>
      <p>Account :</p>
      <strong v-if="user.isActive" class="text-green-500">Enabled</strong>
      <strong v-if="!user.isActive" class="text-red-500">Disabled</strong>
    </div>
  </div>

  <div class="w-full p-2">
    <strong class="m-2">Access :</strong>
    <div class="grid grid-cols-1 max-w-md m-2 p-2 border">
      <label class="flex items-center mt-3">
        <span class="ml-2 text-gray-700">Wallpapers</span>
        <input
          type="checkbox"
          class="form-checkbox ml-4 h-5 w-5 text-gray-600"
          v-model="wallpapers"
        />
      </label>

      <label class="flex items-center mt-3">
        <span class="ml-2 text-gray-700">Qoutes</span>
        <input
          type="checkbox"
          class="form-checkbox ml-4 h-5 w-5 text-gray-600"
          v-model="qoutes"
        />
      </label>
    </div>
  </div>
  <button
    @click="updateUser"
    type="button"
    class="
      m-4
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
    Update
  </button>
  <div
    v-if="err"
    class="
      m-4
      max-w-md
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
    <span class="block sm:inline">Something went wrong</span>
  </div>

  <div
    v-if="success"
    class="
      m-4
      max-w-md
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
    <span class="block sm:inline">Access Updated</span>
  </div>
</template>
<script>
import firebase from "firebase";
import "firebase/firestore";
export default {
  data: () => ({
    user: null,
    email: "",
    show: false,
    wallpapers: false,
    qoutes: false,
    success: false,
    err: false,
  }),
  created() {
    firebase
      .firestore()
      .collection("admins")
      .doc(this.$route.params.userId)
      .get()
      .then((snapshot) => {
        this.user = snapshot.data();
        this.email = this.user.emailId;
        if (this.user.access.indexOf("wallpapers") != -1) {
          this.wallpapers = true;
        } else {
          this.wallpapers = false;
        }
        this.show = true;
      })
      .catch((err) => {
        console.log(err);
        this.err = true;
      });
  },
  methods: {
    updateUser() {
      this.err = false;
      this.success = false;
      var access = [];
      if (this.wallpapers) {
        access.push("wallpapers");
      }
      if (this.qoutes) {
        access.push("qoutes");
      }
      firebase
        .firestore()
        .collection("admins")
        .doc(this.$route.params.userId)
        .update({ access })
        .then(() => {
          this.success = true;
          this.err = false;
        })
        .catch((err) => {
          this.err = true;
          this.success = false;
          console.log(err.message);
        });
    },
  },
};
</script>