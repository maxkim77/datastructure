class TreeNode {
    constructor(value) {
        this.value = value; // 트리 노드의 값
        this.children = []; // 자식 노드들의 배열
    }

    addChild(child) {
        this.children.push(child); // 자식 노드를 추가
    }
}

class SkillBinaryTree {
    /* 
    스킬트리
    이진 트리 클래스 를 어디다 적용할까? 하는 생각에 스킬트리를 구현해보았습니다.
    */
    constructor() {
        this.root = null; // 이진 트리의 루트 노드
    }

    // 새로운 스킬을 추가하는 메서드
    addSkill(skill) {
        if (!this.root) {
            this.root = new TreeNode(skill); // 루트 노드가 없으면 새로운 루트 노드 생성
        } else {
            this.addSkillRecursive(this.root, skill); // 재귀적으로 스킬 추가
        }
    }

    // 재귀적으로 스킬을 추가하는 메서드
    addSkillRecursive(node, skill) {
        if (node.children.length === 0) { // 현재 노드의 자식이 없으면
            node.addChild(new TreeNode(skill)); // 새로운 자식 노드 생성
        } else {
            const lastChild = node.children[node.children.length - 1]; // 가장 마지막 자식 노드
            if (lastChild.children.length < 2) { // 마지막 자식 노드의 자식이 2개 미만이면
                lastChild.addChild(new TreeNode(skill)); // 새로운 자식 노드 생성
            } else {
                this.addSkillRecursive(lastChild, skill); // 재귀적으로 다음 자식 노드에 스킬 추가
            }
        }
    }
}

const skillTree = new SkillBinaryTree();
skillTree.addSkill("lv1. 파워슬래시");
skillTree.addSkill("lv2. 데스스윙");
skillTree.addSkill("lv2. 인크리즈패리");
skillTree.addSkill("lv3. 실드스트라이크");
skillTree.addSkill("lv3. 프로덕션실드");
skillTree.addSkill("lv3. 배틀스탠스");
skillTree.addSkill("lv3. 배틀크라이");

// 스킬 트리를 출력하는 함수
function printSkillTree(node, level = 1) {
    if (!node) return; // 노드가 없으면 종료
    console.log(`${node.value}`); // 현재 노드의 값을 출력
    for (const child of node.children) {
        printSkillTree(child, level + 1); // 자식 노드들을 재귀적으로 출력
    }
}

printSkillTree(skillTree.root); // 스킬 트리 출력



/*
                         lv1. 파워슬래시
                /                               \
    lv2. 데스스윙                            lv2. 인크리즈패리
         /     |                                |            \
lv3. 실드스트라이크 lv3. 프로덕션실드  lv3. 배틀스탠스  lv3. 배틀크라이


*/