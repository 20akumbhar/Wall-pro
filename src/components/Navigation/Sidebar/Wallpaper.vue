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
  <li>
    <router-link
      :class="
        $route.path.startsWith('/categories')
          ? 'bg-gray-700 text-bgray-200 border-blue-500'
          : ''
      "
      to="/categories"
      class="
        relative
        flex flex-row
        items-center
        h-11
        focus:outline-none
        hover:bg-gray-700
        text-gray-500
        hover:text-gray-200
        border-l-4 border-transparent
        hover:border-blue-500
        pr-6
      "
    >
      <span class="inline-flex justify-center items-center ml-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
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
      </span>
      <span class="ml-2 font-semibold text-sm tracking-wide truncate font-sans"
        >Categories</span
      >
    </router-link>
  </li>

  <li>
    <router-link
      :class="
        $route.path.startsWith('/wallpapers/new') ||
        $route.path.startsWith('/wallpapers/view')
          ? 'bg-gray-700 text-bgray-200 border-blue-500'
          : ''
      "
      active-class="bg-gray-700 text-bgray-200 border-blue-500"
      to="/wallpapers"
      class="
        relative
        flex flex-row
        items-center
        h-11
        focus:outline-none
        hover:bg-gray-700
        text-gray-500
        hover:text-gray-200
        border-l-4 border-transparent
        hover:border-blue-500
        pr-6
      "
    >
      <span class="inline-flex justify-center items-center ml-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      </span>
      <span class="ml-2 font-semibold text-sm tracking-wide truncate font-sans"
        >Wallpapers</span
      >
    </router-link>
  </li>

  <li v-if="isAdmin">
    <router-link
      active-class="bg-gray-700 text-bgray-200 border-blue-500"
      to="/wallpapers/popular"
      class="
        relative
        flex flex-row
        items-center
        h-11
        focus:outline-none
        hover:bg-gray-700
        text-gray-500
        hover:text-gray-200
        border-l-4 border-transparent
        hover:border-blue-500
        pr-6
      "
    >
      <span class="inline-flex justify-center items-center ml-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
        
      </span>
      <span class="ml-2 font-semibold text-sm tracking-wide truncate font-sans"
        >Popular</span
      >
    </router-link>
  </li>
  <!-- -->
  <li v-if="isAdmin">
    <router-link
      active-class="bg-gray-700 text-bgray-200 border-blue-500"
      to="/wallpapers/premium"
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
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
          />
        </svg>
      </span>
      <span class="ml-2 font-semibold text-sm tracking-wide truncate font-sans"
        >Premium</span
      >
    </router-link>
  </li>
</template>
<script>
export default {
  props: {
    isAdmin: Boolean,
  },
};
</script>