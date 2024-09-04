/**
 * 列表（list）是一个抽象的数据结构，它表示元素的有序集合，
 * 支持元素增删改查和遍历等操作。列表可以基于链表或数据实现
 * 注意：JS的数组天然支持列表
 * 
 * 列表类
 */
class MyList {
    #arr = []; // 数组，存储列表元素
    #capacity = 0; // 列表容量
    #size = 0; // 列表长度，当前元素数量
    #extendRadio = 2; // 每次列表扩容的倍数

    constructor() {
        this.#arr = Array(this.#capacity)
    }

    // 获取列表长度，当前元素数量
    size() {
        return this.#size;
    }

    // 获取列表容量
    capacity() {
        return this.#capacity;
    }

    // 访问元素
    get(index) {
        // 如果越界，则抛出异常
        if (index < 0 || index >= this.#size) {
            throw new Error('索引越界');
        }
        return this.#arr[index];
    }

    // 更新元素
    set(index, number) {
        // 如果越界，则抛出异常
        if (index < 0 || index >= this.#size) {
            throw new Error('索引越界');
        }
        this.#arr[index] = number;
    }

    // 在尾部添加元素
    add(number) {
        // 如果长度等于容量，则需要扩容
        if (this.#size === this.#capacity) {
            this.extendCapacity();
        }
        // 将新元素添加到列表尾部
        this.#arr[this.#size] = number;
        this.#size += 1;
    }

    // 在中间插入元素
    insert(index, num) {
        // 如果越界，则抛出异常
        if (index < 0 || index >= this.#size) {
            throw new Error('索引越界');
        }
        // 如果长度等于容量，则需要扩容
        if (this.#size === this.#capacity) {
            this.extendCapacity();
        }
        // 将索引 index 以及之后的元素都往后移动一位
        for (let j = this.#size - 1; j >= index; j--) {
            this.#arr[j + 1] = this.#arr[j];
        }
        // 更新元素
        this.#arr[index] = num;
        this.#size++;
    }

    // 删除元素
    remove(index) {
        // 如果越界，则抛出异常
        if (index < 0 || index >= this.#size) {
            throw new Error('索引越界');
        }
        const num = this.#arr[index];
        // 将索引 index 以及之后的元素都往前移动一位
        for (let j = index; j < this.#size - 1; j++) {
            this.#arr[j] = this.#arr[j + 1];
        }
        this.#size--;
        return num;
    }

    // 列表扩容
    extendCapacity() {
        // 新建一个长度为原数组 extendRatio 倍的新数组，并将原数组复制到新数组
        this.#arr = this.#arr.concat(Array(this.capacity() * (this.#extendRadio - 1)));
        // 更新列表容量
        this.#capacity *= this.#extendRadio;
    }

    // 将列表转换为数组
    toArray() {
        const size = this.size();
        // 仅转换有效长度范围内的列表元素
        const arr = new Array(size);
        for (let i = 0; i < size; i++) {
            arr[i] = this.get(i);
        }
        return arr;
    }
}