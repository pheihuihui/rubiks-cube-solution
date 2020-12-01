import { TFaceColor, Cubie, TRotationDirection } from "./Cubie"
import { EventDispatcher } from "../util/utilities"

export type TRubiksCubeOrientation = "L" | "R" | "F" | "B" | "U" | "D"
export type TPlaneFaceColor = Exclude<TFaceColor, 'blk'>
export type TCellCoordinate = {
    x: -1 | 0 | 1
    y: -1 | 0 | 1
    z: -1 | 0 | 1
}
type TGrow<T, A extends Array<T>> = ((x: T, ...xs: A) => void) extends ((...a: infer X) => void) ? X : never
type TGrowToSize<T, A extends Array<T>, N extends number> = { 0: A, 1: TGrowToSize<T, TGrow<T, A>, N> }[A['length'] extends N ? 0 : 1]
export type TFixedArray<T, N extends number> = TGrowToSize<T, [], N>
export type TFaceColors<T> = {
    [C in T & string]: TFixedArray<T, 8>
}
export type TAllCells = {
    [index: string]: Cubie
}
export type TPlaneCube = TFaceColors<TPlaneFaceColor>

export const allFaceColors: TFixedArray<TPlaneFaceColor, 6> = ['blu', 'gre', 'ora', 'red', 'whi', 'yel']

export const restoredCubePlaneView: TPlaneCube = {
    blu: Array(8).fill('blu') as TFixedArray<TPlaneFaceColor, 8>,
    gre: Array(8).fill('gre') as TFixedArray<TPlaneFaceColor, 8>,
    ora: Array(8).fill('ora') as TFixedArray<TPlaneFaceColor, 8>,
    red: Array(8).fill('red') as TFixedArray<TPlaneFaceColor, 8>,
    whi: Array(8).fill('whi') as TFixedArray<TPlaneFaceColor, 8>,
    yel: Array(8).fill('yel') as TFixedArray<TPlaneFaceColor, 8>
}

export const cubeOrientationAndColors: { [oren: string]: TPlaneFaceColor } = {
    'L': 'ora',
    'R': 'red',
    'U': 'yel',
    'D': 'whi',
    'F': 'blu',
    'B': 'gre'
}

export const getIndexFromCoord = (coord: TCellCoordinate) => {
    return [coord.x, coord.y, coord.z].map(a => {
        if (a == -1) return '-'
        if (a == 0) return '0'
        if (a == 1) return '1'
        return ''
    }).join('')
}

export const getCoordFromIndex = (index: string) => {
    const tmp = (x: string): -1 | 0 | 1 | undefined => { if (x == '-') return -1; if (x == '0') return 0; if (x == '1') return 1 }
    let res: TCellCoordinate = { x: 0, y: 0, z: 0 }
    let empty: TCellCoordinate = { x: 0, y: 0, z: 0 }
    if (index.length == 3) {
        let xx = tmp(index[0])
        let yy = tmp(index[1])
        let zz = tmp(index[2])
        if (xx != undefined && yy != undefined && zz != undefined) {
            res.x = xx
            res.y = yy
            res.z = zz
            return res
        }
    }
    return empty
}

declare global {
    interface Window {
        getCoordFromIndex: any
    }
}

export class RubiksCube {
    private cells: TAllCells
    public onDidRestoreDispatcher = new EventDispatcher<void>()
    public onDidRotateDispatcher = new EventDispatcher<TRotationDirection>()

    getAllCells() {
        return this.cells
    }

    constructor(planes: TPlaneCube) {
        this.cells = {}
        for (const xx of [-1, 0, 1] as const) {
            for (const yy of [-1, 0, 1] as const) {
                for (const zz of [-1, 0, 1] as const) {
                    let index = getIndexFromCoord({ x: xx, y: yy, z: zz })
                    this.cells[index] = new Cubie({})
                }
            }
        }
        this.setColorsToSide('B', planes['gre'], 'gre')
        this.setColorsToSide('F', planes['blu'], 'blu')
        this.setColorsToSide('L', planes['ora'], 'ora')
        this.setColorsToSide('R', planes['red'], 'red')
        this.setColorsToSide('U', planes['yel'], 'yel')
        this.setColorsToSide('D', planes['whi'], 'whi')
    }

    private setColorsToSide(side: TRubiksCubeOrientation, colors: TFaceColor[], center: TFaceColor) {
        let face = this.getSideCellsWithOrder(side)
        for (const it of [0, 1, 2, 3]) {
            this.cells[face[it]].setColors({ [side.toLowerCase()]: colors[it] })
        }
        this.cells[face[4]].setColors({ [side.toLowerCase()]: center })
        for (const it of [5, 6, 7, 8]) {
            this.cells[face[it]].setColors({ [side.toLowerCase()]: colors[it - 1] })
        }
    }

    private rotateFace(cells: TFixedArray<string, 9>, dir: 'clock' | 'rever') {
        if (dir == 'clock') {
            return [cells[6], cells[3], cells[0], cells[7], cells[4], cells[1], cells[8], cells[5], cells[2]]
        }
        if (dir == 'rever') {
            return [cells[2], cells[5], cells[8], cells[1], cells[4], cells[7], cells[0], cells[3], cells[6]]
        }
        return cells
    }

    private _rotate(sideCells: TFixedArray<string, 9>, dirF: 'clock' | 'rever', dirC: TRotationDirection) {
        let oldIndex = sideCells
        let newIndex = this.rotateFace(oldIndex, dirF) as TFixedArray<string, 9>

        [
            this.cells[oldIndex[0]],
            this.cells[oldIndex[1]],
            this.cells[oldIndex[2]],
            this.cells[oldIndex[3]],
            this.cells[oldIndex[4]],
            this.cells[oldIndex[5]],
            this.cells[oldIndex[6]],
            this.cells[oldIndex[7]],
            this.cells[oldIndex[8]]
        ] = [
                this.cells[newIndex[0]],
                this.cells[newIndex[1]],
                this.cells[newIndex[2]],
                this.cells[newIndex[3]],
                this.cells[newIndex[4]],
                this.cells[newIndex[5]],
                this.cells[newIndex[6]],
                this.cells[newIndex[7]],
                this.cells[newIndex[8]]
            ]
        for (const it of sideCells.map(v => this.cells[v])) {
            it.rotate(dirC)
        }
    }

    rotate(dir: TRotationDirection) {
        switch (dir) {
            case "F":
                this._rotate(this.getSideCellsWithOrder("F") as TFixedArray<string, 9>, 'clock', dir)
                break
            case "F'":
                this._rotate(this.getSideCellsWithOrder("F") as TFixedArray<string, 9>, 'rever', dir)
                break
            case "F2":
                this._rotate(this.getSideCellsWithOrder("F") as TFixedArray<string, 9>, 'clock', "F")
                this._rotate(this.getSideCellsWithOrder("F") as TFixedArray<string, 9>, 'clock', "F")
                break

            case "B":
                this._rotate(this.getSideCellsWithOrder("B") as TFixedArray<string, 9>, 'clock', dir)
                break
            case "B'":
                this._rotate(this.getSideCellsWithOrder("B") as TFixedArray<string, 9>, 'rever', dir)
                break
            case "B2":
                this._rotate(this.getSideCellsWithOrder("B") as TFixedArray<string, 9>, 'clock', "B")
                this._rotate(this.getSideCellsWithOrder("B") as TFixedArray<string, 9>, 'clock', "B")
                break

            case "L":
                this._rotate(this.getSideCellsWithOrder("L") as TFixedArray<string, 9>, 'clock', dir)
                break
            case "L'":
                this._rotate(this.getSideCellsWithOrder("L") as TFixedArray<string, 9>, 'rever', dir)
                break
            case "L2":
                this._rotate(this.getSideCellsWithOrder("L") as TFixedArray<string, 9>, 'clock', "L")
                this._rotate(this.getSideCellsWithOrder("L") as TFixedArray<string, 9>, 'clock', "L")
                break

            case "R":
                this._rotate(this.getSideCellsWithOrder("R") as TFixedArray<string, 9>, 'clock', dir)
                break
            case "R'":
                this._rotate(this.getSideCellsWithOrder("R") as TFixedArray<string, 9>, 'rever', dir)
                break
            case "R2":
                this._rotate(this.getSideCellsWithOrder("R") as TFixedArray<string, 9>, 'clock', "R")
                this._rotate(this.getSideCellsWithOrder("R") as TFixedArray<string, 9>, 'clock', "R")
                break

            case "U":
                this._rotate(this.getSideCellsWithOrder("U") as TFixedArray<string, 9>, 'clock', dir)
                break
            case "U'":
                this._rotate(this.getSideCellsWithOrder("U") as TFixedArray<string, 9>, 'rever', dir)
                break
            case "U2":
                this._rotate(this.getSideCellsWithOrder("U") as TFixedArray<string, 9>, 'clock', "U")
                this._rotate(this.getSideCellsWithOrder("U") as TFixedArray<string, 9>, 'clock', "U")
                break

            case "D":
                this._rotate(this.getSideCellsWithOrder("D") as TFixedArray<string, 9>, 'clock', dir)
                break
            case "D'":
                this._rotate(this.getSideCellsWithOrder("D") as TFixedArray<string, 9>, 'rever', dir)
                break
            case "D2":
                this._rotate(this.getSideCellsWithOrder("D") as TFixedArray<string, 9>, 'clock', "D")
                this._rotate(this.getSideCellsWithOrder("D") as TFixedArray<string, 9>, 'clock', "D")
                break

            default:
                const _: never = dir
                break
        }
        this.onDidRotateDispatcher.excute(dir)
    }

    rotated(dir: TRotationDirection) {
        let plane = this.getAllFaces()
        let newCube = new RubiksCube(plane)
        newCube.rotate(dir)
        return newCube
    }

    private getSideCellsWithOrder(side: TRubiksCubeOrientation) {
        switch (side) {
            case 'F': {
                return ['-11', '011', '111', '-01', '001', '101', '--1', '0-1', '1-1']
            }

            case 'B': {
                return ['11-', '01-', '-1-', '10-', '00-', '-0-', '1--', '0--', '---']
            }

            case 'L': {
                return ['-1-', '-10', '-11', '-0-', '-00', '-01', '---', '--0', '--1']
            }

            case 'R': {
                return ['111', '110', '11-', '101', '100', '10-', '1-1', '1-0', '1--']
            }

            case 'U': {
                return ['-1-', '01-', '11-', '-10', '010', '110', '-11', '011', '111']
            }

            case 'D': {
                return ['--1', '0-1', '1-1', '--0', '0-0', '1-0', '---', '0--', '1--']
            }

            default:
                const checking: never = side
                return []
        }
    }

    getAllFaces(): TPlaneCube {
        let _blu = this.getSideCellsWithOrder('F').map(a => this.cells[a].colorF)
        let _ora = this.getSideCellsWithOrder('L').map(a => this.cells[a].colorL)
        let _red = this.getSideCellsWithOrder('R').map(a => this.cells[a].colorR)
        let _yel = this.getSideCellsWithOrder('U').map(a => this.cells[a].colorU)
        let _gre = this.getSideCellsWithOrder('B').map(a => this.cells[a].colorB)
        let _whi = this.getSideCellsWithOrder('D').map(a => this.cells[a].colorD)
        for (const it of [_blu, _ora, _red, _yel, _gre, _whi]) {
            it.splice(4, 1)
        }
        return {
            blu: _blu as TFixedArray<TPlaneFaceColor, 8>,
            ora: _ora as TFixedArray<TPlaneFaceColor, 8>,
            red: _red as TFixedArray<TPlaneFaceColor, 8>,
            yel: _yel as TFixedArray<TPlaneFaceColor, 8>,
            gre: _gre as TFixedArray<TPlaneFaceColor, 8>,
            whi: _whi as TFixedArray<TPlaneFaceColor, 8>
        }
    }

    isEqualTo(rb: RubiksCube) {
        let a = this.getAllFaces()
        let b = rb.getAllFaces()
        return (
            (JSON.stringify(a.blu) == JSON.stringify(b.blu)) &&
            (JSON.stringify(a.gre) == JSON.stringify(b.gre)) &&
            (JSON.stringify(a.ora) == JSON.stringify(b.ora)) &&
            (JSON.stringify(a.red) == JSON.stringify(b.red)) &&
            (JSON.stringify(a.whi) == JSON.stringify(b.whi)) &&
            (JSON.stringify(a.yel) == JSON.stringify(b.yel))
        )
    }

    restore(planes?: TPlaneCube) {
        this.cells = {}
        for (const xx of [-1, 0, 1] as const) {
            for (const yy of [-1, 0, 1] as const) {
                for (const zz of [-1, 0, 1] as const) {
                    let index = getIndexFromCoord({ x: xx, y: yy, z: zz })
                    this.cells[index] = new Cubie({})
                }
            }
        }
        if (planes) {
            this.setColorsToSide('B', planes['gre'], 'gre')
            this.setColorsToSide('F', planes['blu'], 'blu')
            this.setColorsToSide('L', planes['ora'], 'ora')
            this.setColorsToSide('R', planes['red'], 'red')
            this.setColorsToSide('U', planes['yel'], 'yel')
            this.setColorsToSide('D', planes['whi'], 'whi')
        } else {
            this.setColorsToSide('B', restoredCubePlaneView['gre'], 'gre')
            this.setColorsToSide('F', restoredCubePlaneView['blu'], 'blu')
            this.setColorsToSide('L', restoredCubePlaneView['ora'], 'ora')
            this.setColorsToSide('R', restoredCubePlaneView['red'], 'red')
            this.setColorsToSide('U', restoredCubePlaneView['yel'], 'yel')
            this.setColorsToSide('D', restoredCubePlaneView['whi'], 'whi')
        }
        this.onDidRestoreDispatcher.excute()
    }
}

export const restoredRubiksCube = new RubiksCube(restoredCubePlaneView)

declare global {
    interface Window {
        RubiksCube: any
        restoredRubiksCube: any
    }
}
