<template>
  <div
    class="
    border-b-2
    border-blue-500
      p-4
      bg-bgray-800
      text-bgray-50
      flex
      gap-4
      items-center
      md:ml-64
      sticky top-0
      z-40
    "
  >
    <MenuAlt1Icon  @click="toggleSidebar" class="h-7 w-7 md:hidden"/>
    <CubeTransparentIcon class="h-7 w-7 hidden md:block"/>
    <p class="text-bgray-50">Dashboard</p>
  </div>
</template>
<script>
import {CubeTransparentIcon,MenuAlt1Icon} from '@heroicons/vue/outline'
export default {
  components:{CubeTransparentIcon,MenuAlt1Icon},
  emits: ["on-toggle"],
  methods: {
    toggleSidebar() {
      this.$emit("on-toggle");
    },
  },
};
</script>