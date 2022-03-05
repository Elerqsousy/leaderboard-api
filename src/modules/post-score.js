const postToAPI = async (name, score, url, container, animation) => {
  container.innerHTML = animation;
  const fetchData = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify({
      user: name,
      score,
    }),
  });
  const response = await fetchData.json();
  const message = response.result;
  setTimeout(() => { container.innerHTML = message; }, 1000);
  setTimeout(() => { container.innerHTML = ''; }, 4000);
};

export default postToAPI;
