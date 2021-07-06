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
                  Users
                </div>
              </div>
            </li>
            <li>
              <router-link
                to="/users"
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
                      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                </span>
                <span
                  class="
                    ml-2
                    font-semibold
                    text-sm
                    tracking-wide
                    truncate
                    font-sans
                  "
                  >Users</span
                >
              </router-link>
            </li>
</template>