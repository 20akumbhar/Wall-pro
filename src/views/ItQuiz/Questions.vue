<template>
  <div class="w-full p-2 sm:w-9/12 lg:w-8/12">
    <div class="border mb-2 py-1 px-2" @click="toggleView">Add Question</div>
    <div v-if="showQuestionView">
      <QuillEditor
        placeholder="Enter Questions .."
        :toolbar="toolbarOptions"
        theme="snow"
        v-model:content="delta"
        contentType="html"
      />

      <p class="text-xs mt-2">Options :</p>
      <input
        type="text"
        v-model="option1"
        class="w-full border my-2 py-1 px-2"
        placeholder="Option 1"
      />
      <input
        type="text"
        v-model="option2"
        class="w-full border my-2 py-1 px-2"
        placeholder="Option 2"
      />
      <input
        type="text"
        v-model="option3"
        class="w-full border my-2 py-1 px-2"
        placeholder="Option 3"
      />
      <input
        type="text"
        v-model="option4"
        class="w-full border my-2 py-1 px-2"
        placeholder="Option 4"
      />
      <p class="text-xs">Correct Answer :</p>
      <select class="w-full border my-2 py-1 px-2" v-model="answer">
        <option :value="option1">Option 1</option>
        <option :value="option2">Option 2</option>
        <option :value="option3">Option 3</option>
        <option :value="option4">Option 4</option>
      </select>

      <p class="text-xs mt-2">Marks :</p>
      <input
        type="number"
        v-model="marks"
        class="w-full border my-2 py-1 px-2"
        placeholder="Total Marks"
      />

      <button
        @click="save"
        class="
          bg-blue-600
          flex
          items-center
          gap-2
          text-white
          mt-4
          py-2
          px-4
          rounded
        "
      >
        <span
          v-if="saving"
          class="block h-5 w-5 rounded-full border-t border-r animate-spin"
        ></span>
        <span v-if="saving">Adding Question..</span>
        <span v-if="!saving">Add Question</span>
      </button>
      <div
        v-if="saved"
        class="
          bg-green-200
          rounded
          p-2
          mt-4
          text-green-700
          border border-green-700
        "
      >
        Changes Saved
      </div>
      <div
        v-if="error"
        class="bg-red-200 rounded p-2 mt-4 text-red-700 border border-red-700"
      >
        {{ errMsg }}
      </div>
    </div>

    <div class="w-full max-w-md p-2 bg-white rounded-2xl">
      <Disclosure
        v-for="(question, i) in questions"
        :key="question.id"
        v-slot="{ open }"
      >
        <DisclosureButton
          class="
            flex
            justify-between
            w-full
            px-4
            mt-2
            py-2
            text-sm
            font-medium
            text-left text-purple-900
            bg-purple-100
            rounded-lg
            hover:bg-purple-200
            focus:outline-none
            focus-visible:ring
            focus-visible:ring-purple-500
            focus-visible:ring-opacity-75
          "
        >
          <span>Question {{ i + 1 }}</span>
          <ChevronUpIcon
            :class="!open ? 'transform rotate-180' : ''"
            class="w-5 h-5 text-purple-500"
          />
        </DisclosureButton>
        <DisclosurePanel class="px-4 pt-4 pb-2 text-sm text-gray-500">
          <div v-html="question.data().question"></div>
          <TrashIcon
            @click="deleteQuestion(question.id)"
            class="h-6 w-6 float-right mb-4 text-red-300 hover:text-red-500"
          />
        </DisclosurePanel>
      </Disclosure>
    </div>
  </div>
</template>
<script>
import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
import firebase from "firebase/app";
import "firebase/firestore";
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/vue";
import { ChevronUpIcon, TrashIcon } from "@heroicons/vue/solid";
export default {
  components: {
    TrashIcon,
    QuillEditor,
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    ChevronUpIcon,
  },
  data: () => ({
    toolbarOptions: [
      ["bold", "italic", "underline", "strike"], // toggled buttons
      ["blockquote", "code-block"],

      [{ header: 1 }, { header: 2 }], // custom button values
      [{ list: "ordered" }, { list: "bullet" }],
      [{ script: "sub" }, { script: "super" }], // superscript/subscript
      [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
      [{ direction: "rtl" }], // text direction

      [{ size: ["small", false, "large", "huge"] }], // custom dropdown
      [{ header: [1, 2, 3, 4, 5, 6, false] }],

      [{ color: [] }, { background: [] }], // dropdown with defaults from theme
      [{ font: [] }],
      [{ align: [] }],

      ["clean"], // remove formatting button
    ],
    delta: "",
    saving: false,
    error: false,
    saved: false,
    option1: "",
    option2: "",
    option3: "",
    option4: "",
    answer: "",
    errMsg: "Something went wrong",
    marks: 0,
    showQuestionView: false,
    questions: [],
  }),

  methods: {
    save() {
      if (
        this.delta == "" ||
        this.saving ||
        this.option1 == "" ||
        this.option2 == "" ||
        this.answer == "" ||
        this.marks == 0
      ) {
        return;
      }
      this.saving = true;
      this.saved = false;
      this.error = false;
      var db = this.ItQuizDB.firestore();
      var batch = db.batch();
      var addQuestionRef = db.collection("questions").doc();
      batch.set(addQuestionRef, {
        question: this.delta,
        option1: this.option1,
        option2: this.option2,
        option3: this.option3,
        option4: this.option4,
        answer: this.answer,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        levelId: this.$route.params.levelId,
        marks: this.marks
      });

      var updateRef = db.collection("levels").doc(this.$route.params.levelId);
      batch.update(updateRef, {
        totalMarks: firebase.firestore.FieldValue.increment(
          parseInt(this.marks)
        ),
        noOfQuestions: firebase.firestore.FieldValue.increment(1),
      });

      batch
        .commit()
        .then(() => {
          this.saving = false;
          this.saved = true;
          this.error = false;
        })
        .catch((error) => {
          console.error("Error writing document: ", error);
          this.saving = false;
          this.saved = false;
          this.error = true;
        });
    },
    toggleView() {
      this.showQuestionView = !this.showQuestionView;
    },
    deleteQuestion(id) {
      var c = confirm("Delete this question ?");
      if (!c) return;
      this.ItQuizDB.firestore().collection("questions")
        .doc(id)
        .delete()
        .then(() => {
          console.log("Document successfully deleted!");
        })
        .catch((error) => {
          console.error("Error removing document: ", error);
        });
    },
  },
  created() {
    this.ItQuizDB.firestore()
      .collection("questions")
      .orderBy("timestamp")
      .where("levelId", "==", this.$route.params.levelId)
      .onSnapshot((querySnapshot) => {
        var data = [];
        querySnapshot.forEach((doc) => {
          data.push(doc);
        });
        this.questions = data;
      });
  },
};
</script>
