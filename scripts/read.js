let externalContainer = document.createElement('div')
let searchInputElement = document.createElement('input')
let headerNavigationUl = document.createElement('ul')

let searchTimeout

const onLoad = () => {
  loadElements()
  loadNews()
  loadLinkedToUserFeatures(headerNavigationUl)
}

const loadElements = () => {
  externalContainer = document.getElementById('external-container')
  headerNavigationUl = document.getElementById('header-navigation-ul')
}

const loadNews = () => {
  externalContainer.innerHTML = ''
  const newsId = Object.fromEntries(new URLSearchParams(window.location.search).entries()).newsId
  db.collection('news')
    .doc(newsId)
    .get()
    .then(news => {
      externalContainer.appendChild(createReadNewsElement(news.data()))
    })
}

const createReadNewsElement = ({ id = '', title = '', category = '', text = '', author = '', image = '' }) => {
  const newsElement = document.createElement('div')
  newsElement.classList = 'news-container'

  const imgElement = document.createElement('img')
  imgElement.src = image
  imgElement.alt = title
  newsElement.appendChild(imgElement)

  const newsDataContainer = document.createElement('div')
  newsDataContainer.classList = 'news-data-container'

  const newsGeneralInformationsContainer = document.createElement('div')
  newsGeneralInformationsContainer.classList = 'news-general-informations-container'

  const titleContainer = document.createElement('div')
  titleContainer.classList = 'title-container'
  const titleElement = document.createElement('h1')
  titleElement.innerHTML = title
  titleContainer.appendChild(titleElement)
  newsGeneralInformationsContainer.appendChild(titleContainer)

  const authorContainer = document.createElement('div')
  authorContainer.classList = 'author-container'
  const authorElement = document.createElement('p')
  authorElement.innerHTML = author
  authorContainer.appendChild(authorElement)
  newsGeneralInformationsContainer.appendChild(authorContainer)

  const categoryContainer = document.createElement('div')
  categoryContainer.classList = 'category-container'
  const categoryElement = document.createElement('p')
  categoryElement.innerHTML = categoriesTranslationsEnum[category]
  categoryContainer.appendChild(categoryElement)
  newsGeneralInformationsContainer.appendChild(categoryContainer)

  newsDataContainer.appendChild(newsGeneralInformationsContainer)
  newsElement.appendChild(newsDataContainer)

  const textContainer = document.createElement('div')
  textContainer.classList = 'text-container'
  const textElement = document.createElement('p')
  textElement.innerHTML = text
  textContainer.appendChild(textElement)
  newsElement.appendChild(textContainer)

  return newsElement
}
