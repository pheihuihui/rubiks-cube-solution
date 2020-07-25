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

export type Handler<E> = (event?: E) => void

export class EventDispatcher<E> {
    private handlers: Handler<E>[] = []
    fire(event?: E) {
        for (let h of this.handlers)
            h(event);
    }
    register(handler: Handler<E>) {
        this.handlers.push(handler);
    }
    remove(handler: Handler<E>) {
        let index = this.handlers.findIndex(x => x == handler)
        if (index != -1) {
            this.handlers.splice(index, 1)
        }
    }
}