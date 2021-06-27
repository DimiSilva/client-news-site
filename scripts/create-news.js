let titleInput = document.createElement('input')
let authorInput = document.createElement('input')
let categoryInput = document.createElement('input')
let imageUrlInput = document.createElement('input')
let textInput = document.createElement('textarea')
let headerNavigationUl = document.createElement('ul')

const onLoad = () => {
  loadElements()
  const loadingInterval = setInterval(() => {
    if (loadingUser) return

    clearInterval(loadingInterval)

    loadLinkedToUserFeatures(headerNavigationUl)
  }, 1000)
}

const loadElements = () => {
  titleInput = document.getElementById('title-input')
  authorInput = document.getElementById('author-input')
  categoryInput = document.getElementById('category-input')
  imageUrlInput = document.getElementById('image-url-input')
  textInput = document.getElementById('text-input')
  headerNavigationUl = document.getElementById('header-navigation-ul')
}

const createNews = () => {
  if (!titleInput.value || titleInput.value.length > 50)
    return iqwerty.toast.toast('É necessário digitar um título com no máximo 50 caracteres!', toastErrorOptions)
  if (!authorInput.value || authorInput.value.length > 100)
    return iqwerty.toast.toast('É necessário digitar um autor com no máximo 100 caracteres!', toastErrorOptions)
  if (!categoryInput.value) return iqwerty.toast.toast('É necessário selecionar uma categoria!', toastErrorOptions)
  if (!textInput.value || authorInput.value.length > 1000)
    return iqwerty.toast.toast('É necessário digitar um texto com no máximo 1000 caracteres!', toastErrorOptions)

  db.collection('news')
    .add({
      title: titleInput.value,
      author: authorInput.value,
      category: categoryInput.value,
      image: imageUrlInput.value,
      text: textInput.value
    })
    .then(_ => {
      iqwerty.toast.toast('Notícia criada!', toastSuccessOptions)
    })
    .catch(error => {
      iqwerty.toast.toast(error.message, toastErrorOptions)
    })
    .finally(clearFields)
}

const clearFields = () => {
  titleInput.value = ''
  authorInput.value = ''
  categoryInput.value = ''
  imageUrlInput.value = ''
  textInput.value = ''
}
