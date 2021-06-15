<template>
  <!-- component -->
  <!-- Root element for center items -->
  <div class="flex flex-col h-screen bg-gray-100">
    <!-- Auth Card Container -->
    <div class="grid place-items-center mx-2 my-20 sm:my-auto">
      <!-- Auth Card -->
      <div
        class="
          w-11/12
          p-12
          sm:w-8/12
          md:w-6/12
          lg:w-5/12
          2xl:w-4/12
          px-6
          py-10
          sm:px-10
          sm:py-6
          bg-white
          rounded-lg
          shadow-md
          lg:shadow-lg
        "
      >
        <!-- Card Title -->
        <h2
          class="text-center font-semibold text-3xl lg:text-4xl text-gray-800"
        >
          Create User
        </h2>

        <form class="mt-10" method="POST">
          <!-- Email Input -->
          <label
            for="email"
            class="block text-xs font-semibold text-gray-600 uppercase"
            >E-mail</label
          >
          <input
            id="email"
            type="email"
            placeholder="e-mail address"
            autocomplete="email"
            v-model="email"
            class="
              block
              w-full
              py-3
              px-1
              mt-2
              text-gray-800
              appearance-none
              border-b-2 border-gray-100
              focus:text-gray-500
              focus:outline-none
              focus:border-gray-200
            "
            required
          />

          <!-- Password Input -->
          <label
            for="password"
            class="block mt-2 text-xs font-semibold text-gray-600 uppercase"
            >Password</label
          >
          <input
            id="password"
            type="text"
            v-model="password"
            placeholder="password"
            autocomplete="current-password"
            class="
              block
              w-full
              py-3
              px-1
              mt-2
              mb-4
              text-gray-800
              appearance-none
              border-b-2 border-gray-100
              focus:text-gray-500
              focus:outline-none
              focus:border-gray-200
            "
            required
          />

          <!-- Auth Buttton -->
          <button
            type="button"
            @click="createUser"
            class="
              w-full
              py-3
              mt-10
              bg-gray-800
              rounded-sm
              font-medium
              text-white
              uppercase
              focus:outline-none
              hover:bg-gray-700
              hover:shadow-none
            "
          >
            Create User
          </button>
        </form>
        <div
          v-if="err"
          class="
            mt-4
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
          <span class="block sm:inline">{{ errMsg }}</span>
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
          <span class="block sm:inline">User Created</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
export default {
  data: () => ({
    email: "",
    password: "",
    disabled: false,
    err: false,
    success: false,
    errMsg: "something went wrong",
  }),
  methods: {
    async createUser() {
      if (this.email == "" || this.password == "" || this.disabled) {
        return;
      }
      var email=this.email;
      var password=this.password;
      var obj = {
        email: email,
        password: password,
        returnSecureToken: true,
      };
      this.disabled = true;
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(obj),
      };
      try {
        const response = await fetch(
          "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBQgEsxr2BuhjV_chZmhj_hwYR7fm4A1NM",
          requestOptions
        );
        const data = await response.json();
        if (data.error) {
          this.success = false;
          this.err = true;
          this.errMsg = data.error.message;
        } else {
          var doc = await firebase
            .firestore()
            .collection("admins")
            .doc(data.localId)
            .set({
              createdBy: firebase.auth().currentUser.email,
              userId: data.localId,
              isAdmin: false,
              access: ["wallpapers"],
              emailId: email,
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            });
          //console.log(data);
          this.success = true;
          this.err = false;
          console.log(doc);
          this.$router.push("/users");
        }
      } catch (err) {
        this.success = false;
        this.err = true;
        this.errMsg = err.message;
        console.log(err.message);
      }
      this.disabled = false;
    },
  },
  created(){
    var obj=JSON.parse(localStorage.getItem('user'));
    if(!obj.isAdmin){
      this.$router.push('/');
    }
  }
};
</script>