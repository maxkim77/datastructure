class Node {
    /* 노드 클래스 
    - value: 현재 노드의 값
    - left: 현재 노드의 왼쪽 자식 노드 
    - right: 현재 노드의 오른쪽 자식 노드
    - constructor: 생성자 함수 객체 초기화
    - this 는 생성자 함수가 생성할 인스턴스
    */
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

class BinarySearchTree {
    /* 이진 탐색 트리 클래스
    - root: 트리의 루트 노드
    - constructor: 생성자 함수 객체 초기화
    - insert: 새로운 노드를 삽입하는 메서드 : 삽입할 노드가 루트 노드인지 확인하고 아니면 삽입 보조 함수 호출
    - insertNode(중요): 새로운 노드를 삽입하는 메서드 : 새로운 노드의 값이 현재 노드의 값보다 작으면 왼쪽 자식 노드로, 크면 오른쪽 자식 노드로 이동
    - inOrderTraverseNode(중요): 중위 순회를 구현하는 메서드 - 왼쪽 자식 노드, 현재 노드, 오른쪽 자식 노드 순으로 방문
    - inOrderTraverse: 중위 순회를 구현하는 메서드 - 중위 순회를 시작하는 메서드
    - searchNode(중요): 특정 값을 검색하는 메서드 - 현재 노드가 null이면 false를 반환하고, 값이 현재 노드의 값보다 작으면 왼쪽 자식 노드로, 크면 오른쪽 자식 노드로 이동
    - search: 특정 값을 검색하는 메서드 - 특정 값을 검색하는 메서드
    */
    constructor() {
        this.root = null;
    }

    insert(value) {
        const newNode = new Node(value);
        if (this.root === null) { //트리가 비어있을경우 새로운 노드를 루트로 설정
            this.root = newNode;
        } else {
            this.insertNode(this.root, newNode); // 그렇지 않으면 삽입 보조 함수 호출 삽입보조함수는 재귀적으로 호출되면서 새로운 값을 적절하게 삽입
        }
    }

    insertNode(node, newNode) {
        if (newNode.value < node.value) {
            if (node.left === null) {
                node.left = newNode;
            } else {
                this.insertNode(node.left, newNode); // 왼쪽 자식 노드가 없으면 새로운 노드를 왼쪽 자식 노드로 삽입
            }
        } else {
            if (node.right === null) {
                node.right = newNode;
            } else {
                this.insertNode(node.right, newNode); // 오른쪽 자식 노드가 없으면 새로운 노드를 오른쪽 자식 노드로 삽입
            }
        }
    }

    inOrderTraverseNode(node, callback) {  // 중위 순회를 구현하는 메서
        if (node !== null) { // 현재 노드가 null이 아닌 경우
            this.inOrderTraverseNode(node.left, callback); // 왼쪽 자식 노드를 방문
            callback(node.value); // 현재 노드를 방문
            this.inOrderTraverseNode(node.right, callback); // 오른쪽 자식 노드를 방문
        }
    }

    inOrderTraverse(callback) {
        this.inOrderTraverseNode(this.root, callback);
    }

    searchNode(node, value) {
        if (node === null) {
            return false;
        }
        if (value < node.value) {
            return this.searchNode(node.left, value);
        } else if (value > node.value) {
            return this.searchNode(node.right, value);
        } else {
            return true;
        }
    }

    search(value) {
        return this.searchNode(this.root, value);
    }

}

// 트리 인스턴스 생성 및 값 삽입
const bst = new BinarySearchTree();
bst.insert(8);
bst.insert(10);
bst.insert(3);
bst.insert(1);
bst.insert(14);
bst.insert(6);
bst.insert(7);
bst.insert(4);
bst.insert(13);

// 중위 순회를 이용하여 트리의 모든 값을 출력(왼 -> 중 -> 오)
bst.inOrderTraverse(value => console.log(value));
/*

        7
       / \
      4   10
     / \  / \
    3   6 8  13
   /          \
  1           14

*/
// 특정 값이 트리에 있는지 검색
console.log('The value 7 is in the BST:', bst.search(7)); // true를 출력합니다.
console.log('The value 2 is in the BST:', bst.search(2)); // false를 출력합니다.
