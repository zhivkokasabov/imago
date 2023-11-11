import { queryKeys } from './common';

export const routes = {
  home: '/',
  editorial: '/',
  sports: '/',
  creative: '/',
  archive: '/',
  account: '/',
  search: (searchTerm) => searchTerm ? `/search?${new URLSearchParams({ [queryKeys.searchTerm]: searchTerm })}` : '/search',
  product: (id) => `/products/${id}`
};
