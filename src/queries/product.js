export const get = async (id) => {
  return fetch(`${process.env.API_URL}media/${id}`)
    .then((response) => response.json())
    .then((data) => data)
    .catch((error) => error);
};

export const queryKey = 'product';