// In-memory demo store. Replace this adapter with a backend client in a future phase.
export function createDemoService(recordType) {
  return {
    list(records = []) {
      return Array.isArray(records) ? [...records] : [];
    },
    getById(records = [], id) {
      return records.find((record) => record.id === id) || null;
    },
    create(records = [], record) {
      return [...records, record];
    },
    update(records = [], id, changes) {
      return records.map((record) => record.id === id ? { ...record, ...changes, updatedAt: new Date().toISOString() } : record);
    },
    meta: { recordType, mode: "demo", persistent: false },
  };
}
