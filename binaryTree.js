class Node
{
    constructor(key, data, parent=null)
    {
        this.key = key;
        this.data = data;
        this.left = null;
        this.right = null;
        this.parent = parent;
    }

    get isLeaf()
    {
        return this.left == null && this.right == null;
    }
}

class BinaryTree
{
    constructor()
    {
        this.root = null;
        this.size = 0;
    }
    
    *preOrderTraversal(node = this.root)
    {
        yield node;
        if (node.left) yield* this.preOrderTraversal(node.left);
        if (node.right) yield* this.preOrderTraversal(node.right);
    }

    insert(parentKey, key, data, {left, right} = {left:true, right:true})
    {
        if (parentKey === null)
        {
            this.root = new Node(key, data);
            this.size = 1;
            return true;
        }

        for (let node of this.preOrderTraversal()) 
        {
            if (node.key === parentKey)
            {
                const canInsertLeft = left && node.left === null;
                const canInsertRight = right && node.right === null;
                if (!canInsertLeft && !canInsertRight) return false;
                if (canInsertLeft)
                {
                    node.left = new Node(key, data, node);
                    this.size += 1;
                    return true;
                }
                if (canInsertRight)
                {
                    node.right = new Node(key, data, node);
                    this.size += 1;
                    return true;
                }
            }
        }
        return false;
    }

    removeByKey(key) 
    {
        for (let node of this.preOrderTraversal)
        {
            if (node.left.key === key) {
                node.left = null;
                this.size -= 1;
                return true;
            }

            if (node.right.key === key) {
                node.right = null;
                this.size -= 1;
                return true;
            }
        }
        return false;
    }

    findByKey(key)
    {
        for (let node of this.preOrderTraversal)
        {
            if (node.key === key) return node;
        }
        return null;
    }

    getLeafCount(root = this.root)
    {
        if (root === null) return 0;
        if (root.left === null && root.right === null) return 1;
        else return this.getLeafCount(root.left) + this.getLeafCount(root.right);

    }

    longestPath(root = this.root)
    {
        if (root === null) return [];

        let left = this.longestPath(root.left);
        let right = this.longestPath(root.right);

        if (right.length < left.length)
        {
            left.push(root.data);
        }
        else 
        {
            right.push(root.data);
        }
        return (left.length > right.length ? left :right);
    }
    
    maxEdgesInPath() 
    {
        return this.longestPath().length - 1;
    }
}

function isIdenticalUtil(root1, root2)
{
    if (root1 == null && root2 == null)
        return true;
          
    else if (root1 != null &&
             root2 == null)
        return false;
    else if (root1 == null &&
             root2 != null)
        return false;
    else
    {
        if (root1.data == root2.data &&
            isIdentical(root1.left, root2.left) &&
            isIdentical(root1.right, root2.right))
            return true;
        else
            return false;
    }
}

function isIdentical(tree1, tree2)
{
    return isIdenticalUtil(tree1.root, tree2.root);
}

const tree = new BinaryTree();

// insert(parentKey, key, data, {left/right})
tree.insert(null, 1, 5);
tree.insert(1, 2, 3);
tree.insert(1, 3, 7);
tree.insert(2, 4, 2);
tree.insert(2, 5, 5);
tree.insert(3, 6, 1);
tree.insert(3, 7, 0);
tree.insert(7, 8, 2);
tree.insert(7, 9, 8);
tree.insert(9, 10, 5, {right: true});

// 1
console.log(tree.getLeafCount())

//2
console.log(tree.maxEdgesInPath())

//3
const tree2 = new BinaryTree();
tree2.insert(null, 1, 5);
tree2.insert(1, 2, 3);
tree2.insert(1, 3, 7);
tree2.insert(2, 4, 2);
tree2.insert(2, 5, 5);
tree2.insert(3, 6, 1);
tree2.insert(3, 7, 0);
tree2.insert(7, 8, 2);
tree2.insert(7, 9, 8);
tree2.insert(9, 10, 5, {right: true});

console.log(isIdentical(tree, tree2));

const tree3 = new BinaryTree();
tree3.insert(null, 1, 1);
tree3.insert(1, 2, 4);
tree3.insert(1, 3, 9);
tree3.insert(2, 4, 2);

console.log(isIdentical(tree, tree3));
