<template>
  <div class="flex justify-end">
    <router-link
      tag="button"
      to="/users/new"
      type="button"
      class="
        focus:outline-none
        text-white text-sm
        py-1.5
        px-3
        rounded-md
        bg-bgray-800
        hover:shadow-lg
        flex
        items-center
        m-2
        mb-6
        transform
        hover:-translate-y-0.5
      "
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="w-4 h-4 mr-2"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
        />
      </svg>
      Add New
    </router-link>
  </div>


  <router-link class="border-b py-4 mx-4 flex justify-between items-center"
  v-for="user in users"
      :key="user.userId"
      tag="div"
      :to="'/users/' + user.id"
  >
    <div>
      <p class="font-bold text-bgray-600 truncate">{{user.data().emailId}}</p>
      <p
      v-if="user.data().isActive"
        class="
          text-xs
          font-semibold
          tracking-wider
          bg-green-100
          text-green-500
          inline-block
          py-0
          px-2
          border border-green-300
          mt-2
          rounded-full
        "
      >
        Active
      </p>

       <p
       v-if="!user.data().isActive"
        class="
          text-xs
          font-semibold
          tracking-wider
          bg-red-100
          text-red-500
          inline-block
          py-0
          px-2
          border border-red-300
          mt-2
          rounded-full
        "
      >
        Disabled
      </p>
    </div>
        <ChevronRightIcon class="h-5 w-5 text-bgray-500" />
  </router-link>

 <br><br><br><br>
</template>
<script>
import firebase from "firebase";
import "firebase/firestore";
import { ChevronRightIcon } from "@heroicons/vue/outline";
export default {
  components: { ChevronRightIcon },
  data: () => ({
    users: [],
  }),
  created() {
    firebase
      .firestore()
      .collection("admins")
      .where("isAdmin", "==", false)
      .onSnapshot((querySnapshot) => {
        var users = [];
        querySnapshot.forEach((doc) => {
          users.push(doc);
        });
        this.users = users;
      });

    var obj = JSON.parse(localStorage.getItem("user"));
    if (!obj.isAdmin) {
      this.$router.push("/");
    }
  },
};
</script>