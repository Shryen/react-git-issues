import React from "react";
import { useQuery } from "@tanstack/react-query";
import ReactMarkDown from "react-markdown";

export default function Comments({ issueNumber }) {
  const { formatDistance } = require("date-fns");
  const {
    isLoading,
    isSuccess,
    isError,
    error,
    data: comments,
  } = useQuery({ queryKey: ["comments", issueNumber], queryFn: fetchComments });

  function fetchComments() {
    return fetch(
      `https://api.github.com/repos/facebook/react/issues/${issueNumber}/comments`
    ).then((res) => res.json());
  }

  return (
    <div>
      {isLoading && <p className="loader"></p>}
      {isError && <p>{error.message}</p>}
      {isSuccess && (
        <div>
          {comments.map((comment) => (
            <div key={comment.id} className="comment-container">
              <a href={comment.user.avatar_url}>
                <img
                  src={comment.user.avatar_url}
                  alt="avatar"
                  className="avatar"
                />
              </a>
              <div className="comment">
                <div className="comment-heading">
                  <a href={comment.user.html_url}>{comment.user.login}</a>{" "}
                  commented{" "}
                  {formatDistance(new Date(), new Date(comment.created_at))} ago
                </div>
                <div className="comment-body">
                  <ReactMarkDown children={comment.body} />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
