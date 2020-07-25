import { createContext, useState } from "react"
import { CubeFace, EmptyFace } from "./CubeFace"
import React from "react"
import { TCssFaceColor } from "./CubieFace"
import { TPlaneFaceColor, TPlaneCube, RubiksCube, restoredCubePlaneView, TRotationDirection } from "../model/RubiksCube"
import { makeStyles } from "@material-ui/core"
import { cube } from ".."
import { SolutionPanel } from "./SolutionPanel"
import { RestoreButton, ShuffleButton, SolutionButton } from "./Buttons"
import { decomposeSteps } from "../solution/Solution"
import { CubeContainer } from "./CubeContainer"

export const getCssColor = (c: TPlaneFaceColor): TCssFaceColor => {
    switch (c) {
        case 'blu': return 'blue' as TCssFaceColor
        case 'gre': return 'green' as TCssFaceColor
        case 'ora': return 'orange' as TCssFaceColor
        case 'red': return 'red' as TCssFaceColor
        case 'whi': return 'white' as TCssFaceColor
        case 'yel': return 'yellow' as TCssFaceColor
    }
}

const useStyle = makeStyles({
    root: {
        display: 'flex',
        height: 1200,
        width: 1000,
        flexWrap: 'wrap',
        background: 'darkgrey',
        borderRadius: 40,
        border: '4px solid black'
    },
    out: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export type TFacesContext = {
    cubeState: TPlaneCube,
    updateCubeState: () => void
}
export type TSolutionContext = {
    solution: string,
    updateSolution: (val: string) => void
}
export type TStepsContext = {
    steps: string[],
    totalSteps: number,
    currentStepIndex: number,
    currentStep: string,
    updateSteps: (val: string) => void,
    //updateCurrentStep: (val: number) => void,
    stepForward: () => void,
    stepBackward: () => void,
    restoreInitial: () => void
}
export type TCubeContext = {
    cube: RubiksCube
}

export const ContextHub = createContext({} as {
    facesContext: TFacesContext,
    //solutionContext: TSolutionContext,
    stepsContext: TStepsContext
})

const AllFaces = () => {

    const [curCtxVal, setCurCtxVal] = useState(cube.getAllFaces())
    const [initialState, setInitialState] = useState(cube.getAllFaces())
    const [steps, setSteps] = useState([] as TRotationDirection[])
    const [currentIndex, setCurrentIndex] = useState(0)
    const [currentStep, setCurrentStep] = useState('')
    const [totalSteps, setTotalSteps] = useState(0)
    const aclass = useStyle()

    return (
        <div className={aclass.out}>
            <ContextHub.Provider value={{
                facesContext: {
                    cubeState: curCtxVal,
                    updateCubeState: () => { setCurCtxVal(cube.getAllFaces()) }
                },
                // solutionContext: {
                //     solution: sol,
                //     updateSolution: val => { setSol(val) }
                // },
                stepsContext: {
                    steps: steps,
                    totalSteps: steps.length,
                    currentStep: steps[currentIndex],
                    updateSteps: val => {
                        console.log(val)
                        let ss = decomposeSteps(val) as TRotationDirection[]
                        setSteps(ss)
                        setTotalSteps(ss.length)
                        setCurrentIndex(0)
                        setInitialState(cube.getAllFaces())
                    },
                    currentStepIndex: currentIndex,
                    // updateCurrentStep: val => {
                    //     setCurrentIndex(val)
                    //     setCurrentStep(steps[currentIndex])
                    // },
                    stepForward: () => {
                        if (currentIndex < totalSteps - 1) {
                            setCurrentIndex(currentIndex + 1)
                        }
                    },
                    stepBackward: () => {
                        if (currentIndex >= 1) {
                            setCurrentIndex(currentIndex - 1)
                        }
                    },
                    restoreInitial: () => {
                        setCurrentIndex(0)
                        cube.restore(initialState)
                    }
                }
            }}>
                <div className={aclass.root}>
                    <RestoreButton />
                    <CubeFace faceOrien={"U"} />
                    <ShuffleButton />
                    <SolutionButton />
                    <CubeFace faceOrien={"L"} />
                    <CubeFace faceOrien={"F"} />
                    <CubeFace faceOrien={"R"} />
                    <CubeFace faceOrien={"B"} />
                    <EmptyFace />
                    <CubeFace faceOrien={"D"} />
                    <CubeContainer />
                    <SolutionPanel />
                </div>
            </ContextHub.Provider>
        </div>
    )
}

export const all = <AllFaces />