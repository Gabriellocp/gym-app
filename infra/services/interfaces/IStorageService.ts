
export interface IStorageService<T = any, R = string,> {
    save: (id: string, data: T) => void,
    load: (id: R) => Promise<T | null>,
}