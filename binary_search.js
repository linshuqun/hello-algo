/**
 * 二分查找（双闭区间）
 */
function binarySearch(nums, target) {
    // 初始化双闭区间[0, n-1]，即 i，j 分别指向数组首元素、尾元素
    let i = 0, j = nums.length - 1;
    // 循环，当搜索区间索引为空时跳出（当 i > j 时为空）
    while (i <= j) {
        // 计算中点索引 m，使用 parseInt() 向下取整
        const m = parseInt(i + (i - j) / 2);
        if (nums[m] < target) {
            i = m + 1;
        } else if (nums[m] > target) {
            j = m - 1;
        } else {
            return m
        }
    }
    // 未找到目标元素，返回 -1
    return -1;
}

/**
 * 二分查找（左闭右开区间）
 */
function binarySearch(nums, target) {
    // 初始化左闭右开区间[0, n)，即 i, j 分别指向数组首元素、尾元素 + 1
    let i = 0, j = nums.length;
    // 循环，当搜索区间为空时跳出（当 i = j 时为空）
    while (i < j) {
        // 计算中点索引 m，向下取整
        const m = parseInt(i + (j - i) / 2);
        if (nums[m] < target) {
            i = m + 1;
        } else if (nums[m] > target) {
            j = m;
        } else {
            return m;
        }
    }
    // 未找到目标元素，返回 -1
    return -1;
}
