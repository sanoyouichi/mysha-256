// 512 bit毎に分ける
// 区切りに１を入れる
// 文末の64bit分は文字数のために開けておく
module.exports.padding = (msg) => {
    let msg_bin = msg2bin(msg)
    let n = Math.floor(msg_bin.length / 512);
    let k = 512 * n + 448 - (msg_bin.length + 1);
    msg_bin = msg_bin + '1';
    for (let i = 1; i <= k; i++) {
        msg_bin = msg_bin + '0';
    }
    let length_bin = num2bin(msg_bin.length)

    for (let i = 1; i <= ( 64 - length_bin.length); i++) {
        msg_bin = msg_bin + '0';
    }

    let result = msg_bin + length_bin;
    let result_each_512 = [];
    for (let i = 1; i <= (result.length / 512); i++) {
        let tmp_arr = result.slice(512 * (i-1), 512 *i );
        result_each_512.push(tmp_arr);
        let tmp_arr2 = [];
        for (let t = 1; t <= (result_each_512[i-1].length / 32); t++) {
            tmp_arr2.push(result_each_512[i-1].slice(32 * (t-1), 32 * t ) | 0);
        }
        result_each_512[i-1] = tmp_arr2
    }

    return result_each_512
}


const msg2bin = (msg) => {
    let res = '';
    res = msg.split('').map( (char) => {
        return char.charCodeAt(0).toString(2);
    }).join('');
    return res;
 };

const num2bin = (length) => {
    return (length >>> 0).toString(2);
}