'use strict'
let articleContainer = document.querySelector('#article-page');
let commentContainer = document.querySelector('#comments')

const createArticlePage = (title, body) => {
  let articleTitle = document.createElement('h1');
  let article = document.createElement('article');
  let articleBody = document.createElement('p');

  articleTitle.classList.add('h1', 'text-primary');
  articleTitle.textContent = title;
  article.classList.add('text-justify', 'text-primary');
  articleBody.textContent = body;

  article.append(articleBody);
  articleContainer.append(articleTitle);
  articleContainer.append(article);

  return {
    articleTitle,
    article,
  }
}

const createCommentsList = () => {
  let commentsList = document.createElement('ul');
  commentsList.classList.add('list-group', 'list-comments');
  commentContainer.append(commentsList);

  return commentsList;
}

const createComments = (name, mail, text) => {
  let comment = document.createElement('li');
  let commentatorBlock = document.createElement('div');
  let commentator = document.createElement('span');
  let email = document.createElement('span');
  let commentText = document.createElement('p');

  comment.classList.add('list-group-item', 'comment-item');
  commentatorBlock.classList.add('commentator-block');
  commentator.classList.add('text-primary', 'semi-bold');
  commentator.textContent = name;
  email.classList.add('text-primary', 'italic')
  email.textContent = mail;
  commentText.classList.add('text-primary');
  commentText.textContent = text;

  commentatorBlock.append(commentator)
  commentatorBlock.append(email);
  comment.append(commentatorBlock);
  comment.append(commentText)

  return comment;
}

export { createArticlePage, createCommentsList, createComments }