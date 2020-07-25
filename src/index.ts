import { RubiksCube, restoredCubePlaneView } from './model/RubiksCube'
import { declareGlobals } from "./util/Utilities"
import ReactDOM from "react-dom";
import { all } from "./components/AllFaces";
import { cb } from './components/CubeContainer';

export const cube = new RubiksCube(restoredCubePlaneView)

declare global {
    interface Window {
        cube: any
    }
}

let panel = document.getElementById('displayPanel')
ReactDOM.render(all, panel)

document.body.style.backgroundColor = '#2f4384'

declareGlobals()