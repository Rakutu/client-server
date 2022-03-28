'use strict'
let container = document.querySelector('#list-page');

const createPageListTitle = () => {
  let title = document.createElement('h1');

  title.classList.add('h1', 'text-primary', 'list__title');
  title.textContent = "Список статей";

  container.append(title);

  return title
}

const createPageList = () => {
  let list = document.createElement('ul');
  list.classList.add('list-group');
  container.append(list);

  return list
}

const createListItem = (title, id) => {
  let item = document.createElement('li');
  let articleTItle = document.createElement('h2')
  let link = document.createElement('a');

  item.classList.add('list-group-item', 'list-page-item');
  item.setAttribute('data-id', `${id}`);
  link.classList.add('text-primary', 'h5');
  link.textContent = title;

  articleTItle.append(link);
  item.append(articleTItle);

  return item
}

const createPagintaionBlock = (number) => {
  let navBlock = document.createElement('nav');
  let navList = document.createElement('ul');
  let arrowBack = document.createElement('li');
  let prevPage = document.createElement('li');
  let currentPage = document.createElement('li');
  let nextPage = document.createElement('li');
  let arrowNext = document.createElement('li');
  let arrowBackLink = document.createElement('a');
  let prevLink = document.createElement('a');
  let currentLink = document.createElement('a');
  let nextLink = document.createElement('a');
  let arrowNextLink = document.createElement('a');

  navBlock.setAttribute('aria-label', 'page-navigation');
  navList.classList.add('pagination');
  arrowBack.classList.add('page-item', 'page-btn', 'prev-btn');
  prevPage.classList.add('page-item', 'page');
  prevPage.setAttribute('id', 'first-page');
  currentPage.classList.add('page-item', 'page');
  currentPage.setAttribute('id', 'middle-page');
  nextPage.classList.add('page-item', 'page');
  nextPage.setAttribute('id', 'last-page');
  arrowNext.classList.add('page-item', 'page-btn', 'next-btn');
  arrowBackLink.classList.add('page-link', 'prev-link');
  prevLink.classList.add('page-link');
  currentLink.classList.add('page-link');
  nextLink.classList.add('page-link');
  arrowNextLink.classList.add('page-link', 'next-link');


  if (number <= 1) {
    prevPage.style.display = 'none';
  }

  arrowBack .append(arrowBackLink)
  prevPage.append(prevLink);
  currentPage.append(currentLink);
  nextPage.append(nextLink);
  arrowNext.append(arrowNextLink);
  navList.append(arrowBack);
  navList.append(prevPage);
  navList.append(currentPage);
  navList.append(nextPage);
  navList.append(arrowNext);
  navBlock.append(navList);
  container.append(navBlock);

  arrowBack.firstChild.setAttribute('aria-label', 'Previous');
  arrowBack.firstChild.textContent = '\u00AB';
  arrowNext.firstChild.setAttribute('aria-label', 'Next');
  arrowNext.firstChild.textContent = '\u00BB';
  prevPage.firstChild.textContent = +number - 1;
  currentPage.firstChild.textContent = +number;
  nextPage.firstChild.textContent = +number + 1;

  return navBlock;
}
export { createPageListTitle, createPageList, createListItem, createPagintaionBlock }