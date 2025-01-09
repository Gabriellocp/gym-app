import { useNavigation } from "expo-router"
import { useEffect } from "react"
import { Alert, BackHandler, Platform } from "react-native"
type ExitConfirmProps = {
    message?: string,
    callback?: () => Promise<void>,
    condition?: boolean
}

export default function useExitConfirm({
    message,
    callback,
    condition = true
}: ExitConfirmProps = {

    }) {

    const navigation = useNavigation()
    useEffect(() => {
        if (Platform.OS === "web" || !condition) {
            return
        }
        const isExitingApp = navigation.getState()?.index === 0
        const confirm = (e?: any) => {
            const userInput = !!e
            const navigationBackFn = () => userInput ? navigation.dispatch({ ...e.data.action }) : navigation.goBack()
            if (userInput) { e?.preventDefault() }
            Alert.alert('Deseja sair?', message ?? '', [
                { text: 'Cancelar', onPress: () => null },
                {
                    text: 'Sim', onPress: async () => {
                        await callback?.()
                        return isExitingApp ? BackHandler.exitApp() : navigationBackFn()
                    },
                },
            ])
            return true
        }
        if (isExitingApp) {
            BackHandler.addEventListener('hardwareBackPress', confirm)
        } else {
            navigation.addListener('beforeRemove', confirm)
        }
        return () => {
            BackHandler.removeEventListener('hardwareBackPress', confirm)
            navigation.removeListener('beforeRemove', confirm)
        }
    }, [navigation])
}