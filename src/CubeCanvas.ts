import { WebGLRenderer, PerspectiveCamera, Scene, Color, AxesHelper } from "three"
import { useRef } from "react"



//////////ANYSCRIPT//////////
const THREE = require('three')
const OrbitControls = require('three-orbit-controls')(THREE)
//////////ANYSCRIPT//////////

const canv = document.createElement('canvas')

const renderer = new WebGLRenderer({ antialias: true, canvas: canv })
const ctx = renderer.getContext()
console.log(ctx)
renderer.setSize(400, 450)

const camera = new PerspectiveCamera(75, 4 / 4.5, 1, 1000)
camera.position.z = 5

const scene = new Scene()
scene.background = new Color('silver')

const axesHelper = new AxesHelper(10)

//////////ANYSCRIPT//////////
const controls = new OrbitControls(camera, renderer.domElement)
//////////ANYSCRIPT//////////

const animate = () => {
    requestAnimationFrame(animate)
    renderer.render(scene, camera)
}

export const div = document.createElement('div')
div.appendChild(document.createElement('div'))