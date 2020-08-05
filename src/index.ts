import { RubiksCube, restoredCubePlaneView } from './model/RubiksCube'
import { declareGlobals } from "./util/Utilities"
import ReactDOM from "react-dom";
import { all } from "./components/AllFaces";

export const cube = new RubiksCube(restoredCubePlaneView)

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