export interface IRepository<T = any> {
    save: (model: T) => Promise<T | undefined>
    getAll: () => Promise<T[]>
    getById: (id: string) => Promise<T | undefined | null>
    delete: (id: string) => Promise<boolean>
}