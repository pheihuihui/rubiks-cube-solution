import { __range__ } from "../../util/utilities";

// Centers
const [U, R, F, D, L, B] = Array.from([0, 1, 2, 3, 4, 5]);

// Corners
const [URF, UFL, ULB, UBR, DFR, DLF, DBL, DRB] = Array.from([0, 1, 2, 3, 4, 5, 6, 7]);

// Edges
const [UR, UF, UL, UB, DR, DF, DL, DB, FR, FL, BL, BR] = Array.from([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);

const _U = (x: number) => x - 1;
const _R = (x: number) => _U(9) + x;
const _F = (x: number) => _R(9) + x;
const _D = (x: number) => _F(9) + x;
const _L = (x: number) => _D(9) + x;
const _B = (x: number) => _L(9) + x;

const centerFacelet = [4, 13, 22, 31, 40, 49]

const cornerFacelet = [
    [_U(9), _R(1), _F(3)], [_U(7), _F(1), _L(3)],
    [_U(1), _L(1), _B(3)], [_U(3), _B(1), _R(3)],
    [_D(3), _F(9), _R(7)], [_D(1), _L(9), _F(7)],
    [_D(7), _B(9), _L(7)], [_D(9), _R(9), _B(7)],
]

const edgeFacelet = [
    [_U(6), _R(2)], [_U(8), _F(2)], [_U(4), _L(2)], [_U(2), _B(2)],
    [_D(6), _R(8)], [_D(2), _F(8)], [_D(4), _L(8)], [_D(8), _B(8)],
    [_F(6), _R(4)], [_F(4), _L(6)], [_B(6), _L(4)], [_B(4), _R(6)],
]

const centerColor = ['U', 'R', 'F', 'D', 'L', 'B'];

const cornerColor = [
    ['U', 'R', 'F'], ['U', 'F', 'L'], ['U', 'L', 'B'], ['U', 'B', 'R'],
    ['D', 'F', 'R'], ['D', 'L', 'F'], ['D', 'B', 'L'], ['D', 'R', 'B'],
];

const edgeColor = [
    ['U', 'R'], ['U', 'F'], ['U', 'L'], ['U', 'B'], ['D', 'R'], ['D', 'F'],
    ['D', 'L'], ['D', 'B'], ['F', 'R'], ['F', 'L'], ['B', 'L'], ['B', 'R'],
];

type T_Facelet = {
    center: Array<number>
    cp: Array<number>
    co: Array<number>
    ep: Array<number>
    eo: Array<number>
}

export class Cube {

    static moves: T_Facelet[] = [
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

        new Cube().move("R M' L'").toJSON(),

        // y
        new Cube().move("U E' D'").toJSON(),

        // z
        new Cube().move("F S B'").toJSON(),

        // u
        new Cube().move("U E'").toJSON(),

        // r
        new Cube().move("R M'").toJSON(),

        // f
        new Cube().move("F S").toJSON(),

        // d
        new Cube().move("D E").toJSON(),

        // l
        new Cube().move("L M").toJSON(),

        // b
        new Cube().move("B S'").toJSON()
    ];

    static faceNums: Record<string, number> = {
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

    static faceNames: { [index: number]: string } = {
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

    newCenter: number[];
    newCp: number[];
    newEp: number[];
    newCo: number[];
    newEo: number[];

    center: number[] = Array(6).fill(0);
    co: number[] = Array(8).fill(0);
    ep: number[] = Array(12).fill(0);
    cp: number[] = Array(8).fill(0);
    eo: number[] = Array(12).fill(0);

    constructor(other?: T_Facelet) {
        if (other != null) {
            this.init(other);
        } else {
            this.identity();
        }

        // For moves to avoid allocating new objects each time
        this.newCenter = Array(6).fill(0)
        this.newCp = Array(8).fill(0)
        this.newEp = Array(12).fill(0)
        this.newCo = Array(8).fill(0)
        this.newEo = Array(12).fill(0)
    }

    randomize() {
        const randint = function (min: number, max: number) {
            return min + Math.floor(Math.random() * ((max - min) + 1));
        }

        // Fisher-Yates shuffle adapted from https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
        const shuffle = function (array: number[]) {
            let currentIndex = array.length;
            while (currentIndex != 0) {
                const randomIndex = randint(0, currentIndex - 1);
                currentIndex -= 1;
                const temporaryValue = array[currentIndex];
                [array[currentIndex], array[randomIndex]] = Array.from([array[randomIndex], array[currentIndex]]);
            }
        };

        const getNumSwaps = function (arr: number[]) {
            let numSwaps = 0;
            const seen = __range__(0, arr.length - 1, true).map(_ => false);
            // We compute the cycle decomposition
            while (true) {
                let cur = -1;
                for (let i = 0, end = arr.length - 1, asc = 0 <= end; asc ? i <= end : i >= end; asc ? i++ : i--) {
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
                    cycleLength += 1;
                    cur = arr[cur];
                }
                // A cycle is equivalent to cycleLength + 1 swaps
                numSwaps += cycleLength + 1;
            }
            return numSwaps;
        };

        const arePermutationsValid = function (cp: number[], ep: number[]) {
            const numSwaps = getNumSwaps(ep) + getNumSwaps(cp);
            return (numSwaps % 2) == 0;
        };

        const generateValidRandomPermutation = function (cp: number[], ep: number[]) {
            shuffle(ep);
            shuffle(cp);
            while (!arePermutationsValid(cp, ep)) {
                shuffle(ep);
                shuffle(cp);
            }
        };

        const randomizeOrientation = function (arr: number[], numOrientations: number) {
            let ori = 0;
            for (const u of __range__(0, arr.length, false)) {
                arr[u] = randint(0, numOrientations - 1)
                ori += arr[u]
            }
        };

        const isOrientationValid = function (arr: number[], numOrientations: number) {
            return (arr.reduce((a, b) => a + b) % numOrientations) == 0;
        };

        const generateValidRandomOrientation = function (co: number[], eo: number[]) {
            randomizeOrientation(co, 3);
            while (!isOrientationValid(co, 3)) {
                randomizeOrientation(co, 3);
            }
            randomizeOrientation(eo, 2);
            while (!isOrientationValid(eo, 2)) {
                randomizeOrientation(eo, 2);
            }
        };

        generateValidRandomPermutation(this.cp, this.ep);
        generateValidRandomOrientation(this.co, this.eo);
        return this;
    }

    static parseAlg(arg: string) {
        const result = [];
        for (let part of Array.from(arg.split(/\s+/))) {
            let power: number;
            if (part.length == 0) {
                continue;
            }
            if (part.length > 2) {
                throw new Error(`Invalid move: ${part}`);
            }
            const move = Cube.faceNums[part[0]];
            if (!move) {
                throw new Error(`Invalid move: ${part}`);
            }

            if (part.length == 1) {
                power = 0;
            } else {
                if (part[1] == '2') {
                    power = 1;
                } else if (part[1] == "'") {
                    power = 2;
                } else {
                    throw new Error(`Invalid move: ${part}`);
                }
            }

            result.push((move * 3) + power);
        }
        return result;
    };

    init(state: T_Facelet) {
        this.center = state.center.slice(0);
        this.co = state.co.slice(0);
        this.ep = state.ep.slice(0);
        this.cp = state.cp.slice(0);
        this.eo = state.eo.slice(0);
    }

    identity() {
        // Initialize to the identity cube
        let x: number;
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

    toJSON(): T_Facelet {
        return {
            center: this.center,
            cp: this.cp,
            co: this.co,
            ep: this.ep,
            eo: this.eo
        };
    }

    asString() {
        let i: number, n: number, ori: number;
        const result: string[] = [];

        for (i = 0; i <= 5; i++) {
            result[(9 * i) + 4] = centerColor[this.center[i]];
        }

        for (i = 0; i <= 7; i++) {
            const corner = this.cp[i];
            ori = this.co[i];
            for (n = 0; n <= 2; n++) {
                result[cornerFacelet[i][(n + ori) % 3]] = cornerColor[corner][n];
            }
        }

        for (i = 0; i <= 11; i++) {
            const edge = this.ep[i];
            ori = this.eo[i];
            for (n = 0; n <= 1; n++) {
                result[edgeFacelet[i][(n + ori) % 2]] = edgeColor[edge][n];
            }
        }

        return result.join('');
    }

    static fromString(str: { [x: string]: any; }) {
        let i: number, j: number;
        const cube = new Cube;

        for (i = 0; i <= 5; i++) {
            for (j = 0; j <= 5; j++) {
                if (str[(9 * i) + 4] === centerColor[j]) {
                    cube.center[i] = j;
                }
            }
        }

        for (i = 0; i <= 7; i++) {
            var ori: number;
            for (ori = 0; ori <= 2; ori++) {
                if (['U', 'D'].includes(str[cornerFacelet[i][ori]])) { break; }
            }
            const col1 = str[cornerFacelet[i][(ori + 1) % 3]];
            const col2 = str[cornerFacelet[i][(ori + 2) % 3]];

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

    static random() {
        return new Cube().randomize();
    }

    isSolved() {
        const clone = this.clone();
        clone.move(clone.upright());

        for (let cent = 0; cent <= 5; cent++) {
            if (clone.center[cent] != cent) { return false; }
        }

        for (let c = 0; c <= 7; c++) {
            if (clone.cp[c] != c) { return false; }
            if (clone.co[c] != 0) { return false; }
        }

        for (let e = 0; e <= 11; e++) {
            if (clone.ep[e] != e) { return false; }
            if (clone.eo[e] != 0) { return false; }
        }

        return true;
    }

    centerMultiply(other: T_Facelet) {
        let from: number;
        for (let to = 0; to <= 5; to++) {
            from = other.center[to];
            this.newCenter[to] = this.center[from];
        }

        [this.center, this.newCenter] = Array.from([this.newCenter, this.center]);
        return this;
    }

    cornerMultiply(other: T_Facelet) {
        let from: number;
        for (let to = 0; to <= 7; to++) {
            from = other.cp[to];
            this.newCp[to] = this.cp[from];
            this.newCo[to] = (this.co[from] + other.co[to]) % 3;
        }

        [this.cp, this.newCp] = Array.from([this.newCp, this.cp]);
        [this.co, this.newCo] = Array.from([this.newCo, this.co]);
        return this;
    }

    edgeMultiply(other: T_Facelet) {
        let from: number;
        for (let to = 0; to <= 11; to++) {
            from = other.ep[to];
            this.newEp[to] = this.ep[from];
            this.newEo[to] = (this.eo[from] + other.eo[to]) % 2;
        }

        [this.ep, this.newEp] = Array.from([this.newEp, this.ep]);
        [this.eo, this.newEo] = Array.from([this.newEo, this.eo]);
        return this;
    }

    multiply(other: any) {
        this.centerMultiply(other);
        this.cornerMultiply(other);
        this.edgeMultiply(other);
        return this;
    }

    move(arg: string) {
        for (let move of Array.from(Cube.parseAlg(arg))) {
            const face = (move / 3) | 0;
            const power = move % 3;
            for (let x = 0, end = power, asc = 0 <= end; asc ? x <= end : x >= end; asc ? x++ : x--) { this.multiply(Cube.moves[face]); }
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
            if (clone.center[j] == U) { break; }
        }
        switch (j) {
            case L: result.push("z"); break;
            case R: result.push("z'"); break;
            case D: result.push("z2"); break;
        }
        return result.join(' ');
    }

    static inverse(arg: string) {
        let move: number, face: number, power: number;
        const result = (() => {
            const result1 = [];
            for (move of Array.from(Cube.parseAlg(arg))) {
                face = (move / 3) | 0;
                power = move % 3;
                result1.push((face * 3) + -(power - 1) + 1);
            }
            return result1;
        })();

        result.reverse();

        let str = '';
        for (move of Array.from(result)) {
            face = (move / 3) | 0;
            power = move % 3;
            str += Cube.faceNames[face];
            if (power == 1) {
                str += '2';
            } else if (power == 2) {
                str += "'";
            }
            str += ' ';
        }
        return str.substring(0, str.length - 1);

    }

}

let cube = new Cube()
console.log(cube.asString())