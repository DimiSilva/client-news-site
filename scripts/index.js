let newsBlock1Element = document.createElement('div')
let newsBlock2Element = document.createElement('div')
let searchInputElement = document.createElement('input')
let headerNavigationUl = document.createElement('ul')

let searchTimeout

const onLoad = () => {
  loadElements()
  loadNews()
  loadLinkedToUserFeatures()
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
    .orderBy('title')
    .startAt(searchInputElement.value || '')
    .endAt((searchInputElement.value || '') + '\uf8ff')
    .limit(6)
    .get()
    .then(newsList => {
      const treatedNewsList = newsList.docs.map(news => ({ id: news.id, ...news.data() }))

      treatedNewsList.forEach((news, index) => {
        if (index <= 2) newsBlock1Element.appendChild(createNewsElement(news))
        else newsBlock2Element.appendChild(createNewsElement(news))
      })
    })
}

const searchNews = () => {
  if (!!searchTimeout) clearTimeout(searchTimeout)

  searchTimeout = setTimeout(() => {
    loadNews()
  }, 1000)
}

const loadLinkedToUserFeatures = () => {
  const loadingInterval = setInterval(() => {
    if (loadingUser) return

    clearInterval(loadingInterval)

    const liElement = document.createElement('li')

    const aElement = document.createElement('a')
    aElement.title = 'Login'
    if (logedUser) {
      aElement.onclick = logout
      aElement.title = 'Logout'
    } else {
      aElement.href = './pages/login.html'
      aElement.title = 'Login'
    }

    const imgElement = document.createElement('img')
    imgElement.src = logedUser ? './assets/icons/logout.svg' : './assets/icons/login.svg'

    aElement.appendChild(imgElement)

    liElement.appendChild(aElement)

    headerNavigationUl.appendChild(liElement)
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
