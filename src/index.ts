import { Scene, PerspectiveCamera, WebGLRenderer, Color, Mesh, AxesHelper, Matrix4 } from "three";
import { CubePosition } from "./CubeUnit";
import { RubiksCube } from './RubiksCube'
import { OrbitControls } from "./OrbitControls";

type RotationDirections = "L" | "L'" | "R" | "R'" | "F" | "F'" | "B" | "B'" | "U" | "U'" | "D" | "D'"

let scene = new Scene();

let panel = <HTMLCanvasElement>document.getElementById('cubePanel')
let parent = <HTMLDivElement>panel.parentElement
let parentWidth = parent.offsetWidth
let parentHeight = parent.offsetHeight
let parentColor = parent.style.backgroundColor
let renderer = new WebGLRenderer({ antialias: true, canvas: panel });
renderer.setSize(parentWidth / 1.2, parentHeight / 1.2, true);
let camera = new PerspectiveCamera(75, parentWidth / parentHeight, 0.1, 1000);
camera.position.z = 5;
//document.body.appendChild(renderer.domElement);
let clr_grey = new Color(222 / 256, 222 / 256, 222 / 256)
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
    it.mesh.position.set(it.coord.x * 1.05, it.coord.y * 1.05, it.coord.z * 1.05)
}

let gap = 300
let flag_logical = false
let flag_visual = false
let updateCells = () => {
    for (const it of meshesWithCoord) {
        scene.remove(it.mesh)
    }
    meshesWithCoord = cube.getAllCells().map(x => {
        return { mesh: x.getMesh(), coord: x.getCoordinate() }
    })
    for (const it of meshesWithCoord) {
        scene.add(it.mesh)
        it.mesh.position.set(it.coord.x * 1.05, it.coord.y * 1.05, it.coord.z * 1.05)
    }
    flag_logical = false
}

let axesHelper = new AxesHelper(10);
scene.add(axesHelper);
let controls = new OrbitControls(camera, renderer.domElement);

let animate_visual = () => { }
let animate = () => {
    requestAnimationFrame(animate)
    if (flag_visual) {
        animate_visual()
    }
    renderer.render(scene, camera)
    if (flag_logical) {
        console.log('logical update')
        updateCells()
    }
}

animate()

function rotateRubiksCube_logically(dir: RotationDirections) {
    cube.rotate(dir)
}

function rotateRubiksCube_visually(dir: RotationDirections, deltaTime: number) {
    let tmp = Math.PI / 2 / 60 * 1000 / deltaTime
    let rotation = new Matrix4()
    let selectedMeshes: Mesh[] = []

    if (dir == "B" || dir == "B'") {
        selectedMeshes = meshesWithCoord.filter(x => x.coord.z == -1).map(x => x.mesh)
        if (dir == "B") {
            rotation = rotation.makeRotationZ(tmp)
        } else {
            rotation = rotation.makeRotationZ(-tmp)
        }
    }

    if (dir == "F" || dir == "F'") {
        selectedMeshes = meshesWithCoord.filter(x => x.coord.z == 1).map(x => x.mesh)
        if (dir == "F") {
            rotation = rotation.makeRotationZ(-tmp)
        } else {
            rotation = rotation.makeRotationZ(tmp)
        }
    }

    if (dir == "L" || dir == "L'") {
        selectedMeshes = meshesWithCoord.filter(x => x.coord.x == -1).map(x => x.mesh)
        if (dir == "L") {
            rotation = rotation.makeRotationX(tmp)
        } else {
            rotation = rotation.makeRotationX(-tmp)
        }
    }

    if (dir == "R" || dir == "R'") {
        selectedMeshes = meshesWithCoord.filter(x => x.coord.x == 1).map(x => x.mesh)
        if (dir == "R") {
            rotation = rotation.makeRotationX(-tmp)
        } else {
            rotation = rotation.makeRotationX(tmp)
        }
    }

    if (dir == "U" || dir == "U'") {
        selectedMeshes = meshesWithCoord.filter(x => x.coord.y == 1).map(x => x.mesh)
        if (dir == "U") {
            rotation = rotation.makeRotationY(-tmp)
        } else {
            rotation = rotation.makeRotationY(tmp)
        }
    }

    if (dir == "D" || dir == "D'") {
        selectedMeshes = meshesWithCoord.filter(x => x.coord.y == -1).map(x => x.mesh)
        if (dir == "D") {
            rotation = rotation.makeRotationY(tmp)
        } else {
            rotation = rotation.makeRotationY(-tmp)
        }
    }

    let tranalation = new Matrix4().makeTranslation(0, 0, 0)
    let transform = rotation.multiply(tranalation)
    for (const ms of selectedMeshes) {
        ms.applyMatrix(transform)
    }
}

export function rotateRubiksCube(dir: RotationDirections) {
    flag_visual = true
    animate_visual = () => {
        rotateRubiksCube_visually(dir, gap)
    }
    setTimeout(() => {
        flag_visual = false
        rotateRubiksCube_logically(dir)
        flag_logical = true
    }, gap)
}

function updatePlaneView(){
    let div = document.getElementById('planeview')
    
}