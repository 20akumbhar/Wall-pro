import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './css/tailwind.css'
import firebase from 'firebase/app'
import 'firebase/auth'
var firebaseConfig = {
 
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
