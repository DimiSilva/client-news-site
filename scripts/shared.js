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

const createNewsElement = ({ id = '', title = '', category = '', text = '', author = '', image = '' }) => {
    const newsElement = document.createElement('div')
    newsElement.classList = "news-card-container"

    const imgElement = document.createElement('img')
    imgElement.src = image
    imgElement.alt = title
    newsElement.appendChild(imgElement)

    const newsCardInformationsContainerElement = document.createElement('div')
    newsCardInformationsContainerElement.classList = "news-card-informations-container"

    const newsCardTitleContainer = document.createElement('div')
    newsCardTitleContainer.classList = "news-card-title-container"
    const titleElement = document.createElement('h1')
    titleElement.innerHTML = title
    newsCardTitleContainer.appendChild(titleElement)
    newsCardInformationsContainerElement.appendChild(newsCardTitleContainer)

    const newsCardAuthorContainer = document.createElement('div')
    newsCardAuthorContainer.classList = "news-card-author-container"
    const authorElement = document.createElement('p')
    authorElement.innerHTML = author
    newsCardAuthorContainer.appendChild(authorElement)
    newsCardInformationsContainerElement.appendChild(newsCardAuthorContainer)

    const newsCardCategoryContainer = document.createElement('div')
    newsCardCategoryContainer.classList = "news-card-category-container"
    const categoryElement = document.createElement('p')
    categoryElement.innerHTML = categoriesTranslationsEnum[category]
    newsCardCategoryContainer.appendChild(categoryElement)
    newsCardInformationsContainerElement.appendChild(newsCardCategoryContainer)

    const newsCardReadMoreContainer = document.createElement('div')
    newsCardReadMoreContainer.classList = "news-card-read-more-container"
    const readMoreAnchorElement = document.createElement('a')
    readMoreAnchorElement.href = `/pages/read.html?newsId=${id}`
    const readMoreTextElement = document.createElement('p')
    readMoreTextElement.innerHTML = 'Leia Mais'
    readMoreAnchorElement.appendChild(readMoreTextElement)
    newsCardReadMoreContainer.appendChild(readMoreAnchorElement)
    newsCardInformationsContainerElement.appendChild(newsCardReadMoreContainer)

    newsElement.appendChild(newsCardInformationsContainerElement)

    return newsElement
}

firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)