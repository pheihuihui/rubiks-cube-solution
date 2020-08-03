import { RubiksCube, getCoordFromIndex, restoredRubiksCube } from "../model/RubiksCube"
import { cube } from ".."
import { hashCube, getNext } from "../solution/Solution"
import { TFaceColor } from "../model/Cubie"

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

export const CssFaceColors: { [T in Exclude<TFaceColor, 'blk'>]: string } = {
    yel: '#b6be46',
    ora: '#c78d29',
    blu: '#297dc7',
    red: '#ce276a',
    whi: '#ffffff',
    gre: '#5ea66c'
}
