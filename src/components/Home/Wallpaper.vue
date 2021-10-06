<template>
  <h1 class="px-4 pt-4 pb-2 text-blue-400 text-lg font-bold">Wallpaper</h1>
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
        <p class="text-2xl">{{ data.categories }}</p>
        <p>Categories</p>
      </div>
    </router-link>
    <router-link
      tag="div"
      to="/wallpapers"
      class="
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
          class="h-7 w-7 text-blue-800 stroke-current"
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
      </div>
      <div class="sm:text-right text-center">
        <p class="text-2xl">{{ data.wallpapers }}</p>
        <p>Wallpapers</p>
      </div>
    </router-link>
    <router-link
      to="/wallpapers/popular"
      tag="div"
      class="
        bg-white
        shadow-lg
        rounded-md
        flex
        items-center
        sm:justify-between
        justify-center
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
          class="h-7 w-7 text-blue-800 stroke-current"
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
      </div>
      <div class="sm:text-right text-center">
        <p class="text-2xl">{{ data.popular }}</p>
        <p>Popular</p>
      </div>
    </router-link>
    <router-link
      to="/wallpapers/premium"
      tag="div"
      class="
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
          class="h-7 w-7 text-blue-800 stroke-current"
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
      </div>
      <div class="sm:text-right text-center">
        <p class="text-2xl">{{ data.premium }}</p>
        <p>Premium</p>
      </div>
    </router-link>
    <div
      class="
        bg-white
        shadow-lg
        rounded-md
        flex
        items-center
        sm:justify-between
        justify-center
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
          class="h-7 w-7 text-blue-800 stroke-current"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
      </div>
      <div class="sm:text-right text-center">
        <p class="text-2xl">{{ data.clients }}</p>
        <p>Downloads</p>
      </div>
    </div>
    <a
    target="_blank"
    href="https://play.google.com/store/apps/details?id=com.aadevelopers.bestwalls"
      class="
        bg-white
        shadow-lg
        rounded-md
        flex
        items-center
        sm:justify-between
        justify-center
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
          class="h-7 w-7 text-blue-800 stroke-current"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
          />
        </svg>
      </div>
      <div class="sm:text-right text-center">
        <p class="text-2xl">1.0.0</p>
        <p>Version</p>
      </div>
    </a>
  </div>
</template>
<script>
export default {
  props: {
    data: Object,
  },
};
</script>