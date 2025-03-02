export function useMemory() {
  const data = new Map<number, any>();

  return {
    getInstance: () => data,
    hasItem(key: number) {
      return data.has(key);
    },
    getItem(key: number) {
      return data.get(key) ?? null;
    },
    getItemRaw(key: number) {
      return data.get(key) ?? null;
    },
    setItem(key: number, value: any) {
      data.set(key, value);
    },
    setItemRaw(key: number, value: any) {
      data.set(key, value);
    },
    removeItem(key: number) {
      data.delete(key);
    },
    getKeys() {
      return [...data.keys()];
    },
    clear() {
      data.clear();
    },
    dispose() {
      data.clear();
    },
    getSize() {
      return data.size;
    },
  };
}
