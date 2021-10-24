<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <div class="flex p-4 flex-col">
    <div class="overflow-x-scroll w-full sm:w-4/5 sm:-mx-6 lg:-mx-8">
      <div class="py-2 align-middle inline-block sm:px-6 lg:px-8">
        <div
          class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg"
        >
          <table class="divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  class="
                    px-6
                    py-3
                    text-left text-xs
                    font-medium
                    text-gray-500
                    uppercase
                    tracking-wider
                  "
                >
                  Name
                </th>
                <th
                  scope="col"
                  class="
                    px-6
                    py-3
                    text-left text-xs
                    font-medium
                    text-gray-500
                    uppercase
                    tracking-wider
                  "
                >
                  Status
                </th>
                <th
                  scope="col"
                  class="
                    px-6
                    py-3
                    text-left text-xs
                    font-medium
                    text-gray-500
                    uppercase
                    tracking-wider
                  "
                >
                  Questions
                </th>
                <th scope="col" class="relative px-6 py-3">
                  <span class="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="(level, i) in levels" :key="i">
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  Level {{ i + 1 }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
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
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {{level.data().noOfQuestions}}
                </td>
                <td
                  class="
                    px-6
                    py-4
                    whitespace-nowrap
                    text-right text-sm
                    font-medium
                  "
                >
                  <router-link :to="'/it-quiz/level/'+level.id" class="text-indigo-600 hover:text-indigo-900"
                    >Edit</router-link
                  >
                </td>
              </tr>
              <tr v-if="levels.length == 0">
                <td
                  colspan="3"
                  class="px-2 py-1 text-center text-gray-600 font-semibold"
                >
                  There is no levels for this language
                </td>
              </tr>
              <tr>
                <td
                  colspan="3"
                  class="px-2 py-1 text-center text-gray-600 font-semibold"
                >
                  <button
                    @click="addLevel"
                    class="
                      border-2
                      py-1
                      px-4
                      border-gray-400
                      hover:border-gray-800
                      rounded-md
                      hover:text-gray-900
                    "
                  >
                    Add Level
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/firestore";
export default {
  data: () => ({ levels: [] }),
  created() {
    this.ItQuizDB.firestore()
      .collection("levels")
      .orderBy("timestamp")
      .where("languageId", "==", this.$route.params.languageId)
      .onSnapshot((querySnapshot) => {
        var data = [];
        querySnapshot.forEach((doc) => {
          data.push(doc);
        });
        this.levels = data;
      });
  },
  methods: {
    addLevel() {
      this.ItQuizDB.firestore().collection("levels").add({
        uploadedBy: firebase.auth().currentUser.email,
        timestamp : firebase.firestore.FieldValue.serverTimestamp(),
        noOfQuestions: 0,
        levelNumber: this.levels.length,
        totalMarks: 0,
        isActive: false,
        languageId: this.$route.params.languageId,
        passingMarks:0
      }).then((doc)=>{
          console.log("Added level :",doc.id);
      }).catch((err)=>{
          console.log(err.message);
      })
    },
  },
};
</script>