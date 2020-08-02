import { createContext, useState } from "react"
import { CubeFace, EmptyFace } from "./CubeFace"
import React from "react"
import { TPlaneFaceColor, TPlaneCube, RubiksCube, restoredCubePlaneView, TRotationDirection } from "../model/RubiksCube"
import { makeStyles } from "@material-ui/core"
import { cube } from ".."
import { SolutionPanel } from "./SolutionPanel"
import { RestoreButton, ShuffleButton, SolutionButton } from "./Buttons"
import { decomposeSteps } from "../solution/Solution"
import { CubeContainer } from "./CubeContainer"

const useStyle = makeStyles({
    root: {
        display: 'flex',
        height: 1200,
        width: 1000,
        flexWrap: 'wrap',
        borderRadius: 50,
        background: '#33807b',
        boxShadow: '24px 24px 19px #225451, -24px -24px 19px #44aca5'
    },
    out: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
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
    stepForward: () => void,
    stepBackward: () => void,
    restoreInitial: () => void
}
export type TCubeContext = {
    cube: RubiksCube
}

export const ContextHub = createContext({} as {
    facesContext: TFacesContext,
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
                    {/* <SolutionPanel /> */}
                </div>
            </ContextHub.Provider>
        </div>
    )
}

export const all = <AllFaces />