import { RubiksCube, TRotationDirection, restoredCubePlaneView, restoredRubiksCube, RotationDirections, TPlaneFaceColor, TRubiksCubeOrientation } from "../model/RubiksCube";
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

export const decomposeSteps: (steps: string) => string[] = steps => {
    return steps.split(' ')
}

const composeSteps: (steps: string[]) => string = steps => {
    let res = ""
    for (const u of steps) {
        res += " " + u
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

export function scrambleCube() {
    let len = RotationDirections.length
    for (let _ = 0; _ < 100; _++) {
        let index = Math.floor(Math.random() * len)
        let cur = RotationDirections[index]
        cube.rotate(cur)
    }
}

export const deserializeCube: (rcube: RubiksCube) => string = rcube => {
    let faces = rcube.getAllFaces()
    return ['yel', 'red', 'blu', 'whi', 'ora', 'gre'].reduce((pre, cur, index) => {
        let clrs = faces[cur as TPlaneFaceColor]
        let str1 = [0, 1, 2, 3].map(x => clrs[x]).map(x => colorToPos(x)).join('')
        let str2 = [4, 5, 6, 7].map(x => clrs[x]).map(x => colorToPos(x)).join('')
        let tmp = str1.concat(colorToPos(cur as TPlaneFaceColor)).concat(str2)
        return pre.concat(tmp)
    }, '')
}

const colorToPos: (color: TPlaneFaceColor) => TRubiksCubeOrientation = color => {
    switch (color) {
        case 'blu': return 'F'
        case 'gre': return 'B'
        case 'ora': return 'L'
        case 'red': return 'R'
        case 'whi': return 'D'
        case 'yel': return 'U'
    }
}