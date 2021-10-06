<template>
  <li>
    <router-link
      active-class="bg-gray-700 text-bgray-200 border-blue-500"
      :to="to"
      class="
        relative
        flex flex-row
        items-center
        h-11
        focus:outline-none
        hover:bg-gray-700
        text-gray-500
        hover:text-bgray-200
        border-l-4 border-transparent
        hover:border-blue-500
        pr-6
      "
    >
      <span class="inline-flex justify-center items-center ml-4">
        <slot/>
      </span>
      <span class="ml-2 font-semibold text-sm tracking-wide truncate font-sans"
        >{{title}}</span
      >
    </router-link>
  </li>
</template>
<script>
export default {
  props: {
    to: { type: String, default: "/" },
    title: {type : String, default : "--"}
  },
}
</script>