import { RubiksCube, restoredCubePlaneView } from './model/RubiksCube'
import { declareGlobals } from "./util/Utilities"
import ReactDOM from "react-dom";
import { all } from "./components/AllFaces";
import { st } from './components/StepPanel';


export const cube = new RubiksCube(restoredCubePlaneView)

declare global {
    interface Window {
        cube: any
    }
}

let panel = document.getElementById('displayPanel')
ReactDOM.render(st, panel)


declareGlobals()