import { TFaceColor, CubeCell } from "./CubeCell"

export type TRotationDirection = "L" | "L'" | "R" | "R'" | "F" | "F'" | "B" | "B'" | "U" | "U'" | "D" | "D'"
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
    [index: string]: CubeCell
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

export const CubeOrientationAndColors: { [oren: string]: TPlaneFaceColor } = {
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
        if (xx && yy && zz) {
            res.x = xx
            res.y = yy
            res.z = zz
            return res
        }
    }
    return empty
}

export class RubiksCube {
    private cells: TAllCells

    constructor(planes: TPlaneCube) {
        this.cells = {}
        for (const xx of [-1, 0, 1] as const) {
            for (const yy of [-1, 0, 1] as const) {
                for (const zz of [-1, 0, 1] as const) {
                    let index = getIndexFromCoord({ x: xx, y: yy, z: zz })
                    this.cells[index] = new CubeCell({})
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
        let face = this.getSideWithOrder(side)
        for (const it of [0, 1, 2, 3]) {
            face[it].setColors({ [side.toLowerCase()]: colors[it] })
        }
        face[4].setColors({ [side.toLowerCase()]: center })
        for (const it of [4, 5, 6, 7]) {
            face[it + 1].setColors({ [side.toLowerCase()]: colors[it] })
        }
    }

    private rotatedPlane(planes: TFixedArray<string, 9>, dir: 'clock' | 'rever') {
        let arr = [[0, 1, 2], [3, 4, 5], [6, 7, 8]].map(a => a.map(b => planes[b]))
        if (dir == 'clock') {
            return arr[0].map((col, i) => arr.map(row => row[i]).reverse()).reduce((pre, cur) => { let res = pre.concat(cur); return res }, [])
        }
        if (dir == 'rever') {
            return arr[0].map((col, i) => arr.map(row => row[2 - i])).reduce((pre, cur) => { let res = pre.concat(cur); return res }, [])
        }
        return planes
    }

    private rotateNumbers(cells: TFixedArray<number, 9>, dir: 'clock' | 'rever') {
        let arr = [[0, 1, 2], [3, 4, 5], [6, 7, 8]].map(a => a.map(b => cells[b]))
        if (dir == 'clock') {
            return arr[0].map((col, i) => arr.map(row => row[i]).reverse()).reduce((pre, cur) => { return pre.concat(cur) }, [])
        } else {
            return arr[0].map((col, i) => arr.map(row => row[2 - i])).reduce((pre, cur) => { return pre.concat(cur) }, [])
        }
    }

    private _rotate(sideCells: TFixedArray<CubeCell, 9>, dirF: 'clock' | 'rever', dirC: TRotationDirection) {
        let oldIndex = [0, 1, 2, 3, 4, 5, 6, 7, 8] as TFixedArray<number, 9>
        let newIndex = this.rotateNumbers(oldIndex, dirF) as TFixedArray<number, 9>
        [
            sideCells[newIndex[0]],
            sideCells[newIndex[1]],
            sideCells[newIndex[2]],
            sideCells[newIndex[3]],
            sideCells[newIndex[4]],
            sideCells[newIndex[5]],
            sideCells[newIndex[6]],
            sideCells[newIndex[7]],
            sideCells[newIndex[8]]
        ] = [
                sideCells[0],
                sideCells[1],
                sideCells[2],
                sideCells[3],
                sideCells[4],
                sideCells[5],
                sideCells[6],
                sideCells[7],
                sideCells[8]
            ]
        for (const it of sideCells) {
            it.rotate(dirC)
        }
    }

    rotate(dir: TRotationDirection) {
        switch (dir) {
            case "F":
                this._rotate(this.getSideWithOrder("F") as TFixedArray<CubeCell, 9>, 'clock', dir)
                break
            case "F'":
                this._rotate(this.getSideWithOrder("F") as TFixedArray<CubeCell, 9>, 'rever', dir)
                break
            case "B":
                this._rotate(this.getSideWithOrder("B") as TFixedArray<CubeCell, 9>, 'clock', dir)
                break
            case "B'":
                this._rotate(this.getSideWithOrder("B") as TFixedArray<CubeCell, 9>, 'rever', dir)
                break
            case "L":
                this._rotate(this.getSideWithOrder("L") as TFixedArray<CubeCell, 9>, 'clock', dir)
                break
            case "L'":
                this._rotate(this.getSideWithOrder("L") as TFixedArray<CubeCell, 9>, 'rever', dir)
                break
            case "R":
                this._rotate(this.getSideWithOrder("R") as TFixedArray<CubeCell, 9>, 'clock', dir)
                break
            case "R'":
                this._rotate(this.getSideWithOrder("R") as TFixedArray<CubeCell, 9>, 'rever', dir)
                break
            case "U":
                this._rotate(this.getSideWithOrder("U") as TFixedArray<CubeCell, 9>, 'clock', dir)
                break
            case "U'":
                this._rotate(this.getSideWithOrder("U") as TFixedArray<CubeCell, 9>, 'rever', dir)
                break
            case "D":
                this._rotate(this.getSideWithOrder("D") as TFixedArray<CubeCell, 9>, 'clock', dir)
                break
            case "D'":
                this._rotate(this.getSideWithOrder("D") as TFixedArray<CubeCell, 9>, 'rever', dir)
                break
            default:
                break
        }
    }

    rotated(dir: TRotationDirection) {
        let plane = this.getAllFaces()
        let newCube = new RubiksCube(plane)
        newCube.rotate(dir)
        return newCube
    }

    private getSideWithOrder(side: TRubiksCubeOrientation) {
        switch (side) {
            case 'F': {
                let keys = Object.keys(this.cells).filter(k => k[2] == '1')
                let arr = keys.sort((a, b) => {
                    let coordA = getCoordFromIndex(a)
                    let coordB = getCoordFromIndex(b)
                    return coordA.x - coordB.x + 3 * coordA.y - 3 * coordB.y
                })
                return arr.map(s => this.cells[s])
            }


            case 'B': {
                let keys = Object.keys(this.cells).filter(k => k[2] == '-')
                let arr = keys.sort((a, b) => {
                    let coordA = getCoordFromIndex(a)
                    let coordB = getCoordFromIndex(b)
                    return coordB.x - coordA.x + 3 * coordA.y - 3 * coordB.y
                })
                return arr.map(s => this.cells[s])
            }


            case 'L': {
                let keys = Object.keys(this.cells).filter(k => k[0] == '-')
                let arr = keys.sort((a, b) => {
                    let coordA = getCoordFromIndex(a)
                    let coordB = getCoordFromIndex(b)
                    return coordA.z - coordB.z + 3 * coordA.y - 3 * coordB.y
                })
                return arr.map(s => this.cells[s])
            }

            case 'R': {
                let keys = Object.keys(this.cells).filter(k => k[0] == '1')
                let arr = keys.sort((a, b) => {
                    let coordA = getCoordFromIndex(a)
                    let coordB = getCoordFromIndex(b)
                    return coordB.z - coordA.z + 3 * coordA.y - 3 * coordB.y
                })
                return arr.map(s => this.cells[s])
            }

            case 'U': {
                let keys = Object.keys(this.cells).filter(k => k[1] == '1')
                let arr = keys.sort((a, b) => {
                    let coordA = getCoordFromIndex(a)
                    let coordB = getCoordFromIndex(b)
                    return coordA.x - coordB.x - 3 * coordA.z + 3 * coordB.y
                })
                return arr.map(s => this.cells[s])
            }

            case 'D': {
                let keys = Object.keys(this.cells).filter(k => k[1] == '-')
                let arr = keys.sort((a, b) => {
                    let coordA = getCoordFromIndex(a)
                    let coordB = getCoordFromIndex(b)
                    return coordA.x - coordB.x + 3 * coordA.z - 3 * coordB.z
                })
                return arr.map(s => this.cells[s])
            }

            default:
                return []
        }
    }

    getAllFaces(): TPlaneCube {
        let _blu = this.getSideWithOrder('F').map(a => a.colorF)
        let _ora = this.getSideWithOrder('L').map(a => a.colorL)
        let _red = this.getSideWithOrder('R').map(a => a.colorR)
        let _yel = this.getSideWithOrder('U').map(a => a.colorU)
        let _gre = this.getSideWithOrder('B').map(a => a.colorB)
        let _whi = this.getSideWithOrder('D').map(a => a.colorD)
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

}

declare global {
    interface Window {
        RubiksCube: any
    }
}
