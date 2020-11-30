import { colors } from "@material-ui/core";
import { TFaceColor } from "../model/Cubie";
import { restoredCubePlaneView, TFixedArray, TPlaneCube, TPlaneFaceColor } from "../model/RubiksCube";

export type TCornerColors = TFixedArray<TPlaneFaceColor, 3>
export type TCornerPower = 0 | 1 | 2
export type TCorner = {
    colors: TCornerColors
    power: TCornerPower
}

export type TEdgeColors = TFixedArray<TPlaneFaceColor, 2>
export type TEdge = {
    colors: TEdgeColors
    flipped: boolean
}

const restoredCorners: Record<number, TCorner> = {
    1: { colors: ['yel', 'ora', 'blu'], power: 0 },
    2: { colors: ['yel', 'blu', 'red'], power: 0 },
    3: { colors: ['ora', 'blu', 'whi'], power: 0 },
    4: { colors: ['blu', 'red', 'whi'], power: 0 },
    5: { colors: ['yel', 'ora', 'gre'], power: 0 },
    6: { colors: ['yel', 'red', 'gre'], power: 0 },
    7: { colors: ['ora', 'whi', 'gre'], power: 0 },
    8: { colors: ['whi', 'red', 'gre'], power: 0 }
}

export const getCorners: (plane: TPlaneCube) => Record<number, TCorner> = pl => {
    let arr: Array<TCornerColors> = []
    arr.push([pl.yel[5], pl.ora[2], pl.blu[0]])
    arr.push([pl.yel[7], pl.blu[2], pl.red[0]])
    arr.push([pl.ora[7], pl.blu[5], pl.whi[0]])
    arr.push([pl.blu[7], pl.red[5], pl.whi[2]])
    arr.push([pl.yel[0], pl.ora[0], pl.gre[2]])
    arr.push([pl.yel[2], pl.red[2], pl.gre[0]])
    arr.push([pl.ora[5], pl.whi[5], pl.gre[5]])
    arr.push([pl.whi[2], pl.red[7], pl.gre[5]])
    let res = {} as Record<number, TCorner>
    arr.forEach((v, i) => {
        let pw: TCornerPower = 0
        for (const key in restoredCorners) {
            if (Object.prototype.hasOwnProperty.call(restoredCorners, key)) {
                const element = restoredCorners[key];
                if (isSameCorner(v, element.colors)) {
                    pw = countPower(v, element.colors)
                    res[i + 1] = { colors: v, power: pw }
                }
            }
        }
    })
    return res
}

const isSameCorner = (cur: TCornerColors, pre: TCornerColors) => {
    return [...cur].sort().toString() == [...pre].sort().toString()
}

const countPower: (cur: TCornerColors, pre: TCornerColors) => TCornerPower = (cur, pre) => {
    if (cur[0] == pre[0]) {
        return 0
    } else if (cur[0] == pre[1]) {
        return 1
    } else {
        return 2
    }
}
