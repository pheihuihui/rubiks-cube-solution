import ReactDOM from "react-dom";
import { all } from "./components/AllFaces";

document.body.style.display = 'grid'
document.body.style.height = '100%'

let panel = document.getElementById('displayPanel')
if (panel) {
    panel.style.display = 'grid'
    panel.style.placeItems = 'center'
}

ReactDOM.render(all, panel)

document.body.style.backgroundColor = '#33807b'
