import AsyncStorage from '@react-native-async-storage/async-storage';
import { IStorageService } from "./interfaces/IStorageService";

class LocalStorageService<T> implements IStorageService<T> {
    async load(key: string) {
        try {
            const item = await AsyncStorage.getItem(key)
            if (!item) {
                return null
            }
            return JSON.parse(item) as T
        } catch (err) {
            return null
        }
    };

    save(id: string, data: T): void {
        try {
            AsyncStorage.setItem(id, JSON.stringify(data))
        } catch (err) {

        }
    };

}

export default LocalStorageService