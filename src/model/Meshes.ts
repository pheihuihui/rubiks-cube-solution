import { CubeCell, TFaceColor } from "./CubeCell";
import { BoxGeometry, MeshBasicMaterial, Color, Mesh } from "three";
import { RubiksCube, TCellCoordinate, getCoordFromIndex } from "./RubiksCube";

export type TMeshWithCoord = {
    coord: TCellCoordinate
    mesh: Mesh
}

const getRealColor = (cl: TFaceColor) => {
    switch (cl) {
        case 'blk': return new MeshBasicMaterial({ color: new Color(0, 0, 0) })
        case 'blu': return new MeshBasicMaterial({ color: new Color(0, 0, 1) })
        case 'gre': return new MeshBasicMaterial({ color: new Color(0, 1, 0) })
        case 'ora': return new MeshBasicMaterial({ color: new Color(1, 0.6, 0) })
        case 'red': return new MeshBasicMaterial({ color: new Color(1, 0, 0) })
        case 'whi': return new MeshBasicMaterial({ color: new Color(1, 1, 1) })
        case 'yel': return new MeshBasicMaterial({ color: new Color(1, 1, 0) })
    }
}

export const getCubeMesh = (cell: CubeCell) => {
    let geo = new BoxGeometry(1, 1, 1, 0.5, 0.5, 0.5)
    let cube = new Mesh(geo, [
        getRealColor(cell.colorR),
        getRealColor(cell.colorL),
        getRealColor(cell.colorU),
        getRealColor(cell.colorD),
        getRealColor(cell.colorF),
        getRealColor(cell.colorB)
    ])
    return cube
}

export const getRubiksCubeMesh = (rb: RubiksCube) => {
    let all = rb.getAllCells()
    let arr = [] as TMeshWithCoord[]
    for (const key in all) {
        if (all.hasOwnProperty(key)) {
            const element = all[key];
            let coordi = getCoordFromIndex(key)
            let tmp: TMeshWithCoord = {
                coord: coordi,
                mesh: getCubeMesh(element)
            }
            arr.push(tmp)
        }
    }
    return arr
}