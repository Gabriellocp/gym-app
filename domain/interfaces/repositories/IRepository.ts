export interface IRepository<T = any> {
    save: (model: T) => Promise<T | undefined>
    getAll: () => Promise<T[]>
    getById: (id: any) => Promise<T | undefined | null>
    delete: (id: any) => Promise<boolean>
}