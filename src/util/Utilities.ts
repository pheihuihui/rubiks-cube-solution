import { RubiksCube, getCoordFromIndex, restoredRubiksCube } from "../model/RubiksCube"
import { cube } from ".."
import { hashCube, getNext } from "../solution/Solution"

export function declareGlobals() {
    window.RubiksCube = RubiksCube
    window.cube = cube
    window.getCoordFromIndex = getCoordFromIndex
    window.hashCube = hashCube
    window.restoredRubiksCube = restoredRubiksCube
    window.getNext = getNext
}
