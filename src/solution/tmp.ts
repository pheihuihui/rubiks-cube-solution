import { RubiksCube, TPlaneFaceColor, TRubiksCubeOrientation, allFaceColors, TFixedArray, TPlaneCube } from "../model/RubiksCube"
import { TFaceColor } from "../model/CubeCell"
import { cube } from ".."

const Cube = require('cubejs')

export function solveCube() {
    let str = deserializeCube(cube)
    let cc = new Cube.fromString(str)
    Cube.initSolver()
    let sol = cc.solve()
    console.log(sol)
}


// let cube = new Cube()
// cube.move("U F R2 B' D2 L'")
// cube.randomize()
// Cube.initSolver()
// let sol = cube.solve()
// console.log(sol)

const deserializeCube: (rcube: RubiksCube) => string = rcube => {
    let faces = rcube.getAllFaces()
    for (const key in faces) {
        if (Object.prototype.hasOwnProperty.call(faces, key)) {
            const element = faces[key as TPlaneFaceColor];

        }
    }

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
        solveRandom: any
    }
}