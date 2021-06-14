let newsBlock1Element = document.createElement('div')
let newsBlock2Element = document.createElement('div')
let searchInputElement = document.createElement('input')

let searchTimeout

const onLoad = () => {
    loadElements()
    loadNews()
}

const loadElements = () => {
    newsBlock1Element = document.getElementById('news-block-1')
    newsBlock2Element = document.getElementById('news-block-2')
    searchInputElement = document.getElementById('search-input')
}

const loadNews = () => {
    newsBlock1Element.innerHTML = ''
    newsBlock2Element.innerHTML = ''
    db.collection("news")
        .orderBy('title')
        .startAt((searchInputElement.value || ""))
        .endAt((searchInputElement.value || "") + '\uf8ff')
        .get().then((newsList) => {
            const treatedNewsList = newsList.docs.map((news) => ({ id: news.id, ...news.data() }));
            treatedNewsList.forEach((news, index) => {
                if (index <= 2)
                    newsBlock1Element.appendChild(createNewsElement(news))
                else
                    newsBlock2Element.appendChild(createNewsElement(news))
            })
        })

}

const searchNews = () => {
    if (!!searchTimeout)
        clearTimeout(searchTimeout)

    searchTimeout = setTimeout(() => {
        loadNews()
    }, 1000)
}