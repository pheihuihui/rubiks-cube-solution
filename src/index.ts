import { Scene, PerspectiveCamera, WebGLRenderer, Color, Mesh, AxesHelper } from "three";
import { CubePosition, CubeCell } from "./CubeUnit";
import { RubiksCube } from './RubiksCube'
import { OrbitControls } from "./OrbitControls";

let scene = new Scene();
let camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

let renderer = new WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth / 1.3, window.innerHeight / 1.3);
document.body.appendChild(renderer.domElement);
let clr_grey = new Color(0.5, 0.5, 0.5)
scene.background = clr_grey

let cube = new RubiksCube()

interface MeshesWithCoord {
    mesh: Mesh
    coord: CubePosition
}

let meshesWithCoord: MeshesWithCoord[] = cube.getAllCells().map(x => {
    return { mesh: x.getMesh(), coord: x.getCoordinate() }
})
for (const it of meshesWithCoord) {
    scene.add(it.mesh)
    it.mesh.position.set(it.coord.x * 1.1, it.coord.y * 1.1, it.coord.z * 1.1)
}

let updateCells = () => {
    for (const it of meshesWithCoord) {
        scene.remove(it.mesh)
    }
    meshesWithCoord = cube.getAllCells().map(x => {
        return { mesh: x.getMesh(), coord: x.getCoordinate() }
    })
    for (const it of meshesWithCoord) {
        scene.add(it.mesh)
        it.mesh.position.set(it.coord.x * 1.1, it.coord.y * 1.1, it.coord.z * 1.1)
    }
}

let axesHelper = new AxesHelper(5);
scene.add(axesHelper);
let controls = new OrbitControls(camera, renderer.domElement);

let animate = () => {
    requestAnimationFrame(animate)
    renderer.render(scene, camera)
    updateCells()
}

animate()

export function rotateRubiksCube_logically(dir: "L" | "L'" | "R" | "R'" | "F" | "F'" | "B" | "B'" | "U" | "U'" | "D" | "D'") {
    cube.rotate(dir)
}