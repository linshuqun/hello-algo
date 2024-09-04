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
 * 基于链表实现的栈
 */
class LinkedListStack {
    #stackPeed; // 将头节点作为栈顶
    #stkSize = 0; // 栈的长度

    constructor() {
        this.#stackPeed = null;
    }

    // 获取栈的长度
    get size() {
        return this.#stkSize;
    }

    // 判断栈是否为空
    isEmpty() {
        return this.size === 0
    }

    // 入栈
    push(num) {
        const node = new ListNode(num);
        node.next = this.#stackPeed;
        this.#stackPeed = node;
        this.#stkSize++;
    }

    // 出栈
    pop() {
        const num = this.peek();
        this.#stackPeed = this.#stackPeed.next;
        this.#stkSize--;
        return num;
    }

    // 访问栈顶元素
    peek() {
        if (!this.#stackPeed) throw new Error('栈为空');
        return this.#stackPeed.val;
    }

    // 将链表转为 Array 并返回
    toArray() {
        let node = this.#stackPeed;
        const res = new Array(this.size);
        for (let i = 0; i < this.size; i++) {
            res[i] = node.val;
            node = node.next;
        }
        return res;
    }
}