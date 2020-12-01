import React, { useContext } from 'react'
import { Grid, makeStyles } from '@material-ui/core'
import { CubieFace } from './CubieFace'
import { RotationBar } from './RotationBar'
import { TRubiksCubeOrientation, cubeOrientationAndColors } from '../model/RubiksCube'
import { ContextHub } from './AllFaces'
import { useWindowScale } from '../util/hooks'
import { Theme } from '@material-ui/core/styles/createMuiTheme'
import { cssFaceColors } from '../util/utilities'
import { cube } from '..'
import { TRotationDirection } from '../model/Cubie'

const useStyle = makeStyles<Theme, { scale: number }>({
    root: props => ({
        width: 200 * props.scale,
        height: 200 * props.scale,
        background: 'silver',
        borderRadius: 20 * props.scale,
        display: 'flex',
        flexWrap: 'wrap',
        backgroundColor: 'silver',
        boxShadow: '10px 10px 10px #225451, -10px -10px 10px #44aca5'
    }),
    container: props => ({
        justifyContent: 'center',
        padding: 16 * props.scale
    }),
    item: props => ({
        padding: 4 * props.scale,
        backgroundColor: 'silver'
    }),
    buttons: props => ({
        position: 'absolute',
        height: 20 * props.scale,
        width: 100 * props.scale,
        marginLeft: 'auto',
        marginRight: 'auto'
    }),
    out: props => ({
        width: 250 * props.scale,
        height: 220 * props.scale,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    })
})

export const CubeFace = (props: { faceOrien: TRubiksCubeOrientation }) => {

    const sc = useWindowScale()
    const curCenterColor = cubeOrientationAndColors[props.faceOrien]
    const allFaces = useContext(ContextHub).facesContext
    const cssColors = allFaces.cubeState[curCenterColor].map(x => cssFaceColors[x])
    const bclass = useStyle({ scale: sc })

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
                        <CubieFace initialColor={cssFaceColors[curCenterColor]} disabled orien={props.faceOrien} position={-1} />
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
    const sc = useWindowScale()
    const bclass = useStyle({ scale: sc })
    return <div className={bclass.out} />
}
