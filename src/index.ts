import { createRoot } from 'react-dom/client'
import { all } from "./components/AllFaces";
import { cb } from './components/CubeContainer'
import { bar } from './components/RotationBar';
import { bt } from './components/Buttons';
import { ci } from './components/CircularIndeterminate';
import { restoredRubiksCube } from './model/RubiksCube';

document.body.style.display = 'grid'
document.body.style.height = '100%'

let panel = document.getElementById('displayPanel')
if (panel) {
    panel.style.display = 'grid'
    panel.style.placeItems = 'center'
}

if (panel) {
    const root = createRoot(panel)
    root.render(all)
}

document.body.style.backgroundColor = '#33807b'
