class Node {
    /*
    - value: 노드의 값
    - left: 왼쪽 자식 노드
    - right: 오른쪽 자식 노드
    - constructor: 생성자 함수 객체 초기화
    */
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

function treeHeight(root) {
    /*
    - root: 트리의 루트 노드
    - treeHeight: 이진 트리의 높이를 계산하는 함수
    */
    if (root === null) {
        return 0;
    } else {
        const leftHeight = treeHeight(root.left); // 왼쪽 서브트리의 높이 계산
        const rightHeight = treeHeight(root.right); // 오른쪽 서브트리의 높이 계산

        return Math.max(leftHeight, rightHeight) + 1; // 왼쪽 서브트리와 오른쪽 서브트리 중 더 큰 값에 1을 더해 현재 노드의 높이를 계산
    }
}

// 트리 구성
const root = new Node(1);
root.left = new Node(2);
root.right = new Node(3);
root.left.left = new Node(4);
root.left.right = new Node(5);
root.right.left = new Node(6);
root.right.right = new Node(7);

// 트리의 높이 계산
const height = treeHeight(root);

console.log("이진 트리의 높이:", height);
/*
     1
    / \
   2   3
  / \ / \
 4  5 6  7
*/