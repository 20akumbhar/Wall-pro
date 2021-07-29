<template>
  <div class="w-full max-w-md">
    <p
      class="
        p-4
        m-4
        text-red-600
        ring ring-offset-red-600 ring-red-400
        bg-red-200
        font-semibold
        rounded
      "
      v-if="errMsg != ''"
    >
      {{ errMsg }}
    </p>
    <p
      class="
        p-4
        m-4
        text-green-600
        ring ring-offset-green-600 ring-green-400
        bg-green-200
        font-semibold
        rounded
      "
      v-if="success"
    >
      Password Updated Successfully.
    </p>
    <div class="w-full px-4">
      <input
        type="password"
        class="
          border-2 border-bgray-500
          rounded
          px-3
          py-1
          w-full
          focus:outline-none
          focus:border-blue-400
          focus:shadow
          mb-4
          mt-6
        "
        placeholder="Current Password"
        v-model="currentPassword"
      />

      <input
        type="password"
        class="
          border-2 border-bgray-500
          rounded
          px-3
          py-1
          w-full
          focus:outline-none
          focus:border-blue-400
          focus:shadow
          my-2
        "
        placeholder="New Password"
        v-model="newPassword"
      />
    </div>
    <button
      @click="reAuthenticate"
      class="
      focus:outline-none
      focus:ring
      focus:ring-bgray-400
      hover:bg-bgray-900
      
        bg-bgray-800
        py-1
        px-2
        mt-4
        text-bgray-100
        rounded
        ml-4
        disabled:opacity-30
      "
    >
      Update Password
    </button>
  </div>
</template>
<script>
import firebase from "firebase/app";
import "firebase/auth";
export default {
  data: () => ({
    currentPassword: "",
    newPassword: "",
    errMsg: "",
    success: false,
    disabled: false,
  }),
  methods: {
    reAuthenticate() {
      if (this.disabled) {
        return;
      }
      this.disabled = true;
      this.errMsg = "";
      this.success = false;
      var oldPassword = this.currentPassword;
      var newPassword = this.newPassword;
      var user = firebase.auth().currentUser;
      const credential = firebase.auth.EmailAuthProvider.credential(
        user.email,
        oldPassword
      );
      user
        .reauthenticateWithCredential(credential)
        .then((cred) => {
          console.log(cred);
          user
            .updatePassword(newPassword)
            .then(() => {
              this.success = true;
              this.errMsg = "";
              this.disabled = false;
            })
            .catch((err) => {
              this.success = false;
              this.errMsg = err.message;
              this.disabled = false;
            });
        })
        .catch((err) => {
          this.success = false;
          this.errMsg = err.message;
          this.disabled = false;
        });
    },
  },
};
</script>