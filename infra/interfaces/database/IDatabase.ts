
export interface IDatabase {
    connect: (dbName: string) => Promise<void>

}
