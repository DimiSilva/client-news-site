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
  if (logedUser) {
    headerNavigationUl.appendChild(createNavLikedButtonComponent())
    if (logedUserData.type === userTypesEnum.ADMIN) {
      headerNavigationUl.appendChild(createNavCreateNewsButtonComponent())
    }
    headerNavigationUl.appendChild(createNavLogoutButtonComponent())
  } else {
    headerNavigationUl.appendChild(createNavLoginButtonComponent())
  }
}

const logout = () => {
  firebase
    .auth()
    .signOut()
    .then(res => {
      window.location.replace('/')
    })
}

const shuffleArray = array => {
  const newArray = [...array]
  let currentIndex = newArray.length,
    randomIndex

  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex--
    ;[newArray[currentIndex], newArray[randomIndex]] = [newArray[randomIndex], newArray[currentIndex]]
  }

  return newArray
}

const likeNewsDBCall = newsId =>
  new Promise((resolve, reject) =>
    db
      .collection('news-likes')
      .where('userId', '==', logedUser.uid)
      .where('newsId', '==', newsId)
      .get()
      .then(newsList => {
        const treatedNewsList = newsList.docs.map(news => ({ id: news.id, ...news.data() }))

        if (!treatedNewsList[0]) {
          db.collection('news-likes').add({
            userId: logedUser.uid,
            newsId: newsId
          })
          return resolve()
        } else return reject()
      })
  )

const unlikeNewsDBCall = likedId =>
  new Promise(resolve =>
    db
      .collection('news-likes')
      .doc(likedId)
      .delete()
      .then(() => resolve())
  )

const getLikedNews = () =>
  db
    .collection('news-likes')
    .where('userId', '==', logedUser.uid)
    .get()
    .then(newsList => {
      const treatedNewsList = newsList.docs.map(news => ({ id: news.id, ...news.data() }))
      return treatedNewsList
    })

firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
