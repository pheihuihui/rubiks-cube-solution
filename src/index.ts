import { createRoot } from 'react-dom/client'
import { all } from "./components/AllFaces";
import { cb } from './components/CubeContainer'

document.body.style.display = 'grid'
document.body.style.height = '100%'

let panel = document.getElementById('displayPanel')
if (panel) {
    panel.style.display = 'grid'
    panel.style.placeItems = 'center'
}

if (panel) {
    const root = createRoot(panel)
    root.render(cb)
}

document.body.style.backgroundColor = '#33807b'
