import { TRotationDirection } from "../model/Cubie"
import { RubiksCube } from "../model/RubiksCube"
import { deserializeCube, TSteps } from "./Solution"

const Cube = require('cubejs')

export const _getSolution: (rcube: RubiksCube) => TSteps = rcube => {
    let str = deserializeCube(rcube)
    let cc = Cube.fromString(str)
    Cube.initSolver()
    let solstr = cc.solve() as string
    let sol = solstr.split(' ') as TRotationDirection[]
    // console.log(sol)
    let p1 = sol.splice(0, 8)
    let p2 = sol
    return {
        Phase1: p1,
        Phase2: p2
    }
}

export const __getSolution: (dcube: string) => TSteps = dcube => {
    let cc = Cube.fromString(dcube)
    Cube.initSolver()
    let solstr = cc.solve() as string
    let sol = solstr.split(' ') as TRotationDirection[]
    // console.log(sol)
    let p1 = sol.splice(0, 8)
    let p2 = sol
    return {
        Phase1: p1,
        Phase2: p2
    }
}