import Reddit from '../Reddit';
import Joke from '../Joke';
import { useState } from 'react';

function API() {
  const [redditVisible, setRedditVisible] = useState(false);
  const [jokeVisible, setJokeVisible] = useState(false);

  return (
    <div>
      <div className="buttons">
        <button
          onClick={() => setRedditVisible(prevRedditVisible => !redditVisible)}
        >
          Toggle Reddit
        </button>
        <button onClick={() => setJokeVisible(prevJokeVisible => !jokeVisible)}>
          Toggle Joke
        </button>
      </div>
      {redditVisible && <Reddit />}
      {jokeVisible && <Joke />}
    </div>
  );
}

export default API;