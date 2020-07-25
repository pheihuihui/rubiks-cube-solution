import { makeStyles } from "@material-ui/core/styles";
import React, { useRef, useEffect, useState, MutableRefObject } from "react";
import { WebGLRenderer, PerspectiveCamera, Scene, Color, AxesHelper } from "three";
import { getCubeMesh, TMeshWithCoord } from "../model/Meshes";
import { cube } from "..";

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

export const CubeContainer = () => {
    const cclass = useStyle()

    //////////ANYSCRIPT//////////
    const THREE = require('three')
    const OrbitControls = require('three-orbit-controls')(THREE)
    //////////ANYSCRIPT//////////

    let realCube = getCubeMesh(cube)
    const mountRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const canvas = document.createElement('canvas')
        const renderer = new WebGLRenderer({ antialias: true, canvas: canvas })
        renderer.setSize(400, 450)
        const camera = new PerspectiveCamera(75, 4 / 4.5, 1, 1000)
        camera.position.z = 5
        const scene = new Scene()
        scene.background = new Color('silver')
        const axesHelper = new AxesHelper(10)

        //////////ANYSCRIPT//////////
        const controls = new OrbitControls(camera, renderer.domElement)
        //////////ANYSCRIPT//////////

        mountRef.current?.appendChild(renderer.domElement)
        scene.add(axesHelper)
        //const realCube = getRubiksCubeMesh(cube)
        for (const u of realCube) {
            scene.add(u.mesh)
            u.mesh.position.set(u.coord.x * 1.005, u.coord.y * 1.005, u.coord.z * 1.005)
        }
        const animate = () => {
            requestAnimationFrame(animate)
            renderer.render(scene, camera)
        }
        animate()

        cube.onDidRestoreDispatcher.register(() => {
            realCube = getCubeMesh(cube)
            console.log(cube.getAllFaces())
            for (const u of scene.children) {
                if (u.type == 'Mesh') {
                    scene.remove(u)
                }
            }
            for (const u of realCube) {
                scene.add(u.mesh)
                u.mesh.position.set(u.coord.x * 1.005, u.coord.y * 1.005, u.coord.z * 1.005)
            }
        })

        return (() => {
            mountRef.current?.removeChild(renderer.domElement)
            for (const u of scene.children) {
                if (u.type == 'Mesh') {
                    scene.remove(u)
                }
            }
            //cube.onDidRestoreDispatcher.remove()
        })
    }, [])


    return <div className={cclass.root} ref={mountRef} />

}


export const cb = <CubeContainer />