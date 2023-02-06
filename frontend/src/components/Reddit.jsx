import React from 'react';
import { useQuery } from 'react-query';
//import useFetch from '../hooks/useFetch';

export default function Reddit() {
  const {
    data: posts,
    loading,
    isError,
    error,
    isSuccess,
  } = useQuery('posts', fetchPosts, {
    retry: false,
  });
  //useFetch('https://www.reddit.com/r/reactjs.json');

  function fetchPosts() {
    return fetch('https://www.reddit.com/r/reactjs.json').then(response =>
      response.json()
    );
  }

  return (
    <div>
      <h2>Reddit API</h2>
      {loading && <div>Loading...</div>}
      {isSuccess && (
        <ul>
          {posts.data.children.map(post => (
            <li key={post.data.id}>
              <a href={`https://reddit.com${post.data.permalink}`}>
                {post.data.title}
              </a>
            </li>
          ))}
        </ul>
      )}
      {isError && <div>{error.message}</div>}
    </div>
  );
}
