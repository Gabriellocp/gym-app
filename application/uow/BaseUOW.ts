import { IUnitOfWork } from "../interfaces/unit-of-work/IUnitOfWork";

abstract class BaseUOW<T = any> implements IUnitOfWork {
    constructor(protected db: T, protected repos: Map<string, any> = new Map()) { }
    begin = async () => { };
    commit = async () => { };
    rollback = async () => { };
    addRepo = <R>(repo: R, key: string) => {
        this.repos.set(key, repo as R)
    };
    getRepo = <R>(key: string) => {
        return this.repos.get(key) as R
    };
}

export default BaseUOW