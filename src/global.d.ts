import { RubiksCube } from "./model/RubiksCube";
import { Cube } from "./solution/cube";

declare module '*.wgsl' {
    const shader: string;
    export default shader;
}

declare global {
    interface Window {
        getCoordFromIndex: any
        Cube: typeof Cube
        rCube: RubiksCube
    }
}