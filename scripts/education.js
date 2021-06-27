let newsBlock1Element = document.createElement('div')
let newsBlock2Element = document.createElement('div')
let searchInputElement = document.createElement('input')
let headerNavigationUl = document.createElement('ul')

let searchTimeout

const onLoad = () => {
  loadElements()
  loadNews()
  loadLinkedToUserFeatures(headerNavigationUl)
}

const loadElements = () => {
  newsBlock1Element = document.getElementById('news-block-1')
  newsBlock2Element = document.getElementById('news-block-2')
  searchInputElement = document.getElementById('search-input')
  headerNavigationUl = document.getElementById('header-navigation-ul')
}

const loadNews = () => {
  newsBlock1Element.innerHTML = ''
  newsBlock2Element.innerHTML = ''
  db.collection('news')
    .where('category', '==', categoriesEnum.EDUCATION)
    .orderBy('title')
    .startAt(searchInputElement.value || '')
    .endAt((searchInputElement.value || '') + '\uf8ff')
    .limit(6)
    .get()
    .then(newsList => {
      const treatedNewsList = newsList.docs.map(news => ({ id: news.id, ...news.data() }))
      treatedNewsList.forEach((news, index) => {
        if (index <= 2) newsBlock1Element.appendChild(createNewsComponent(news))
        else newsBlock2Element.appendChild(createNewsComponent(news))
      })
    })
}

const searchNews = () => {
  if (!!searchTimeout) clearTimeout(searchTimeout)

  searchTimeout = setTimeout(() => {
    loadNews()
  }, 1000)
}
