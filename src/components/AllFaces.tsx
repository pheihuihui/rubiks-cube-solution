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
        boxShadow: '18px 18px 19px #225451, -18px -18px 19px #44aca5'
    },
    cubeStyle: {
        height: 750,
        width: 750,
        borderRadius: 50,
        margin: 30,
        background: 'silver',
        boxShadow: '18px 18px 19px #225451, -18px -18px 19px #44aca5',
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
        boxShadow: '18px 18px 19px #225451, -18px -18px 19px #44aca5',
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
        boxShadow: '18px 18px 19px #225451, -18px -18px 19px #44aca5',
        flexDirection: 'column',
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
type TSteps = {
    Phase1: TRotationDirection[],
    Phase2: TRotationDirection[]
}
type TBeginAndFinish = {
    Phase0: 'Begin',
    Phase3: 'Finish'
}
export type TStepsContext = {
    steps: TSteps & TBeginAndFinish
    totalSteps: number,
    currentStepIndex: number,
    currentStep: string,
    updateSteps: (val: TSteps) => void,
    restoreInitial: () => void,
    updateCurrentIndex: (n: number) => void
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
    const [steps, setSteps] = useState({
        Phase0: 'Begin',
        Phase1: [],
        Phase2: [],
        Phase3: 'Finish'
    } as TSteps & TBeginAndFinish)
    const [currentIndex, setCurrentIndex] = useState(0)
    //const [currentStep, setCurrentStep] = useState('')
    const [totalSteps, setTotalSteps] = useState(0)
    const aclass = useStyle()
    const nThStep = (n: number) => {
        let p1 = steps.Phase1.length
        let p2 = steps.Phase2.length
        if (n == 0) {
            return steps.Phase0
        } else if (n <= p1) {
            return steps.Phase1[n - 1]
        } else if (n <= p2) {
            return steps.Phase2[n - 1]
        } else {
            return steps.Phase3
        }
    }

    return (
        <div className={aclass.root}>
            <ContextHub.Provider value={{
                facesContext: {
                    cubeState: curCtxVal,
                    updateCubeState: () => { setCurCtxVal(cube.getAllFaces()) }
                },
                stepsContext: {
                    steps: steps,
                    totalSteps: steps.Phase1.length + steps.Phase2.length,
                    currentStep: nThStep(currentIndex),
                    updateSteps: val => {
                        let st: TSteps & TBeginAndFinish = {
                            Phase0: 'Begin',
                            Phase1: val.Phase1,
                            Phase2: val.Phase2,
                            Phase3: 'Finish'
                        }
                        setSteps(st)
                        setTotalSteps(st.Phase1.length + st.Phase2.length)
                        setCurrentIndex(0)
                        setInitialState(cube.getAllFaces())
                    },
                    currentStepIndex: currentIndex,
                    restoreInitial: () => {
                        setCurrentIndex(0)
                        cube.restore(initialState)
                    },
                    updateCurrentIndex: (n: number) => {
                        setCurrentIndex(n)
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