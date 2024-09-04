/**
 * 链表节点
 */
class ListNode {
    constructor(val) {
        this.val = val;
        this.next = null;
    }
}

/**
 * 基于链表实现的队列
 */
class LinkedListQueue {
    #front; // 头节点 #front
    #rear; // 尾节点 #rear
    #queueSize = 0;

    constructor() {
        this.#front = null;
        this.#rear = null;
    }

    // 获取队列的长度
    get size() {
        return this.#queueSize;
    }

    isEmpty() {
        return this.size === 0;
    }

    // 入队
    push(num) {
        const node = new ListNode(num);
        // 头节点为空，说明是第一个元素，头尾都指向该元素
        if (!this.#front) {
            this.#front = node;
            this.#rear = node;
            // 如果不为空，则添加到尾部
        } else {
            this.#rear.next = node;
            this.#rear = node
        }
        this.#queueSize++;
    }

    // 出队
    pop() {
        const num = this.peek();
        // 删除头节点
        this.#front = this.#front.next;
        this.#queueSize -= 1;
        return num;
    }

    // 访问队头元素
    peek() {
        if (!this.#front) throw new Error('队列为空');
        return this.#front.val;
    }

    // 将链表转化为 Array 并返回
    toArray() {
        let node = this.#front;
        const res = Array(this.size);
        for (let i = 0; i < res.length; i++) {
            res[i] = node.val;
            node = node.next;
        }

        return res;
    }
}