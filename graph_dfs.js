/**
 * 图的深度优先遍历
 */
// 使用邻接表来表示图，以便获取指定顶点的所有邻接顶点
function dfs(graph, visited, res, vet) {
    // 记录访问节点
    res.push(vet);
    visited.add(vet);
    // 遍历该顶点的所有邻接顶点
    for (const adjVet of graph.adjList.get(vet)) {
        if (visited.has(adjVet)) {
            continue;
        }
        // 递归访问邻接顶点
        dfs(graph, visited, res, adjVet);
    }
}

function graphDFS(graph, startVet) {
    // 顶点遍历序列
    const res = [];
    // 哈希集合，用于记录已被访问过的顶点
    const visited = new Set();
    dfs(graph, visited, res, startVet);
    return res;
}