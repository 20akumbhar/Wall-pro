<template>
  <section class="flex flex-col md:flex-row h-screen items-center md:-ml-64">
    <div
      class="bg-indigo-600 hidden lg:block w-full md:w-1/2 xl:w-2/3 h-screen"
    >
      <img
        src="@/assets/note.jpg"
        alt=""
        class="w-full h-full object-cover object-center"
      />
    </div>

    <div
      class="
        bg-white
        w-full
        md:max-w-md
        lg:max-w-full
        md:mx-auto
        md:w-1/2
        xl:w-1/3
        h-screen
        px-6
        lg:px-16
        xl:px-12
        flex
        pt-24
        justify-center
      "
    >
      <div class="w-full h-100">
        <h1 class="text-xl md:text-2xl font-bold leading-tight">
          Log in to your account
        </h1>

        <form class="mt-6" @submit.prevent="login">
          <div>
            <label class="block text-gray-700">Email Address</label>
            <input
              type="email"
              id="email"
              placeholder="Enter Email Address"
              v-model="email"
              class="
                w-full
                px-4
                py-3
                rounded-lg
                bg-gray-50
                mt-2
                border border-blue-400
                focus:border-blue-600
                focus:ring-1 focus:ring-opacity-50 focus:ring-blue-500
                focus:bg-white
                focus:outline-none
              "
              autofocus
              autocomplete
              required
            />
          </div>

          <div class="mt-4">
            <label class="block text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              v-model="password"
              placeholder="Enter Password"
              autocomplete="off"
              class="
                w-full
                px-4
                py-3
                rounded-lg
                bg-gray-50
                mt-2
                border border-blue-400
                focus:border-blue-600
                focus:ring-1 focus:ring-opacity-50 focus:ring-blue-500
                focus:bg-white
                focus:outline-none
              "
              required
            />
          </div>

          <div class="text-right mt-2">
            <a
              href="#"
              class="
                text-sm
                font-semibold
                text-gray-700
                hover:text-blue-700
                focus:text-blue-700
              "
              >Forgot Password?</a
            >
          </div>

          <button
            type="submit"
            class="
              focus:outline-none
              text-white text-sm
              py-2.5
              px-5
              rounded-md
              bg-blue-500
              hover:bg-blue-600
              hover:shadow-lg
              mt-4
              flex
              justify-center
              gap-4
              w-full
              disabled:opacity-40
            "
            :disabled="disabled"
          >
            <span
              v-if="disabled"
              class="h-5 w-5 border-t-2 border-l-2 rounded-full animate-spin"
            ></span>
            <span>Login</span>
          </button>
          <p class="mt-4 text-red-500 text-sm">{{ err }}</p>
        </form>
      </div>
    </div>
  </section>
</template>

<script>
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
export default {
  data: () => ({
    email: "",
    password: "",
    disabled: false,
    err: "",
  }),
  methods: {
    login() {
      if (this.email == "") {
        return;
      }
      if (this.password == "") {
        return;
      }
      if (this.disabled) {
        return;
      }
      this.disabled = true;
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then((user) => {
          this.disabled = false;
          firebase
            .firestore()
            .collection("admins")
            .doc(user.user.uid)
            .onSnapshot((snapshot) => {
              localStorage.setItem("user", JSON.stringify(snapshot.data()));
              this.$router.push("/");
              console.log(user);
            });

          firebase
            .auth(this.ItQuizDB)
            .signInAnonymously()
            .then(() => {
              // Signed in..
              console.log("signed in to it quiz");
            });
        })
        .catch((err) => {
          this.disabled = false;
          this.err = err.message;
          console.log(err);
        });
    },
  },
};
</script>