import { useState, useEffect } from 'react';

export function useWindowScale() {
    const origin = 2560
    const [windowScale, setWindowScale] = useState(window.innerWidth / origin)
    const handleResize = () => {
        setWindowScale(window.innerWidth / origin)
    }
    useEffect(() => {
        window.addEventListener('resize', handleResize)
        handleResize()
        return () => window.removeEventListener('resize', handleResize)
    }, [])
    return windowScale
}