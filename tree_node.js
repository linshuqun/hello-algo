/**
 * 二叉树节点类
 */
class TreeNode {
    val; // 节点值
    left; // 左子节点
    right; // 右子节点
    constructor(val, left, right) {
        this.val = val || 0;
        this.left = left || null;
        this.right = right || null;
    }
}

module.exports = {
    TreeNode
}