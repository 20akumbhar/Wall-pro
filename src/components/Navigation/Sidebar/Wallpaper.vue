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
        Wallpapers
      </div>
    </div>
  </li>
  <SidebarItem to="/categories" title="Categories">
     <TemplateIcon class="h-5 w-5" />
  </SidebarItem>
  <SidebarItem to="/wallpapers" title="Wallpapers">
     <PhotographIcon class="h-5 w-5" />
  </SidebarItem>
  <SidebarItem v-if="isAdmin" to="/wallpapers/popular" title="Popular">
    <HeartIcon class="h-5 w-5" />
  </SidebarItem>
  <SidebarItem v-if="isAdmin" to="/wallpapers/premium" title="Premium">
    <SparklesIcon class="h-5 w-5" />
  </SidebarItem>
</template>
<script>
import {
  TemplateIcon,
  PhotographIcon,
  HeartIcon,
  SparklesIcon,
} from "@heroicons/vue/outline";
import SidebarItem from "../SidebarItem.vue";
export default {
  components: {
    TemplateIcon,
    PhotographIcon,
    HeartIcon,
    SparklesIcon,
    SidebarItem,
  },
  props: {
    isAdmin: Boolean,
  },
};
</script>