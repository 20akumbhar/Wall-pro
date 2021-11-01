<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <div v-if="level != null" class="bg-white shadow m-2 overflow-hidden sm:rounded-lg">
    <div class="px-4 py-5 sm:px-6">
      <h3 class="text-lg leading-6 font-medium text-gray-900">
        Level {{ level.data().levelNumber + 1 }}
      </h3>
      <p class="mt-1 max-w-2xl text-sm text-gray-500">
        Level details and Questions.
      </p>
    </div>
    <div class="border-t border-gray-200">
      <dl>
        <div
        v-if="language!=null"
          class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
        >
          <dt class="text-sm font-medium text-gray-500">Language Name</dt>
          <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
            {{ language.data().name }}
          </dd>
        </div>
        <div v-if="language!=null" class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <dt class="text-sm font-medium text-gray-500">Language Id</dt>
          <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
            {{ language.id }}
          </dd>
        </div>
        <div
          class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
        >
          <dt class="text-sm font-medium text-gray-500">Added By</dt>
          <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
            {{ level.data().uploadedBy }}
          </dd>
        </div>
        <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <dt class="text-sm font-medium text-gray-500">No of questions</dt>
          <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
            {{ level.data().noOfQuestions }}
          </dd>
        </div>
        <div
          class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
        >
          <dt class="text-sm font-medium text-gray-500">Total Marks</dt>
          <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{{level.data().totalMarks}}</dd>
        </div>
        <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <dt class="text-sm font-medium text-gray-500">Status</dt>
          <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
            <span
              v-if="!level.data().isActive"
              class="
                px-2
                inline-flex
                text-xs
                leading-5
                font-semibold
                rounded-full
                bg-yellow-100
                text-yellow-800
              "
            >
              In Progress
            </span>
            <span
              v-if="level.data().isActive"
              class="
                px-2
                inline-flex
                text-xs
                leading-5
                font-semibold
                rounded-full
                bg-green-100
                text-green-800
              "
            >
              Active
            </span>
          </dd>
        </div>
        <div
          class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
        >
          <dt class="text-sm font-medium text-gray-500">Passing Marks</dt>
          <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{{level.data().passingMarks}}</dd>
        </div>
        <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <dt class="text-sm font-medium text-gray-500">Actions</dt>
          <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
           <router-link :to="'/it-quiz/questions/'+$route.params.levelId" class="font-medium text-indigo-600 hover:text-indigo-500">Add Questions</router-link>
          </dd>
        </div>
      </dl>
    </div>
    <br><br><br><br><br>
  </div>
</template>

<script>
import "firebase/firestore";
export default {
  components: {},
  data: () => ({ level: null, language: null }),
  created() {
    var obj = JSON.parse(localStorage.getItem("user"));
    if (!obj.isAdmin && obj.access.indexOf("itquiz") == -1) {
      this.$router.push("/");
      return;
    }
    this.ItQuizDB.firestore()
      .collection("levels")
      .doc(this.$route.params.levelId)
      .onSnapshot((doc) => {
        if (doc.exists) {
          this.level = doc;
          //console.log("Document data:", doc.data());
          this.ItQuizDB.firestore()
            .collection("languages")
            .doc(doc.data().languageId)
            .get()
            .then((doc2) => {
              this.language = doc2;
              //console.log(this.language.data());
            });
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      })
     
  },
};
</script>