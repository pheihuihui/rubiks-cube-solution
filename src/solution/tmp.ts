import { RubiksCube, TPlaneFaceColor, TRubiksCubeOrientation, allFaceColors, TFixedArray, TPlaneCube } from "../model/RubiksCube"
import { TFaceColor } from "../model/CubeCell"
import { cube } from ".."
import { deserializeCube } from "./Solution"

const Cube = require('cubejs')

export const getSolution = (rcube: RubiksCube) => {
    let str = deserializeCube(rcube)
    let cc = new Cube.fromString(str)
    Cube.initSolver()
    let sol = cc.solve()
    return sol
}
