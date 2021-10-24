<template>
  <li class="px-5">
    <div class="flex flex-row items-center h-8">
      <div
        class="
          flex
          font-semibold
          text-sm text-gray-300
          my-4
          font-sans
          uppercase
        "
      >
        IT Quiz
      </div>
    </div>
  </li>

  <SidebarItem to="/it-quiz/languages" title="Languages">
    <CodeIcon class="h-5 w-5" />
  </SidebarItem>

</template>
 
 <script>
import SidebarItem from "../SidebarItem.vue";
import { CodeIcon } from "@heroicons/vue/outline";
export default {
  components: { SidebarItem, CodeIcon },
};
</script>