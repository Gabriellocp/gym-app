
export interface IStorageService<T = any> {
    save: (data: T) => void,
    load: () => Promise<T | T[] | null>,
    remove: (id?: string) => Promise<void>,
}