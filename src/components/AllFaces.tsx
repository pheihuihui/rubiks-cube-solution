import { createContext, useState } from "react"
import { CubeFace, EmptyFace } from "./CubeFace"
import React from "react"
import { TCssFaceColor } from "./CubieFace"
import { TPlaneFaceColor, TPlaneCube } from "../model/RubiksCube"
import { makeStyles } from "@material-ui/core"
import { cube } from ".."
import { SolutionPanel } from "./SolutionPanel"
import { RestoreButton, ShuffleButton, SolutionButton } from "./Buttons"
import { decomposeSteps } from "../solution/Solution"

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
    }
})

export type TFacesContext = {
    cubeState: TPlaneCube,
    updateCubeState: (val: TPlaneCube) => void
}
export type TSolutionContext = {
    solution: string,
    updateSolution: (val: string) => void
}
export type TStepsContext = {
    steps: string[],
    totalSteps: number,
    currentStep: number,
    updateSteps: (val: string) => void,
    updateCurrentStep: (val: number) => void,
    stepForward: () => void,
    stepBackward: () => void,
    restoreInitial: () => void
}

export const ContextHub = createContext({} as {
    facesContext: TFacesContext,
    solutionContext: TSolutionContext,
    stepsContext: TStepsContext
})

const AllFaces = () => {

    const [curCtxVal, setCurCtxVal] = useState(cube.getAllFaces())
    const [sol, setSol] = useState("")
    const [steps, setSteps] = useState(['Start', 'Finish'])
    const [currentStep, setCurrentStep] = useState(0)
    const [totalSteps, setTotalSteps] = useState(2)
    const aclass = useStyle()

    return (
        <ContextHub.Provider value={{
            facesContext: {
                cubeState: curCtxVal,
                updateCubeState: val => { setCurCtxVal(val) }
            },
            solutionContext: {
                solution: sol,
                updateSolution: val => { setSol(val) }
            },
            stepsContext: {
                steps: steps,
                totalSteps: steps.length,
                updateSteps: val => {
                    let ss = decomposeSteps(val)
                    let aa = ['State'].concat(ss).concat(['Finish'])
                    setSteps(aa)
                    setTotalSteps(steps.length)
                },
                currentStep: currentStep,
                updateCurrentStep: val => { setCurrentStep(val) },
                stepForward: () => {
                    if (currentStep < totalSteps - 1) {
                        setCurrentStep(currentStep + 1)
                    }
                },
                stepBackward: () => {
                    if (currentStep >= 1) {
                        setCurrentStep(currentStep - 1)
                    }
                },
                restoreInitial: () => {
                    setCurrentStep(0)
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
                {/* <CubeContainer /> */}
                <SolutionPanel />
            </div>
        </ContextHub.Provider>
    )
}

export const all = <AllFaces />