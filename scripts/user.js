let loadingUser = true
let logedUser

firebase.auth().onAuthStateChanged(user => {
  loadingUser = false
  logedUser = user
})
