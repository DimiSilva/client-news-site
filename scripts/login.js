let emailInput = document.createElement('input')
let passwordInput = document.createElement('input')
let headerNavigationUl = document.createElement('ul')

const onLoad = () => {
  loadElements()
  loadLinkedToUserFeatures(headerNavigationUl)
}

const loadElements = () => {
  emailInput = document.getElementById('email-input')
  passwordInput = document.getElementById('password-input')
  headerNavigationUl = document.getElementById('header-navigation-ul')
}

const login = () => {
  if (!emailInput.value || !emailInput.value.includes('@')) return iqwerty.toast.toast('É necessário digitar um email válido!', toastErrorOptions)
  if (!passwordInput.value) return iqwerty.toast.toast('É necessário digitar uma senha válida!', toastErrorOptions)

  firebase
    .auth()
    .signInWithEmailAndPassword(emailInput.value, passwordInput.value)
    .then(_ => {
      iqwerty.toast.toast('Login realizado!', toastSuccessOptions)
      window.location.href = '/index.html'
    })
    .catch(error => {
      iqwerty.toast.toast(error.message, toastErrorOptions)
    })
    .finally(clearFields)
}

const clearFields = () => {
  emailInput.value = ''
  passwordInput.value = ''
}
