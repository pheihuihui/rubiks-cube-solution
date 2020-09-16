import { Cubie, TFaceColor } from "./Cubie";
import { MeshBasicMaterial, Color, Mesh, MeshDepthMaterial, Group, Shape, ShapeBufferGeometry } from "three";
import { RubiksCube, TCellCoordinate, getCoordFromIndex } from "./RubiksCube";
import { RoundedBoxGeometry } from "./RoundedBoxGeometry";
import { cssFaceColors } from "..";

export type TMeshWithCoord = {
    coord: TCellCoordinate
    meshGroup: Group
}

const color2Color = (ore: TFaceColor) => {
    switch (ore) {
        case 'blu': return new Color(cssFaceColors.blu)
        case 'ora': return new Color(cssFaceColors.ora)
        case 'red': return new Color(cssFaceColors.red)
        case 'yel': return new Color(cssFaceColors.yel)
        case 'whi': return new Color(cssFaceColors.whi)
        case 'gre': return new Color(cssFaceColors.gre)
        case 'blk': return new Color(0, 0, 0)
    }
}

const getCubieMesh = (cell: Cubie) => {
    let geo = new RoundedBoxGeometry(1, 1, 1, 0.2, 10)

    let [face_F, face_L, face_R, face_U, face_D, face_B]
        = [cell.colorF, cell.colorL, cell.colorR, cell.colorU, cell.colorD, cell.colorB]
            .map(x => color2Color(x))
            .map(x => getRoundedRectangle(x, 0.11))

    face_F.position.set(0, 0, 0.51)
    face_L.position.set(-0.51, 0, 0)
    face_L.rotateY(- Math.PI / 2)
    face_R.position.set(0.51, 0, 0)
    face_R.rotateY(Math.PI / 2)
    face_U.position.set(0, 0.51, 0)
    face_U.rotateX(- Math.PI / 2)
    face_D.position.set(0, -0.51, 0)
    face_D.rotateX(Math.PI / 2)
    face_B.position.set(0, 0, -0.51)
    face_B.rotateX(Math.PI)

    let mat = new MeshDepthMaterial()
    let rcube = new Mesh(geo, mat)

    let group = new Group()
    group.add(rcube)
    group.add(face_F)
    group.add(face_L)
    group.add(face_R)
    group.add(face_U)
    group.add(face_B)
    group.add(face_D)

    return group
}

export const getCubeMesh = (rb: RubiksCube) => {
    let all = rb.getAllCells()
    let arr = [] as TMeshWithCoord[]
    for (const key in all) {
        if (all.hasOwnProperty(key)) {
            const element = all[key];
            let coordi = getCoordFromIndex(key)
            let tmp: TMeshWithCoord = {
                coord: coordi,
                meshGroup: getCubieMesh(element)
            }
            arr.push(tmp)
        }
    }
    return arr
}


const getRoundedRectangle = (color: Color, scale: number) => {
    let roundedRectangleGeo = new Shape()

    roundedRectangleGeo.absarc(-2 * scale, 2 * scale, scale, Math.PI, Math.PI * 0.5, true)
    roundedRectangleGeo.lineTo(2 * scale, 3 * scale)
    roundedRectangleGeo.absarc(2 * scale, 2 * scale, scale, Math.PI * 0.5, 0, true)
    roundedRectangleGeo.lineTo(3 * scale, -2 * scale)
    roundedRectangleGeo.absarc(2 * scale, -2 * scale, scale, 0, - Math.PI * 0.5, true)
    roundedRectangleGeo.lineTo(-2 * scale, -3 * scale)
    roundedRectangleGeo.absarc(-2 * scale, -2 * scale, scale, - Math.PI * 0.5, - Math.PI, true)

    let geo = new ShapeBufferGeometry(roundedRectangleGeo)
    return new Mesh(geo, new MeshBasicMaterial({ color: color }))
}