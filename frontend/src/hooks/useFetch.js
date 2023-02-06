import { useState, useEffect } from 'react';

function useFetch(url) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [errorMsg, setErrorMsg] = useState(null);
  
    useEffect(() => {
      fetch(url)
        .then(response => response.json())
        .then(results => {
          setLoading(false); 
          setData(results);
        }).catch(error => {
          setLoading(false);
          setErrorMsg('Error occured when fetching data');
      })
    }, [url]);

    return { data, loading, errorMsg };
}
export default useFetch;