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
        Qoutes
      </div>
    </div>
  </li>
  <li>
    <router-link
      :class="
        $route.path.startsWith('/q/categories') ||
        $route.path.startsWith('/q/category')
          ? 'bg-gray-700 text-bgray-200 border-blue-500'
          : ''
      "
      to="/q/categories"
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
        $route.path.startsWith('/q/qoutes') 
          ? 'bg-gray-700 text-bgray-200 border-blue-500'
          : ''
      "
      to="/q/qoutes"
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
        <!-- <svg
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
        </svg> -->
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            d="M12 6v3.028c0 2.337-1.529 3.91-3.684 4.335l-.406-.87c.996-.375 1.637-1.587 1.637-2.493h-1.547v-4h4zm5 0v3.028c0 2.337-1.529 3.91-3.684 4.335l-.406-.87c.996-.375 1.637-1.587 1.637-2.493h-1.547v-4h4zm5-3v13h-11.643l-4.357 3.105v-3.105h-4v-13h20zm2-2h-24v16.981h4v5.019l7-5.019h13v-16.981z"
          />
        </svg>
      </span>
      <span class="ml-2 font-semibold text-sm tracking-wide truncate font-sans"
        >Qoutes</span
      >
    </router-link>
  </li>

  <li>
    <router-link
      active-class="bg-gray-700 text-bgray-200 border-blue-500"
      to="/q/qoutes"
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
</template>
 <script>
// import 'firebase/firestore'
// export default {
//     created(){
//         this.QoutesDB.firestore()
//       .collection("test")
//       .doc("test")
//       .get()
//       .then((snapshot) => {
//         console.log(snapshot.data())
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//     }
// }
</script>