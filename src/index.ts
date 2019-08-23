import THREE, { Scene, PerspectiveCamera, WebGLRenderer, BoxGeometry, Color, Mesh, Material, MeshPhongMaterial, MeshBasicMaterial, MeshDepthMaterial, AxesHelper } from "three";
import { CubeCell, CubePosition } from "./CubeUnit";
import { RubiksCube } from './RubiksCube'
import { OrbitControls } from "./OrbitControls";

let scene = new Scene();
let camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

let renderer = new WebGLRenderer();
renderer.setSize(window.innerWidth / 1.3, window.innerHeight / 1.3);
document.body.appendChild(renderer.domElement);

let clr_grey = new Color(0.5, 0.5, 0.5)


scene.background = clr_grey
let cube = new RubiksCube()
//scene.add(cube.get_FLU().getMesh())
interface MeshesWithCoord {
    mesh: Mesh
    coord: CubePosition
}
let meshesWithCoord: MeshesWithCoord[] = cube.getAllCells().map(x => {
    return { mesh: x.getMesh(), coord: x.getCoordinate() }
})
for (const it of meshesWithCoord) {
    scene.add(it.mesh)
    it.mesh.position.set(it.coord.x * 1.2, it.coord.y * 1.2, it.coord.z * 1.2)
}

let axesHelper = new AxesHelper(5);
scene.add(axesHelper);

let controls = new OrbitControls(camera, renderer.domElement);

camera.position.z = 5;

let animate = function () {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    controls.update()
};

//renderer.render( scene, camera );
animate()