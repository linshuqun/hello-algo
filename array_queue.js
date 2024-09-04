/**
 * 基于环形数组实现的队列
 */
class ArrayQueue {
    #nums; // 存储队列元素的数组
    #front = 0; // 队首指针，指向队首元素
    #queueSize; // 队列元素的数量

    constructor(capacity) {
        this.#nums = new Array(capacity);
    }

    // 获取队列容量
    get capacity() {
        return this.#nums.length;
    }

    // 获取队列长度
    get size() {
        return this.#queueSize;
    }

    // 判断电台是否为空
    isEmpty() {
        return this.#queueSize === 0;
    }

    // 入队
    push(num) {
        if (this.size === this.capacity) {
            console.log('队列已满')
            return;
        }
        // 计算队尾指针，指向队尾索引 + 1
        // 通过取余操作实现 rear 越过数组尾部回到头部
        const rear = (this.#front + this.size) % this.capacity;
        // 将num添加到队尾
        this.#nums[rear] = num;
        this.#queueSize++;
    }

    // 出队
    pop() {
        const num = this.peek();
        // 队首指针向后移动一位，若越过尾部，则返回到数组头部
        this.#front = (this.#front + 1) % this.capacity;
        this.#queueSize--;
        return num;
    }

    // 访问队首元素
    peek() {
        if (this.isEmpty()) throw new Error('队列为空');
        return this.#nums[this.#front];
    }

    // 返回数组
    toArray() {
        const arr = [];
        // 仅转换有效长度范围内的队列元素
        for (let i = 0, j = this.#front; i < this.size; i++, j++) {
            arr[i] = this.#nums[j % this.capacity];
        }
        return arr;
    }
}
