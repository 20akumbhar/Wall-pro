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
        Settings
      </div>
    </div>
  </li>
  <SidebarItem title="Update Password" to="/update-password">
    <KeyIcon class="h-5 w-5"/>
  </SidebarItem>
  <SidebarItem v-if="isAdmin" title="Add Apps" to="/add-apps">
    <ViewGridAddIcon class="h-5 w-5"/>
  </SidebarItem>
</template>
<script>
import { KeyIcon,ViewGridAddIcon } from "@heroicons/vue/outline";
import SidebarItem from "../SidebarItem.vue"
export default {
  components:{SidebarItem,KeyIcon,ViewGridAddIcon},
  props: {
    isAdmin:{type: Boolean,default: false},
  },
}
</script>