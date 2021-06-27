let newsBlock1Element = document.createElement('div')
let newsBlock2Element = document.createElement('div')
let searchInputElement = document.createElement('input')
let headerNavigationUl = document.createElement('ul')

let searchTimeout

let likedNews = []
let newsToRender = []

const onLoad = () => {
  loadElements()
  const loadingInterval = setInterval(async () => {
    if (loadingUser) return

    clearInterval(loadingInterval)

    if (!!logedUser) likedNews = await getLikedNews()
    loadNews()
    loadLinkedToUserFeatures(headerNavigationUl)
  }, 1000)
}

const loadElements = () => {
  newsBlock1Element = document.getElementById('news-block-1')
  newsBlock2Element = document.getElementById('news-block-2')
  searchInputElement = document.getElementById('search-input')
  headerNavigationUl = document.getElementById('header-navigation-ul')
}

const loadNews = () => {
  db.collection('news')
    .orderBy('title')
    .startAt(searchInputElement.value || '')
    .endAt((searchInputElement.value || '') + '\uf8ff')
    .get()
    .then(newsList => {
      const treatedNewsList = newsList.docs.map(news => ({ id: news.id, ...news.data() }))
      const likedNewsList = treatedNewsList.filter(news => likedNews.some(liked => liked.newsId === news.id))
      newsToRender = likedNewsList.slice(0, 6)

      renderNews()
    })
}

const renderNews = () => {
  newsBlock1Element.innerHTML = ''
  newsBlock2Element.innerHTML = ''

  newsToRender.forEach((news, index) => {
    const liked = likedNews.find(liked => liked.newsId === news.id)

    if (index <= 2) newsBlock1Element.appendChild(createNewsComponent(news, !!liked, () => (!!liked ? unlikeNews(liked.id) : likeNews(news.id))))
    else newsBlock2Element.appendChild(createNewsComponent(news, !!liked, () => likeNews(news.id)))
  })
}

const likeNews = async newsId => {
  await likeNewsDBCall(newsId)
  likedNews = await getLikedNews()
  renderNews()
}

const unlikeNews = async likedId => {
  await unlikeNewsDBCall(likedId)
  likedNews = await getLikedNews()
  renderNews()
}

const searchNews = () => {
  if (!!searchTimeout) clearTimeout(searchTimeout)

  searchTimeout = setTimeout(() => {
    loadNews()
  }, 1000)
}
