import { createContext, useState } from "react"
import { BigFace, EmptyFace } from "./BigFace"
import React from "react"
import { TCssFaceColor } from "./SmallFace"
import { TPlaneFaceColor, TPlaneCube } from "../RubiksCube"
import { makeStyles } from "@material-ui/core"
import { cube } from ".."

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
        height: 720,
        width: 1000,
        flexWrap: 'wrap',
        background: 'darkgrey',
        borderRadius: 40,
        border: '4px solid black'
    }
})

export const FacesContext = createContext<{ cubeState: TPlaneCube, updateCubeState: (val: TPlaneCube) => void }>({} as { cubeState: TPlaneCube, updateCubeState: (val: TPlaneCube) => void })

const AllFaces = () => {

    const [curCtxVal, setCurCtxVal] = useState(cube.getAllFaces())
    const aclass = useStyle()

    return (
        <FacesContext.Provider value={{ cubeState: curCtxVal, updateCubeState: val => { setCurCtxVal(val) } }}>
            <div className={aclass.root}>
                <EmptyFace />
                <BigFace faceOrien={"U"} />
                <EmptyFace />
                <EmptyFace />
                <BigFace faceOrien={"L"} />
                <BigFace faceOrien={"F"} />
                <BigFace faceOrien={"R"} />
                <BigFace faceOrien={"B"} />
                <EmptyFace />
                <BigFace faceOrien={"D"} />
            </div>
        </FacesContext.Provider>
    )
}

export const all = <AllFaces />