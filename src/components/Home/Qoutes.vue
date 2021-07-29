<template>
  <h1 class="px-4 pt-4 pb-2 text-blue-400 text-lg font-bold">Qoutes <span class="text-xs text-bgray-500">(under development)</span></h1>
  <!-- <hr class="mx-5 my-2" /> -->
  <div
    class="
      grid grid-cols-2
      sm:grid-cols-2
      md:grid-cols-4
      lg:grid-cols-5
      p-4
      gap-4
    "
  >
  <router-link
      tag="div"
      to="/categories"
      class="
        relative
        bg-white
        shadow-lg
        rounded-md
        flex
        items-center
        justify-center
        sm:justify-between
        p-3
        text-blue-800
        font-medium
      "
    >
      <div
        class="
          sm:flex
          hidden
          justify-center
          items-center
          w-14
          h-14
          bg-blue-100
          rounded-full
          transition-all
          duration-300
          border
          transform
          group-hover:rotate-12
        "
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="stroke-current h-7 w-7 text-blue-800"
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
      </div>
      <div class="text-center md:text-right block">
        <p class="text-2xl">0</p>
        <p>Categories</p>
      </div>
    </router-link>
  <router-link
      tag="div"
      to="/categories"
      class="
        relative
        bg-white
        shadow-lg
        rounded-md
        flex
        items-center
        justify-center
        sm:justify-between
        p-3
        text-blue-800
        font-medium
      "
    >
      <div
        class="
          sm:flex
          hidden
          justify-center
          items-center
          w-14
          h-14
          bg-blue-100
          rounded-full
          transition-all
          duration-300
          border
          transform
          group-hover:rotate-12
        "
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="stroke-current h-7 w-7 text-blue-800"
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
      </div>
      <div class="text-center md:text-right block">
        <p class="text-2xl">0</p>
        <p>Quotes</p>
      </div>
    </router-link>
  <router-link
      tag="div"
      to="/categories"
      class="
        relative
        bg-white
        shadow-lg
        rounded-md
        flex
        items-center
        justify-center
        sm:justify-between
        p-3
        text-blue-800
        font-medium
      "
    >
      <div
        class="
          sm:flex
          hidden
          justify-center
          items-center
          w-14
          h-14
          bg-blue-100
          rounded-full
          transition-all
          duration-300
          border
          transform
          group-hover:rotate-12
        "
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="stroke-current h-7 w-7 text-blue-800"
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
      </div>
      <div class="text-center md:text-right block">
        <p class="text-2xl">0</p>
        <p>Popular</p>
      </div>
    </router-link>
  <div
      class="
        relative
        bg-white
        shadow-lg
        rounded-md
        flex
        items-center
        justify-center
        sm:justify-between
        p-3
        text-blue-800
        font-medium
      "
    >
      <div
        class="
          sm:flex
          hidden
          justify-center
          items-center
          w-14
          h-14
          bg-blue-100
          rounded-full
          transition-all
          duration-300
          border
          transform
          group-hover:rotate-12
        "
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="stroke-current h-7 w-7 text-blue-800"
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
      </div>
      <div class="text-center md:text-right block">
        <p class="text-2xl">0.0.0</p>
        <p>Version</p>
      </div>
    </div>
  </div>
</template>