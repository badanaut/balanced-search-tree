class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor(arr) {
    this.root = this.buildTree(arr);
  }

  buildTree(arr) {
    const sortedArr = Array.from(new Set(arr)).sort((a, b) => a - b);
    return this.buildTreeHelper(sortedArr, 0, sortedArr.length - 1);
  }

  buildTreeHelper(arr, start, end) {
    if (start > end) {
      return null;
    }

    const mid = Math.floor((start + end) / 2);
    const node = new Node(arr[mid]);

    node.left = this.buildTreeHelper(arr, start, mid - 1);
    node.right = this.buildTreeHelper(arr, mid + 1, end);

    return node;
  }

  insert(value) {
    this.root = this.insertHelper(this.root, value);
  }

  insertHelper(node, value) {
    if (node === null) {
      return new Node(value);
    }

    if (value < node.data) {
      node.left = this.insertHelper(node.left, value);
    } else if (value > node.data) {
      node.right = this.insertHelper(node.right, value);
    }

    return node;
  }

  delete(value) {
    this.root = this.deleteHelper(this.root, value);
  }

  deleteHelper(node, value) {
    if (node === null) {
      return null;
    }

    if (value < node.data) {
      node.left = this.deleteHelper(node.left, value);
    } else if (value > node.data) {
      node.right = this.deleteHelper(node.right, value);
    } else {
      if (node.left === null && node.right === null) {
        return null;
      } else if (node.left === null) {
        return node.right;
      } else if (node.right === null) {
        return node.left;
      }

      const minRight = this.findMin(node.right);
      node.data = minRight.data;
      node.right = this.deleteHelper(node.right, minRight.data);
    }

    return node;
  }

  find(value) {
    return this.findHelper(this.root, value);
  }

  findHelper(node, value) {
    if (node === null) {
      return null;
    }

    if (value === node.data) {
      return node;
    } else if (value < node.data) {
      return this.findHelper(node.left, value);
    } else {
      return this.findHelper(node.right, value);
    }
  }

  levelOrder(callback) {
    if (!callback) {
      const values = [];
      this.levelOrderHelper(this.root, (node) => {
        values.push(node.data);
      });
      return values;
    }

    this.levelOrderHelper(this.root, callback);
  }

  levelOrderHelper(node, callback) {
    if (node === null) {
      return;
    }

    const queue = [];
    queue.push(node);

    while (queue.length > 0) {
      const current = queue.shift();
      callback(current);

      if (current.left !== null) {
        queue.push(current.left);
      }

      if (current.right !== null) {
        queue.push(current.right);
      }
    }
  }

  inorder(callback) {
    if (!callback) {
      const values = [];
      this.inorderHelper(this.root, (node) => {
        values.push(node.data);
      });
      return values;
    }

    this.inorderHelper(this.root, callback);
  }

  inorderHelper(node, callback) {
    if (node === null) {
      return;
    }

    this.inorderHelper(node.left, callback);
    callback(node);
    this.inorderHelper(node.right, callback);
  }

  preorder(callback) {
    if (!callback) {
      const values = [];
      this.preorderHelper(this.root, (node) => {
        values.push(node.data);
      });
      return values;
    }

    this.preorderHelper(this.root, callback);
  }

  preorderHelper(node, callback) {
    if (node === null) {
      return;
    }

    callback(node);
    this.preorderHelper(node.left, callback);
    this.preorderHelper(node.right, callback);
  }

  postorder(callback) {
    if (!callback) {
      const values = [];
      this.postorderHelper(this.root, (node) => {
        values.push(node.data);
      });
      return values;
    }

    this.postorderHelper(this.root, callback);
  }

  postorderHelper(node, callback) {
    if (node === null) {
      return;
    }

    this.postorderHelper(node.left, callback);
    this.postorderHelper(node.right, callback);
    callback(node);
  }

  height(node) {
    if (node === null) {
      return -1;
    }

    const leftHeight = this.height(node.left);
    const rightHeight = this.height(node.right);

    return Math.max(leftHeight, rightHeight) + 1;
  }

  depth(node) {
    if (node === null) {
      return -1;
    }

    return this.depth(node.parent) + 1;
  }

  isBalanced() {
    return this.isBalancedHelper(this.root);
  }

  isBalancedHelper(node) {
    if (node === null) {
      return true;
    }

    const leftHeight = this.height(node.left);
    const rightHeight = this.height(node.right);
    const heightDiff = Math.abs(leftHeight - rightHeight);

    if (heightDiff > 1) {
      return false;
    }

    return (
      this.isBalancedHelper(node.left) && this.isBalancedHelper(node.right)
    );
  }

  rebalance() {
    const values = this.inorder();
    this.root = this.buildTree(values);
  }

  findMin(node) {
    let current = node;
    while (current.left !== null) {
      current = current.left;
    }
    return current;
  }
}

// Driver code
const getRandomNumbers = (count) => {
  const numbers = [];
  for (let i = 0; i < count; i++) {
    numbers.push(Math.floor(Math.random() * 100));
  }
  return numbers;
};

const numbers = getRandomNumbers(15);

const bst = new Tree(numbers);
console.log("Is balanced:", bst.isBalanced());
console.log("Level Order:", bst.levelOrder());
console.log("Preorder:", bst.preorder());
console.log("Inorder:", bst.inorder());
console.log("Postorder:", bst.postorder());

bst.insert(105);
bst.insert(110);
bst.insert(115);
console.log("Is balanced:", bst.isBalanced());

bst.rebalance();
console.log("Is balanced:", bst.isBalanced());
console.log("Level Order:", bst.levelOrder());
console.log("Preorder:", bst.preorder());
console.log("Inorder:", bst.inorder());
console.log("Postorder:", bst.postorder());
