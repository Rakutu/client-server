'use strict'

import { createPageListTitle, createPageList, createListItem, createPagintaionBlock } from './ui-kit.js'
import { createArticlePage, createCommentsList, createComments } from './article-ui.js'

let mainUrl = 'https://gorest.co.in/public-api/posts'
let nowUrl = document.location.href;

window.addEventListener("DOMContentLoaded", () => {
  if (nowUrl.includes("pageLists.html")) {
    updateUrl(1);
    createPageListTitle();
    getListPage(mainUrl);
    createPagintaionBlock(1);
    getArticlePage(mainUrl);
    openNewPage();
  } else if (nowUrl.includes("article.html")) {
    const commentUrl = "https://gorest.co.in/public-api/comments?post_id=";
    const nowUrl = document.location.href;
    const newsIdUrl = nowUrl.split("=")[1];
    getArticle(mainUrl, newsIdUrl);
    getComments(commentUrl, newsIdUrl);
  }
});

async function getListPage(url) {
  let response = await fetch(url)
  let data = await response.json();
  if (data) {
    let dataList = data.data;
    let pageList = createPageList();

    dataList.forEach((article) => {
      pageList.append(createListItem(article.title, article.id));
    })
  }

}

const updateUrl = (pageNumber) => {
  let oldUrl = window.location.origin + window.location.pathname;
  let newUrl = oldUrl + `?page=${pageNumber}`;
  window.history.pushState(null, null, newUrl);
}

const openNewPage = () => {
  let pages = document.querySelectorAll('.page');
  let pageBtn = document.querySelectorAll('.page-btn');
  pages.forEach(page => {
    page.addEventListener('click', () => {

      let pageNumber = page.firstChild.textContent;
      let pageUrl = mainUrl + `/?page=${pageNumber}`;


      changePages(page);
      deletePosts();
      updateUrl(pageNumber);
      getListPage(pageUrl);
      getArticlePage(pageUrl);
    })
  })

  pageBtn.forEach(btn => {
    btn.addEventListener('click', () => {
      deletePosts();
      firstAndLastPageBtn(btn);
    })
  })
}
openNewPage();

const deletePosts = () => {
  let allItems = document.querySelectorAll('.list-page-item');
  allItems.forEach(item => item.remove())
}

const changePages = (item) => {
  let maxPage;
  let request = fetch (mainUrl);
  request
    .then(response => {
      return response.json();
    })
    .then(pagination => {
      maxPage = pagination.meta.pagination.pages;
      if (item.previousSibling.classList.contains('page') && !item.nextSibling.classList.contains('page')) {

        let firstPage = document.querySelector('#first-page');
        let lastPage = document.querySelector('#last-page');

        if (lastPage.firstChild.textContent == maxPage) return;
        if (item.previousSibling.firstChild.textContent == '0') {
          firstPage.style.display = 'none';
        } else {
          firstPage.style.display = 'block';

          firstPage.firstChild.textContent++;
          item.firstChild.textContent++;
          item.previousSibling.firstChild.textContent++;

          // if (item.firstChild.classList.contains('prev-link')) {
          //   item.firstChild.textContent = '\u00AB';
          // } else if (item.firstChild.classList.contains('next-link')) {
          //   item.firstChild.textContent = '\u00BB';
          // }
        }


      } else if (!item.previousSibling.classList.contains('page')) {
        if (item.firstChild.textContent == '1') return

        item.firstChild.textContent--;
        item.nextSibling.firstChild.textContent--;
        item.nextSibling.nextSibling.firstChild.textContent--;

        if (item.firstChild.classList.contains('prev-link')) {
          item.firstChild.textContent = '\u00AB';
        } else if (item.firstChild.classList.contains('next-link')) {
          item.firstChild.textContent = '\u00BB';
        }
      } return
    })
}

const reWritePages = (firstPageNumber, middlePageNumber, lastPageNumber) => {
  let firstPage = document.querySelector('#first-page');
  firstPage.style.display = 'block';
  let middlePage = document.querySelector('#middle-page');
  let lastPage = document.querySelector('#last-page');

  firstPage.firstChild.textContent = firstPageNumber;
  middlePage.firstChild.textContent = middlePageNumber;
  lastPage.firstChild.textContent = lastPageNumber;
}

const firstAndLastPageBtn = (item) => {
  let maxPage;
  let lastPage = document.querySelector('#last-page');
  let request = fetch (mainUrl);
  request
    .then(response => {
      return response.json();
    })
    .then(pagination => {
      maxPage = pagination.meta.pagination.pages;
      if (item.classList.contains('prev-btn')) {
        getListPage(mainUrl);
        updateUrl(1);
        reWritePages(1, 2, 3)
        getArticlePage(mainUrl);
        lastPage.style.display = 'block';
      } else {
        let lastUrl = mainUrl + `/?page=${maxPage}`;
        getListPage(lastUrl);
        updateUrl(maxPage);
        reWritePages((maxPage - 1), maxPage);
        getArticlePage(lastUrl);
        lastPage.style.display = 'none';
      }
    })
}

async function getArticlePage(url) {
  let response = await fetch(url)
  let data = await response.json();
  if (data) {
    let articleLinks = document.querySelectorAll('.list-group-item');

    articleLinks.forEach((el) => {
      let thisId = el.getAttribute('data-id');
      el.addEventListener('click', () => {
        document.location.href =  `./article.html?articleId=${thisId}`
      })
  })
  }
}

async function getArticle(url, id) {
  let nowUrl = document.referrer;
  if (nowUrl.includes('?page=')){
    let newsPage = nowUrl.split("=")[1];
    url = url + `/?page=${newsPage}`;
  }

  let response = await fetch(url)
  let data = await response.json();
  let dataList = data.data;
  dataList.forEach((item) => {
    if (item.id === +id) {
      createArticlePage(item.title, item.body);
    }
  })
}

async function getComments (url, id) {
  let response = await fetch(url)
  let data = await response.json();
  let dataList = data.data;
  let list = createCommentsList();
  dataList.forEach((item) => {
    if (item.post_id === +id) {
      list.append(createComments(item.name, item.email, item.body));
    }
  })
}

// const openNewPage = ( array, itemId ) => {
//     array.forEach(() => {
//       document.location.href = `./article.html?postid=${itemId}`;
//   })
// }

