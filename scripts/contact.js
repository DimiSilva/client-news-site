let emailInput = document.createElement('input')
let nameInput = document.createElement('input')
let commentInput = document.createElement('textarea')

const onLoad = () => {
  loadElements()
}

const loadElements = () => {
  emailInput = document.getElementById('email-input')
  nameInput = document.getElementById('name-input')
  commentInput = document.getElementById('comment-input')
}

const sendComment = () => {
  if (!emailInput.value || !emailInput.value.includes('@')) return iqwerty.toast.toast('É necessário digitar um email válido!', toastErrorOptions)
  if (!nameInput.value) return iqwerty.toast.toast('É necessário digitar um nome válido!', toastErrorOptions)
  if (!commentInput.value) return iqwerty.toast.toast('É necessário digitar um comentário válido!', toastErrorOptions)

  iqwerty.toast.toast('Comentário enviado com sucesso!', toastSuccessOptions)

  clearFields()
}

const clearFields = () => {
  emailInput.value = ''
  nameInput.value = ''
  commentInput.value = ''
}
