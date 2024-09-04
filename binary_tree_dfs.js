const { TreeNode } = require('./tree_node');

const list = []
/**
 * 前序遍历
 */
function preOrder(root) {
    if (root === null) return;

    // 访问优先级：根节点 -> 左子树 -> 右子树
    list.push(root.val);
    preOrder(root.left);
    preOrder(root.right);
}


/**
 * 中序遍历
 */
function inOrder(root) {
    if (root === null) return;
    // 访问优先级：左子树 -> 根节点 -> 右子树
    inOrder(root.left);
    list.push(root.val);
    inOrder(root.right);
}


/**
 * 后序遍历
 */
function postOrder(root) {
    if (root === null) return;
    // 访问优先级：左子树 -> 右子树 -> 根节点
    postOrder(root.left);
    postOrder(root.right);
    list.push(root.val);
}

/**
 * 用栈来实现二叉树的前序遍历
 */
function preorderStack(root) {
    if (!root) return [];

    const stack = [];
    const result = [];

    stack.push(root);
    while (stack.length) {
        const current = stack.pop();
        result.push(current.val);

        if (current.right) {
            stack.push(current.right);
        }

        if (current.left) {
            stack.push(current.left);
        }
    }


    return result;
}

/**
 * 用栈来实现二叉树的中序遍历
 */
function inOrderStack(root) {
    if (!root) return [];
    const stack = [];
    const result = [];

    let current = root;

    while (current || stack.length) {
        // 将当前节点的所有左子节点入栈
        while (current) {
            stack.push(current);
            current = current.left;
        }

        // 访问最左节点
        current = stack.pop();
        result.push(current.val);

        // 转向右子节点
        current = current.right;
    }

    return result;
}

/**
 * 用栈实现二叉树的后序遍历
 */
function postOrderStack(root) {
    if (!root) return [];
    const stack = [];
    const result = [];

    stack.push(root);
    while (stack.length) {
        const current = stack.pop();
        result.push(current.val);

        if (current.left) {
            stack.push(current.left);
        }

        if (current.right) {
            stack.push(current.right);
        }
    }

    return result.reverse();
}

const root = new TreeNode(1);
root.left = new TreeNode(2);
root.right = new TreeNode(3);
root.left.left = new TreeNode(4);
root.left.right = new TreeNode(5);

const result = postOrderStack(root);
console.log(result);
