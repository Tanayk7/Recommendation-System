const assert = require('assert');

function mean(arr) {
    let n = arr.length;
    let sum = arr.reduce((acc, val) => acc + val);
    let mean = sum / n;

    return mean.toFixed(2);
}

function mode(arr) {
    let counts = {};
    let mode = arr[0];
    let mode_key = arr[0]

    for (let i of arr) {
        if (counts[i]) {
            counts[i]++;
        }
        else {
            counts[i] = 1;
        }
    }

    for (let key of Object.keys(counts)) {
        if (counts[key] > mode) {
            mode = counts[key];
            mode_key = key;
        }
    }

    return mode_key;
}

function euclideanDistance(vec1, vec2) {
    assert(Array.isArray(vec1) && Array.isArray(vec2));
    assert(vec1.length === vec2.length);

    let n = vec1.length;
    let sum = 0;

    for (let i = 0; i < n; i++) {
        let diff = vec1[i] - vec2[i];
        sum += diff * diff;
    }

    return Math.sqrt(sum).toFixed(2);
}

module.exports = { mean, mode, euclideanDistance };