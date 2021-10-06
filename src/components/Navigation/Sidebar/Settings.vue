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
  <li>
    <router-link
      :class="
        $route.path.startsWith('/update-password')
          ? 'bg-gray-700 text-bgray-200 border-blue-500'
          : ''
      "
      to="/update-password"
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
            d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
          />
        </svg>
      </span>
      <span class="ml-2 font-semibold text-sm tracking-wide truncate font-sans"
        >Update Password</span
      >
    </router-link>
  </li>
</template>