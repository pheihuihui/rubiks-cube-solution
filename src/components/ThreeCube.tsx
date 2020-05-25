// import { Scene, WebGLRenderer, PerspectiveCamera, Color, AxesHelper, Mesh, Matrix4 } from 'three'
// import React, { createContext, useRef, useState, useEffect, MutableRefObject } from 'react'
// import { CubePosition } from '../CubeCell'
// import { RubiksCube, TRotationDirection } from '../RubiksCube'

// interface MeshesWithCoord {
//     mesh: Mesh
//     coord: CubePosition
// }

// const useCanvas = (size?: { width: number, height: number }) => {

//     const canvasRef = useRef<HTMLCanvasElement>()
//     const mountRef = useRef<HTMLDivElement>()

//     useEffect(() => {
//         const canv = document.createElement('canvas')
//         if (size) {
//             canv.width = size.width
//             canv.height = size.height
//         }
//         canv.style.display = 'block'
//         canvasRef.current = canv
//     })

//     return [canvasRef.current, mountRef] as const
// }


// const ThreeCube = () => {

//     //////////ANYSCRIPT//////////
//     const THREE = require('three')
//     const OrbitControls = require('three-orbit-controls')(THREE)
//     //////////ANYSCRIPT//////////

//     const [flagVisual, setFlagVisual] = useState(false)
//     const [flagLogical, setFlagLogical] = useState(false)
//     const [transformTime, setTransformTime] = useState(300)
//     const [size, setSize] = useState(100)

//     const [canvas, mntRef] = useCanvas()

//     const renderer = new WebGLRenderer({ antialias: true, canvas: canvas })
//     renderer.setSize(1500, 1000)
//     const rendererRef = useRef(renderer)

//     const camera = new PerspectiveCamera(75, 1.5, 0.1, 1000)
//     camera.position.z = 5
//     const cameraRef = useRef(camera)

//     const scene = new Scene()
//     scene.background = new Color(222 / 256, 222 / 256, 222 / 256)
//     const sceneRef = useRef(scene)

//     const axesHelper = new AxesHelper(10)
//     const axesRef = useRef(axesHelper)

//     //////////ANYSCRIPT//////////
//     const controls = new OrbitControls(camera, renderer.domElement)
//     //////////ANYSCRIPT//////////

//     let RotateCube: () => void = () => { }

//     useEffect(() => {
//         const _mount = mntRef.current
//         const _renderer = rendererRef.current
//         const _scene = sceneRef.current
//         const _axes = axesRef.current

//         _scene.add(_axes)

//         const cube = new RubiksCube()

//         let meshesWithCoord: MeshesWithCoord[] = cube.getAllCells().map(x => {
//             return { mesh: x.getMesh(), coord: x.getCoordinate() }
//         })
//         for (const it of meshesWithCoord) {
//             scene.add(it.mesh)
//             it.mesh.position.set(it.coord.x * 1.05, it.coord.y * 1.05, it.coord.z * 1.05)
//         }

//         const gap = 300

//         let animate_visual = () => { }

//         function updateCells() {
//             for (const it of meshesWithCoord) {
//                 scene.remove(it.mesh)
//             }
//             meshesWithCoord = cube.getAllCells().map(x => {
//                 return { mesh: x.getMesh(), coord: x.getCoordinate() }
//             })
//             for (const it of meshesWithCoord) {
//                 scene.add(it.mesh)
//                 it.mesh.position.set(it.coord.x * 1.05, it.coord.y * 1.05, it.coord.z * 1.05)
//             }
//             setFlagLogical(false)
//         }

//         function rotateRubiksCube_logically(dir: TRotationDirection) {
//             cube.rotate(dir)
//         }

//         function rotateRubiksCube_visually(dir: TRotationDirection, deltaTime: number) {
//             let tmp = Math.PI / 2 / 60 * 1000 / deltaTime
//             let rotation = new Matrix4()
//             let selectedMeshes: Mesh[] = []

//             if (dir == "B" || dir == "B'") {
//                 selectedMeshes = meshesWithCoord.filter(x => x.coord.z == -1).map(x => x.mesh)
//                 if (dir == "B") {
//                     rotation = rotation.makeRotationZ(tmp)
//                 } else {
//                     rotation = rotation.makeRotationZ(-tmp)
//                 }
//             }

//             if (dir == "F" || dir == "F'") {
//                 selectedMeshes = meshesWithCoord.filter(x => x.coord.z == 1).map(x => x.mesh)
//                 if (dir == "F") {
//                     rotation = rotation.makeRotationZ(-tmp)
//                 } else {
//                     rotation = rotation.makeRotationZ(tmp)
//                 }
//             }

//             if (dir == "L" || dir == "L'") {
//                 selectedMeshes = meshesWithCoord.filter(x => x.coord.x == -1).map(x => x.mesh)
//                 if (dir == "L") {
//                     rotation = rotation.makeRotationX(tmp)
//                 } else {
//                     rotation = rotation.makeRotationX(-tmp)
//                 }
//             }

//             if (dir == "R" || dir == "R'") {
//                 selectedMeshes = meshesWithCoord.filter(x => x.coord.x == 1).map(x => x.mesh)
//                 if (dir == "R") {
//                     rotation = rotation.makeRotationX(-tmp)
//                 } else {
//                     rotation = rotation.makeRotationX(tmp)
//                 }
//             }

//             if (dir == "U" || dir == "U'") {
//                 selectedMeshes = meshesWithCoord.filter(x => x.coord.y == 1).map(x => x.mesh)
//                 if (dir == "U") {
//                     rotation = rotation.makeRotationY(-tmp)
//                 } else {
//                     rotation = rotation.makeRotationY(tmp)
//                 }
//             }

//             if (dir == "D" || dir == "D'") {
//                 selectedMeshes = meshesWithCoord.filter(x => x.coord.y == -1).map(x => x.mesh)
//                 if (dir == "D") {
//                     rotation = rotation.makeRotationY(tmp)
//                 } else {
//                     rotation = rotation.makeRotationY(-tmp)
//                 }
//             }

//             let tranalation = new Matrix4().makeTranslation(0, 0, 0)
//             let transform = rotation.multiply(tranalation)
//             for (const ms of selectedMeshes) {
//                 ms.applyMatrix4(transform)
//             }
//         }

//         function rotateRubiksCube(dir: TRotationDirection) {
//             setFlagVisual(true)
//             console.log('rotating: ' + dir)
//             animate_visual = () => {
//                 rotateRubiksCube_visually(dir, gap)
//             }
//             setTimeout(() => {
//                 setFlagVisual(false)
//                 rotateRubiksCube_logically(dir)
//                 setFlagLogical(true)
//             }, gap)
//         }

//         RotateCube = () => { rotateRubiksCube("B'") }

//         function animate() {
//             requestAnimationFrame(animate)
//             if (flagVisual) {
//                 animate_visual()
//             }
//             renderer.render(scene, camera)
//             if (flagLogical) {
//                 updateCells()
//             }
//         }

//         _scene.add(camera)
//         _mount?.appendChild(renderer.domElement)

//         animate()

//     }, [mntRef])

//     // useEffect(() => {
//     //     const rdr = rendererRef.current
//     //     rdr.setSize(size.min, size.max)
//     // }, [size.min, size.max])

//     return (
//         <div style={{ width: 1500, height: 1000 }} ref={mntRef as MutableRefObject<HTMLDivElement>} onClick={() => { console.log('click'); RotateCube() }} />
//     )
// }

// export const thr = <ThreeCube />