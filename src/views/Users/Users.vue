<template>
  <div class="flex justify-end">
    <router-link
      tag="button"
      to="/users/new"
      type="button"
      class="
        focus:outline-none
        text-white text-sm
        py-2.5
        px-5
        rounded-md
        bg-bgray-500
        hover:bg-bgray-600
        hover:shadow-lg
        flex
        items-center
        m-2
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
      Add User
    </router-link>
  </div>
  <hr />

  <div class="grid grid-cols-1 sm:grid-cols-2">
    <router-link
      v-for="user in users"
      :key="user.userId"
      tag="div"
      :to="'/users/'+user.id"
      class="
        card
        border
        py-3
        px-5
        m-4
        bg-bgray-800
        text-bgray-200
        rounded
        border-blue-500 border-l-4
      "
    >
      {{ user.data().emailId }}
    </router-link>
  </div>
</template>
<script>
import firebase from "firebase";
import "firebase/firestore";
export default {
  data: () => ({
    users: [],
  }),
  created() {
    firebase
      .firestore()
      .collection("admins")
      .where('isAdmin',"==",false)
      .onSnapshot((querySnapshot) => {
        var users = [];
        querySnapshot.forEach((doc) => {
          users.push(doc);
        });
        this.users = users;
      });

    var obj=JSON.parse(localStorage.getItem('user'));
    if(!obj.isAdmin){
      this.$router.push('/');
    }
  
  },
};
</script>