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
        Qoutes
      </div>
    </div>
  </li>

  <SidebarItem to="/q/categories" title="Categories">
    <TemplateIcon class="h-5 w-5" />
  </SidebarItem>

  <SidebarItem to="/q/qoutes" title="Qoutes">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="h-5 w-5"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        d="M12 6v3.028c0 2.337-1.529 3.91-3.684 4.335l-.406-.87c.996-.375 1.637-1.587 1.637-2.493h-1.547v-4h4zm5 0v3.028c0 2.337-1.529 3.91-3.684 4.335l-.406-.87c.996-.375 1.637-1.587 1.637-2.493h-1.547v-4h4zm5-3v13h-11.643l-4.357 3.105v-3.105h-4v-13h20zm2-2h-24v16.981h4v5.019l7-5.019h13v-16.981z"
      />
    </svg>
  </SidebarItem>

  <SidebarItem to="/q/qoutes" title="Popular">
    <HeartIcon class="h-5 w-5" />
  </SidebarItem>
</template>
 
 <script>
import SidebarItem from "../SidebarItem.vue";
import { TemplateIcon, HeartIcon } from "@heroicons/vue/outline";
export default {
  components: { SidebarItem, TemplateIcon, HeartIcon },
};
</script>