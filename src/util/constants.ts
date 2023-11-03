import { RubiksCube, restoredCubePlaneView } from "../model/RubiksCube"
import { fromPlaneView, fromRGB } from "./utilities"

export const cube = new RubiksCube(restoredCubePlaneView)
export const currentPlaneView = fromPlaneView(restoredCubePlaneView)
export const globalColors = {
    documentBodyBackgroudColor: fromRGB([0x33, 0x80, 0x7b])
}