import {createArticlePage} from './article-ui.js'


async function setArticlePage() {
  let response = await fetch('https://gorest.co.in/public/v1/posts')
  let data = await response.json();
  console.log(data)
  if (data) {
    let dataList = data.data;
    let articleLinks = document.querySelectorAll('.list-group-item');

    articleLinks.forEach((el) => {
      let elId = el.getAttribute('data-id')
      console.log(elId)
      if (elId === dataList.id) {
        el.addEventListener('click', () => createArticlePage(article.title, article.body))
      }
      
    })
  }
}

setArticlePage()