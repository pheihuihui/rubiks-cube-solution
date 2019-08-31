import { Matrix3, Vector3, Color, MeshBasicMaterial, BoxGeometry, Mesh } from "three";

type FaceColor = 'yel' | 'ora' | 'blu' | 'red' | 'gre' | 'whi' | 'blk'

type Face = 'F' | 'B' | 'U' | 'D' | 'L' | 'R'

export type CubePosition = {
    x: -1 | 0 | 1
    y: -1 | 0 | 1
    z: -1 | 0 | 1
}

export class CubeCell {
    constructor(l: FaceColor, r: FaceColor, u: FaceColor, d: FaceColor, f: FaceColor, b: FaceColor, coord: CubePosition) {
        this.color_B = b
        this.color_D = d
        this.color_F = f
        this.color_L = l
        this.color_R = r
        this.color_U = u
        this.coordinate = coord
        this.x_clock.set(1, 0, 0, 0, 0, 1, 0, -1, 0)
        this.x_rever.set(1, 0, 0, 0, 0, -1, 0, 1, 0)
        this.y_clock.set(0, 0, -1, 0, 1, 0, 1, 0, 0)
        this.y_rever.set(0, 0, 1, 0, 1, 0, -1, 0, 0)
        this.z_clock.set(0, 1, 0, -1, 0, 0, 0, 0, 1)
        this.z_rever.set(0, -1, 0, 1, 0, 0, 0, 0, 1)
    }
    private color_L: FaceColor
    private color_R: FaceColor
    private color_U: FaceColor
    private color_D: FaceColor
    private color_F: FaceColor
    private color_B: FaceColor
    private coordinate: CubePosition

    private x_clock = new Matrix3();
    private x_rever = new Matrix3();
    private y_clock = new Matrix3();
    private y_rever = new Matrix3();
    private z_clock = new Matrix3();
    private z_rever = new Matrix3();

    getColors() {
        return [this.color_L, this.color_R, this.color_U, this.color_D, this.color_F, this.color_B]
    }

    getFaceColor(face: Face): FaceColor {
        switch (face) {
            case 'B': return this.color_B
            case 'D': return this.color_D
            case 'F': return this.color_F
            case 'L': return this.color_L
            case 'R': return this.color_R
            case 'U': return this.color_U
            default: return 'blk'
        }
    }

    getCoordinate() {
        return this.coordinate
    }

    private _applyRotation(matrix: Matrix3) {
        let vec = new Vector3()
        vec.set(this.coordinate.x, this.coordinate.y, this.coordinate.z)
        vec.applyMatrix3(matrix)
        this.coordinate = this.buckleCoordinate(vec)
    }

    applyRotation(dir: 'Xc' | 'Xr' | 'Yc' | 'Yr' | 'Zc' | 'Zr') {
        if (dir == 'Xc') {
            this._applyRotation(this.x_clock)
            let tmp = this.color_B
            this.color_B = this.color_U
            this.color_U = this.color_F
            this.color_F = this.color_D
            this.color_D = tmp
            return
        }
        if (dir == 'Xr') {
            this._applyRotation(this.x_rever)
            let tmp = this.color_D
            this.color_D = this.color_F
            this.color_F = this.color_U
            this.color_U = this.color_B
            this.color_B = tmp
            return
        }
        if (dir == 'Yc') {
            this._applyRotation(this.y_clock)
            let tmp = this.color_R
            this.color_R = this.color_B
            this.color_B = this.color_L
            this.color_L = this.color_F
            this.color_F = tmp
            return
        }
        if (dir == 'Yr') {
            this._applyRotation(this.y_rever)
            let tmp = this.color_F
            this.color_F = this.color_L
            this.color_L = this.color_B
            this.color_B = this.color_R
            this.color_R = tmp
            return
        }
        if (dir == 'Zc') {
            this._applyRotation(this.z_clock)
            let tmp = this.color_R
            this.color_R = this.color_U
            this.color_U = this.color_L
            this.color_L = this.color_D
            this.color_D = tmp
            return
        }
        if (dir == 'Zr') {
            this._applyRotation(this.z_rever)
            let tmp = this.color_D
            this.color_D = this.color_L
            this.color_L = this.color_U
            this.color_U = this.color_R
            this.color_R = tmp
            return
        }
        return
    }

    private getSimpleMesh() {
        let geo = new BoxGeometry(1, 1, 1);
        let cube = new Mesh(geo, [
            this.getMaterial(this.color_R),
            this.getMaterial(this.color_L),
            this.getMaterial(this.color_U),
            this.getMaterial(this.color_D),
            this.getMaterial(this.color_F),
            this.getMaterial(this.color_B)
        ])
        return cube
    }

    private getAdvancedMesh() {

    }

    getMesh() {
        return this.getSimpleMesh()
    }

    private getMaterial(clr: FaceColor) {
        if (clr == 'blk') {
            return new MeshBasicMaterial({ color: new Color(0, 0, 0) })
        }
        if (clr == 'blu') {
            return new MeshBasicMaterial({ color: new Color(0, 0, 1) })
        }
        if (clr == 'gre') {
            return new MeshBasicMaterial({ color: new Color(0, 1, 0) })
        }
        if (clr == 'ora') {
            return new MeshBasicMaterial({ color: new Color(1, 0.6, 0) })
        }
        if (clr == 'red') {
            return new MeshBasicMaterial({ color: new Color(1, 0, 0) })
        }
        if (clr == 'whi') {
            return new MeshBasicMaterial({ color: new Color(1, 1, 1) })
        }
        if (clr == 'yel') {
            return new MeshBasicMaterial({ color: new Color(1, 1, 0) })
        }
        return new MeshBasicMaterial({ color: new Color(0, 0, 0) })
    }

    private buckleCoordinate(vec: Vector3): CubePosition {
        let a = vec.x
        let b = vec.y
        let c = vec.z
        let buckleNumber = (n: number) => {
            let q = (n - 1) * (n - 1)
            let w = n * n
            let e = (n + 1) * (n + 1)
            let tmp = q <= w ? q : w
            let tmp2 = e <= tmp ? e : tmp
            if (tmp2 == q) {
                return 1
            } else if (tmp2 == w) {
                return 0
            } else {
                return -1
            }
        }
        return { x: buckleNumber(a), y: buckleNumber(b), z: buckleNumber(c) }
    }
}