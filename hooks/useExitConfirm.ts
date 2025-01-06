import { useNavigation } from "expo-router"
import { useEffect } from "react"
import { Alert, BackHandler, Platform } from "react-native"
type ExitConfirmProps = {
    message?: string
}

export default function useExitConfirm({
    message
}: ExitConfirmProps = { message: '' }) {

    const navigation = useNavigation()
    useEffect(() => {
        if (Platform.OS === "web") {
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
                    text: 'Sim', onPress: () => {
                        console.log(isExitingApp)
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