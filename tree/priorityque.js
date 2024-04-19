class PriorityQueue {
    /*
    우선순위 큐는 힙(heap)을 사용하여 구현할 수 있습니다.
    이진 힙을 저장하는 배열
    */ 
    constructor() {
      this.heap = [];  
    }
  
    /* 부모 노드의 인덱스를 계산 
    Math.floor : 주어진 숫자와 같거나 작은 정수 중에서 가장 큰 수를 반환
    */

    getParentIndex(i) {
      return Math.floor((i - 1) / 2);
    }
  
    /* 왼쪽 자식 노드의 인덱스를 계산 */
    getLeftChildIndex(i) {
      return 2 * i + 1;
    }
  
    /* 오른쪽 자식 노드의 인덱스를 계산 */
    getRightChildIndex(i) {
      return 2 * i + 2;
    }
  
    /* 두 요소의 위치를 교환 */
     swap(i, j) {
      [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
    }
  
    /* 요소를 삽입하고, 최대 힙 속성을 유지하기 위해 위로 재정렬 */
    insert(priority, value) {
      const node = { priority, value }; // 노드 생성
      this.heap.push(node); // 힙에 노드 추가
      this.heapifyUp(); // 힙 속성 유지
    }
  
    /* 삽입된 요소를 위로 재정렬
     while: 조건이 참일 때까지 반복
     swap: 두 요소의 위치를 교환
     getParentIndex: 부모 노드의 인덱스를 계산
     heapifyUp: 삽입된 요소를 위로 재정렬
     priority: 우선순위
     */
    heapifyUp() {
      let index = this.heap.length - 1;
      while (
        index > 0 &&
        this.heap[this.getParentIndex(index)].priority < this.heap[index].priority
      ) {
        this.swap(this.getParentIndex(index), index);
        index = this.getParentIndex(index);
      }
    }
  
    /* 우선순위가 가장 높은 요소를 제거하고 반환 */
    remove() {
      const maxValue = this.heap[0];
      this.heap[0] = this.heap.pop();
      this.heapifyDown(); // 힙 속성 유지
      return maxValue;
    }
  
    /* 제거된 요소를 아래로 재정렬 */
    heapifyDown() {
      let index = 0;
      while (this.getLeftChildIndex(index) < this.heap.length) {
        let biggerChildIndex = this.getLeftChildIndex(index);
        if (
          this.getRightChildIndex(index) < this.heap.length &&
          this.heap[this.getRightChildIndex(index)].priority > this.heap[biggerChildIndex].priority
        ) {
          biggerChildIndex = this.getRightChildIndex(index);
        }
  
        if (this.heap[index].priority >= this.heap[biggerChildIndex].priority) {
          break;
        } else {
          this.swap(index, biggerChildIndex);
          index = biggerChildIndex;
        }
      }
    }
  }
  
  // 우선순위 큐 사용 예제
  const pq = new PriorityQueue();
  pq.insert(3, 'one');
  pq.insert(7, 'two');
  pq.insert(2, 'three');
  pq.insert(8, 'four');
  pq.insert(5, 'five');
  pq.insert(6, 'six');

  // 우선순위 큐에 요소 추가
  pq.insert(9, 'VIP');
  

  /*
        9(VIP)
     /        \
  7(two)      8(four)
 /    \       /     \
3(one) 5(five) 2(three) 6(six)


  
  */
  // 우선순위가 가장 높은 요소를 제거하고 출력
  // console.log('제거된 요소:', pq.remove().value); // VIP
  /* 
  
        8(four)
     /        \
  7(two)      6(six)
 /    \         /
3(one) 5(five) 2(three)


  */
  
  // 우선순위 큐의 상태를 출력
  console.log('현재 우선순위 큐 상태:', pq.heap.map(node => `${node.value}(${node.priority})`));
  