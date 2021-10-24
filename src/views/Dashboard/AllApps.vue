<template>
  <h1 class="font-semibold text-bgray-900 m-6">All Apps</h1>
  <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
    <a
    v-for="app in apps"
    :key="app.appId"
    target="_blank"
      :href="'https://play.google.com/store/apps/details?id='+app.appId"
      class="p-2 py-4 w-40 m-3 border hover:shadow-lg"
    >
      <img
        class="w-full h-auto px-2 py-2"
        :src="app.downloadURL"
        :alt="app.appId"
      />
      <p class="text-sm font-semibold text-center py-2">{{app.appName}}</p>
      <p class="text-xs text-center font-semibold text-bgray-700">{{app.appVersion}}</p>
    </a>
  </div>
</template>

<script>
export default {
  data: () => ({ apps: [] }),
  created() {
    this.QoutesDB.firestore()
      .collection("apps")
      .orderBy("timestamp", "desc")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          this.apps.push(doc.data());
        });
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
  },
};
</script>