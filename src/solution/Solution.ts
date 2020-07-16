import { RubiksCube, TRotationDirection, restoredCubePlaneView, restoredRubiksCube } from "../model/RubiksCube";
import { cube } from "..";
import { declareGlobals } from "../util/Utilities";
let md5 = require('md5');

const getSolution: (rcube: RubiksCube) => Record<string, Array<TRotationDirection>> = r => {
    return {
        'G0 -> G1': ["B'", "R'", "U", "F", "U'", "R", "L"],
        'G1 -> G2': ["B'", "B", "U'", "R", "L"],
        'G2 -> G3': ["B'", "F", "U'", "R", "L", "R"],
        'G3 -> G4': ["B'", "F", "F", "L'", "L", "B'", "B", "D'"]
    }
}

const reduceGroup: (start: RubiksCube) => (finish: RubiksCube) => string = start => finish => {
    return ''
}

export const getNext: (start: RubiksCube) => (steps: string) => RubiksCube = start => steps => {
    let res = new RubiksCube(start.getAllFaces())
    let dsteps = decomposeSteps(steps)
    for (const u of dsteps) {
        res.rotate(u as TRotationDirection)
    }
    return res
}

const decomposeSteps: (steps: string) => string[] = steps => {
    let res = [] as string[]
    for (const u of steps) {
        if (u != "'") {
            res.push(u)
        } else {
            let len = res.length
            if (res[len - 1] && res[len - 1].length == 1) {
                res[len - 1] += "'"
            }
        }
    }
    return res
}

const composeSteps: (steps: string[]) => string = steps => {
    let res = ""
    for (const u of steps) {
        res += u
    }
    return res
}

// type TGenerate = () => string[]

// const generateCube: (gen: TGenerate) => RubiksCube = gen => {
//     let start = new RubiksCube(restoredCubePlaneView)
//     let steps = gen()
//     for (const u of steps) {
//         start = start.rotated(u as TRotationDirection)
//     }
//     return start
// }


export const hashCube = (rcube: RubiksCube) => {
    let faces = rcube.getAllFaces()
    let res = md5(JSON.stringify(faces)) as string
    return res
}


declare global {
    interface Window {
        hashCube: any
        getNext: any
    }
}

