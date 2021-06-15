<template>
  <div class="home">
    <button @click="add" class="bg-bgray-800 text-bgray-50 py-2 px-3">Add</button>
  </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/firestore";

export default {
  name: "Home",
  components: {},
  methods: {
    add() {
      firebase
        .firestore()
        .collection("tests")
        .add({
          name: "Ajinkya",
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        }).then(dicref=>{
          console.log(dicref.id)
        });
    },
  },
};
</script>
