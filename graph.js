class Graph {
    /* 그래프의 정점과 간선을 저장하는 속성 */
    constructor() {
        this.vertices = []; // 정점을 저장하는 배열
        this.edges = {};   // 간선을 저장하는 객체
    }

    /* 정점 추가 메서드 */
    addVertex(vertex) {
        this.vertices.push(vertex);  // 정점 배열에 추가
        this.edges[vertex] = [];     // 정점과 연결된 간선을 저장할 빈 배열 생성
    }

    /* 간선 추가 메서드 */
    addEdge(from, to) {
        // from 정점에서 to 정점으로의 양방향 간선 추가
        this.edges[from].push(to);  // from 정점에서 to 정점으로의 간선 추가
        this.edges[to].push(from);  // to 정점에서 from 정점으로의 간선 추가 (양방향)
    }

    /* 다익스트라 알고리즘을 통한 최단 경로 탐색 메서드 */
    dijkstra(start, end) {
        // 방문 여부, 거리, 이전 정점을 저장하는 객체들
        const visited = {};     // 방문한 정점들을 저장하는 객체
        const distances = {};  // 시작 정점으로부터의 거리를 저장하는 객체
        const previous = {};   // 각 정점의 이전 정점을 저장하는 객체
        const queue = [];      // 우선순위 큐

        // 초기화
        this.vertices.forEach(vertex => {
            distances[vertex] = Infinity;  // 시작 정점으로부터의 거리를 무한대로 초기화
            previous[vertex] = null;       // 각 정점의 이전 정점을 null로 초기화
        });

        distances[start] = 0;  // 시작 정점의 거리는 0으로 설정
        queue.push(start);     // 시작 정점을 우선순위 큐에 추가

        /* 다익스트라 알고리즘 수행
        다익스트라 알고리즘은 방문되지 않은 정점 중에서 현재까지의 최단 거리가 가장 짧은 정점을 선택하여 방문하는 것을 반복
        가장 짧은 거리를 가진 정점을 찾기 위해 우선순위 큐를 사용함
        우선순위 큐는 항목을 삽입할 때마다 해당 항목의 우선순위에 따라 정렬되기 때문에 항상 가장 우선순위가 높은 항목을 추출할 수 있음
        
        */
        while (queue.length > 0) {
            const currentVertex = queue.shift();  // shift 메서드 : 큐에서 가장 먼저 들어온 요소가 추출되어 처리
            // 목적지에 도착했으면 경로를 반환
            if (currentVertex === end) {
                const path = [];
                let vertex = end;
                while (vertex !== null) {
                    path.unshift(vertex);  // 경로에 정점 추가
                    vertex = previous[vertex];  // 이전 정점으로 이동
                }
                return path;
            }

            /* 현재 정점을 방문하지 않았다면 방문 표시하고 인접한 정점들을 처리 */
            if (!visited[currentVertex]) {
                visited[currentVertex] = true;  // 현재 정점을 방문했다고 표시
                // 인접한 정점들을 순회하면서 거리 갱신과 우선순위 큐에 추가
                this.edges[currentVertex].forEach(neighbor => {
                    const distance = distances[currentVertex] + 1;  // 가중치가 없다고 가정하여 거리는 1로 설정
                    if (distance < distances[neighbor]) {
                        distances[neighbor] = distance;       // 거리 갱신
                        previous[neighbor] = currentVertex;   // 이전 정점 설정
                        queue.push(neighbor);                 // 우선순위 큐에 추가
                    }
                });
            }
        }
        // 목적지까지의 경로가 없을 경우 null 반환
        return null;
    }
}

// 간단한 그래프 생성
const graph = new Graph();
graph.addVertex('A');
graph.addVertex('B');
graph.addVertex('C');
graph.addVertex('D');
graph.addVertex('E');
graph.addEdge('A', 'B');
graph.addEdge('A', 'C');
graph.addEdge('B', 'D');
graph.addEdge('C', 'D');
graph.addEdge('C', 'E');
graph.addEdge('B', 'C');
/*
   (A)
   / \
  /   \
(B)---(C)---(E)
  \   /
   \ /
   (D)

*/

// 경로 찾기
const start = 'A';
const end = 'E';
const shortestPath = graph.dijkstra(start, end);
console.log(`Shortest path from ${start} to ${end}:`, shortestPath.join(' -> '));
