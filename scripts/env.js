  var firebaseConfig = {
      apiKey: "AIzaSyA9Ro8QIfDfzKxKtFh4JZqwc8J7DlYzcsg",
      authDomain: "site-de-noticias-86615.firebaseapp.com",
      projectId: "site-de-noticias-86615",
      storageBucket: "site-de-noticias-86615.appspot.com",
      messagingSenderId: "198119671266",
      appId: "1:198119671266:web:f50b4586fc35e12ff725bb"
  };

  firebase.initializeApp(firebaseConfig);

  const db = firebase.firestore()