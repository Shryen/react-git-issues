import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Comments from "./Comments";
import ReactMarkDown from "react-markdown";

export default function Details() {
  const params = useParams();
  const { formatDistance } = require("date-fns");

  const {
    isLoading,
    isSuccess,
    isError,
    error,
    data: issue,
  } = useQuery({ queryKey: ["issue", params.id], queryFn: fetchIssue });

  function fetchIssue() {
    return fetch(
      `https://api.github.com/repos/facebook/react/issues/${params.id}`
    ).then((res) => res.json());
  }

  return (
    <div className="comments-container">
      {isLoading && <p className="loader"></p>}
      {isError && <p>{error.message}</p>}
      {isSuccess && (
        <div>
          <h2>
            {issue.title} <span>#{issue.id}</span>
          </h2>
          <div className="issue-details">
            <a href={issue.user.html_url}>{issue.user.login}</a> opened this
            issue {formatDistance(new Date(), new Date(issue.created_at))} ago
          </div>
          <div className="comment-container">
            <a href={issue.user.avatar_url}>
              <img
                src={issue.user.avatar_url}
                alt="avatar"
                className="avatar"
              />
            </a>
            <div className="comment">
              <div className="comment-heading">
                <a href={issue.user.html_url}>mdaj06</a> commented 4 days ago
              </div>
              <div className="comment-body">
                <ReactMarkDown children={issue.body} />
              </div>
            </div>
          </div>
          <div className="border"></div>
          <Comments issueNumber={issue.number} />
        </div>
      )}
    </div>
  );
}
