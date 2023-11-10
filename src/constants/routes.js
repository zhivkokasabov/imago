export const routes = {
  home: '/',
  editorial: '/',
  sports: '/',
  creative: '/',
  archive: '/',
  account: '/',
  search: (searchTerm) => searchTerm ? `/search?${new URLSearchParams({ searchTerm })}` : '/search'
};
