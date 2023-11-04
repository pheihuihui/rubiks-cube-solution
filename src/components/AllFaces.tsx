import { createContext, FC, useState } from "react"
import React from "react"
import { TPlaneCube, RubiksCube } from "../model/RubiksCube"
import { Layer_1 } from "./Layers"
import { TSteps } from "../solution/utils"
import { cube, currentPlaneView } from "../util/constants"

export type TFacesContext = {
    cubeState: TPlaneCube,
    updateCubeState: () => void
}
export type TSolutionContext = {
    solution: string,
    updateSolution: (val: string) => void
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

export type TComputingContext = {
    isComputing: boolean,
    updateComputingState: (b: boolean) => void
}

export const ContextHub = createContext({} as {
    facesContext: TFacesContext,
    stepsContext: TStepsContext,
    computingContext: TComputingContext
})

const AllFaces: FC = () => {

    const [curCtxVal, setCurCtxVal] = useState(cube.getAllFaces())
    const [initialState, setInitialState] = useState(cube.getAllFaces())
    const [computing, setComputing] = useState(false)
    const [steps, setSteps] = useState({
        Phase0: 'Begin',
        Phase1: [],
        Phase2: [],
        Phase3: 'Finish'
    } as TSteps & TBeginAndFinish)
    const [currentIndex, setCurrentIndex] = useState(0)
    const [, setTotalSteps] = useState(0)
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
        <div>
            <ContextHub.Provider value={{
                facesContext: {
                    cubeState: curCtxVal,
                    updateCubeState: () => {
                        let tmp = cube.getAllFaces()
                        setCurCtxVal(tmp)
                        currentPlaneView.refresh(tmp)
                    }
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
                },
                computingContext: {
                    isComputing: computing,
                    updateComputingState: b => {
                        setComputing(b)
                    }
                }
            }}>
                <div className="container">
                    <Layer_1 />
                </div>
            </ContextHub.Provider>
        </div>
    )
}

export const all = <AllFaces />
