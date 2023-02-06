import React, { useEffect, useState } from 'react';
import useFetch from '../hooks/useFetch';

export default function Joke() {
    const {
        data: joke,
        loading,
        errorMsg,
    } = useFetch('https://official-joke-api.appspot.com/jokes/random');

  return (
    <div>
      <h2>Joke API</h2>
      {loading && <div>Loading...</div>}
      {joke && (<div>{joke.setup + ' - ' + joke.punchline}</div>)}
      {errorMsg && <div>{errorMsg}</div>}
    </div>
  );
}
