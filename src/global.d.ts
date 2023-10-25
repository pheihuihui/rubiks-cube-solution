import { RubiksCube } from "./model/RubiksCube";
import { Cube } from "./solution/cubejs/cube";

declare module '*.wgsl' {
    const shader: string;
    export default shader;
}

declare global {
    interface Window {
        Cube: typeof Cube
        rCube: RubiksCube
    }
}