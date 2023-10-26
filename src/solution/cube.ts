// @ts-nocheck

import { __range__ } from '../util/utilities'

// Centers
const [U, R, F, D, L, B] = [0, 1, 2, 3, 4, 5];

// Corners
const [URF, UFL, ULB, UBR, DFR, DLF, DBL, DRB] = [0, 1, 2, 3, 4, 5, 6, 7];

// Edges
const [UR, UF, UL, UB, DR, DF, DL, DB, FR, FL, BL, BR] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

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

function parseAlg(arg: string | string[]) {
    if (typeof arg === 'string') {
        // String
        return (() => {
            const result = [];
            for (let part of arg.split(/\s+/)) {
                let power;
                if (part.length === 0) {
                    // First and last can be empty
                    continue;
                }

                if (part.length > 2) {
                    throw new Error(`Invalid move: ${part}`);
                }

                var move = faceNums[part[0]];
                if (move === undefined) {
                    throw new Error(`Invalid move: ${part}`);
                }

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

                result.push((move * 3) + power);
            }
            return result;
        })();
    } else if (arg.length != null) {
        // Already an array
        return arg;
    } else {
        // A single move
        return [arg];
    }
};

export class Cube {

    private newCenter: number[]
    private newCp: number[]
    private newEp: number[]
    private newCo: number[]
    private newEo: number[]

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

    constructor(other?: Cube) {
        if (other != null) {
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
        const randint = (min, max) => min + Math.floor(Math.random() * ((max - min) + 1));

        const shuffle = function (array) {
            let currentIndex = array.length;

            while (currentIndex !== 0) {
                var randomIndex = randint(0, currentIndex - 1);
                currentIndex -= 1;
                var temporaryValue = array[currentIndex];
                [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
            }
        };

        const getNumSwaps = function (arr) {
            let numSwaps = 0;
            const seen = (__range__(0, arr.length - 1, true).map((x) => false));
            // We compute the cycle decomposition
            while (true) {
                var cur = -1;
                for (var i = 0, end = arr.length - 1, asc = 0 <= end; asc ? i <= end : i >= end; asc ? i++ : i--) {
                    if (!seen[i]) {
                        cur = i;
                        break;
                    }
                }
                if (cur === -1) {
                    break;
                }
                var cycleLength = 0;
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

        const arePermutationsValid = function (cp, ep) {
            const numSwaps = getNumSwaps(ep) + getNumSwaps(cp);
            return (numSwaps % 2) === 0;
        };

        const generateValidRandomPermutation = function (cp, ep) {
            // Each shuffle only takes around 12 operations and there's a 50%
            // chance of a valid permutation so it'll finish in very good time
            shuffle(ep);
            shuffle(cp);
            while (!arePermutationsValid(cp, ep)) {
                shuffle(ep);
                shuffle(cp);
            }
        };

        const randomizeOrientation = function (arr, numOrientations) {
            let ori = 0;
            for (let i = 0, end = arr.length - 1, asc = 0 <= end; asc ? i <= end : i >= end; asc ? i++ : i--) {
                ori += (arr[i] = randint(0, numOrientations - 1));
            }
        };

        const isOrientationValid = (arr, numOrientations) => (arr.reduce((a, b) => a + b) % numOrientations) === 0;

        const generateValidRandomOrientation = function (co, eo) {
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

        const result = function () {
            generateValidRandomPermutation(this.cp, this.ep);
            generateValidRandomOrientation(this.co, this.eo);
            return this;
        };

        return result();
    }

    init(state) {
        this.center = state.center.slice(0);
        this.co = state.co.slice(0);
        this.ep = state.ep.slice(0);
        this.cp = state.cp.slice(0);
        return this.eo = state.eo.slice(0);
    }

    identity() {
        // Initialize to the identity cube
        let x;
        this.center = [0, 1, 2, 3, 4, 5];
        this.cp = [0, 1, 2, 3, 4, 5, 6, 7];
        this.co = ((() => {
            const result = [];
            for (x = 0; x <= 7; x++) {
                result.push(0);
            }
            return result;
        })());
        this.ep = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
        return this.eo = ((() => {
            const result1 = [];
            for (x = 0; x <= 11; x++) {
                result1.push(0);
            }
            return result1;
        })());
    }

    toJSON() {
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
            var corner = this.cp[i];
            ori = this.co[i];
            for (n = 0; n <= 2; n++) {
                result[cornerFacelet[i][(n + ori) % 3]] = cornerColor[corner][n];
            }
        }

        for (i = 0; i <= 11; i++) {
            var edge = this.ep[i];
            ori = this.eo[i];
            for (n = 0; n <= 1; n++) {
                result[edgeFacelet[i][(n + ori) % 2]] = edgeColor[edge][n];
            }
        }

        return result.join('');
    }

    static fromString(str) {
        let i, j;
        const cube = new Cube;

        for (i = 0; i <= 5; i++) {
            for (j = 0; j <= 5; j++) {
                if (str[(9 * i) + 4] === centerColor[j]) {
                    cube.center[i] = j;
                }
            }
        }

        for (i = 0; i <= 7; i++) {
            var ori;
            for (ori = 0; ori <= 2; ori++) {
                if (['U', 'D'].includes(str[cornerFacelet[i][ori]])) { break; }
            }
            var col1 = str[cornerFacelet[i][(ori + 1) % 3]];
            var col2 = str[cornerFacelet[i][(ori + 2) % 3]];

            for (j = 0; j <= 7; j++) {
                if ((col1 === cornerColor[j][1]) && (col2 === cornerColor[j][2])) {
                    cube.cp[i] = j;
                    cube.co[i] = ori % 3;
                }
            }
        }

        for (i = 0; i <= 11; i++) {
            for (j = 0; j <= 11; j++) {
                if ((str[edgeFacelet[i][0]] === edgeColor[j][0]) &&
                    (str[edgeFacelet[i][1]] === edgeColor[j][1])) {
                    cube.ep[i] = j;
                    cube.eo[i] = 0;
                    break;
                }
                if ((str[edgeFacelet[i][0]] === edgeColor[j][1]) &&
                    (str[edgeFacelet[i][1]] === edgeColor[j][0])) {
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
            if (clone.center[cent] !== cent) { return false; }
        }

        for (let c = 0; c <= 7; c++) {
            if (clone.cp[c] !== c) { return false; }
            if (clone.co[c] !== 0) { return false; }
        }

        for (let e = 0; e <= 11; e++) {
            if (clone.ep[e] !== e) { return false; }
            if (clone.eo[e] !== 0) { return false; }
        }

        return true;
    }

    // Multiply this Cube with another Cube, restricted to centers.
    centerMultiply(other) {
        let from;
        for (let to = 0; to <= 5; to++) {
            from = other.center[to];
            this.newCenter[to] = this.center[from];
        }

        [this.center, this.newCenter] = [this.newCenter, this.center];
        return this;
    }

    // Multiply this Cube with another Cube, restricted to corners.
    cornerMultiply(other) {
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
    edgeMultiply(other) {
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
    multiply(other) {
        this.centerMultiply(other);
        this.cornerMultiply(other);
        this.edgeMultiply(other);
        return this;
    }

    move(arg) {
        for (let _move of parseAlg(arg)) {
            let face = (_move / 3) | 0;
            let power = _move % 3;
            console.log(face)
            console.log(power)
            for (var x = 0, end = power, asc = 0 <= end; asc ? x <= end : x >= end; asc ? x++ : x--) { this.multiply(Cube.moves[face]); }
        }

        return this;
    }

    upright() {
        let i, j;
        const clone = this.clone();
        const result = [];
        for (i = 0; i <= 5; i++) {
            if (clone.center[i] === F) { break; }
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

    static inverse(arg) {
        let move, face, power;
        const result = (() => {
            const result1 = [];
            for (move of parseAlg(arg)) {
                face = (move / 3) | 0;
                power = move % 3;
                result1.push((face * 3) + -(power - 1) + 1);
            }
            return result1;
        })();

        result.reverse();

        if (typeof arg === 'string') {
            let str = '';
            for (move of result) {
                face = (move / 3) | 0;
                power = move % 3;
                str += faceNames[face];
                if (power === 1) {
                    str += '2';
                } else if (power === 2) {
                    str += "'";
                }
                str += ' ';
            }
            return str.substring(0, str.length - 1);

        } else if (arg.length != null) {
            return result;

        } else {
            return result[0];
        }
    }
};

// const x_cube = new Cube().move("R M' L'").toJSON()
// const y_cube = new Cube().move("U E' D'").toJSON()
// const z_cube = new Cube().move("F S B'").toJSON()
// const u_cube = new Cube().move("U E'").toJSON()
// const r_cube = new Cube().move("R M'").toJSON()
// const f_cube = new Cube().move("F S").toJSON()
// const d_cube = new Cube().move("D E").toJSON()
// const l_cube = new Cube().move("L M").toJSON()
// const b_cube = new Cube().move("B S'").toJSON()

