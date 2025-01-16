
export interface IDatabase<T> {
    connect: (dbName: string) => Promise<void>
    getDb: () => T
}
