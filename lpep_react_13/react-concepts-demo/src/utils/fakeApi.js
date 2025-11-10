// src/utils/fakeApi.js
export function fakeApi() {
  return new Promise((resolve) =>
    setTimeout(() => resolve("Data loaded successfully!"), 2000)
  );
}
