import { createStyles, makeStyles, Theme } from "@material-ui/core"
import React, { FunctionComponent, useContext } from "react"
import { useWindowScale } from "../util/hooks"
import { ContextHub } from "./AllFaces"
import { RestoreButton, ShuffleButton, SolutionButton, TestButton } from "./Buttons"
import { CircularIndeterminate } from "./CircularIndeterminate"
import { CubeContainer } from "./CubeContainer"
import { EmptyFace, CubeFace } from "./CubeFace"
import { SolutionPanel } from "./SolutionPanel"

const useStyle_1 = makeStyles<Theme, { scale: number, isComputing: boolean }, 'root' | 'plane' | 'cube' | 'button' | 'solution'>(theme =>
    createStyles({
        root: props => ({
            display: 'flex',
            width: 1900 * props.scale,
            flexWrap: 'wrap',
            filter: props.isComputing ? 'blur(2px)' : undefined
        }),
        plane: props => ({
            display: 'flex',
            height: 750 * props.scale,
            width: 1000 * props.scale,
            flexWrap: 'wrap',
            borderRadius: 50 * props.scale,
            margin: 30 * props.scale,
            background: '#33807b',
            boxShadow: '18px 18px 19px #225451, -18px -18px 19px #44aca5'
        }),
        cube: props => ({
            height: 750 * props.scale,
            width: 750 * props.scale,
            borderRadius: 50 * props.scale,
            margin: 30 * props.scale,
            background: 'silver',
            boxShadow: '18px 18px 19px #225451, -18px -18px 19px #44aca5',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }),
        button: props => ({
            height: 250 * props.scale,
            width: 250 * props.scale,
            borderRadius: 50 * props.scale,
            margin: 30 * props.scale,
            background: '#33807b',
            boxShadow: '18px 18px 19px #225451, -18px -18px 19px #44aca5',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'center'
        }),
        solution: props => ({
            height: 250 * props.scale,
            width: 1500 * props.scale,
            borderRadius: 50 * props.scale,
            margin: 30 * props.scale,
            background: '#33807b',
            boxShadow: '18px 18px 19px #225451, -18px -18px 19px #44aca5',
            flexDirection: 'column',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        })
    })
)


const useStyle_2 = makeStyles<Theme, { scale: number }, 'root'>(
    createStyles({
        root: {
            position: 'absolute',
            placeItems: 'center',
            zIndex: 2
        }
    })
)

export const Layer_1: FunctionComponent = () => {

    const sc = useWindowScale()
    const computingCtx = useContext(ContextHub).computingContext
    const aclass = useStyle_1({ scale: sc, isComputing: computingCtx.isComputing })

    return (
        <div className={aclass.root}>
            <div className={aclass.plane}>
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
            <div className={aclass.cube}>
                <CubeContainer />
            </div>
            <div className={aclass.button}>
                <RestoreButton />
                <ShuffleButton />
                {/* <ValidateButton /> */}
                <TestButton />
                <SolutionButton />
            </div>
            <div className={aclass.solution}>
                <SolutionPanel />
            </div>
        </div>
    )
}

export const Layer_2: FunctionComponent = () => {

    const sc = useWindowScale()
    const bclass = useStyle_2({ scale: sc })
    const computingCtx = useContext(ContextHub).computingContext

    return (
        computingCtx.isComputing ?
            <div className={bclass.root}>
                <CircularIndeterminate />
            </div>
            :
            null
    )
}