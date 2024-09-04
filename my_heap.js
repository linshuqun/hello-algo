/**
 * 完全二叉树非常适合用数组表示。
 * 由于堆是一种完全二叉树，因此采用数组来存储堆。
 * 元素代表节点值，索引代表节点在二叉树中的位置。
 * 节点指针通过索引映射公式来实现。
 * 给定索引 i，其左子节点的索引为 2i + 1，右子节点的索引为 2i + 2，
 * 父节点的索引为 (i - 1) / 2 （向下整除）
 */

class MaxHeap {
    #maxHeap;
    /**
     * 建立空堆或根据输入列表建堆
     */
    constructor(nums) {
        this.maxHeap = nums ? [] : [...nums];
        // 堆化除叶节点外的其他所有节点
        for (let i = this.#parent(this.size() - 1); i >= 0; i--) {
            this.#siftDown(i);
        }
    }

    /**
     * 获取堆大小
     */
    size() {
        return this.#maxHeap.length;
    }

    /**
     * 获取左子节点的索引
     */
    #left(i) {
        return 2 * i + 1;
    }

    /**
     * 获取右子节点的索引
     */
    #right(i) {
        return 2 * i + 2;
    }

    /**
     * 获取父节点的索引
     */
    #parent(i) {
        // 向下整除
        return Math.floor((i - 1) / 2);
    }

    /**
     * 交换节点
     */
    #swap(i, j) {
        [this.#maxHeap[i], this.#maxHeap[j]] = [this.#maxHeap[j], this.#maxHeap[i]];
    }

    /**
     * 判断堆是否为空
     */
    isEmpty() {
        return this.size() === 0;
    }

    /**
     * 访问堆顶元素
     */
    peek() {
        return this.#maxHeap[0];
    }

    /**
     * 元素入堆
     */
    push(val) {
        // 添加节点
        this.#maxHeap.push(val);
        // 从底至顶堆化
        this.#siftUp(this.size() - 1);
    }

    /**
     * 从节点 i 开始，从底至顶堆化
     * 比较插入节点与其父节点的值，如果插入节点更大，则将它们交换；
     * 不断执行此操作，从底至顶修复堆中各个节点，直至越过根节点或遇到无须交换的节点时结束
     */
    #siftUp(i) {
        while (true) {
            // 获取节点 i 的父节点
            const p = this.#parent(i);
            // 当越过根节点或当前节点无须修复时，则结束堆化
            if (p < 0 || this.#maxHeap[i] < this.#maxHeap[p]) break;
            // 交换节点
            this.#swap(i, p);
            // 循环向上优化
            i = p;
        }
    }

    /**
     * 元素出堆
     * 堆顶元素是树的根节点，如果直接删除元素，会导致整棵树的索引发生变化，导致难以修复
     * 为了尽量减少元素索引的变动，采用以下步骤：
     * 1. 交换堆顶元素与堆底元素，即首尾元素互换
     * 2. 交换完成后，将堆底元素删除，由于已经交换，所以实际上删除的是原来的堆顶元素
     * 3. 从根节点开始，从顶至底执行堆化，修复整颗二叉树
     */
    pop() {
        // 判空处理
        if (this.isEmpty()) throw new Error("堆为空");
        // 交换根节点与最右叶子节点（交换首元素与尾元素）
        this.#swap(0, this.size() - 1);
        // 删除节点
        const val = this.#maxHeap.pop();
        // 从顶至底堆化
        this.#siftDown(0);
        // 返回堆顶元素
        return val;
    }

    /**
     * 从节点 i 开始，从顶至底堆化
     * 【从顶至底堆化】的操作方向与【从底至顶堆化】相反
     * 将根节点的值与其两个子节点的值进行比较，将最大的子节点与根节点交换
     * 循环执行此操作，直到越过叶节点或遇到无须交换的节点时结束
     */
    #siftDown(i) {
        while (true) {
            // 判断节点i, l, r 中值最大的节点，记为ma
            const l = this.#left(i);
            const r = this.#right(i);

            let ma = i;
            if (l < this.size() && this.#maxHeap[l] > this.#maxHeap[ma]) ma = l;
            if ((r < this.size() && this, this.#maxHeap[r] > this.#maxHeap[ma]))
                ma = r;
            // 若节点 i 最大或索引l, r越界，则无须继续堆化，跳出
            if (ma === i) break;
            // 交换节点
            this.#swap(i, ma);
            // 循环向下堆化
            i = ma;
        }
    }

    /**
     * 取出堆中元素
     */
    getMaxHeap() {
        return this.#maxHeap;
    }
}

module.exports = {
    MaxHeap,
};
