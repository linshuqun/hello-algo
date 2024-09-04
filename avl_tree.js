const { TreeNode } = require('./avl_tree_node');

/**
 * AVL 树即满足二叉搜索树，也满足平衡树
 */
class AvlTree {
    constructo(val) {
        this.root = new TreeNode(val);
    }

    /**
     * 获取节点高度
     */
    height(node) {
        // 空节点高度为 -1，叶节点高度为 0
        return node === null ? -1 : node.height;
    }

    /**
     * 更新节点的高度
     */
    #updateHeight(node) {
        // 节点高度 = 最高子树高度 + 1
        node.height = Math.max(this.height(node.left), this.height(node.right)) + 1;
    }

    /**
     * 平衡因子：节点左子树的高度减去右子树的高度
     */
    balanceFactor(node) {
        // 空节点平衡因子为0
        if (node === null) return 0;
        // 节点平衡因子 = 左子树高度 -右子树高度
        return this.height(node.left) - this.height(node.right);
    }

    /**
     * AVL 树的特点在于“旋转”操作，既能保持二叉搜索树的性质，也能使树重新变为平衡二叉树
     * 
     * 旋转操作分为4种：
     * 右旋 / 左旋 / 先右旋后左旋 / 先左旋后右旋
     * 
     * 失衡节点的平衡因子   子节点的平衡因子   旋转方法
     * > 1（左偏树）       >= 0            右旋
     * > 1（左偏树）       < 0             先左旋后右旋
     * < -1（右偏树）      <= 0            左旋
     * < -1（右偏树）      > 0             先右旋后左旋
     */

    /**
     * 右旋操作，将失衡节点记为node，其左子节点记为child
     * 1. 以 child 为原点，将 node 向右旋转
     * 2. 用 child 替代以前 node 的位置
     * 3. 当 child 有右子节点 grand_child 时，将 grand_child 作为 node 的左子节点
     */
    #rightRotate(node) {
        const child = node.left;
        const grandChild = child.right;
        // 以 child 为原点，将 node 向右旋转
        child.right = node;
        node.left = grandChild;
        // 更新节点高度
        this.#updateHeight(node);
        this.#updateHeight(child);
        // 返回旋转后子树的根节点
        return child;
    }

    /**
     * 左旋操作，将失衡节点记为node，其右子节点记为child
     * 1. 以 child 为原点，将 node 向左旋转
     * 2. 用 child 替代以前 node 的位置
     * 3. 当 child 有左子节点 grand_child 时，将 grand_child 作为 node 的右子节点
     */
    #leftRotate(node) {
        const child = node.right;
        const grandChild = child.left;
        // 以 child 为原点，将 node 向左旋转
        child.left = node;
        node.right = grandChild;
        // 更新节点高度
        this.#updateHeight(node);
        this.#updateHeight(child);
        // 返回旋转后子树的根节点
        return child;
    }

    /**
     *执行旋转操作，使子树重新恢复平衡
     */
    #rotate(node) {
        // 获取该节点的平衡因子
        const balanceFactor = this.balanceFactor(node);
        // 左偏树
        if (balanceFactor > 1) {
            if (this.balanceFactor(node.left) >= 0) {
                // 右旋
                return this.#rightRotate(node);
            } else {
                // 先左旋后右旋
                node.left = this.#leftRotate(node.left);
                return this.#rightRotate(node);
            }
        }

        // 右偏树
        if (balanceFactor < -1) {
            if (this.balanceFactor(node.right) <= 0) {
                // 左旋
                return this.#leftRotate(node);
            } else {
                // 先右旋再左旋
                node.right = this.#rightRotate(node.right);
                return this.#leftRotate(node);
            }
        }

        // 平衡树，无须旋转，直接返回
        return node;
    }

    /**
     * 插入节点
     */
    insert(val) {
        this.root = this.#insertHelper(this.root, val);
    }

    /**
     * 插入节点辅助方法
     * @param {*} node 
     * @param {*} val 
     */
    #insertHelper(node, val) {
        if (!node) return new TreeNode(val);

        // 1. 查找插入位置并插入节点
        if (val < node.val) {
            node.left = this.#insertHelper(node.left, val);
        } else if (val > node.val) {
            node.right = this.#insertHelper(node.right, val);
        } else {
            // 重复节点，直接返回
            return node;
        }
        // 更新节点高度
        this.#updateHeight(node);
        // 2. 执行旋转操作，恢复平衡
        node = this.#rotate(node);
        // 返回子树根节点
        return node;
    }


    /**
     * 删除节点
     */
    remove(val) {
        this.root = this.#removeHelper(this.root, val);
    }

    /**
     * 递归删除节点（辅助方法）
     */
    #removeHelper(node, val) {
        if (node === null) return null;
        /**
         * 1. 查找节点并删除
         */
        if (val < node.val) node.left = this.#removeHelper(node.left, val);
        else if (val > node.val) node.right = this.#removeHelper(node.right, val);
        else {
            if (node.left === null || node.right === null) {
                const child = node.left || node.right;
                // 子节点数量=0，直接删除 node 并返回
                if (child === null) return null
                // 子节点数量=1，直接删除node
                else node = null
            } else {
                // 子节点数量=2，则将中序遍历的下个节点删除，并用该节点替换当前节点
                let temp = node.right;
                while (temp.left) {
                    temp = temp.left;
                }
                node.right = this.#removeHelper(node.right, temp.val);
                node.val = temp.val;
            }
        }
        // 更新节点高度
        this.#updateHeight(node);
        /**
         * 2. 执行旋转操作，使该子树重新恢复平衡
         */
        node = this.#rotate(node);
        // 返回子树的根节点
        return node;
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
}
