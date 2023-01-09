function Fibonacci(n) {
    var f = [];
    for (var c = 0; c < n; ++c) {
        f.push((c < 2) ? c : f[c-1] + f[c-2]);
    }
    return f;
}

console.log(Fibonacci(10))
