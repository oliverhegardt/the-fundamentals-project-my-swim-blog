//firebase referens
let firebaseConfig = {
  apiKey: "AIzaSyCiHA4zRVFbjxdh-7DIfALZGJR9R996Y5A",
  authDomain: "my-blog-1-76876.firebaseapp.com",
  projectId: "my-blog-1-76876",
  storageBucket: "my-blog-1-76876.appspot.com",
  messagingSenderId: "347418026017",
  appId: "1:347418026017:web:cde9bc978403d8a55d0360",
};

firebase.initializeApp(firebaseConfig);

let db = firebase.firestore();
