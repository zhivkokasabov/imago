export const get = async (searchTerm) => {
  return fetch(`${process.env.API_URL}search?query="${searchTerm}"`)
    .then((response) => response.json())
    .then((data) => data)
    .catch((error) => error);
};

export const queryKey = 'search';