import { makeStyles } from "@material-ui/core/styles";
import React, { useRef, useEffect, useState, MutableRefObject } from "react";
import { WebGLRenderer, PerspectiveCamera, Scene, Color, AxesHelper, Matrix3, Matrix4, Mesh, Group, Material } from "three";
import { getCubeMesh, TMeshWithCoord } from "../model/Meshes";
import { cube } from "..";
import { TRotationDirection } from "../model/RubiksCube";
import { useWindowScale } from "../util/hooks";
import { Theme } from "@material-ui/core/styles/createMuiTheme";

const useStyle = makeStyles<Theme, { scale: number }>({
    root: props => ({
        width: 750 * props.scale,
        height: 750 * props.scale,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    })
})

export const CubeContainer = () => {
    const sc = useWindowScale()
    const cclass = useStyle({ scale: sc })

    //////////ANYSCRIPT//////////
    const THREE = require('three')
    const OrbitControls = require('three-orbit-controls')(THREE)
    //////////ANYSCRIPT//////////

    let realCube = getCubeMesh(cube)
    let animateAction = () => { }
    let animating = false
    const mountRef = useRef<HTMLDivElement>(null)
    const deltaTime = 1000

    useEffect(() => {
        const canvas = document.createElement('canvas')
        const renderer = new WebGLRenderer({ antialias: true, canvas: canvas })
        renderer.setSize(750 * 3.9 / 4.5, 750)
        const camera = new PerspectiveCamera(75, 3.9 / 4.5, 1, 1000)
        camera.position.z = 5
        const scene = new Scene()
        scene.background = new Color('silver')
        const axesHelper = new AxesHelper(10)

        //////////ANYSCRIPT//////////
        const controls = new OrbitControls(camera, renderer.domElement)
        //////////ANYSCRIPT//////////

        mountRef.current?.appendChild(renderer.domElement)
        scene.add(axesHelper)
        for (const u of realCube) {
            scene.add(u.meshGroup)
            u.meshGroup.position.set(u.coord.x * 1.005, u.coord.y * 1.005, u.coord.z * 1.005)
        }
        const animate = () => {
            requestAnimationFrame(animate)
            if (animating) {
                animateAction()
            }
            renderer.render(scene, camera)
        }
        animate()

        const restoreRealCube = () => {
            for (const u of realCube) {
                scene.remove(u.meshGroup)
                for (const i of u.meshGroup.children) {
                    if (i.type == 'Mesh') {
                        (i as Mesh).geometry.dispose();
                    }
                }
            }
            realCube = getCubeMesh(cube)
            for (const u of realCube) {
                scene.add(u.meshGroup)
                u.meshGroup.position.set(u.coord.x * 1.005, u.coord.y * 1.005, u.coord.z * 1.005)
            }
            //console.log(scene.children.length)
        }

        cube.onDidRestoreDispatcher.register({
            name: 'restore',
            action: restoreRealCube
        })

        cube.onDidRotateDispatcher.register({
            name: 'rotate',
            action: (dir?: TRotationDirection) => {
                if (dir) {
                    let matx = new Matrix4()
                    let tht = Math.PI / 2 / 60 * 1000 / deltaTime
                    let selected = [] as Group[]

                    if (dir[0] == "B") {
                        selected = realCube.filter(x => x.coord.z == -1).map(x => x.meshGroup)
                        if (dir == "B") {
                            matx.makeRotationZ(tht)
                        } else if (dir == "B'") {
                            matx.makeRotationZ(-tht)
                        } else {
                            matx.makeRotationZ(tht * 2)
                        }
                    }

                    if (dir[0] == "F") {
                        selected = realCube.filter(x => x.coord.z == 1).map(x => x.meshGroup)
                        if (dir == "F") {
                            matx.makeRotationZ(-tht)
                        } else if (dir == "F'") {
                            matx.makeRotationZ(tht)
                        } else {
                            matx.makeRotationZ(tht * 2)
                        }
                    }

                    if (dir[0] == "L") {
                        selected = realCube.filter(x => x.coord.x == -1).map(x => x.meshGroup)
                        if (dir == "L") {
                            matx.makeRotationX(tht)
                        } else if (dir == "L'") {
                            matx.makeRotationX(-tht)
                        } else {
                            matx.makeRotationX(tht * 2)
                        }
                    }

                    if (dir[0] == "R") {
                        selected = realCube.filter(x => x.coord.x == 1).map(x => x.meshGroup)
                        if (dir == "R") {
                            matx.makeRotationX(-tht)
                        } else if (dir == "R'") {
                            matx.makeRotationX(tht)
                        } else {
                            matx.makeRotationX(tht * 2)
                        }
                    }

                    if (dir[0] == "U") {
                        selected = realCube.filter(x => x.coord.y == 1).map(x => x.meshGroup)
                        if (dir == "U") {
                            matx.makeRotationY(-tht)
                        } else if (dir == "U'") {
                            matx.makeRotationY(tht)
                        } else {
                            matx.makeRotationY(tht * 2)
                        }
                    }

                    if (dir[0] == "D") {
                        selected = realCube.filter(x => x.coord.y == -1).map(x => x.meshGroup)
                        if (dir == "D") {
                            matx.makeRotationY(tht)
                        } else if (dir == "D'") {
                            matx.makeRotationY(-tht)
                        } else {
                            matx.makeRotationY(tht * 2)
                        }
                    }

                    let translation = new Matrix4().makeTranslation(0, 0, 0)
                    let transform = matx.multiply(translation)

                    animating = true
                    animateAction = () => {
                        for (const u of selected) {
                            u.applyMatrix4(transform)
                        }
                    }
                    setTimeout(() => {
                        animating = false
                        animateAction = () => { }
                        restoreRealCube()
                    }, deltaTime)
                }
            }
        })

        return (() => {
            mountRef.current?.removeChild(renderer.domElement)
            for (const u of scene.children) {
                if (u.type == 'Mesh') {
                    scene.remove(u)
                }
            }
            cube.onDidRestoreDispatcher.remove('restore')
            cube.onDidRotateDispatcher.remove('rotate')
        })
    }, [])


    return <div className={cclass.root} ref={mountRef} />

}


export const cb = <CubeContainer />

