import { makeStyles } from "@material-ui/core/styles";
import React, { useRef, useEffect, useState, MutableRefObject } from "react";
import { WebGLRenderer, PerspectiveCamera, Scene, Color, AxesHelper } from "three";
import { getRubiksCubeMesh, TMeshWithCoord } from "../model/Meshes";
import { cube } from "..";
import { div } from "../CubeCanvas";

const useStyle = makeStyles({
    root: {
        width: 450,
        height: 450,
        background: 'silver',
        borderRadius: 20,
        display: 'flex',
        flexWrap: 'wrap',
        border: '2px solid black',
        justifyContent: 'center'
    },
    out: {
        width: 500,
        height: 500,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    }
})

const useThree = (size?: { width: number, height: number }) => {

    const canvasRef = useRef<HTMLCanvasElement>()
    const mountRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const canv = document.createElement('canvas')
        if (size) {
            canv.width = size.width
            canv.height = size.height
        }
        canv.style.display = 'block'
        mountRef.current?.appendChild(canv)
    }, [])

    // return [canvasRef.current, mountRef] as const
    return mountRef
}

export const CubeContainer = () => {
    const cclass = useStyle()

    //////////ANYSCRIPT//////////
    const THREE = require('three')
    const OrbitControls = require('three-orbit-controls')(THREE)
    //////////ANYSCRIPT//////////

    const [flagVisual, setFlagVisual] = useState(false)
    const [flagLogical, setFlagLogical] = useState(false)
    const [transformTime, setTransformTime] = useState(300)
    const [size, setSize] = useState(100)

    const mntRef = useThree()

    const canvas = document.createElement('canvas')
    const renderer = new WebGLRenderer({ antialias: true, canvas: canvas })
    const ctx = renderer.getContext()
    console.log(ctx)
    renderer.setSize(400, 450)
    const rendererRef = useRef(renderer)

    const camera = new PerspectiveCamera(75, 4 / 4.5, 1, 1000)
    camera.position.z = 5
    const cameraRef = useRef(camera)

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

    useEffect(() => {
        scene.add(axesHelper)
        renderer.render(scene, camera)
        mntRef.current?.appendChild(renderer.domElement)
        return (() => {
            mntRef.current?.removeChild(renderer.domElement)
        })
    }, [])

    useEffect(() => {
        const realCube = getRubiksCubeMesh(cube)
        for (const u of realCube) {
            scene.add(u.mesh)
            u.mesh.position.set(u.coord.x * 1.05, u.coord.y * 1.05, u.coord.z * 1.05)
        }

        animate()
        return (() => {
            for (const u of scene.children) {
                if (u.type == 'Mesh') {
                    scene.remove(u)
                }
            }
        })
    }, [cube.getAllFaces()])


    return (
        <div className={cclass.out}>
            <div className={cclass.root} ref={mntRef}>
            </div>
        </div>
    )
}
