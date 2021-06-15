import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './css/tailwind.css'
import firebase from 'firebase/app'
import 'firebase/auth'
var firebaseConfig = {
  apiKey: "AIzaSyBQgEsxr2BuhjV_chZmhj_hwYR7fm4A1NM",
  authDomain: "vue-dashboard-20.firebaseapp.com",
  projectId: "vue-dashboard-20",
  storageBucket: "vue-dashboard-20.appspot.com",
  messagingSenderId: "115190734542",
  appId: "1:115190734542:web:0f5e345b9f0ba383a3fa9f",
  measurementId: "G-FHPGG0NXC1"
};

firebase.initializeApp(firebaseConfig);
firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
firebase.getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      unsubscribe();
      resolve(user);
    }, reject);
  })
};
createApp(App).use(router).mount('#app')
