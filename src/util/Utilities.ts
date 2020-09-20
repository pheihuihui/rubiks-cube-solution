import { RubiksCube, getCoordFromIndex, restoredRubiksCube } from "../model/RubiksCube"
import { cube } from ".."
import { hashCube, getNext } from "../solution/Solution"

export function declareGlobals() {
    window.RubiksCube = RubiksCube
    window.cube = cube
    window.getCoordFromIndex = getCoordFromIndex
    window.hashCube = hashCube
    window.restoredRubiksCube = restoredRubiksCube
    window.getNext = getNext
}

export type Handler<E> = {
    name: string
    action: (event?: E) => void
}

export class EventDispatcher<E> {
    private handlers: Handler<E>[] = []
    excute(event?: E) {
        for (let h of this.handlers)
            h.action(event);
    }
    register(handler: Handler<E>) {
        let nameIndex = this.handlers.findIndex(x => x.name == handler.name)
        if (nameIndex == -1) {
            this.handlers.push(handler);
        } else {
            console.log('duplicated handler name')
        }
    }
    remove(name: string) {
        let index = this.handlers.findIndex(x => x.name == name)
        if (index != -1) {
            this.handlers.splice(index, 1)
        }
    }
}

export const getBoxShadow = (scale: number, distance: number, baseColor: [number, number, number], reversed?: boolean) => {
    let num = Math.floor(scale * distance)
    let dark = getColorString(baseColor.map(x => darker(x)) as [number, number, number])
    let light = getColorString(baseColor.map(x => lighter(x)) as [number, number, number])
    if (reversed) {
        return `${num}px ${num}px ${num}px ${dark}, -${num}px -${num}px -${num}px ${light}`
    } else {
        return `insert ${num}px ${num}px ${num}px ${dark}, insert -${num}px -${num}px -${num}px ${light}`
    }
}

const lighter = (RGB: number) => {
    let res = Math.floor(RGB * 1.5)
    return res > 255 ? 255 : res
}

const darker = (RGB: number) => {
    return Math.floor(RGB / 1.5)
}

const getColorString = (hexes: [number, number, number]) => {
    let R = Number(hexes[0]).toString(16)
    let G = Number(hexes[1]).toString(16)
    let B = Number(hexes[2]).toString(16)
    return '#' + R + G + B
}

export const fromRGB = (rgb: [number, number, number]) => {
    return {
        toString: () => {
            return getColorString(rgb)
        }
    }
}
