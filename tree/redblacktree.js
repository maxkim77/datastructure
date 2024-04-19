class Node {
  /*
    * 레드-블랙 트리의 노드 클래스
    * 각 노드의 값, 색상, 그리고 왼쪽, 오른쪽 부모노드를 참조 합니다.    
  */
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
    this.parent = null; // 부모 노드 정보 추가
    this.color = 'RED'; // 색상 정보 추가 (기본 RED로 설정)
  }
}

class redBlackTree {
  /*
    * 레드-블랙 트리 클래스
    * 루트 노드를 가지고 있으며, 삽입, 삭제, 회전, 레벨 순회 등의 메서드를 포함합니다.
  */
  constructor () {
    this.root = null;
  }

  /* 이진 검색 트리에 노드를 삽입하고, 삽입 후에 레드-블랙 트리의 속성을 수정하는 메서드
    이진 검색트리에 값을 삽입후 레드블랙 규칙을 유지하기위해 재조정을 수행합니다. 
  */
  insert(value) {
    let newNode = new Node(value);
    this.root = this.insertBST(this.root, newNode);
    this.fixInsertionViolations(newNode);
  }

  /* 이진 검색 트리에 노드를 삽입하는 메서드
   * 이진 검색 트리에 값을 삽입한 후, 레드-블랙 트리의 규칙을 유지하기 위해 재조정을 수행합니다.  
   */
  insertBST(root, newNode) {
    if (root === null) {
      return newNode;
    }

    if (newNode.value < root.value) {
      root.left = this.insertBST(root.left, newNode);
      root.left.parent = root; // 부모 노드 설정
    } else {
      root.right = this.insertBST(root.right, newNode);
      root.right.parent = root; // 부모 노드 설정
    }

    return root;
  }

  /* 
  주요 메서드: Recolor, Restructure
  삽입된 노드로 인해 발생한 레드-블랙 트리의 속성 위반을 수정하는 메서드
  노드가 루트가 아니고, 부모 노드의 색상이 레드인 경우 계속해서 재조정합니다.
 */
  fixInsertionViolations(node) {
    while (node !== this.root && node.parent.color === 'RED') {
      let parent = node.parent;
      let grandparent = parent.parent;
      // 부모 노드가 할아버지 노드의 왼쪽 자식인 경우
      if (parent === grandparent.left) {
        let uncle = grandparent.right;
        // Recolor 삼촌 노드가 레드인 경우: 색상을 변경하고, 할아버지 노드를 새로운 노드로 설정
        if (uncle !== null && uncle.color === 'RED') {
          parent.color = 'BLACK';
          uncle.color = 'BLACK';
          grandparent.color = 'RED';
          node = grandparent;
        } else {
          // Restructure: 삼촌 노드가 블랙이거나 없는 경우: 회전 연산을 수행하고 색상을 변경
          if (node === parent.right) {
            // 부모 노드 기준으로 왼쪽 회전
            this.leftRotate(parent);
            node = parent;
            parent = node.parent;
          }
          // 할아버지 노드 기준으로 오른쪽 회전
          this.rightRotate(grandparent);
          parent.color = 'BLACK';
          grandparent.color = 'RED';
          node = parent;
        }
      } else {
        // 부모 노드가 할아버지 노드의 오른쪽 자식인 경우
        let uncle = grandparent.left;

        if (uncle !== null && uncle.color === 'RED') {
          parent.color = 'BLACK';
          uncle.color = 'BLACK';
          grandparent.color = 'RED';
          node = grandparent;
        } else {
          if (node === parent.left) {
            this.rightRotate(parent);
            node = parent;
            parent = node.parent;
          }

          this.leftRotate(grandparent);
          parent.color = 'BLACK';
          grandparent.color = 'RED';
          node = parent;
        }
      }
    }

    this.root.color = 'BLACK';
  }

  /* 왼쪽으로 회전하는 메서드 */
  leftRotate(node) {
    let rightChild = node.right;
    node.right = rightChild.left;

    if (rightChild.left !== null) {
      rightChild.left.parent = node;
    }

    rightChild.parent = node.parent;

    if (node.parent === null) {
      this.root = rightChild;
    } else if (node === node.parent.left) {
      node.parent.left = rightChild;
    } else {
      node.parent.right = rightChild;
    }

    rightChild.left = node;
    node.parent = rightChild;
  }

  /* 오른쪽으로 회전하는 메서드 */
  rightRotate(node) {
    let leftChild = node.left;
    node.left = leftChild.right;

    if (leftChild.right !== null) {
      leftChild.right.parent = node;
    }

    leftChild.parent = node.parent;

    if (node.parent === null) {
      this.root = leftChild;
    } else if (node === node.parent.right) {
      node.parent.right = leftChild;
    } else {
      node.parent.left = leftChild;
    }

    leftChild.right = node;
    node.parent = leftChild;
  }

  /* 삭제할 값을 받아서 해당 값을 가진 노드를 삭제하는 메서드*/
  remove(value) {
    let node = this.search(value);

    if (node === null) {
      return;
    }

    this.root = this.removeBST(this.root, node);
  }

  /* 이진 검색 트리에서 노드를 삭제하는 메서드*/
  removeBST(root, node) {
    if (root === null || node === null) {
      return root;
    }

    if (node.value === root.value) {
      if (root.left === null && root.right === null) {
        if (root === this.root) {
          return null;
        } else if (root.color === 'RED') {
          return null;
        } else {
          this.fixDoubleBlack(root);
          return null;
        }
      }
    }

    if (node.value < root.value) {
      root.left = this.removeBST(root.left, node);
    } else if (node.value > root.value) {
      root.right = this.removeBST(root.right, node);
    }

    return root;
  }

  /* 더블 블랙 상태를 수정하는 메서드 */ 
  fixDoubleBlack(node) {
    if (node === this.root) {
      return;
    }

    let sibling = this.getSibling(node);
    let parent = node.parent;

    if (!sibling) {
      this.fixDoubleBlack(parent);
    } else {
      if (sibling.color === 'RED') {
        this.colorSwap(parent, sibling);
        if (this.isLeftChild(sibling)) {
          this.rightRotate(parent);
        } else {
          this.leftRotate(parent);
        }
        this.fixDoubleBlack(node);
      } else {
        if (this.anyRedChild(sibling)) {
          if (this.isLeftChild(sibling)) {
            if (sibling.left && sibling.left.color === 'RED') {
              this.colorSwap(parent, sibling);
              this.colorSwitch(sibling.left);
              this.rightRotate(parent);
            } else if (sibling.right && sibling.right.color === 'RED') {
              this.colorSwitch(sibling.right);
              this.leftRotate(sibling);
              this.colorSwap(parent, sibling);
              this.rightRotate(parent);
            }
          } else {
            if (sibling.right && sibling.right.color === 'RED') {
              this.colorSwap(parent, sibling);
              this.colorSwitch(sibling.right);
              this.leftRotate(parent);
            } else if (sibling.left && sibling.left.color === 'RED') {
              this.colorSwitch(sibling.left);
              this.rightRotate(sibling);
              this.colorSwap(parent, sibling);
              this.leftRotate(parent);
            }
          }
        } else {
          sibling.color = 'RED';
          if (parent.color === 'RED') {
            parent.color = 'BLACK';
          } else {
            this.fixDoubleBlack(parent);
          }
        }
      }
    }
  }

  /* 노드의 색을 바꾸는 메서드 */
  colorSwitch(node) {
    if (node) {
      node.color = node.color === 'RED' ? 'BLACK' : 'RED';
    }
  }

  /* 두 노드의 색을 바꾸는 메서드 */
  colorSwap(node1, node2) {
    let tempColor = node1.color;
    node1.color = node2.color;
    node2.color = tempColor;
  }

  /* 형제 노드를 반환하는 메서드 */
  getSibling(node) {
    if (node === null || node.parent === null) {
      return null;
    }

    if (node === node.parent.left) {
      return node.parent.right;
    } else {
      return node.parent.left;
    }
  }

  /* 노드가 왼쪽 자식인지 확인하는 메서드 */
  isLeftChild(node) {
    return node === node.parent.left;
  }

  /* 현재 노드나 자식 노드 중 하나라도 빨간색인지 확인하는 메서드 */
  anyRedChild(node) {
    return (node.left && node.left.color === 'RED') || (node.right && node.right.color === 'RED');
  }

  /* 주어진 값의 노드를 찾는 메서드 */
  search(value) {
    return this.searchNode(this.root, value);
  }

  /* 특정 값의 노드를 찾는 재귀적 메서드 */
  searchNode(node, value) {
    if (node === null || node.value === value) {
      return node;
    }

    if (value < node.value) {
      return this.searchNode(node.left, value);
    } else {
      return this.searchNode(node.right, value);
    }
  }

  /* 레벨 순서대로 순회를 수행하여 트리의 모든 요소를 출력하는 메서드 */
  levelOrderTraversal() {
    let queue = [];
    if (this.root !== null) {
      queue.push(this.root);
      while (queue.length > 0) {
        let node = queue.shift();
        console.log(`Value: ${node.value}, Color: ${node.color}`);
        if (node.left !== null) {
          queue.push(node.left);
        }
        if (node.right !== null) {
          queue.push(node.right);
        }
      }
    } else {
      return null;
    }
  }
}

let rbTree = new redBlackTree();

rbTree.insert(42); rbTree.insert(10);  rbTree.insert(64);
rbTree.insert(7);  rbTree.insert(29);  rbTree.insert(50);
rbTree.insert(83); rbTree.insert(5);
/*
     42B
    /    \
  10R    64B
 /   \    /   \
7B   29B 50R  83R
 \
  5R
*/
  // rbTree.remove(29);

  /*
      42B
     /    \
  10B     64B
         /    \
       50R    83R
  */

rbTree.levelOrderTraversal();
