const rotr = (x, n) => {
    return (x >>> n ) | (x << n)
}

const shr = (x, n) => {
    return x >>> n
}

module.exports.ch = (x, y, z) => {
    return (x & y) ^ (~x & z);
}

module.exports.maj = (x, y, z) => {
    return (x & y) ^ (x & z) ^ (y & z);
}

module.exports.large_sigma0 = (x) => {    
    return rotr(x, 2) ^ rotr(x, 13) ^ rotr(x, 22)
}

module.exports.large_sigma1 = (x) => {    
    return rotr(x, 6) ^ rotr(x, 11) ^ rotr(x, 25)
}

module.exports.small_sigma0 = (x) => {    
    return rotr(x, 7) ^ rotr(x, 18) ^ shr(x, 3)
}

module.exports.small_sigma1 = (x) => {    
    return rotr(x, 17) ^ rotr(x, 19) ^ shr(x, 10)
}

