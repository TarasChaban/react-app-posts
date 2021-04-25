import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { NewCommentForm } from '../NewCommentForm/NewCommentForm';
import {
  getPostComments,
  deletePostComment,
  addPostComment,
  putPostComment,
} from '../../api/comments';
import './PostDetails.scss';

export const PostDetails = ({ userId, post }) => {
  const [comments, setComments] = useState([]);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    getPostComments(userId)
      .then((comment) => {
        setComments(comment);
      });
  }, [userId]);

  const loadComments = useCallback((newName, newEmail, newBody) => {
    addPostComment({
      userId,
      newName,
      newEmail,
      newBody,
    })
      .then(() => getPostComments(userId))
      .then(setComments);
  }, [userId]);

  const deleteComment = (postId) => {
    deletePostComment(postId)
      .then(() => getPostComments(userId))
      .then(setComments);
  };

  const putComment = (postId) => {
    putPostComment(postId)
      .then(() => getPostComments(userId))
      .then(setComments);
  };

  if (!post) {
    return 'Loading...';
  }

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>

      <section className="PostDetails__post">
        <p>
          <strong>
            Title:
            {' '}
          </strong>
          {post.title}
        </p>
      </section>
      <section className="PostDetails__post">

        <p>
          <strong>
            Body:
            {' '}
          </strong>
          {post.body}
        </p>
      </section>

      <section className="PostDetails__comments">
        <button
          type="button"
          className="button PostDetails__button"
          onClick={() => {
            setVisible(!visible);
          }}
        >
          {`Hide ${comments.length} comments`}
        </button>
        {visible && (
        <ul className="PostDetails__list">
          {comments && comments.map(comment => (
            <li key={comment.id} className="PostDetails__list-item">
              <button
                onClick={() => {
                  deleteComment(comment.id);
                }}
                type="button"
                className="PostDetails__remove-button button"
              >
                Delete
              </button>
              <button
                onClick={() => {
                  putComment(comment.id);
                }}
                type="button"
                className="PostDetails__remove-button button"
              >
                Edit
              </button>
              <p>{comment.body}</p>
            </li>
          ))}
        </ul>
        )}
      </section>
      <section>
        <div className="PostDetails__form-wrapper">
          <NewCommentForm
            loadComments={loadComments}
          />
        </div>
      </section>
    </div>
  );
};

PostDetails.propTypes = {
  userId: PropTypes.number.isRequired,
  post: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ])).isRequired,
};
