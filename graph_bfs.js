/**
 * 图的广度优先遍历 BFS
 * BFS 通常借助队列来实现。队列具有【先入先出】的性质，这与BFS的【由近及远】的思想异曲同工
 * 1. 将遍历起始顶点 startVet 加入队列，并开启循环。
 * 2. 在循环的每轮迭代中，弹出队首顶点并记录访问，然后将该顶点的所有邻接顶点加入到队列尾部。
 * 3. 循环步骤 2，直到所有顶点被访问完后结束。
 * 
 * 为了防止重复边遍历顶点，需要借助一个哈希集合 visited 来记录哪些节点已被访问。
 */
// 使用邻接表来表示图，以便获取指定顶点的所有邻接顶点
function graphBFS(graph, startVet) {
    // 顶点遍历序列
    const res = [];
    // 哈希集合，表示已经访问过的节点
    const visited = new Set();
    visited.add(startVet);
    // 队列用于实现 BFS
    const que = [startVet];
    // 以顶点 vet 为起点，循环直至访问完所有顶点
    while (que.length) {
        // 队首顶点出队
        const vet = que.shift();
        // 记录访问节点
        res.push(vet);
        // 遍历顶点的所有邻接顶点
        for (const adjVet of graph.adjList.get(vet) ?? []) {
            // 跳过访问过的节点
            if (visited.has(adjVet)) {
                continue
            }
            que.push(adjVet);
            visited.add(adjVet);
        }
    }
    return res;
}