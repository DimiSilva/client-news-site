const toastDefaultOptions = {
  settings: {
    duration: 3000
  }
}

const toastSuccessOptions = {
  ...toastDefaultOptions,
  style: {
    main: {
      background: '#00aa00'
    }
  }
}
const toastErrorOptions = {
  ...toastDefaultOptions,
  style: {
    main: {
      background: '#aa0000'
    }
  }
}

const loadLinkedToUserFeatures = headerNavigationUl => {
  const loadingInterval = setInterval(() => {
    if (loadingUser) return

    clearInterval(loadingInterval)

    if (logedUser) {
      if (logedUserData.type === userTypesEnum.ADMIN) {
        headerNavigationUl.appendChild(createNavCreateNewsButtonComponent())
      }
      headerNavigationUl.appendChild(createNavLogoutButtonComponent())
    } else {
      headerNavigationUl.appendChild(createNavLoginButtonComponent())
    }
  }, 1000)
}

const logout = () => {
  firebase
    .auth()
    .signOut()
    .then(res => {
      window.location.replace('/')
    })
}

firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
