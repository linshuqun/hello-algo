/**
 * AVL 树，既是二叉搜索树，也是平衡二叉树
 * AVL 树节点类
 */
class TreeNode {
    val; // 节点值
    height; // 节点高度
    left; // 左子节点
    right; // 右子节点

    constructor(val, left, right, height) {
        this.val = val || 0;
        this.height = height || 0;
        this.left = left || null;
        this.right = right || null;
    }
}

module.exports = {
    TreeNode
}