import { useState, useEffect } from 'react';

export function useWindowScale() {
    const origin = 2560
    const [windowScale, setWindowScale] = useState(window.innerWidth / origin)
    const handleResize = () => {
        let sc = window.innerWidth / origin
        if (sc < 0.5) {
            setWindowScale(0.4)
        } else if (sc < 0.6) {
            setWindowScale(0.5)
        } else if (sc < 0.7) {
            setWindowScale(0.6)
        } else if (sc < 0.9) {
            setWindowScale(0.8)
        } else {
            setWindowScale(1)
        }
    }
    useEffect(() => {
        window.addEventListener('resize', handleResize)
        handleResize()
        return () => window.removeEventListener('resize', handleResize)
    }, [])
    return windowScale
}

