/**
 * 二叉搜索树
 */
const { TreeNode } = require('./tree_node');

class BinarySearchTree {
    constructor(val) {
        this.root = new TreeNode(val);
    }

    /**
     * 查找节点
     */
    search(num) {
        let cur = this.root;
        // 循环查找，越过叶节点后跳出
        while (cur !== null) {
            // 目标节点在 cur 的右子树中
            if (cur.val < num) cur = cur.right;
            // 目标节点在 cur 的左子树中
            else if (cur.val > num) cur = cur.left;
            // 找到目标节点，跳出循环
            else break;
        }
        // 返回目标节点
        return cur;
    }

    /**
     * 插入节点
     */
    insert(num) {
        // 若为空树，则初始化根节点
        if (!this.root) {
            this.root = new TreeNode(num);
            return
        }
        let cur = this.root;
        let pre;
        // 查找要插入节点的父节点
        while (cur) {
            if (cur.val === num) {
                return cur;
            }
            pre = cur;

            if (cur.val < num) {
                cur = cur.right
            } else {
                cur = cur.left;
            }
        }
        // 插入节点
        const node = new TreeNode(num);
        if (pre.val < node.val) {
            pre.right = node;
        } else {
            pre.left = node;
        }
    }

    /**
     * 删除节点，有三种情况
     * 1. 被删除节点的子节点数量为0，表明该节点是叶子节点，直接删除即可
     * 2. 被删除节点有一个子节点，将待删除节替换为子节点即可
     * 3. 被删除节点有左右节点，需要右子树的最小节点或左子树的最大节点替换待删除节点
     */
    remove(num) {
        // 若树为空，直接提前返回
        if (this.root === null) return;
        let cur = this.root;
        let pre = null;
        while (cur) {
            // 找到待删除节点，跳出循环
            if (cur.val === num) {
                break;
            }
            pre = cur;
            if (cur.val < num) {
                cur = cur.right;
            } else {
                cur = cur.left;
            }
        }
        // 无待删除节点，直接返回
        if (cur === null) {
            return;
        }

        // 子节点数量 0 或 1
        if (cur.left === null || cur.right === null) {
            const child = cur.left || cur.right;
            // 删除节点
            if (cur !== this.root) {
            if (pre.left === cur) {
                pre.left = child;
            } else {
                pre.right = child;
            }
            } else {
                // 重新指派根节点
                this.root = child;
            }
        } else { // 子节点数量为2
            // 获取中序遍历中 cur 的下一个节点
            let temp = cur.right;
            while (temp.left !== null) {
                temp = temp.left;
            }

            // 递归删除节点 temp
            this.remove(temp.val);

            // 用 temp覆盖 cur
            cur.val = temp.val;
        }
    }
}
