const setTimeoutSync = (interval) => new Promise(resolve => {
    setTimeout(resolve, interval)
});

module.exports = setTimeoutSync;