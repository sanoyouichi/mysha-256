const { H, K } = require('./constraits');
const { small_sigma0, small_sigma1, large_sigma0, large_sigma1, ch, maj } = require('./logical_operations');
const  { padding } = require('./padding');

const main = (msg) => {
    let msg_bin = padding(msg);
    const msg_sche = []
    let hash = initHash();
    let N = msg_bin.length
    for (let i = 1; i <= N; i++) {
        for (let t = 0; t < 64; t++) {
            if (t < 16) {
                msg_sche[t] = msg_bin[i-1][t];
            } else {
                msg_sche[t] = ((small_sigma1(msg_sche[t - 2]) + msg_sche[t - 7] + small_sigma0(msg_sche[t - 15]) + msg_sche[t - 16])) | 0;
            }
        }

        let a = hash[0];
        let b = hash[1];
        let c = hash[2];
        let d = hash[3];
        let e = hash[4];
        let f = hash[5];
        let g = hash[6];
        let h = hash[7];

        for (let t = 0; t < 64; t++) {
            let T1 = (h + large_sigma1(e) + ch(e, f, g) + K[t] + msg_sche[t]) | 0;
            let T2 = (large_sigma0(a) + maj(a, b, c)) | 0;
            h = g;
            g = f;
            f = e;
            e = (d + T1) | 0;
            d = c;
            c = b;
            b = a;
            a = (T1 + T2) | 0;
        }

        hash[0] = (a + hash[0]) | 0;
        hash[1] = (b + hash[1]) | 0;
        hash[2] = (c + hash[2]) | 0;
        hash[3] = (d + hash[3]) | 0;
        hash[4] = (e + hash[4]) | 0;
        hash[5] = (f + hash[5]) | 0;
        hash[6] = (g + hash[6]) | 0;
        hash[7] = (h + hash[7]) | 0;
    }

    return hash
}

const initHash = () => {
    let hash = [];
    for (let i = 0; i < H.length; i++) {
        hash[i] = H[i] | 0;
    }

    return hash;
}

let hash = main('abc');
console.log(hash)
