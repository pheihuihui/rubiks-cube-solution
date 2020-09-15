import { RubiksCube, restoredCubePlaneView } from './model/RubiksCube'
import { declareGlobals } from "./util/Utilities"
import ReactDOM from "react-dom";
import { all } from "./components/AllFaces";
import { TFaceColor } from './model/Cubie';

export const cube = new RubiksCube(restoredCubePlaneView)

export const globalColors = {
    documentBodyBackgroudColor: [0x33, 0x80, 0x7b]
}

export const cssFaceColors: { [T in Exclude<TFaceColor, 'blk'>]: string } = {
    yel: '#b6be46',
    ora: '#c78d29',
    blu: '#297dc7',
    red: '#ce276a',
    whi: '#ffffff',
    gre: '#5ea66c'
}

declare global {
    interface Window {
        cube: any
    }
}

let panel = document.getElementById('displayPanel')
panel?.style.setProperty('display', 'flex')
panel?.style.setProperty('align-items', 'center')
panel?.style.setProperty('justify-content', 'center')
ReactDOM.render(all, panel)

document.body.style.backgroundColor = '#33807b'

declareGlobals()