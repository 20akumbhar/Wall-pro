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
        Users
      </div>
    </div>
  </li>
  <SidebarItem title="Users" to="/users">
    <UsersIcon class="h-5 w-5" />
  </SidebarItem>
</template>
<script>
import { UsersIcon } from "@heroicons/vue/outline";
import SidebarItem from "../SidebarItem.vue";
export default {
  components: { SidebarItem, UsersIcon },
};
</script>