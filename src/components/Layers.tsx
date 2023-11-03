import React, { FC, useContext } from "react"
import { ContextHub } from "./AllFaces"
import { RestoreButton, ShuffleButton, SolutionButton, TestButton } from "./Buttons"
import { CircularIndeterminate } from "./CircularIndeterminate"
import { CubeContainer } from "./CubeContainer"
import { EmptyFace, CubeFace } from "./CubeFace"
import { SolutionPanel } from "./SolutionPanel"

export const Layer_1: FC = () => {

    const computingCtx = useContext(ContextHub).computingContext

    return (
        <div className="layer-root">
            <div className="layer-plane">
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
            <div className="layer-cube">
                <CubeContainer />
            </div>
            <div className="layer-button">
                <RestoreButton />
                <ShuffleButton />
                <TestButton />
                <SolutionButton />
            </div>
            <div className="layer-solution">
                <SolutionPanel />
            </div>
        </div>
    )
}

export const Layer_2: FC = () => {

    const computingCtx = useContext(ContextHub).computingContext

    return (
        computingCtx.isComputing ?
            <div className="layer-2-root">
                <CircularIndeterminate />
            </div>
            :
            null
    )
}
