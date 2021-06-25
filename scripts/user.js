let loadingUser = true
let logedUser
let logedUserData

firebase.auth().onAuthStateChanged(user => {
  if (!!user)
    db.collection('users')
      .where('authId', '==', user.uid)
      .get()
      .then(users => {
        logedUserData = { ...users.docs[0].data(), id: users.docs[0].id }
      })
      .finally(() => {
        loadingUser = false
        logedUser = user
      })
  else {
    loadingUser = false
    logedUser = user
  }
})
