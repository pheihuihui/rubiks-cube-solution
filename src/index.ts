import { RubiksCube, restoredCubePlaneView, getCoordFromIndex, restoredRubiksCube } from './model/RubiksCube'
import { fromPlaneView, fromRGB } from "./util/utilities"
import ReactDOM from "react-dom";
import { all } from "./components/AllFaces";
import { getNext } from './solution/Solution';
export const _Cube = require('cubejs')

export const cube = new RubiksCube(restoredCubePlaneView)
export const currentPlaneView = fromPlaneView(restoredCubePlaneView)

export const globalColors = {
    documentBodyBackgroudColor: fromRGB([0x33, 0x80, 0x7b])
}

declare global {
    interface Window {
        cube: any
        _Cube: any
    }
}

let panel = document.getElementById('displayPanel')

window._Cube = _Cube

ReactDOM.render(all, panel)

document.body.style.backgroundColor = '#33807b'

export function declareGlobals() {
    window.RubiksCube = RubiksCube
    window.cube = cube
    window.getCoordFromIndex = getCoordFromIndex
    window.restoredRubiksCube = restoredRubiksCube
    window.getNext = getNext
}

declareGlobals()