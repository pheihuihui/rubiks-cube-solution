import { CubeCell } from "./CubeUnit";

export class RubiksCube {
    constructor() {
        this.FLU = new CubeCell('ora', 'blk', 'yel', 'blk', 'blu', 'blk', { x: -1, y: 1, z: 1 })
        this.FRU = new CubeCell('blk', 'red', 'yel', 'blk', 'blu', 'blk', { x: 1, y: 1, z: 1 })
        this.FLD = new CubeCell('ora', 'blk', 'blk', 'whi', 'blu', 'blk', { x: -1, y: -1, z: 1 })
        this.FRD = new CubeCell('blk', 'red', 'blk', 'whi', 'blu', 'blk', { x: 1, y: -1, z: 1 })
        this.FL_ = new CubeCell('ora', 'blk', 'blk', 'blk', 'blu', 'blk', { x: -1, y: 0, z: 1 })
        this.FR_ = new CubeCell('blk', 'red', 'blk', 'blk', 'blu', 'blk', { x: 1, y: 0, z: 1 })
        this.F_U = new CubeCell('blk', 'blk', 'yel', 'blk', 'blu', 'blk', { x: 0, y: 1, z: 1 })
        this.F_D = new CubeCell('blk', 'blk', 'blk', 'whi', 'blu', 'blk', { x: 0, y: -1, z: 1 })
        this._LU = new CubeCell('ora', 'blk', 'yel', 'blk', 'blk', 'blk', { x: -1, y: 1, z: 0 })
        this._RU = new CubeCell('blk', 'red', 'yel', 'blk', 'blk', 'blk', { x: 1, y: 1, z: 0 })
        this._LD = new CubeCell('ora', 'blk', 'blk', 'whi', 'blk', 'blk', { x: -1, y: -1, z: 0 })
        this._RD = new CubeCell('blk', 'red', 'blk', 'whi', 'blk', 'blk', { x: 1, y: -1, z: 0 })
        this.BLU = new CubeCell('ora', 'blk', 'yel', 'blk', 'blk', 'gre', { x: -1, y: 1, z: -1 })
        this.BRU = new CubeCell('blk', 'red', 'yel', 'blk', 'blk', 'gre', { x: 1, y: 1, z: -1 })
        this.BLD = new CubeCell('ora', 'blk', 'blk', 'whi', 'blk', 'gre', { x: -1, y: -1, z: -1 })
        this.BRD = new CubeCell('blk', 'red', 'blk', 'whi', 'blk', 'gre', { x: 1, y: -1, z: -1 })
        this.BL_ = new CubeCell('ora', 'blk', 'blk', 'blk', 'blk', 'gre', { x: -1, y: 0, z: -1 })
        this.BR_ = new CubeCell('blk', 'red', 'blk', 'blk', 'blk', 'gre', { x: 1, y: 0, z: -1 })
        this.B_U = new CubeCell('blk', 'blk', 'yel', 'blk', 'blk', 'gre', { x: 0, y: 1, z: -1 })
        this.B_D = new CubeCell('blk', 'blk', 'blk', 'whi', 'blk', 'gre', { x: 0, y: -1, z: -1 })
        this.F__ = new CubeCell('blk', 'blk', 'blk', 'blk', 'blu', 'blk', { x: 0, y: 0, z: 1 })
        this.B__ = new CubeCell('blk', 'blk', 'blk', 'blk', 'blk', 'gre', { x: 0, y: 0, z: -1 })
        this._L_ = new CubeCell('ora', 'blk', 'blk', 'blk', 'blk', 'blk', { x: -1, y: 0, z: 0 })
        this._R_ = new CubeCell('blk', 'red', 'blk', 'blk', 'blk', 'blk', { x: 1, y: 0, z: 0 })
        this.__U = new CubeCell('blk', 'blk', 'yel', 'blk', 'blk', 'blk', { x: 0, y: 1, z: 0 })
        this.__D = new CubeCell('blk', 'blk', 'blk', 'whi', 'blk', 'blk', { x: 0, y: -1, z: 0 })
    }

    getAllCells() {
        return [
            this.FLU,
            this.FRU,
            this.FLD,
            this.FRD,
            this.BLU,
            this.BRU,
            this.BLD,
            this.BRD,
            this.FL_,
            this.FR_,
            this.F_U,
            this.F_D,
            this._LU,
            this._RU,
            this._LD,
            this._RD,
            this.BL_,
            this.BR_,
            this.B_U,
            this.B_D,
            this.F__,
            this.B__,
            this._L_,
            this._R_,
            this.__U,
            this.__D
        ]
    }

    getLCells() {
        return [this._LD, this._LU, this._L_, this.BLD, this.BLU, this.BL_, this.FLD, this.FLU, this.FL_]
    }
    getRCells() {
        return [this._RD, this._RU, this._R_, this.BRD, this.BRU, this.BR_, this.FRD, this.FRU, this.FR_]
    }
    getUCells() {
        return [this.B_U, this.F_U, this.__U, this.BLU, this.BRU, this.FLU, this.FRU, this._LU, this._RU]
    }
    getDCells() {
        return [this.B_D, this.F_D, this.__D, this.BLD, this.BRD, this.FLD, this.FRD, this._LD, this._RD]
    }
    getFCells() {
        return [this.FLD, this.FLU, this.FL_, this.FRD, this.FRU, this.FR_, this.F_D, this.F_U, this.F__]
    }
    getBCells() {
        return [this.BLD, this.BLU, this.BL_, this.BRD, this.BRU, this.BR_, this.B_D, this.B_U, this.B__]
    }

    private FLU: CubeCell
    private FRU: CubeCell
    private FLD: CubeCell
    private FRD: CubeCell
    private BLU: CubeCell
    private BRU: CubeCell
    private BLD: CubeCell
    private BRD: CubeCell
    private FL_: CubeCell
    private FR_: CubeCell
    private F_U: CubeCell
    private F_D: CubeCell
    private _LU: CubeCell
    private _RU: CubeCell
    private _LD: CubeCell
    private _RD: CubeCell
    private BL_: CubeCell
    private BR_: CubeCell
    private B_U: CubeCell
    private B_D: CubeCell
    private F__: CubeCell
    private B__: CubeCell
    private _L_: CubeCell
    private _R_: CubeCell
    private __U: CubeCell
    private __D: CubeCell
}