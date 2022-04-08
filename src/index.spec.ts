import Pair from "./Pair";
import Node from "./Node";
import { RunLRU } from "./main";

describe('Basic Test', () => {
  it('Node(1,2)==Node(1,2)', () => {
    let node1: &(Node<Pair>) = new Node(new Pair(1,2), null, null);
    let node2: &(Node<Pair>) = new Node(new Pair(1,2), null, null); 
    expect(node1.equals(node2)).toBe(true);
  });
  it('cacheMap test', () => {
    let cacheMap = new Map<number, &(Node<Pair>)>();
    let node1: &(Node<Pair>) = new Node(new Pair(1,2), null, null);
    cacheMap.set(node1.value.K, node1);
    expect(cacheMap.get(node1.value.K).value.V).toBe(node1.value.V);
    expect(cacheMap.get(0)).toBeFalsy();
  });
  it('LRUCacheTest', () => {
    expect(RunLRU(["LRUCache", "put", "put", "get", "put", "get", "put", "get", "get", "get"], 
      [[2], [1, 1], [2, 2], [1], [3, 3], [2], [4, 4], [1], [3], [4]]))
      .toEqual(["null", "null", "null", "1", "null", "-1", "null", "-1", "3", "4"])
  });
});