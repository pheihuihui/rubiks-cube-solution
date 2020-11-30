import { RubiksCube, TRotationDirection, restoredCubePlaneView, restoredRubiksCube, rotationDirections, TPlaneFaceColor, TRubiksCubeOrientation } from "../model/RubiksCube"
import { cube } from ".."

export const testSolution = {
    'Phase1': ["B'", "F", "U'", "R", "L", "R", "D'", "U2"] as TRotationDirection[],
    'Phase2': ["B'", "F2", "F", "L2", "L", "B'", "B", "D'", "B2", "R", "L2"] as TRotationDirection[]
}

export const getReversedDirection: (val: string) => string = val => {
    if (val.length == 1) {
        return (val + "'")
    } else if (val.length == 2) {
        if (val[1] == "2") {
            return val
        } else if (val[1] == "'") {
            return val[0]
        } else {
            return "Wrong"
        }
    } else {
        return "Wrong"
    }
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

export function scrambleCube() {
    let len = rotationDirections.length + 1
    for (let _ = 0; _ < 100; _++) {
        let index = Math.floor(Math.random() * len)
        let cur = rotationDirections.concat('none' as TRotationDirection)[index]
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


declare global {
    interface Window {
        getNext: any
    }
}