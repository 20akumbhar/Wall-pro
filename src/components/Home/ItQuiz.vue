<template>
  <h1 class="px-4 pt-4 pb-2 text-blue-400 text-lg font-bold">
    It Quiz <span class="text-xs text-bgray-500">(under development)</span>
  </h1>
  <!-- <hr class="mx-5 my-2" /> -->
  <div
    class="
      grid grid-cols-2
      sm:grid-cols-2
      md:grid-cols-4
      lg:grid-cols-5
      p-4
      gap-4
    "
  >
    <router-link
      tag="div"
      to="/it-quiz/languages"
      class="
        relative
        bg-white
        shadow-lg
        rounded-md
        flex
        items-center
        justify-center
        sm:justify-between
        p-3
        text-blue-800
        font-medium
      "
    >
      <div
        class="
          sm:flex
          hidden
          justify-center
          items-center
          w-14
          h-14
          bg-blue-100
          rounded-full
          transition-all
          duration-300
          border
          transform
          group-hover:rotate-12
        "
      >
        <CodeIcon class="stroke-current h-7 w-7 text-blue-800"/>
      </div>
      <div class="text-center md:text-right block">
        <p class="text-2xl">8</p>
        <p>Languages</p>
      </div>
    </router-link>
    <router-link
      tag="div"
      to="/it-quiz/languages"
      class="
        relative
        bg-white
        shadow-lg
        rounded-md
        flex
        items-center
        justify-center
        sm:justify-between
        p-3
        text-blue-800
        font-medium
      "
    >
      <div
        class="
          sm:flex
          hidden
          justify-center
          items-center
          w-14
          h-14
          bg-blue-100
          rounded-full
          transition-all
          duration-300
          border
          transform
          group-hover:rotate-12
        "
      >
      <ViewListIcon class="stroke-current h-7 w-7 text-blue-800"/>
      
      </div>
      <div class="text-center md:text-right block">
        <p class="text-2xl">{{data.levels}}</p>
        <p>Levels</p>
      </div>
    </router-link>
    <router-link
      tag="div"
      to="/it-quiz/languages"
      class="
        relative
        bg-white
        shadow-lg
        rounded-md
        flex
        items-center
        justify-center
        sm:justify-between
        p-3
        text-blue-800
        font-medium
      "
    >
      <div
        class="
          sm:flex
          hidden
          justify-center
          items-center
          w-14
          h-14
          bg-blue-100
          rounded-full
          transition-all
          duration-300
          border
          transform
          group-hover:rotate-12
        "
      >
      <QuestionMarkCircleIcon class="stroke-current h-7 w-7 text-blue-800"/>
        
      </div>
      <div class="text-center md:text-right block">
        <p class="text-2xl">{{data.questions}}</p>
        <p>Questions</p>
      </div>
    </router-link>
    <div
      class="
        relative
        bg-white
        shadow-lg
        rounded-md
        flex
        items-center
        justify-center
        sm:justify-between
        p-3
        text-blue-800
        font-medium
      "
    >
      <div
        class="
          sm:flex
          hidden
          justify-center
          items-center
          w-14
          h-14
          bg-blue-100
          rounded-full
          transition-all
          duration-300
          border
          transform
          group-hover:rotate-12
        "
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="stroke-current h-7 w-7 text-blue-800"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"
          />
        </svg>
      </div>
      <div class="text-center md:text-right block">
        <p class="text-2xl">0.0.0</p>
        <p>Version</p>
      </div>
    </div>
  </div>
</template>
<script>
import 'firebase/firestore'
import {CodeIcon,ViewListIcon,QuestionMarkCircleIcon} from '@heroicons/vue/outline'
export default {
  components:{CodeIcon,ViewListIcon,QuestionMarkCircleIcon},
  data:()=>({data:{levels:0,questions:0}}),
  created() {
    this.ItQuizDB.firestore()
      .collection("data")
      .doc("data")
      .onSnapshot((doc) => {
        this.data=doc.data()
      });
  },
}
</script>