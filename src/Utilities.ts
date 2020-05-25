import { RubiksCube } from "./RubiksCube"
import { cube } from "."

export function declareGlobals() {
    window.RubiksCube = RubiksCube
    window.cube = cube
}
