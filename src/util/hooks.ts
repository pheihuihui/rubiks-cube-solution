import { useState, useEffect } from 'react';

export function useWindowScale() {
    const origin = 2560
    const [windowScale, setWindowScale] = useState(window.innerWidth / origin)
    const handleResize = () => {
        let sc = window.innerWidth / origin
        if (sc < 0.6) {
            sc = 0.6
        }
        let scc = Math.floor(sc * 10) / 10
        setWindowScale(scc)
    }
    useEffect(() => {
        window.addEventListener('resize', handleResize)
        handleResize()
        return () => window.removeEventListener('resize', handleResize)
    }, [])
    return windowScale
}

