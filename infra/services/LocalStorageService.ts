import AsyncStorage from '@react-native-async-storage/async-storage';
import { ILocalStorageService } from './interfaces/ILocalStorageService';

class LocalStorageService<T> implements ILocalStorageService<T> {
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

    async remove(id: string): Promise<void> {
        await AsyncStorage.removeItem(id)
    }

}

export default LocalStorageService