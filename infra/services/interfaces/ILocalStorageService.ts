
export interface ILocalStorageService<T = any> {
    save: (key: string, data: T) => void,
    load: (key: string) => Promise<T | null>,
    remove: (id: string) => Promise<void>
}