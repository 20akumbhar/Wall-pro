<template>
  <!-- This example requires Tailwind CSS v2.0+ -->

  <div class="bg-white shadow overflow-hidden sm:rounded-lg md:p-4" v-if="show">
    <div class="px-4 py-5 sm:px-6">
      <h3 class="text-lg leading-6 font-medium text-gray-900">
        User Information
      </h3>
    </div>
    <div class="border-t border-gray-200">
      <dl>
        <div
          class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
        >
          <dt class="text-sm font-medium text-gray-500">Email address</dt>
          <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
            {{ email }}
          </dd>
        </div>
        <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <dt class="text-sm font-medium text-gray-500">Role</dt>
          <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
            <span v-if="user.isAdmin">Admin</span>
            <span v-if="!user.isAdmin">User</span>
          </dd>
        </div>
        <div
          class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
        >
          <dt class="text-sm font-medium text-gray-500">Account status</dt>
          <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
            <p
              v-if="user.isActive"
              class="
                text-xs
                font-semibold
                tracking-wider
                bg-green-100
                text-green-500
                inline-block
                py-0
                px-2
                border border-green-300
                mt-2
                rounded-full
              "
            >
              Active
            </p>

            <p
              v-if="!user.isActive"
              class="
                text-xs
                font-semibold
                tracking-wider
                bg-red-100
                text-red-500
                inline-block
                py-0
                px-2
                border border-red-300
                mt-2
                rounded-full
              "
            >
              Disabled
            </p>
          </dd>
        </div>
        <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <dt class="text-sm font-medium text-gray-500">Access information</dt>
          <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
            <div class="mt-5 md:mt-0 md:col-span-2">
              <fieldset>
                <div class="mt-4 space-y-4">
                  <div class="flex items-start">
                    <div class="flex items-center h-5">
                      <input
                        v-model="wallpapers"
                        type="checkbox"
                        class="
                          focus:ring-indigo-500
                          h-4
                          w-4
                          text-indigo-600
                          border-gray-300
                          rounded
                        "
                      />
                    </div>
                    <div class="ml-3 text-sm">
                      <label for="comments" class="font-medium text-gray-700"
                        >Wallpapers</label
                      >
                      <p class="text-gray-500">
                        Give access to bestwalls app data
                      </p>
                    </div>
                  </div>
                  <div class="flex items-start">
                    <div class="flex items-center h-5">
                      <input
                        v-model="qoutes"
                        type="checkbox"
                        class="
                          focus:ring-indigo-500
                          h-4
                          w-4
                          text-indigo-600
                          border-gray-300
                          rounded
                        "
                      />
                    </div>
                    <div class="ml-3 text-sm">
                      <label for="candidates" class="font-medium text-gray-700"
                        >Quotes</label
                      >
                      <p class="text-gray-500">
                        Give access to Quotes app database.
                      </p>
                    </div>
                  </div>
                  <div class="flex items-start">
                    <div class="flex items-center h-5">
                      <input
                        type="checkbox"
                        class="
                          focus:ring-indigo-500
                          h-4
                          w-4
                          text-indigo-600
                          border-gray-300
                          rounded
                        "
                        v-model="itquiz"
                      />
                    </div>
                    <div class="ml-3 text-sm">
                      <label for="offers" class="font-medium text-gray-700"
                        >It Quiz</label
                      >
                      <p class="text-gray-500">
                        Give access to add and manage quizes
                      </p>
                    </div>
                  </div>
                </div>
              </fieldset>
              <div class="px-4 mt-10 py-3 text-right sm:px-6">
                <div
                  v-if="err"
                  class="
                    my-2
                    text-center
                    max-w-md
                    bg-red-300
                    border border-red-500
                    text-red-600
                    pl-4
                    pr-8
                    py-3
                    rounded
                    relative
                  "
                  role="alert"
                >
                  <span class="block sm:inline">Something went wrong</span>
                </div>
                <div
                  v-if="success"
                  class="
                    my-2
                    max-w-md
                    bg-green-100
                    border border-green-400
                    text-green-600
                    pl-4
                    pr-8
                    text-center
                    py-3
                    rounded
                    relative
                  "
                  role="alert"
                >
                  <span class="block sm:inline">Access Updated</span>
                </div>
                <button
                  type="button"
                  class="
                    inline-flex
                    justify-center
                    py-2
                    px-4
                    border border-transparent
                    shadow-sm
                    text-sm
                    font-medium
                    rounded-md
                    text-white
                    bg-indigo-600
                    hover:bg-indigo-700
                    focus:outline-none
                    focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
                  "
                  @click="updateUser"
                >
                  Update
                </button>
              </div>
            </div>
          </dd>
        </div>
      </dl>
    </div>
 
 
 <br><br><br><br> </div>
</template>
<script>
import firebase from "firebase";
import "firebase/firestore";
export default {
  data: () => ({
    user: null,
    email: "",
    show: false,
    wallpapers: false,
    qoutes: false,
    itquiz: false,
    success: false,
    err: false,
  }),
  created() {
    firebase
      .firestore()
      .collection("admins")
      .doc(this.$route.params.userId)
      .get()
      .then((snapshot) => {
        this.user = snapshot.data();
        this.email = this.user.emailId;
        console.log(this.user.access);
        if (this.user.access.indexOf("wallpapers") != -1) {
          this.wallpapers = true;
        } else {
          this.wallpapers = false;
        }
        if (this.user.access.indexOf("qoutes") != -1) {
          console.log("true");
          this.qoutes = true;
        } else {
          console.log("false");
          this.qoutes = false;
        }

        if (this.user.access.indexOf("itquiz") != -1) {
          this.itquiz = true;
        } else {
          this.itquiz = false;
        }
        this.show = true;
      })
      .catch((err) => {
        console.log(err);
        this.err = true;
      });
  },
  methods: {
    updateUser() {
      this.err = false;
      this.success = false;
      var access = [];
      if (this.wallpapers) {
        access.push("wallpapers");
      }
      if (this.qoutes) {
        access.push("qoutes");
      }
      if (this.itquiz) {
        access.push("itquiz");
      }
      firebase
        .firestore()
        .collection("admins")
        .doc(this.$route.params.userId)
        .update({ access })
        .then(() => {
          this.success = true;
          this.err = false;
        })
        .catch((err) => {
          this.err = true;
          this.success = false;
          console.log(err.message);
        });
    },
  },
};
</script>