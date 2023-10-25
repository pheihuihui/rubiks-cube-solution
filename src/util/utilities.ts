import { TPlaneCube, TRubiksCubeOrientation, cubeOrientationAndColors } from "../model/RubiksCube"
import { TFaceColor } from "../model/Cubie"

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

export const fromPlaneView = (plane: TPlaneCube) => {
    let _plane = plane
    return {
        toString: () => {
            let res = ""
            for (const key in cubeOrientationAndColors) {
                if (Object.prototype.hasOwnProperty.call(cubeOrientationAndColors, key)) {
                    const element = cubeOrientationAndColors[key];
                    let arr = _plane[element]
                    res += `${key}: ${arr.toString()};\n`
                }
            }
            return res
        },
        getCurrent: () => _plane,
        refresh: (newplane: TPlaneCube) => {
            _plane = newplane
        },
        updateCurrent: (ora: TRubiksCubeOrientation, index: number, newColor: string) => {
            let faceColor = cubeOrientationAndColors[ora]
            let newFaceColor = 'blk'
            for (const key in cssFaceColors) {
                if (Object.prototype.hasOwnProperty.call(cssFaceColors, key)) {
                    const element = cssFaceColors[key as Exclude<TFaceColor, 'blk'>];
                    if (element == newColor) {
                        newFaceColor = key
                    }
                }
            }
            _plane[faceColor][index] = newFaceColor as Exclude<TFaceColor, 'blk'>
        }
    }
}

export const cssFaceColors: { [T in Exclude<TFaceColor, 'blk'>]: string } = {
    yel: '#b6be46',
    ora: '#c78d29',
    blu: '#297dc7',
    red: '#ce276a',
    whi: '#ffffff',
    gre: '#5ea66c'
}

// export function asGlobal<T extends { new(...args: any[]): {} }>(className: string) {
//     return (constructor: T) => {
//         Object.assign(window ?? self, { [className]: constructor })
//     }
// }

export function __range__(left: number, right: number, inclusive: boolean) {
    let range = [];
    let ascending = left < right;
    let end = !inclusive ? right : ascending ? right + 1 : right - 1;
    for (let i = left; ascending ? i < end : i > end; ascending ? i++ : i--) {
        range.push(i);
    }
    return range;
}

export function add1(x: number) {
    return x + 1
}