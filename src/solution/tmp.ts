import { RubiksCube, TRotationDirection } from "../model/RubiksCube"
import { deserializeCube, testSolution } from "./Solution"

const Cube = require('cubejs')

export const getSolution = (rcube: RubiksCube) => {
    let str = deserializeCube(rcube)
    let cc = Cube.fromString(str)
    Cube.initSolver()
    let solstr = cc.solve() as string
    let sol = solstr.split(' ') as TRotationDirection[]
    console.log(sol)
    let p1 = sol.splice(0, 8)
    let p2 = sol
    return {
        Phase1: p1,
        Phase2: p2
    }
}
