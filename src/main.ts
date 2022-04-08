import LRUCache from "./LRUCache";

export const RunLRU = (actions: Array<string>, value: Array<Array<number>>): Array<string> =>  {
  let length = actions.length;
  const result = new Array<string>(length);
  result[0] = "null";
  let lru = new LRUCache(value[0][0]);
  for (let idx = 1; idx < length; idx++) {
    let action = actions[idx];
    switch (action) {
      case "put":
        lru.put(value[idx][0], value[idx][1]);
        result[idx] = "null";
        break;
      case "get":
        result[idx] = lru.get(value[idx][0]).toString()
        break;
    }
  }
  return result;
} 