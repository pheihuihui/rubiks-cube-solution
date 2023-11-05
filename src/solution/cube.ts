// REF: https://github.com/ldez/cubejs

import { __range__ } from '../util/utilities'

// Centers
export const [U, R, F, D, L, B] = [0, 1, 2, 3, 4, 5];
// Corners
export const [URF, UFL, ULB, UBR, DFR, DLF, DBL, DRB] = [0, 1, 2, 3, 4, 5, 6, 7];
// Edges
export const [UR, UF, UL, UB, DR, DF, DL, DB, FR, FL, BL, BR] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

const _U = (x: number) => x - 1;
const _R = (x: number) => _U(9) + x;
const _F = (x: number) => _R(9) + x;
const _D = (x: number) => _F(9) + x;
const _L = (x: number) => _D(9) + x;
const _B = (x: number) => _L(9) + x;

const centerFacelet = [4, 13, 22, 31, 40, 49];
const cornerFacelet = [
    [_U(9), _R(1), _F(3)], [_U(7), _F(1), _L(3)],
    [_U(1), _L(1), _B(3)], [_U(3), _B(1), _R(3)],
    [_D(3), _F(9), _R(7)], [_D(1), _L(9), _F(7)],
    [_D(7), _B(9), _L(7)], [_D(9), _R(9), _B(7)]];
const edgeFacelet = [
    [_U(6), _R(2)], [_U(8), _F(2)], [_U(4), _L(2)], [_U(2), _B(2)],
    [_D(6), _R(8)], [_D(2), _F(8)], [_D(4), _L(8)], [_D(8), _B(8)],
    [_F(6), _R(4)], [_F(4), _L(6)], [_B(6), _L(4)], [_B(4), _R(6)],
];
const centerColor = ['U', 'R', 'F', 'D', 'L', 'B'];
const cornerColor = [
    ['U', 'R', 'F'], ['U', 'F', 'L'], ['U', 'L', 'B'], ['U', 'B', 'R'],
    ['D', 'F', 'R'], ['D', 'L', 'F'], ['D', 'B', 'L'], ['D', 'R', 'B'],
];
const edgeColor = [
    ['U', 'R'], ['U', 'F'], ['U', 'L'], ['U', 'B'], ['D', 'R'], ['D', 'F'],
    ['D', 'L'], ['D', 'B'], ['F', 'R'], ['F', 'L'], ['B', 'L'], ['B', 'R'],
];

const faceNums = {
    U: 0,
    R: 1,
    F: 2,
    D: 3,
    L: 4,
    B: 5,
    E: 6,
    M: 7,
    S: 8,
    x: 9,
    y: 10,
    z: 11,
    u: 12,
    r: 13,
    f: 14,
    d: 15,
    l: 16,
    b: 17
};

const faceNames = {
    0: 'U',
    1: 'R',
    2: 'F',
    3: 'D',
    4: 'L',
    5: 'B',
    6: 'E',
    7: 'M',
    8: 'S',
    9: 'x',
    10: 'y',
    11: 'z',
    12: 'u',
    13: 'r',
    14: 'f',
    15: 'd',
    16: 'l',
    17: 'b'
};

function parseAlg(arg: string | number[] | number): number[] {
    if (typeof arg == 'string') {
        const result = [];
        for (const part of arg.split(/\s+/)) {
            if (part.length == 0) {
                continue;
            }
            if (part.length > 2) {
                throw new Error(`Invalid move: ${part}`);
            }
            // @ts-ignore
            const move = faceNums[part[0]];
            if (move === undefined) {
                throw new Error(`Invalid move: ${part}`);
            }
            let power;
            if (part.length === 1) {
                power = 0;
            } else {
                if (part[1] === '2') {
                    power = 1;
                } else if (part[1] === "'") {
                    power = 2;
                } else {
                    throw new Error(`Invalid move: ${part}`);
                }
            }
            result.push(move * 3 + power);
        }
        return result;
    } else if (typeof arg === 'number') {
        return [arg]
    } else {
        return arg
    }
}

interface CubeFaces {
    center: number[]
    cp: number[]
    co: number[]
    ep: number[]
    eo: number[]
}

export class Cube {

    private newCenter: number[]
    private newCp: number[]
    private newEp: number[]
    private newCo: number[]
    private newEo: number[]

    private center: number[]
    private cp: number[]
    private ep: number[]
    private co: number[]
    private eo: number[]

    static moves = [
        // U
        {
            center: [0, 1, 2, 3, 4, 5],
            cp: [UBR, URF, UFL, ULB, DFR, DLF, DBL, DRB],
            co: [0, 0, 0, 0, 0, 0, 0, 0],
            ep: [UB, UR, UF, UL, DR, DF, DL, DB, FR, FL, BL, BR],
            eo: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        },

        // R
        {
            center: [0, 1, 2, 3, 4, 5],
            cp: [DFR, UFL, ULB, URF, DRB, DLF, DBL, UBR],
            co: [2, 0, 0, 1, 1, 0, 0, 2],
            ep: [FR, UF, UL, UB, BR, DF, DL, DB, DR, FL, BL, UR],
            eo: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        },

        // F
        {
            center: [0, 1, 2, 3, 4, 5],
            cp: [UFL, DLF, ULB, UBR, URF, DFR, DBL, DRB],
            co: [1, 2, 0, 0, 2, 1, 0, 0],
            ep: [UR, FL, UL, UB, DR, FR, DL, DB, UF, DF, BL, BR],
            eo: [0, 1, 0, 0, 0, 1, 0, 0, 1, 1, 0, 0]
        },

        // D
        {
            center: [0, 1, 2, 3, 4, 5],
            cp: [URF, UFL, ULB, UBR, DLF, DBL, DRB, DFR],
            co: [0, 0, 0, 0, 0, 0, 0, 0],
            ep: [UR, UF, UL, UB, DF, DL, DB, DR, FR, FL, BL, BR],
            eo: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        },

        // L
        {
            center: [0, 1, 2, 3, 4, 5],
            cp: [URF, ULB, DBL, UBR, DFR, UFL, DLF, DRB],
            co: [0, 1, 2, 0, 0, 2, 1, 0],
            ep: [UR, UF, BL, UB, DR, DF, FL, DB, FR, UL, DL, BR],
            eo: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        },

        // B
        {
            center: [0, 1, 2, 3, 4, 5],
            cp: [URF, UFL, UBR, DRB, DFR, DLF, ULB, DBL],
            co: [0, 0, 1, 2, 0, 0, 2, 1],
            ep: [UR, UF, UL, BR, DR, DF, DL, BL, FR, FL, UB, DB],
            eo: [0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 1]
        },

        // E
        {
            center: [U, F, L, D, B, R],
            cp: [URF, UFL, ULB, UBR, DFR, DLF, DBL, DRB],
            co: [0, 0, 0, 0, 0, 0, 0, 0],
            ep: [UR, UF, UL, UB, DR, DF, DL, DB, FL, BL, BR, FR],
            eo: [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1]
        },

        // M
        {
            center: [B, R, U, F, L, D],
            cp: [URF, UFL, ULB, UBR, DFR, DLF, DBL, DRB],
            co: [0, 0, 0, 0, 0, 0, 0, 0],
            ep: [UR, UB, UL, DB, DR, UF, DL, DF, FR, FL, BL, BR],
            eo: [0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0]
        },

        // S
        {
            center: [L, U, F, R, D, B],
            cp: [URF, UFL, ULB, UBR, DFR, DLF, DBL, DRB],
            co: [0, 0, 0, 0, 0, 0, 0, 0],
            ep: [UL, UF, DL, UB, UR, DF, DR, DB, FR, FL, BL, BR],
            eo: [1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0]
        },
        // x
        {
            center: [2, 1, 3, 5, 4, 0],
            cp: [4, 5, 1, 0, 7, 6, 2, 3],
            co: [2, 1, 2, 1, 1, 2, 1, 2],
            ep: [8, 5, 9, 1, 11, 7, 10, 3, 4, 6, 2, 0],
            eo: [0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0]
        },
        // y
        {
            center: [0, 5, 1, 3, 2, 4],
            cp: [3, 0, 1, 2, 7, 4, 5, 6],
            co: [0, 0, 0, 0, 0, 0, 0, 0],
            ep: [3, 0, 1, 2, 7, 4, 5, 6, 11, 8, 9, 10],
            eo: [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1]
        },
        // z 
        {
            center: [4, 0, 2, 1, 3, 5],
            cp: [1, 5, 6, 2, 0, 4, 7, 3],
            co: [1, 2, 1, 2, 2, 1, 2, 1],
            ep: [2, 9, 6, 10, 0, 8, 4, 11, 1, 5, 7, 3],
            eo: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
        },
        // u
        {
            center: [0, 5, 1, 3, 2, 4],
            cp: [3, 0, 1, 2, 4, 5, 6, 7],
            co: [0, 0, 0, 0, 0, 0, 0, 0],
            ep: [3, 0, 1, 2, 4, 5, 6, 7, 11, 8, 9, 10],
            eo: [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1]
        },
        // r
        {
            center: [2, 1, 3, 5, 4, 0],
            cp: [4, 1, 2, 0, 7, 5, 6, 3],
            co: [2, 0, 0, 1, 1, 0, 0, 2],
            ep: [8, 5, 2, 1, 11, 7, 6, 3, 4, 9, 10, 0],
            eo: [0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0]
        },
        // f
        {
            center: [4, 0, 2, 1, 3, 5],
            cp: [1, 5, 2, 3, 0, 4, 6, 7],
            co: [1, 2, 0, 0, 2, 1, 0, 0],
            ep: [2, 9, 6, 3, 0, 8, 4, 7, 1, 5, 10, 11],
            eo: [1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 0, 0]
        },
        // d
        {
            center: [0, 2, 4, 3, 5, 1],
            cp: [0, 1, 2, 3, 5, 6, 7, 4],
            co: [0, 0, 0, 0, 0, 0, 0, 0],
            ep: [0, 1, 2, 3, 5, 6, 7, 4, 9, 10, 11, 8],
            eo: [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1]
        },
        // l
        {
            center: [5, 1, 0, 2, 4, 3],
            cp: [0, 2, 6, 3, 4, 1, 5, 7],
            co: [0, 1, 2, 0, 0, 2, 1, 0],
            ep: [0, 3, 10, 7, 4, 1, 9, 5, 8, 2, 6, 11],
            eo: [0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0]
        },
        // b
        {
            center: [1, 3, 2, 4, 0, 5],
            cp: [0, 1, 3, 7, 4, 5, 2, 6],
            co: [0, 0, 1, 2, 0, 0, 2, 1],
            ep: [4, 1, 0, 11, 6, 5, 2, 10, 8, 9, 3, 7],
            eo: [1, 0, 1, 1, 1, 0, 1, 1, 0, 0, 1, 1]
        }

    ];

    constructor(other?: CubeFaces) {

        this.center = Array(6).fill(0)
        this.cp = Array(8).fill(0)
        this.ep = Array(12).fill(0)
        this.co = Array(8).fill(0)
        this.eo = Array(12).fill(0)

        if (other) {
            this.init(other);
        } else {
            this.identity();
        }

        this.newCenter = Array(6).fill(0)
        this.newCp = Array(8).fill(0)
        this.newEp = Array(12).fill(0)
        this.newCo = Array(8).fill(0)
        this.newEo = Array(12).fill(0)
    }

    randomize() {
        const randint = (min: number, max: number) => min + Math.floor(Math.random() * ((max - min) + 1));

        const shuffle = function (array: unknown[]) {
            let currentIndex = array.length;

            while (currentIndex !== 0) {
                let randomIndex = randint(0, currentIndex - 1);
                currentIndex -= 1;
                let temporaryValue = array[currentIndex];
                [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
            }
        };

        const getNumSwaps = function (arr: number[]) {
            let numSwaps = 0;
            const seen = (__range__(0, arr.length - 1, true).map((x) => false));
            // We compute the cycle decomposition
            while (true) {
                let cur = -1;
                for (let i = 0; i <= arr.length - 1; i++) {
                    if (!seen[i]) {
                        cur = i;
                        break;
                    }
                }
                if (cur == -1) {
                    break;
                }
                let cycleLength = 0;
                while (!seen[cur]) {
                    seen[cur] = true;
                    cycleLength++;
                    cur = arr[cur];
                }
                // A cycle is equivalent to cycleLength + 1 swaps
                numSwaps += cycleLength + 1;
            }
            return numSwaps;
        };

        const arePermutationsValid = function (cp: number[], ep: number[]) {
            const numSwaps = getNumSwaps(ep) + getNumSwaps(cp);
            return (numSwaps % 2) === 0;
        };

        const generateValidRandomPermutation = function (cp: number[], ep: number[]) {
            // Each shuffle only takes around 12 operations and there's a 50%
            // chance of a valid permutation so it'll finish in very good time
            shuffle(ep);
            shuffle(cp);
            while (!arePermutationsValid(cp, ep)) {
                shuffle(ep);
                shuffle(cp);
            }
        };

        const randomizeOrientation = function (arr: number[], numOrientations: number) {
            let ori = 0;
            for (let i = 0; i <= arr.length - 1; i++) {
                ori += (arr[i] = randint(0, numOrientations - 1));
            }
        };

        const isOrientationValid = (arr: number[], numOrientations: number) => (arr.reduce((a, b) => a + b) % numOrientations) === 0;

        const generateValidRandomOrientation = function (co: number[], eo: number[]) {
            // There is a 1/2 and 1/3 probably respectively of each of these
            // succeeding so the probability of them running 10 times before
            // success is already only 1% and only gets exponentially lower
            // and each generation is only in the 10s of operations which is nothing
            randomizeOrientation(co, 3);
            while (!isOrientationValid(co, 3)) {
                randomizeOrientation(co, 3);
            }

            randomizeOrientation(eo, 2);
            while (!isOrientationValid(eo, 2)) {
                randomizeOrientation(eo, 2);
            }

        };

        const result = () => {
            generateValidRandomPermutation(this.cp, this.ep);
            generateValidRandomOrientation(this.co, this.eo);
            return this;
        };

        return result();
    }

    init(state: CubeFaces) {
        this.center = state.center.slice(0);
        this.co = state.co.slice(0);
        this.ep = state.ep.slice(0);
        this.cp = state.cp.slice(0);
        this.eo = state.eo.slice(0);
    }

    identity() {
        this.center = [0, 1, 2, 3, 4, 5];
        this.cp = [0, 1, 2, 3, 4, 5, 6, 7];
        this.co = [0, 0, 0, 0, 0, 0, 0, 0];
        this.ep = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
        this.eo = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    }

    toJSON(): CubeFaces {
        return {
            center: this.center,
            cp: this.cp,
            co: this.co,
            ep: this.ep,
            eo: this.eo
        };
    }

    asString() {
        let i, n, ori;
        const result = [];

        for (i = 0; i <= 5; i++) {
            result[(9 * i) + 4] = centerColor[this.center[i]];
        }

        for (i = 0; i <= 7; i++) {
            let corner = this.cp[i];
            ori = this.co[i];
            for (n = 0; n <= 2; n++) {
                result[cornerFacelet[i][(n + ori) % 3]] = cornerColor[corner][n];
            }
        }

        for (i = 0; i <= 11; i++) {
            let edge = this.ep[i];
            ori = this.eo[i];
            for (n = 0; n <= 1; n++) {
                result[edgeFacelet[i][(n + ori) % 2]] = edgeColor[edge][n];
            }
        }

        return result.join('');
    }

    static fromString(str: string) {
        const cube = new Cube;

        for (let i = 0; i <= 5; i++) {
            for (let j = 0; j <= 5; j++) {
                if (str[(9 * i) + 4] === centerColor[j]) {
                    cube.center[i] = j;
                }
            }
        }

        for (let i = 0; i <= 7; i++) {
            let ori: number
            for (ori = 0; ori <= 2; ori++) {
                if (['U', 'D'].includes(str[cornerFacelet[i][ori]])) {
                    break;
                }
            }
            let col1 = str[cornerFacelet[i][(ori + 1) % 3]];
            let col2 = str[cornerFacelet[i][(ori + 2) % 3]];

            for (let j = 0; j <= 7; j++) {
                if ((col1 == cornerColor[j][1]) && (col2 == cornerColor[j][2])) {
                    cube.cp[i] = j;
                    cube.co[i] = ori % 3;
                }
            }
        }

        for (let i = 0; i <= 11; i++) {
            for (let j = 0; j <= 11; j++) {
                if ((str[edgeFacelet[i][0]] == edgeColor[j][0]) &&
                    (str[edgeFacelet[i][1]] == edgeColor[j][1])) {
                    cube.ep[i] = j;
                    cube.eo[i] = 0;
                    break;
                }
                if ((str[edgeFacelet[i][0]] == edgeColor[j][1]) &&
                    (str[edgeFacelet[i][1]] == edgeColor[j][0])) {
                    cube.ep[i] = j;
                    cube.eo[i] = 1;
                    break;
                }
            }
        }

        return cube;
    }

    clone() {
        return new Cube(this.toJSON());
    }

    // A class method returning a new random cube
    static random() {
        return new Cube().randomize();
    }

    isSolved() {
        const clone = this.clone();
        clone.move(clone.upright());

        for (let cent = 0; cent <= 5; cent++) {
            if (clone.center[cent] != cent) {
                return false;
            }
        }

        for (let c = 0; c <= 7; c++) {
            if (clone.cp[c] != c) {
                return false;
            }
            if (clone.co[c] != 0) {
                return false;
            }
        }

        for (let e = 0; e <= 11; e++) {
            if (clone.ep[e] != e) {
                return false;
            }
            if (clone.eo[e] != 0) {
                return false;
            }
        }

        return true;
    }

    // Multiply this Cube with another Cube, restricted to centers.
    centerMultiply(other: CubeFaces) {
        let from;
        for (let to = 0; to <= 5; to++) {
            from = other.center[to];
            this.newCenter[to] = this.center[from];
        }

        [this.center, this.newCenter] = [this.newCenter, this.center];
        return this;
    }

    // Multiply this Cube with another Cube, restricted to corners.
    cornerMultiply(other: CubeFaces) {
        let from;
        for (let to = 0; to <= 7; to++) {
            from = other.cp[to];
            this.newCp[to] = this.cp[from];
            this.newCo[to] = (this.co[from] + other.co[to]) % 3;
        }

        [this.cp, this.newCp] = [this.newCp, this.cp];
        [this.co, this.newCo] = [this.newCo, this.co];
        return this;
    }

    // Multiply this Cube with another Cube, restricted to edges
    edgeMultiply(other: CubeFaces) {
        let from;
        for (let to = 0; to <= 11; to++) {
            from = other.ep[to];
            this.newEp[to] = this.ep[from];
            this.newEo[to] = (this.eo[from] + other.eo[to]) % 2;
        }

        [this.ep, this.newEp] = [this.newEp, this.ep];
        [this.eo, this.newEo] = [this.newEo, this.eo];
        return this;
    }

    // Multiply this cube with another Cube
    multiply(other: CubeFaces) {
        this.centerMultiply(other);
        this.cornerMultiply(other);
        this.edgeMultiply(other);
        return this;
    }

    move(arg: string) {
        for (let _move of parseAlg(arg)) {
            let face = (_move / 3) | 0;
            let power = _move % 3;
            console.log(face)
            console.log(power)
            for (let x = 0; x <= power; x++) {
                this.multiply(Cube.moves[face]);
            }
        }

        return this;
    }

    upright() {
        let i: number, j: number;
        const clone = this.clone();
        const result = [];
        for (i = 0; i <= 5; i++) {
            if (clone.center[i] == F) { break; }
        }
        switch (i) {
            case D: result.push("x"); break;
            case U: result.push("x'"); break;
            case B: result.push("x2"); break;
            case R: result.push("y"); break;
            case L: result.push("y'"); break;
        }
        if (result.length) { clone.move(result[0]); }
        for (j = 0; j <= 5; j++) {
            if (clone.center[j] === U) { break; }
        }
        switch (j) {
            case L: result.push("z"); break;
            case R: result.push("z'"); break;
            case D: result.push("z2"); break;
        }
        return result.join(' ');
    }

    static inverse(arg: string | number[] | number) {
        let move, face, power;
        const result = [];
        for (move of parseAlg(arg)) {
            face = (move / 3) | 0;
            power = move % 3;
            result.push((face * 3) + -(power - 1) + 1);
        }
        result.reverse();
        if (typeof arg == 'string') {
            let str = '';
            for (move of result) {
                face = (move / 3) | 0;
                power = move % 3;
                // @ts-ignore
                str += faceNames[face];
                if (power == 1) {
                    str += '2';
                } else if (power == 2) {
                    str += "'";
                }
                str += ' ';
            }
            return str.substring(0, str.length - 1);
        } else if (typeof arg == 'number') {
            return result[0];
        } else {
            return result;
        }
    }
};
