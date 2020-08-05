import { RubiksCube } from "../model/RubiksCube"
import { deserializeCube, testSolution } from "./Solution"

const Cube = require('cubejs')

export const getSolution = (rcube: RubiksCube) => {
    // let str = deserializeCube(rcube)
    // let cc = new Cube.fromString(str)
    // Cube.initSolver()
    // let sol = cc.solve()
    // return sol
    return testSolution
}
