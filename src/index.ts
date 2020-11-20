import { RubiksCube, restoredCubePlaneView } from './model/RubiksCube'
import { declareGlobals, fromRGB } from "./util/utilities"
import ReactDOM from "react-dom";
import { all } from "./components/AllFaces";
import { TFaceColor } from './model/Cubie';

export const cube = new RubiksCube(restoredCubePlaneView)

export const globalColors = {
    documentBodyBackgroudColor: fromRGB([0x33, 0x80, 0x7b])
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
ReactDOM.render(all, panel)

document.body.style.backgroundColor = '#33807b'

declareGlobals()