<template>
  <div
    class="
      px-4
      py-3
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
    <svg
      @click="toggleSidebar"
      xmlns="http://www.w3.org/2000/svg"
      class="h-7 w-7 md:hidden"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="{2}"
        d="M4 6h16M4 12h8m-8 6h16"
      />
    </svg>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="h-7 w-7 hidden md:block"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="{2}"
        d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5"
      />
    </svg>
    <p class="text-bgray-50">Dashboard</p>
  </div>
</template>
<script>
export default {
  emits: ["on-toggle"],
  methods: {
    toggleSidebar() {
      this.$emit("on-toggle");
    },
  },
};
</script>