import { Vector3, Matrix3 } from "three";

function testMatrix() {
    let vc = new Vector3()
    vc.set(1, 2, 3)
    let mtx = new Matrix3()
    mtx.set(2, 3, 4, 5, 6, 7, 3, 4, 6)
    vc.applyMatrix3(mtx)
    console.log(vc)
}
