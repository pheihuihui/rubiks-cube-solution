import React, { useContext } from 'react'
import { Grid, makeStyles } from '@material-ui/core'
import { CubieFace, CssFaceColors } from './CubieFace'
import { RotationBar } from './RotationBar'
import { TRubiksCubeOrientation, TRotationDirection, CubeOrientationAndColors } from '../model/RubiksCube'
import { ContextHub } from './AllFaces'
import { cube } from '..'

const useStyle = makeStyles({
    root: {
        width: 200,
        height: 200,
        background: 'silver',
        borderRadius: 20,
        display: 'flex',
        flexWrap: 'wrap',
        backgroundColor: 'silver',
        boxShadow: '10px 10px 10px #225451, -10px -10px 10px #44aca5'
    },
    container: {
        justifyContent: 'center',
        padding: '16px'
    },
    item: {
        padding: '4px',
        backgroundColor: 'silver'
    },
    buttons: {
        position: 'absolute',
        height: '20px',
        width: '100px',
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    out: {
        width: 250,
        height: 220,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export const CubeFace = (props: { faceOrien: TRubiksCubeOrientation }) => {

    const curCenterColor = CubeOrientationAndColors[props.faceOrien]
    const allFaces = useContext(ContextHub).facesContext
    const cssColors = allFaces.cubeState[curCenterColor].map(x => CssFaceColors[x])
    const bclass = useStyle()

    return (
        <div className={bclass.out}>
            <RotationBar
                clickLeft={() => {
                    cube.rotate(props.faceOrien + "'" as TRotationDirection)
                    allFaces.updateCubeState()
                }}
                clickRight={() => {
                    cube.rotate(props.faceOrien)
                    allFaces.updateCubeState()
                }}
            />
            <div className={bclass.root}>

                <Grid container className={bclass.container}>

                    {[0, 1, 2, 3].map(x =>
                        <Grid item className={bclass.item} key={'face_' + x}>
                            <CubieFace initialColor={cssColors[x]} orien={props.faceOrien} position={x} />
                        </Grid>
                    )}

                    <Grid item className={bclass.item}>
                        <CubieFace initialColor={CssFaceColors[curCenterColor]} disabled orien={props.faceOrien} position={-1} />
                    </Grid>

                    {[4, 5, 6, 7].map(x =>
                        <Grid item className={bclass.item} key={'face_' + x}>
                            <CubieFace initialColor={cssColors[x]} orien={props.faceOrien} position={x} />
                        </Grid>
                    )}
                </Grid>

            </div>
        </div>
    )
}

export const EmptyFace = () => {
    const bclass = useStyle()
    return <div className={bclass.out} />
}
