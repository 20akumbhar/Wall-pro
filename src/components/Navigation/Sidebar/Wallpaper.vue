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
            stroke-width="{2}"
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

  <li>
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
            d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
          />
        </svg>
      </span>
      <span class="ml-2 font-semibold text-sm tracking-wide truncate font-sans"
        >Popular</span
      >
    </router-link>
  </li>
  <!-- -->
  <li>
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
          class="h-5 w-5"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M10.1724 4.14988C10.8762 2.56624 13.1238 2.56626 13.8276 4.14988L15.3346 7.54057C15.8669 8.73828 17.3881 9.1088 18.4116 8.29003L20.7094 6.45182C22.1722 5.28159 24.2968 6.58433 23.9173 8.41877L21.8092 18.6078C21.521 20.0008 20.294 20.9999 18.8714 20.9999H5.12856C3.70599 20.9999 2.47901 20.0008 2.19078 18.6078L0.0827157 8.41877C-0.296822 6.58433 1.82784 5.28159 3.29063 6.45182L5.58839 8.29003C6.61186 9.1088 8.13309 8.73828 8.6654 7.54057L10.1724 4.14988ZM12 4.96216L10.493 8.35285C9.42839 10.7483 6.38594 11.4893 4.339 9.85177L2.04124 8.01356L4.1493 18.2025C4.24538 18.6669 4.65437 18.9999 5.12856 18.9999H18.8714C19.3456 18.9999 19.7546 18.6669 19.8507 18.2025L21.9588 8.01356L19.661 9.85177C17.6141 11.4893 14.5716 10.7483 13.507 8.35285L12 4.96216Z"
            fill="currentColor"
          />
        </svg>
      </span>
      <span class="ml-2 font-semibold text-sm tracking-wide truncate font-sans"
        >Premium</span
      >
    </router-link>
  </li>
</template>
