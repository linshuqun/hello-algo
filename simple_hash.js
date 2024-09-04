/**
 * 每种哈希算法的最后一步都是对大质数 1000000007 取模
 * 以确保哈希值在合适的范围内
 * 使用大质数作为模数，可以最大化地保证哈希值的均匀分布。
 * 因为质数不与其他数字存在公约数，可以减少因取模操作而产生的周期性模式，从而避免哈希冲突。
 */


/**
 * 加法哈希
 * 对输入的每个字符的ASCII码进行相加，将得到的总和作为哈希值
 */
function addHash(key) {
    let hash = 0;
    const MODULES = 1000000007;
    for (const c of key) {
        hash = (hash + c.charCodeAt(0)) % MODULES;
    }
    return hash;
}

/**
 * 乘法哈希
 * 利用乘法的不相关性，每轮乘以一个常数
 * 将各个字符的ASCII码累积到哈希值中
 */
function mulHash(key) {
    let hash = 0;
    const MODULES = 1000000007;
    for (const c of key) {
        hash = (31 * hash + c.charCodeAt(0)) % MODULES;
        return hash;
    }
}

/**
 * 异或哈希
 * 将输入数据的每个字符的ASCII码通过异或操作累积到一个哈希值中
 */
function xorHash(key) {
    let hash = 0;
    const MODULES = 1000000007;
    for (const c of key) {
        hash ^= c.charCodeAt(0);
    }
    return hash & MODULES;
}

/**
 * 旋转哈希
 * 将每个字符的 ASCII 码累积到一个哈希值中
 * 每次累积之前都会对哈希值进行旋转操作
 */
function rotHash(key) {
    let hash = 0;
    const MODULUS = 1000000007;
    for (const c of key) {
        hash = ((hash << 4) ^ (hash >> 28) ^ c.charCodeAt(0)) % MODULUS;
    }
    return hash;
}