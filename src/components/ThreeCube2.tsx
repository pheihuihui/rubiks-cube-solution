// import { Scene, WebGLRenderer, PerspectiveCamera, Color, AxesHelper, Mesh, Matrix4, BoxGeometry, MeshBasicMaterial, Group, TextureLoader, PointLight, SphereGeometry } from 'three'
// import React, { createContext, useRef, useState, useEffect, MutableRefObject } from 'react'
// import { CubePosition } from '../CubeCell'
// import { RubiksCube, TRotationDirection } from '../RubiksCube'



// const useCanvas = (divSize?: { min: number, max: number }) => {
//     const canvasRef = useRef<HTMLCanvasElement>()
//     const mountRef = useRef<HTMLDivElement>()
//     const [size, setSize] = useState({ min: 0, max: 0 })

//     useEffect(() => {
//         console.log(divSize)
//         const canvas = document.createElement('canvas');
//         const mount = mountRef.current;
//         canvas.style.display = 'block';
//         canvasRef.current = canvas;

//         let width = 0;
//         let height = 0;
//         if (divSize) {
//             [width, height] = [divSize.min, divSize.max]
//         } else {
//             width = mount?.offsetWidth ?? 10
//             height = mount?.offsetHeight ?? 10
//         }
//         setSize({ min: width, max: height });

//         const resizeObserver = new ResizeObserver(entries => {
//             if (entries && entries.length && divSize) {
//                 let [width, height] = [entries[0].contentRect.width, entries[0].contentRect.height]
//                 console.log([width, height])
//                 setSize({ min: width, max: height })
//             }
//         })
//         if (mount) {
//             resizeObserver.observe(mount)
//             mount.appendChild(canvas)
//         }

//         return (() => {
//             if (mount) {
//                 resizeObserver.unobserve(mount)
//                 mount.removeChild(canvas)
//             }
//         })
//     }, [divSize?.min, divSize?.max])

//     return [canvasRef.current, mountRef, size] as const
// }


// const ThreeCube = () => {

//     const [canvas, mountRef, size] = useCanvas({ min: 1000, max: 1000 })

//     const [width, height] = [size.min, size.max]
//     const aspect = 1
//     const viewAngle = 45
//     const near = 0.1
//     const far = 10000

//     const rendererRef = useRef<WebGLRenderer>(new WebGLRenderer({ canvas: canvas }))
//     const cameraRef = useRef<PerspectiveCamera>(new PerspectiveCamera(viewAngle, aspect, near, far))
//     const sceneRef = useRef<Scene>(new Scene())
//     const globeRef = useRef<Group>(new Group())
//     const textureLoaderRef = useRef<TextureLoader>(new TextureLoader())
//     const pointLightRef = useRef<PointLight>(new PointLight(0xffffff))
//     const animationFrameID = useRef<number>()

//     useEffect(() => {
//         const mount = mountRef.current
//         const renderer = rendererRef.current
//         const camera = cameraRef.current
//         const scene = sceneRef.current
//         const globe = globeRef.current
//         const textureLoader = textureLoaderRef.current
//         const pointLight = pointLightRef.current

//         function animate() {
//             renderer.render(scene, camera)
//             requestAnimationFrame(animate)
//         }

//         const RADIUS = 300;
//         const SEGMENTS = 50;
//         const RINGS = 50;

//         textureLoader.load(
//             'https://raw.githubusercontent.com/mrdoob/three.js/e7ff8ca1be184316132f28a7c48d6bfdf26e2db0/examples/textures/land_ocean_ice_cloud_2048.jpg',
//             function (map) {
//                 const sphere = new SphereGeometry(RADIUS, SEGMENTS, RINGS);
//                 const material = new MeshBasicMaterial({
//                     map,
//                 });
//                 const mesh = new Mesh(sphere, material);
//                 globe.add(mesh);
//             },
//         );
//         globe.position.z = -RADIUS;

//         pointLight.position.x = 10;
//         pointLight.position.y = 50;
//         pointLight.position.z = 400;
//         camera.position.set(0, 0, 500);

//         scene.add(camera);
//         scene.add(globe);
//         scene.add(pointLight);

//         mount?.appendChild(renderer.domElement);
//         animate();
//     }, [mountRef])

//     useEffect(() => {
//         const renderer = rendererRef.current;
//         renderer.setSize(width, height);
//     }, [height, width]);


//     return <div ref={mountRef as MutableRefObject<HTMLDivElement>} />;
// }

