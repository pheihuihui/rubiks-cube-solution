import { TFaceColor } from "../model/Cubie";
import { allFaceColors, restoredCubePlaneView, TFixedArray, TPlaneCube, TPlaneFaceColor } from "../model/RubiksCube";

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

const restoredEdges: Record<number, TEdge> = {
    1: { colors: ['yel', 'gre'], flipped: false },
    2: { colors: ['yel', 'ora'], flipped: false },
    3: { colors: ['yel', 'blu'], flipped: false },
    4: { colors: ['yel', 'red'], flipped: false },
    5: { colors: ['ora', 'blu'], flipped: false },
    6: { colors: ['blu', 'red'], flipped: false },
    7: { colors: ['red', 'gre'], flipped: false },
    8: { colors: ['gre', 'ora'], flipped: false },
    9: { colors: ['whi', 'blu'], flipped: false },
    10: { colors: ['whi', 'ora'], flipped: false },
    11: { colors: ['whi', 'gre'], flipped: false },
    12: { colors: ['whi', 'red'], flipped: false }
}

const getEdges: (plane: TPlaneCube) => Record<number, TEdge> = pl => {
    let arr: Array<TEdgeColors> = []
    arr.push([pl.yel[1], pl.gre[1]])
    arr.push([pl.yel[3], pl.ora[1]])
    arr.push([pl.yel[6], pl.blu[1]])
    arr.push([pl.yel[4], pl.red[1]])
    arr.push([pl.ora[4], pl.blu[3]])
    arr.push([pl.blu[4], pl.red[3]])
    arr.push([pl.red[4], pl.gre[3]])
    arr.push([pl.gre[4], pl.ora[3]])
    arr.push([pl.whi[1], pl.blu[6]])
    arr.push([pl.whi[3], pl.ora[6]])
    arr.push([pl.whi[6], pl.gre[6]])
    arr.push([pl.whi[4], pl.red[6]])
    let res = {} as Record<number, TEdge>
    arr.forEach((v, i) => {
        for (const key in restoredEdges) {
            if (Object.prototype.hasOwnProperty.call(restoredEdges, key)) {
                const element = restoredEdges[key];
                if (isSameEdge(v, element.colors)) {
                    let flp = isFlipped(v, element.colors)
                    res[i + 1] = { colors: v, flipped: flp }
                }
            }
        }
    })
    return res
}

const isSameEdge = (cur: TEdgeColors, pre: TEdgeColors) => {
    return [...cur].sort().toString() == [...pre].sort().toString()
}

const isFlipped = (cur: TEdgeColors, pre: TEdgeColors) => {
    return cur[1] == pre[0]
}

const countPowerSum = (plane: TPlaneCube) => {
    let _sum = 0
    let corners = getCorners(plane)
    for (const key in corners) {
        if (Object.prototype.hasOwnProperty.call(corners, key)) {
            const element = corners[key];
            _sum += element.power
        }
    }
    return _sum
}

export const getPermutationGroups = <T>(arr: T[], brr: T[]) => {
    if (arr.length == 0 || brr.length == 0) {
        return [] as number[][]
    } else if ([...arr].sort().toString() != [...brr].sort().toString()) {
        return [] as number[][]
    } else {
        let res = [] as number[][]
        let len = arr.length
        let indexes = Array(len).fill(0).map((v, i) => i)
        indexes.forEach((v, i) => {
            if (v != -1) {
                let tmp = [] as number[]
                let cur_ind = v
                while (indexes[cur_ind] != -1) {
                    let brr_ind = brr.findIndex(x => x == arr[cur_ind])
                    tmp.push(brr_ind)
                    indexes[cur_ind] = -1
                    cur_ind = brr_ind
                    console.log(cur_ind)
                }
                res.push(tmp)
            }
        })
        return res
    }
}

const getPermutationGroupsFromCube = (plane: TPlaneCube) => {
    let arr = [] as string[]
    let brr = [] as string[]
    let corners = getCorners(plane)
    for (const key in corners) {
        if (Object.prototype.hasOwnProperty.call(corners, key)) {
            const element = corners[key];
            arr.push(element.colors.toString())
        }
    }
    for (const key in restoredCorners) {
        if (Object.prototype.hasOwnProperty.call(restoredCorners, key)) {
            const element = restoredCorners[key];
            brr.push(element.colors.toString())
        }
    }
    return getPermutationGroups(arr, brr)
}

const checkColorsNumber = (plane: TPlaneCube) => {
    let tmp = {} as Record<TFaceColor, number>
    for (const i of allFaceColors) {
        for (const u of i) {
            let uu = u as TFaceColor
            if (tmp[uu]) {
                tmp[uu] += 1
            } else {
                tmp[uu] = 0
            }
        }
    }
    for (const key in tmp) {
        if (Object.prototype.hasOwnProperty.call(tmp, key)) {
            const element = tmp[key as TFaceColor];
            if (element != 8) {
                return false
            }
        }
    }
    return true
}

export const isSolvable = (plane: TPlaneCube) => {
    let edges_flipped = 0
    let edges = getEdges(plane)
    for (const key in edges) {
        if (Object.prototype.hasOwnProperty.call(edges, key)) {
            const element = edges[key];
            if (element.flipped) {
                edges_flipped += 1
            }
        }
    }
    let sum_of_powers = countPowerSum(plane)
    let permutation_groups = getPermutationGroupsFromCube(plane)

    // condition 0:
    let correct_number_of_faces = checkColorsNumber(plane)

    // condition 1:
    let even_number_of_edges_flipped = edges_flipped % 2 == 0

    // condition 2:
    let sum_of_powers_devided_by_3 = sum_of_powers % 3 == 0

    // condition 3: 
    let even_number_of_permutation_groups = permutation_groups.length % 2 == 0

    return correct_number_of_faces
        && even_number_of_edges_flipped
        && sum_of_powers_devided_by_3
        && even_number_of_permutation_groups
}