const createNewsComponent = ({ id = '', title = '', category = '', author = '', image = '' }, liked, onClickLike) => {
  const newsElement = document.createElement('div')
  newsElement.classList = 'news-card-container'

  const imgElement = document.createElement('img')
  imgElement.classList = 'background'
  imgElement.src = image || '../assets/images/newspaper.jpg'
  imgElement.alt = title
  newsElement.appendChild(imgElement)

  const newsCardInformationsContainerElement = document.createElement('div')
  newsCardInformationsContainerElement.classList = 'news-card-informations-container'

  const newsCardTitleContainer = document.createElement('div')
  newsCardTitleContainer.classList = 'news-card-title-container'
  const titleElement = document.createElement('h1')
  titleElement.innerHTML = title
  newsCardTitleContainer.appendChild(titleElement)
  newsCardInformationsContainerElement.appendChild(newsCardTitleContainer)

  const newsCardAuthorContainer = document.createElement('div')
  newsCardAuthorContainer.classList = 'news-card-author-container'
  const authorElement = document.createElement('p')
  authorElement.innerHTML = author
  newsCardAuthorContainer.appendChild(authorElement)
  newsCardInformationsContainerElement.appendChild(newsCardAuthorContainer)

  const newsCardCategoryContainer = document.createElement('div')
  newsCardCategoryContainer.classList = 'news-card-category-container'
  const categoryElement = document.createElement('p')
  categoryElement.innerHTML = categoriesTranslationsEnum[category]
  newsCardCategoryContainer.appendChild(categoryElement)
  newsCardInformationsContainerElement.appendChild(newsCardCategoryContainer)

  const newsCardReadMoreContainer = document.createElement('div')
  newsCardReadMoreContainer.classList = 'news-card-read-more-container'
  const readMoreAnchorElement = document.createElement('a')
  readMoreAnchorElement.href = `/pages/read.html?newsId=${id}`
  const readMoreTextElement = document.createElement('p')
  readMoreTextElement.innerHTML = 'Leia Mais'
  readMoreAnchorElement.appendChild(readMoreTextElement)
  newsCardReadMoreContainer.appendChild(readMoreAnchorElement)
  if (!!logedUser) {
    const likeButtonElement = document.createElement('button')
    likeButtonElement.onclick = onClickLike
    likeButtonElement.title = 'Curtir'
    const likeButtonImgElement = document.createElement('img')
    likeButtonImgElement.src = liked ? '../assets/icons/like-full.svg' : '../assets/icons/like-empty.svg'
    likeButtonElement.appendChild(likeButtonImgElement)
    newsCardReadMoreContainer.appendChild(likeButtonElement)
  }
  newsCardInformationsContainerElement.appendChild(newsCardReadMoreContainer)

  newsElement.appendChild(newsCardInformationsContainerElement)

  return newsElement
}

const createNavButtonComponent = (href, onclick, title, iconPath) => {
  const liElement = document.createElement('li')
  if (window.location.pathname === '/pages/login.html') liElement.classList = 'current'

  const aElement = document.createElement('a')
  aElement.onclick = onclick
  aElement.href = href
  aElement.title = title

  const imgElement = document.createElement('img')
  imgElement.src = iconPath

  aElement.appendChild(imgElement)

  liElement.appendChild(aElement)

  return liElement
}

const createNavLoginButtonComponent = () => {
  const liElement = createNavButtonComponent('../pages/login.html', undefined, 'Login', '../assets/icons/login.svg')
  if (window.location.pathname === '/pages/login.html') liElement.classList = 'current'
  return liElement
}

const createNavLogoutButtonComponent = () => createNavButtonComponent(undefined, logout, 'Logout', '../assets/icons/logout.svg')

const createNavCreateNewsButtonComponent = () => {
  const liElement = createNavButtonComponent('../pages/create-news.html', undefined, 'Criar Notícia', '../assets/icons/create-news.svg')
  if (window.location.pathname === '/pages/create-news.html') liElement.classList = 'current'
  return liElement
}

const createNavLikedButtonComponent = () => {
  const liElement = createNavButtonComponent('../pages/liked-news.html', undefined, 'Notícias Curtidas', '../assets/icons/liked.svg')
  if (window.location.pathname === '/pages/liked-news.html') liElement.classList = 'current'
  return liElement
}
