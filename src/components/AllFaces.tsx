import { createContext, useState } from "react"
import { CubeFace, EmptyFace } from "./CubeFace"
import React from "react"
import { TPlaneCube, RubiksCube, TRotationDirection } from "../model/RubiksCube"
import { makeStyles } from "@material-ui/core"
import { cube } from ".."
import { SolutionPanel } from "./SolutionPanel"
import { RestoreButton, ShuffleButton, SolutionButton, ValidateButton } from "./Buttons"
import { decomposeSteps } from "../solution/Solution"
import { CubeContainer } from "./CubeContainer"

const useStyle = makeStyles({
    root: {
        display: 'flex',
        width: 1900,
        flexWrap: 'wrap'
    },
    planeStyle: {
        display: 'flex',
        height: 750,
        width: 1000,
        flexWrap: 'wrap',
        borderRadius: 50,
        margin: 30,
        background: '#33807b',
        boxShadow: '24px 24px 19px #225451, -24px -24px 19px #44aca5'
    },
    cubeStyle: {
        height: 750,
        width: 750,
        borderRadius: 50,
        margin: 30,
        background: 'silver',
        boxShadow: '24px 24px 19px #225451, -24px -24px 19px #44aca5',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonStyle: {
        height: 250,
        width: 250,
        borderRadius: 50,
        margin: 30,
        background: '#33807b',
        boxShadow: '24px 24px 19px #225451, -24px -24px 19px #44aca5',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center'
    },
    solutionStyle: {
        height: 250,
        width: 1500,
        borderRadius: 50,
        margin: 30,
        background: '#33807b',
        boxShadow: '24px 24px 19px #225451, -24px -24px 19px #44aca5'
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
        <div className={aclass.root}>
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
                <div className={aclass.planeStyle}>
                    <EmptyFace />
                    <CubeFace faceOrien={"U"} />
                    <EmptyFace />
                    <EmptyFace />
                    <CubeFace faceOrien={"L"} />
                    <CubeFace faceOrien={"F"} />
                    <CubeFace faceOrien={"R"} />
                    <CubeFace faceOrien={"B"} />
                    <EmptyFace />
                    <CubeFace faceOrien={"D"} />
                </div>
                <div className={aclass.cubeStyle}>
                    <CubeContainer />
                </div>
                <div className={aclass.buttonStyle}>
                    <RestoreButton />
                    <ShuffleButton />
                    <ValidateButton />
                    <SolutionButton />
                </div>
                <div className={aclass.solutionStyle}>
                    <SolutionPanel />
                </div>
            </ContextHub.Provider>
        </div>
    )
}

export const all = <AllFaces />