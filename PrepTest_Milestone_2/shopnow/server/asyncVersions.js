// asyncVersions.js

// Original callback style (simulated fetch)
function fetchDataCallback(url, callback) {
  setTimeout(() => {
    // simulate success
    callback(null, { url, data: [1,2,3] });
  }, 300);
}

// Promise version
function fetchDataPromise(url) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ url, data: [1,2,3] });
    }, 300);
  });
}

// Async/Await version (wraps the promise version)
async function fetchDataAsync(url) {
  const result = await fetchDataPromise(url);
  return result;
}

// Exports for use
module.exports = { fetchDataCallback, fetchDataPromise, fetchDataAsync };

// Example usage (node)
if (require.main === module) {
  console.log('Callback version:');
  fetchDataCallback('/test', (err, result) => {
    if (err) console.error(err);
    else console.log('callback result:', result);
  });

  fetchDataPromise('/test').then(r => console.log('promise result:', r));
  (async () => {
    const r = await fetchDataAsync('/test');
    console.log('async/await result:', r);
  })();
}
