import { Appearance } from "react-native"
import { getStorage } from "./storage";

const verifyTheme = async (setModeColor) => {
    const colorSchema = Appearance.getColorScheme();
    let mode = await getStorage('modeColor');

    if(!mode){
        mode = colorSchema || 'light';
    }

    setModeColor(mode)
}
export {
    verifyTheme
}