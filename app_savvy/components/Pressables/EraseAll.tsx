import AsyncStorage from "@react-native-async-storage/async-storage"
import { Button } from "react-native"

export const EraseAll = () => <Button title="Erase all" onPress={() => { AsyncStorage.clear() }} />