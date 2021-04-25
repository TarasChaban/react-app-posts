import { request, BASE_URL } from './api';

export const getPostComments = postId => request(`/comments?postId=${postId}`);

const post = (url, data) => fetch(`${BASE_URL}${url}`, {
  method: 'POST',
  body: JSON.stringify(data),
})
  .then(response => response.json())
  .then(result => result.data);

export const addPostComment = ({
  userId,
  newName,
  newEmail,
  newBody,
}) => post('/comments', {
  postId: userId,
  name: newName,
  email: newEmail,
  body: newBody,
});

export const deletePostComment = postId => fetch(
  `${BASE_URL}/comments/${postId}`, {
    method: 'DELETE',
  },
)
  .then(response => response.json())
  .then(result => result);

export const putPostComment = postId => fetch(
  `${BASE_URL}/comments/${postId}`, {
    method: 'PUT',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify(),
  },
)
  .then(response => response.json())
  .then(result => result);
