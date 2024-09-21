const Vertex = require('./vertex');

/**
 * 基于邻接表实现的无向图类
 * 
 * 1. 为了方便添加与删除顶点，使用数组来代替链表
 * 2. 使用哈希表来存储邻接表，key 为顶点实例，value 为该顶点的邻接顶点列表（链表）
 */
class GraphAdjList {
    // 邻接表，key: 顶点 value: 该顶点的所有邻接顶点
    adList;
    /**
     * 构造方法
     * @param {*} edges 边
     */
    constructor(edges) {
        this.adList = new Map();
        // 添加所有顶点和边
        for (const edge of edges) {
            this.addVertex(edge[0]);
            this.addVertex(edge[1]);
            this.addEdge(edge[0], edge[1]);
        }
    }
    /**
     * 获取顶点数量
     */
    size() {
        return this.adList.size;
    }

    /**
     * 添加边
     * @param {*} vet1 代表要添加边的节点1
     * @param {*} vet2 代表要添加边的节点2
     */
    addEdge(vet1, vet2) {
        // 边界处理
        if (!this.adList.has(vet1) || !this.adList.has(vet2) || vet1 === vet2) {
            throw new Error('Illegal Argument Exception');
        }
        // 添加边 vet1 - vet2
        this.adList.get(vet1).push(vet2);
        this.adList.get(vet2).push(vet1);
    }

    /**
     * 删除边
     * @param {*} vet1 代表边的节点1 
     * @param {*} vet2 代表边的节点2
     */
    removeEdge(vet1, vet2) {
        // 边界处理
        if (!this.adList.has(vet1) || !this.adList.has(vet2) || vet1 === vet2) {
            throw new Error('Illegal Argument Exception');
        }
        // 删除边 vet1 - vet2
        this.adList.get(vet1).splice(this.adList.get(vet1).indexOf(vet2), 1);
        this.adList.get(vet2).splice(this.adList.get(vet2).indexOf(vet1), 1);
    }

    /**
     * 添加顶点
     * @param {*} vet 
     */
    addVertex(vet) {
        if (this.adList.has(vet)) return;
        // 在邻接表中添加一个新链表
        this.adList.set(vet, []);
    }

    /**
     * 删除顶点
     * @param {*} vet 要删除的顶点
     */
    removeVertex(vet) {
        if (!this.adList.has(vet)) {
            throw new Error('Illegal Argument Exception');
        }
        // 在邻接表中删除顶点 vet 对应的链表
        this.adList.delete(vet);
        // 遍历其他顶点的链表，删除所有包含 vet 的边
        for (const set of this.adList.values()) {
            const index = set.indexOf(vet);
            if (index > -1) {
                set.splice(index, 1);
            }
        }
    }

    /**
     * 打印邻接表
     */
    print() {
        console.log('邻接表 = ');
        for (const [key, value] of this.adList) {
            const temp = [];
            for (const vertex of value) {
                temp.push(vertex.val);
            }
            console.log(key.val + ': ' + temp.join());
        }
    }
}

if (require.main === module) {
    /**
     * 初始化无向图
     */
    const v0 = new Vertex(1),
        v1 = new Vertex(3),
        v2 = new Vertex(2),
        v3 = new Vertex(5),
        v4 = new Vertex(4);

    const edges = [
        [v0, v1],
        [v1, v2],
        [v2, v3],
        [v0, v3],
        [v2, v4],
        [v3, v4],
    ];

    const graph = new GraphAdjList(edges);
    console.log('\n初始化后，图为');
    graph.print();

    /**
     * 添加边
     */
    graph.addEdge(v0, v2);
    console.log('\n添加边 1-2 后，图为');
    graph.print();

    /**
     * 删除边
     */
    graph.removeEdge(v0, v1);
    console.log('\n删除边 1-3 后，图为');
    graph.print();

    /**
     * 添加顶点
     */
    const v5 = new Vertex(6);
    graph.addVertex(v5);
    console.log('\n添加顶点 6 后，图为');
    graph.print();

    /**
     * 删除顶点
     */
    graph.removeVertex(v1);
    console.log('\n删除顶点 3 后，图为');
    graph.print();
}

module.exports = {
    GraphAdjList,
}