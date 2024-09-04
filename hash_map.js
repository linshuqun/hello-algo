/**
 * 初始化哈希表
 */
const map = new Map();

/**
 * 添加操作
 */
// 在哈希表中添加键值对 (key, value)
map.set(12836, 'hi');
map.set(10583, 'hello');

/**
 * 查询操作
 */
// 向哈希表中输入键 key，得到值 value
let name = map.get(12836)

/**
 * 删除操作
 */
// 在哈希表中删除键值对
map.delete(12836)

/**
 * 遍历哈希表
 */
console.info('遍历键值对');
for (const [k, v] of map.entries()) {
    console.info(`${k} -> ${v}`);
}

console.info('单独遍历键 key');
for (const k of map.keys()) {
    console.info(k);
}

console.info('单独遍历值 value');
for (const v of map.values()) {
    console.info(v);
}