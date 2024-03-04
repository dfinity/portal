/**
 * Run tasks in parallel, but limit the number of tasks running at the same time.
 * @param {Array} tasks - Array of functions that return promises.
 * @param {Number} chunkSize - Number of tasks to run in parallel.
 * @returns {Array} - Array of results.
 */
module.exports = function chunkedParallel(tasks, chunkSize) {
  return new Promise((resolve, reject) => {
    const results = [];
    let index = 0;

    function runNext() {
      if (index >= tasks.length) {
        return resolve(results);
      }

      const chunk = tasks.slice(index, index + chunkSize);
      index += chunkSize;

      Promise.all(chunk.map((task) => task()))
        .then((chunkResults) => {
          results.push(...chunkResults);
          runNext();
        })
        .catch(reject);
    }

    runNext();
  });
};
