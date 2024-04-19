class TreeNode {
    constructor(value) {
        this.value = value;
        this.children = [];
    }

    addChild(child) {
        this.children.push(child);
    }
}

class BinaryTree {
    constructor() {
        this.root = null;
    }

    addSkill(skill) {
        if (!this.root) {
            this.root = new TreeNode(skill);
        } else {
            this.addSkillRecursive(this.root, skill);
        }
    }

    addSkillRecursive(node, skill) {
        if (node.children.length === 0) {
            node.addChild(new TreeNode(skill));
        } else {
            const lastChild = node.children[node.children.length - 1];
            if (lastChild.children.length < 2) {
                lastChild.addChild(new TreeNode(skill));
            } else {
                this.addSkillRecursive(lastChild, skill);
            }
        }
    }
}

const skillTree = new BinaryTree();
skillTree.addSkill("lv1. 파워슬래시");
skillTree.addSkill("lv2. 데스스윙");
skillTree.addSkill("lv2. 인크리즈패리");
skillTree.addSkill("lv3. 실드스트라이크");
skillTree.addSkill("lv3. 프로덕션실드");
skillTree.addSkill("lv3. 배틀스탠스");
skillTree.addSkill("lv3. 배틀크라이");

function printSkillTree(node, level = 1) {
    if (!node) return;
    console.log(`${node.value}`);
    for (const child of node.children) {
        printSkillTree(child, level + 1);
    }
}

printSkillTree(skillTree.root);


/*
                         lv1. 파워슬래시
                /                               \
    lv2. 데스스윙                            lv2. 인크리즈패리
         /     |                                |            \
lv3. 실드스트라이크 lv3. 프로덕션실드  lv3. 배틀스탠스  lv3. 배틀크라이


*/