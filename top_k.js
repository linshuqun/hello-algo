const { MaxHeap } = require('./my_heap');

/**
 * Top k 问题
 * 给定一个长度为 n 的无序数组 nums ，请返回数组中最大的 k 个元素。
 * 常规有 3 种解法：
 * 1. 遍历选择，k 轮遍历，分别在每轮中提取第 1, 2 、、、k 大的元素，时间复杂度为 O(nk) 。
 *    此方法非常耗时，当 k 无限接近于 n 时，时间复杂度趋向于 O(n*n)
 *    当k = n, 此方法等价于选择排序
 * 
 * 2. 排序
 * 
 * 3. 堆
 *   a. 初始化一个小顶堆，其堆顶元素最小
 *   b. 先将数组的前 k 个元素依次入堆
 *   c. 从第 k + 1 个元素开始，若当前元素大于堆顶元素，则将堆顶元素出堆，并将当前元素入堆
 *   d. 遍历完成后，堆中保存的就是最大的 k 个元素
 */

/**
 * 元素入堆
 */
function pushMinHeap(maxHeap, val) {
    // 元素取反
    maxHeap.push(-val);
}

/**
 * 元素出堆
 */
function popMinHeap(maxHeap) {
    // 元素取反
    return -maxHeap.pop();
}

/**
 * 访问堆顶元素
 */
function peekMinHeap(maxHeap) {
    // 元素取反
    return -maxHeap.peek();
}

/**
 * 取出堆中元素
 */
function getMinHeap(maxHeap) {
    // 元素取反
    return maxHeap.getMinHeap().map(num => -num);
}

/**
 * 基于堆查找数组中最大的 k 个元素
 */
function topKHeap(nums, k) {
    // 初始化小顶堆
    // 注意：将堆中所有元素取反，从而用大顶堆来模拟小顶堆
    const maxHeap = new MaxHeap([]);
    // 将数组的前 k 个元素入堆
    for (let i = 0; i < k; i++) {
        pushMinHeap(maxHeap, nums[i]);
    }
    // 从第 k + 1 个元素开始，保持堆的长度为 k
    for (let i = k; i < nums.length; i++) {
        // 若当前元素大于堆顶元素，则将堆顶元素出堆，当前元素入堆
        if (nums[i] > peekMinHeap(maxHeap)) {
            popMinHeap(maxHeap);
            pushMinHeap(maxHeap, nums[i]);
        }
    }
    // 返回堆中元素
    return getMinHeap(maxHeap);
}
