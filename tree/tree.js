/* Tree 클래스는 트리 자료구조를 나타냄
 constructor 메서드는 트리 초기화
 new 연산자는 객체를 생성
 전위 순위로 출력 :  루트 노드 -> 왼쪽 서브트리 -> 오른쪽 서브트리
*/
class Tree {
    constructor(value){
        this.root = new Node(value);
    }

    print() {
        this.root.printPreOrder();
    }
}

/* Node 클래스는 트리의 노드를 나타냄
children : 현재 노드의 자식노드를 저장하는 배열
push : 메서드는 자식 노드를 추가
*/
class Node {
    children = [];
    constructor(value){
        this.value = value;
    }

    push(value){
        this.children.push(new Node(value));
    }

    printPreOrder() {
        console.log(this.value);
        //재귀적으로 전위 순위를 계속하여 호출
        for (const child of this.children) {
            child.printPreOrder();
        }
    }
}

const tree = new Tree(5);
tree.root.push(2);
tree.root.push(7);
tree.root.children[0].push(1);
tree.root.children[0].push(3);
tree.root.children[1].push(6);
tree.root.children[1].push(8);

tree.print();

/*
   5
  / \
 2   7
/ \ / \
1 3 6 8
*/