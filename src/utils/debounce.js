export function debounce(callback, delay) {
  let timeout;

  return (args) => {
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => {
      timeout = null;
      callback(args);
    }, delay);
  };
}
