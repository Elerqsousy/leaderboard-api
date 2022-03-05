const getFromAPI = async (url, container, animation) => {
  container.innerHTML = animation;
  const fetching = await fetch(url);
  const response = await fetching.json();
  const { result } = response;
  return result;
};

export default getFromAPI;
