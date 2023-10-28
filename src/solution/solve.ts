// @ts-nocheck

import { Cube } from './cube'
import { __range__ } from '../util/utilities'
import { U, R, F, D, L, B } from './cube'
import { URF, UFL, ULB, UBR, DFR, DLF, DBL, DRB } from './cube'
import { UR, UF, UL, UB, DR, DF, DL, DB, FR, FL, BL, BR } from './cube'


//# Helpers

// n choose k, i.e. the binomial coeffiecient
const Cnk = function (n, k) {
    if (n < k) { return 0; }

    if (k > (n / 2)) {
        k = n - k;
    }

    let s = 1;
    let i = n;
    let j = 1;
    while (i !== (n - k)) {
        s *= i;
        s /= j;
        i--;
        j++;
    }
    return s;
};

// n!
const factorial = function (n) {
    let f = 1;
    for (let i = 2, end = n, asc = 2 <= end; asc ? i <= end : i >= end; asc ? i++ : i--) {
        f *= i;
    }
    return f;
};

// Maximum of two values
const max = function (a, b) {
    if (a > b) { return a; } else { return b; }
};

// Rotate elements between l and r left by one place
// const rotateLeft = function (array, l, r) {
//     const tmp = array[l];
//     for (let i = l, end = r - 1, asc = l <= end; asc ? i <= end : i >= end; asc ? i++ : i--) { array[i] = array[i + 1]; }
//     return array[r] = tmp;
// };

function rotateLeft(array: number[], l: number, r: number): void {
    const tmp = array[l];
    for (let i = l; i < r; i++) {
        array[i] = array[i + 1];
    }
    array[r] = tmp;
}

// Rotate elements between l and r right by one place
// const rotateRight = function (array, l, r) {
//     const tmp = array[r];
//     for (let i = r, end = l + 1, asc = r <= end; asc ? i <= end : i >= end; asc ? i++ : i--) { array[i] = array[i - 1]; }
//     return array[l] = tmp;
// };
function rotateRight(array: number[], l: number, r: number) {
    const tmp = array[r];
    for (let i = r; i > l; i--) {
        array[i] = array[i - 1];
    }
    array[l] = tmp;
}


// Generate a function that computes permutation indices.
//
// The permutation index actually encodes two indices: Combination,
// i.e. positions of the cubies start..end (A) and their respective
// permutation (B). The maximum value for B is
//
//   maxB = (end - start + 1)!
//
// and the index is A * maxB + B

const permutationIndex = function (context, start, end, fromEnd) {
    let maxAll, permName;
    let i;
    if (fromEnd == null) { fromEnd = false; }
    const maxOur = end - start;
    const maxB = factorial(maxOur + 1);

    if (context === 'corners') {
        maxAll = 7;
        permName = 'cp';
    } else {
        maxAll = 11;
        permName = 'ep';
    }

    // const our = ((() => {
    //     let asc, end1, j;
    //     const result = [];
    //     for (j = 0, i = j, end1 = maxOur, asc = 0 <= end1; asc ? j <= end1 : j >= end1; asc ? j++ : j--, i = j) {
    //         result.push(0);
    //     }
    //     return result;
    // })());
    const our = __range__(0, maxOur, true).map(() => 0);

    return function (index: number | null) {
        let a, b, j, k, perm, x;
        if (index != null) {
            // Reset our to [start..end]
            let asc1, end2;
            let asc2, end3;
            let asc3, end4;
            let c;
            // for (i = 0, end2 = maxOur, asc1 = 0 <= end2; asc1 ? i <= end2 : i >= end2; asc1 ? i++ : i--) { our[i] = i + start; }
            for (let i = 0; i < maxOur; i++) {
                our[i] = i + start;
            }

            b = index % maxB;      // permutation
            a = (index / maxB) | 0;  // combination

            // Invalidate all edges
            perm = this[permName];
            // for (i = 0, end3 = maxAll, asc2 = 0 <= end3; asc2 ? i <= end3 : i >= end3; asc2 ? i++ : i--) { perm[i] = -1; }
            for (let i = 0; i <= maxAll; i++) {
                perm[i] = -1;
            }

            // Generate permutation from index b
            for (j = 1; j <= maxOur; j++) {
                k = b % (j + 1);
                b = (b / (j + 1)) | 0;
                // TODO: Implement rotateRightBy(our, 0, j, k)
                while (k > 0) {
                    rotateRight(our, 0, j);
                    k--;
                }
            }

            // Generate combination and set our edges
            x = maxOur;
            if (fromEnd) {
                let asc4, end5;
                for (j = 0; j <= maxAll; j++) {
                    c = Cnk(maxAll - j, x + 1);
                    if ((a - c) >= 0) {
                        perm[j] = our[maxOur - x];
                        a -= c;
                        x--;
                    }
                }
            } else {
                let asc5;
                for (j = maxAll; j >= 0; j--) {
                    c = Cnk(j, x + 1);
                    if ((a - c) >= 0) {
                        perm[j] = our[x];
                        a -= c;
                        x--;
                    }
                }
            }

            return this;

        } else {
            let asc6, end6;
            let asc9;
            perm = this[permName];
            for (i = 0; i <= maxOur; i++) {
                our[i] = -1;
            }
            x = 0;
            b = x;
            a = b;
            // Compute the index a < ((maxAll + 1) choose (maxOur + 1)) and
            // the permutation
            if (fromEnd) {
                let asc7;
                for (j = maxAll; j >= 0; j--) {
                    if (start <= perm[j] && perm[j] <= end) {
                        a += Cnk(maxAll - j, x + 1);
                        our[maxOur - x] = perm[j];
                        x++;
                    }
                }
            } else {
                let asc8, end7;
                for (j = 0; j <= maxAll; j++) {
                    if (start <= perm[j] && perm[j] <= end) {
                        a += Cnk(j, x + 1);
                        our[x] = perm[j];
                        x++;
                    }
                }
            }

            // Compute the index b < (maxOur + 1)! for the permutation
            for (j = maxOur; j >= 0; j--) {
                k = 0;
                while (our[j] !== (start + j)) {
                    rotateLeft(our, 0, j);
                    k++;
                }
                b = ((j + 1) * b) + k;
            }

            return (a * maxB) + b;
        }
    };
};


const Include = {
    // The twist of the 8 corners, 0 <= twist < 3^7. The orientation of
    // the DRB corner is fully determined by the orientation of the other
    // corners.
    twist(twist) {
        let i;
        if (twist != null) {
            let parity = 0;
            for (i = 6; i >= 0; i--) {
                var ori = twist % 3;
                twist = (twist / 3) | 0;

                this.co[i] = ori;
                parity += ori;
            }

            this.co[7] = ((3 - (parity % 3)) % 3);
            return this;

        } else {
            let v = 0;
            for (i = 0; i <= 6; i++) {
                v = (3 * v) + this.co[i];
            }
            return v;
        }
    },

    // The flip of the 12 edges, 0 <= flip < 2^11. The orientation of the
    // BR edge is fully determined by the orientation of the other edges.
    flip(flip) {
        let i;
        if (flip != null) {
            let parity = 0;
            for (i = 10; i >= 0; i--) {
                var ori = flip % 2;
                flip = (flip / 2) | 0;

                this.eo[i] = ori;
                parity += ori;
            }

            this.eo[11] = ((2 - (parity % 2)) % 2);
            return this;

        } else {
            let v = 0;
            for (i = 0; i <= 10; i++) {
                v = (2 * v) + this.eo[i];
            }
            return v;
        }
    },

    // Parity of the corner permutation
    cornerParity() {
        let s = 0;
        for (let i = DRB, end = URF + 1, asc = DRB <= end; asc ? i <= end : i >= end; asc ? i++ : i--) {
            for (var start = i - 1, j = start, end1 = URF, asc1 = start <= end1; asc1 ? j <= end1 : j >= end1; asc1 ? j++ : j--) {
                if (this.cp[j] > this.cp[i]) { s++; }
            }
        }

        return s % 2;
    },

    // Parity of the edges permutation. Parity of corners and edges are
    // the same if the cube is solvable.
    edgeParity() {
        let s = 0;
        for (let i = BR, end = UR + 1, asc = BR <= end; asc ? i <= end : i >= end; asc ? i++ : i--) {
            for (var start = i - 1, j = start, end1 = UR, asc1 = start <= end1; asc1 ? j <= end1 : j >= end1; asc1 ? j++ : j--) {
                if (this.ep[j] > this.ep[i]) { s++; }
            }
        }

        return s % 2;
    },

    // Permutation of the six corners URF, UFL, ULB, UBR, DFR, DLF
    URFtoDLF: permutationIndex('corners', URF, DLF),

    // Permutation of the three edges UR, UF, UL
    URtoUL: permutationIndex('edges', UR, UL),

    // Permutation of the three edges UB, DR, DF
    UBtoDF: permutationIndex('edges', UB, DF),

    // Permutation of the six edges UR, UF, UL, UB, DR, DF
    URtoDF: permutationIndex('edges', UR, DF),

    // Permutation of the equator slice edges FR, FL, BL and BR
    FRtoBR: permutationIndex('edges', FR, BR, true)
};


for (var key in Include) {
    var value = Include[key];
    Cube.prototype[key] = value;
}


const computeMoveTable = function (context, coord, size) {
    // Loop through all valid values for the coordinate, setting cube's
    // state in each iteration. Then apply each of the 18 moves to the
    // cube, and compute the resulting coordinate.
    const apply = context === 'corners' ? 'cornerMultiply' : 'edgeMultiply';

    const cube = new Cube;

    return (() => {
        const result = [];
        for (let i = 0, end = size - 1, asc = 0 <= end; asc ? i <= end : i >= end; asc ? i++ : i--) {
            cube[coord](i);
            var inner = [];
            for (var j = 0; j <= 5; j++) {
                var move = Cube.moves[j];
                for (var k = 0; k <= 2; k++) {
                    cube[apply](move);
                    inner.push(cube[coord]());
                }
                // 4th face turn restores the cube
                cube[apply](move);
            }
            result.push(inner);
        }
        return result;
    })();
};

// Because we only have the phase 2 URtoDF coordinates, we need to
// merge the URtoUL and UBtoDF coordinates to URtoDF in the beginning
// of phase 2.
const mergeURtoDF = (function () {
    const a = new Cube;
    const b = new Cube;

    return function (URtoUL, UBtoDF) {
        // Collisions can be found because unset are set to -1
        a.URtoUL(URtoUL);
        b.UBtoDF(UBtoDF);

        for (let i = 0; i <= 7; i++) {
            if (a.ep[i] !== -1) {
                if (b.ep[i] !== -1) {
                    return -1;  // collision
                } else {
                    b.ep[i] = a.ep[i];
                }
            }
        }

        return b.URtoDF();
    };
})();

const N_TWIST = 2187;    // 3^7 corner orientations
const N_FLIP = 2048;     // 2^11 possible edge flips
const N_PARITY = 2;      // 2 possible parities

const N_FRtoBR = 11880;  // 12!/(12-4)! permutations of FR..BR edges
const N_SLICE1 = 495;    // (12 choose 4) possible positions of FR..BR edges
const N_SLICE2 = 24;     // 4! permutations of FR..BR edges in phase 2

const N_URFtoDLF = 20160;  // 8!/(8-6)! permutations of URF..DLF corners

// The URtoDF move table is only computed for phase 2 because the full
// table would have >650000 entries
const N_URtoDF = 20160;  // 8!/(8-6)! permutation of UR..DF edges in phase 2

const N_URtoUL = 1320;  // 12!/(12-3)! permutations of UR..UL edges
const N_UBtoDF = 1320;  // 12!/(12-3)! permutations of UB..DF edges

// The move table for parity is so small that it's included here
Cube.moveTables = {
    parity: [
        [1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1],
        [0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0],
    ],
    twist: null,
    flip: null,
    FRtoBR: null,
    URFtoDLF: null,
    URtoDF: null,
    URtoUL: null,
    UBtoDF: null,
    mergeURtoDF: null
};

// Other move tables are computed on the fly
const moveTableParams = {
    // name: [scope, size]
    twist: ['corners', N_TWIST],
    flip: ['edges', N_FLIP],
    FRtoBR: ['edges', N_FRtoBR],
    URFtoDLF: ['corners', N_URFtoDLF],
    URtoDF: ['edges', N_URtoDF],
    URtoUL: ['edges', N_URtoUL],
    UBtoDF: ['edges', N_UBtoDF],
    mergeURtoDF: []  // handled specially
};

Cube.computeMoveTables = function (...tables) {
    if (tables.length === 0) {
        tables = ((() => {
            const result = [];
            for (var name in moveTableParams) {
                result.push(name);
            }
            return result;
        })());
    }

    for (var tableName of Array.from(tables)) {
        // Already computed
        if (this.moveTables[tableName] !== null) { continue; }

        if (tableName === 'mergeURtoDF') {
            this.moveTables.mergeURtoDF = ((() => __range__(0, 335, true).map((URtoUL) =>
                __range__(0, 335, true).map((UBtoDF) =>
                    mergeURtoDF(URtoUL, UBtoDF)))))();
        } else {
            var [scope, size] = Array.from(moveTableParams[tableName]);
            this.moveTables[tableName] = computeMoveTable(scope, tableName, size);
        }
    }

    return this;
};


// Phase 1: All moves are valid
const allMoves1 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17];

// The list of next valid phase 1 moves when the given face was turned
// in the last move
const nextMoves1 = ((() => (() => {
    const result = [];
    for (let lastFace = 0; lastFace <= 5; lastFace++) {
        var next = [];
        // Don't allow commuting moves, e.g. U U'. Also make sure that
        // opposite faces are always moved in the same order, i.e. allow
        // U D but no D U. This avoids sequences like U D U'.
        for (var face = 0; face <= 5; face++) {
            if ((face !== lastFace) && (face !== (lastFace - 3))) {
                for (var power = 0; power <= 2; power++) {  // single, double or inverse move
                    next.push((face * 3) + power);
                }
            }
        }
        result.push(next);
    }
    return result;
})()))();

// Phase 2: Double moves of all faces plus quarter moves of U and D
const allMoves2 = [0, 1, 2, 4, 7, 9, 10, 11, 13, 16];

const nextMoves2 = ((() => (() => {
    const result = [];
    for (let lastFace = 0; lastFace <= 5; lastFace++) {
        var next = [];
        for (var face = 0; face <= 5; face++) {
            // Allow all moves of U and D and double moves of others
            if ((face !== lastFace) && (face !== (lastFace - 3))) {
                var powers = [0, 3].includes(face) ? [0, 1, 2] : [1];
                for (var power of Array.from(powers)) {
                    next.push((face * 3) + power);
                }
            }
        }
        result.push(next);
    }
    return result;
})()))();

// 8 values are encoded in one number
const pruning = function (table, index, value) {
    const pos = index % 8;
    const slot = index >> 3;
    const shift = pos << 2;

    if (value != null) {
        // Set
        table[slot] &= ~(0xF << shift);
        table[slot] |= (value << shift);
        return value;
    } else {
        // Get
        return (table[slot] & (0xF << shift)) >>> shift;
    }
};

const computePruningTable = function (phase, size, currentCoords, nextIndex) {
    // Initialize all values to 0xF
    let moves;
    const table = (__range__(0, Math.ceil(size / 8) - 1, true).map((x) => 0xFFFFFFFF));

    if (phase === 1) {
        moves = allMoves1;
    } else {
        moves = allMoves2;
    }

    let depth = 0;
    pruning(table, 0, depth);
    let done = 1;

    // In each iteration, take each state found in the previous depth and
    // compute the next state. Stop when all states have been assigned a
    // depth.
    while (done !== size) {
        for (var index = 0, end = size - 1, asc = 0 <= end; asc ? index <= end : index >= end; asc ? index++ : index--) {
            if (pruning(table, index) === depth) {
                var current = currentCoords(index);
                for (var move of Array.from(moves)) {
                    var next = nextIndex(current, move);
                    if (pruning(table, next) === 0xF) {
                        pruning(table, next, depth + 1);
                        done++;
                    }
                }
            }
        }
        depth++;
    }

    return table;
};

Cube.pruningTables = {
    sliceTwist: null,
    sliceFlip: null,
    sliceURFtoDLFParity: null,
    sliceURtoDFParity: null
};

const pruningTableParams = {
    // name: [phase, size, currentCoords, nextIndex]
    sliceTwist: [
        1,
        N_SLICE1 * N_TWIST,
        index => [index % N_SLICE1, (index / N_SLICE1) | 0],
        function (current, move) {
            const [slice, twist] = Array.from(current);
            const newSlice = (Cube.moveTables.FRtoBR[slice * 24][move] / 24) | 0;
            const newTwist = Cube.moveTables.twist[twist][move];
            return (newTwist * N_SLICE1) + newSlice;
        }
    ],
    sliceFlip: [
        1,
        N_SLICE1 * N_FLIP,
        index => [index % N_SLICE1, (index / N_SLICE1) | 0],
        function (current, move) {
            const [slice, flip] = Array.from(current);
            const newSlice = (Cube.moveTables.FRtoBR[slice * 24][move] / 24) | 0;
            const newFlip = Cube.moveTables.flip[flip][move];
            return (newFlip * N_SLICE1) + newSlice;
        }
    ],
    sliceURFtoDLFParity: [
        2,
        N_SLICE2 * N_URFtoDLF * N_PARITY,
        index => [index % 2, ((index / 2) | 0) % N_SLICE2, (((index / 2) | 0) / N_SLICE2) | 0],
        function (current, move) {
            const [parity, slice, URFtoDLF] = Array.from(current);
            const newParity = Cube.moveTables.parity[parity][move];
            const newSlice = Cube.moveTables.FRtoBR[slice][move];
            const newURFtoDLF = Cube.moveTables.URFtoDLF[URFtoDLF][move];
            return (((newURFtoDLF * N_SLICE2) + newSlice) * 2) + newParity;
        }
    ],
    sliceURtoDFParity: [
        2,
        N_SLICE2 * N_URtoDF * N_PARITY,
        index => [index % 2, ((index / 2) | 0) % N_SLICE2, (((index / 2) | 0) / N_SLICE2) | 0],
        function (current, move) {
            const [parity, slice, URtoDF] = Array.from(current);
            const newParity = Cube.moveTables.parity[parity][move];
            const newSlice = Cube.moveTables.FRtoBR[slice][move];
            const newURtoDF = Cube.moveTables.URtoDF[URtoDF][move];
            return (((newURtoDF * N_SLICE2) + newSlice) * 2) + newParity;
        }
    ]
};

Cube.computePruningTables = function (...tables) {
    if (tables.length === 0) {
        tables = ((() => {
            const result = [];
            for (var name in pruningTableParams) {
                result.push(name);
            }
            return result;
        })());
    }

    for (var tableName of Array.from(tables)) {
        // Already computed
        if (this.pruningTables[tableName] !== null) { continue; }

        var params = pruningTableParams[tableName];
        this.pruningTables[tableName] = computePruningTable(...Array.from(params || []));
    }

    return this;
};

Cube.initSolver = function () {
    Cube.computeMoveTables();
    return Cube.computePruningTables();
};

Cube.prototype.solveUpright = function (maxDepth) {
    // Names for all moves, i.e. U, U2, U', F, F2, ...
    if (maxDepth == null) { maxDepth = 22; }
    const moveNames = (function () {
        const faceName = ['U', 'R', 'F', 'D', 'L', 'B'];
        const powerName = ['', '2', "'"];

        const result = [];
        for (let face = 0; face <= 5; face++) {
            for (var power = 0; power <= 2; power++) {
                result.push(faceName[face] + powerName[power]);
            }
        }

        return result;
    })();

    class State {
        constructor(cube) {
            this.parent = null;
            this.lastMove = null;
            this.depth = 0;

            if (cube) { this.init(cube); }
        }

        init(cube) {
            // Phase 1 coordinates
            this.flip = cube.flip();
            this.twist = cube.twist();
            this.slice = (cube.FRtoBR() / N_SLICE2) | 0;

            // Phase 2 coordinates
            this.parity = cube.cornerParity();
            this.URFtoDLF = cube.URFtoDLF();
            this.FRtoBR = cube.FRtoBR();

            // These are later merged to URtoDF when phase 2 begins
            this.URtoUL = cube.URtoUL();
            this.UBtoDF = cube.UBtoDF();

            return this;
        }

        solution() {
            if (this.parent) {
                return this.parent.solution() + moveNames[this.lastMove] + ' ';
            } else {
                return '';
            }
        }

        //# Helpers

        move(table, index, move) {
            return Cube.moveTables[table][index][move];
        }

        pruning(table, index) {
            return pruning(Cube.pruningTables[table], index);
        }

        //# Phase 1

        // Return the next valid phase 1 moves for this state
        moves1() {
            if (this.lastMove !== null) { return nextMoves1[(this.lastMove / 3) | 0]; } else { return allMoves1; }
        }

        // Compute the minimum number of moves to the end of phase 1
        minDist1() {
            // The maximum number of moves to the end of phase 1 wrt. the
            // combination flip and slice coordinates only
            const d1 = this.pruning('sliceFlip', (N_SLICE1 * this.flip) + this.slice);

            // The combination of twist and slice coordinates
            const d2 = this.pruning('sliceTwist', (N_SLICE1 * this.twist) + this.slice);

            // The true minimal distance is the maximum of these two
            return max(d1, d2);
        }

        // Compute the next phase 1 state for the given move
        next1(move) {
            const next = freeStates.pop();
            next.parent = this;
            next.lastMove = move;
            next.depth = this.depth + 1;

            next.flip = this.move('flip', this.flip, move);
            next.twist = this.move('twist', this.twist, move);
            next.slice = (this.move('FRtoBR', this.slice * 24, move) / 24) | 0;

            return next;
        }


        //# Phase 2

        // Return the next valid phase 2 moves for this state
        moves2() {
            if (this.lastMove !== null) { return nextMoves2[(this.lastMove / 3) | 0]; } else { return allMoves2; }
        }

        // Compute the minimum number of moves to the solved cube
        minDist2() {
            const index1 = (((N_SLICE2 * this.URtoDF) + this.FRtoBR) * N_PARITY) + this.parity;
            const d1 = this.pruning('sliceURtoDFParity', index1);

            const index2 = (((N_SLICE2 * this.URFtoDLF) + this.FRtoBR) * N_PARITY) + this.parity;
            const d2 = this.pruning('sliceURFtoDLFParity', index2);

            return max(d1, d2);
        }

        // Initialize phase 2 coordinates
        init2(top) {
            if (top == null) { top = true; }
            if (this.parent === null) {
                // Already assigned for the initial state
                return;
            }

            // For other states, the phase 2 state is computed based on
            // parent's state.
            this.parent.init2(false);

            this.URFtoDLF = this.move('URFtoDLF', this.parent.URFtoDLF, this.lastMove);
            this.FRtoBR = this.move('FRtoBR', this.parent.FRtoBR, this.lastMove);
            this.parity = this.move('parity', this.parent.parity, this.lastMove);
            this.URtoUL = this.move('URtoUL', this.parent.URtoUL, this.lastMove);
            this.UBtoDF = this.move('UBtoDF', this.parent.UBtoDF, this.lastMove);

            if (top) {
                // This is the initial phase 2 state. Get the URtoDF coordinate
                // by merging URtoUL and UBtoDF
                return this.URtoDF = this.move('mergeURtoDF', this.URtoUL, this.UBtoDF);
            }
        }

        // Compute the next phase 2 state for the given move
        next2(move) {
            const next = freeStates.pop();
            next.parent = this;
            next.lastMove = move;
            next.depth = this.depth + 1;

            next.URFtoDLF = this.move('URFtoDLF', this.URFtoDLF, move);
            next.FRtoBR = this.move('FRtoBR', this.FRtoBR, move);
            next.parity = this.move('parity', this.parity, move);
            next.URtoDF = this.move('URtoDF', this.URtoDF, move);

            return next;
        }
    }


    let solution = null;

    const phase1search = state => (() => {
        const result = [];
        for (let depth = 1, end = maxDepth, asc = 1 <= end; asc ? depth <= end : depth >= end; asc ? depth++ : depth--) {
            phase1(state, depth);
            if (solution !== null) { break; } else {
                result.push(undefined);
            }
        }
        return result;
    })();

    var phase1 = function (state, depth) {
        if (depth === 0) {
            if (state.minDist1() === 0) {
                // Make sure we don't start phase 2 with a phase 2 move as the
                // last move in phase 1, because phase 2 would then repeat the
                // same move.
                if ((state.lastMove === null) || !Array.from(allMoves2).includes(state.lastMove)) {
                    return phase2search(state);
                }
            }

        } else if (depth > 0) {
            if (state.minDist1() <= depth) {
                return (() => {
                    const result = [];
                    for (var move of Array.from(state.moves1())) {
                        var next = state.next1(move);
                        phase1(next, depth - 1);
                        freeStates.push(next);
                        if (solution !== null) { break; } else {
                            result.push(undefined);
                        }
                    }
                    return result;
                })();
            }
        }
    };

    var phase2search = function (state) {
        // Initialize phase 2 coordinates
        state.init2();

        return (() => {
            const result = [];
            for (let depth = 1, end = maxDepth - state.depth, asc = 1 <= end; asc ? depth <= end : depth >= end; asc ? depth++ : depth--) {
                phase2(state, depth);
                if (solution !== null) { break; } else {
                    result.push(undefined);
                }
            }
            return result;
        })();
    };

    var phase2 = function (state, depth) {
        if (depth === 0) {
            if (state.minDist2() === 0) {
                return solution = state.solution();
            }
        } else if (depth > 0) {
            if (state.minDist2() <= depth) {
                return (() => {
                    const result = [];
                    for (var move of Array.from(state.moves2())) {
                        var next = state.next2(move);
                        phase2(next, depth - 1);
                        freeStates.push(next);
                        if (solution !== null) { break; } else {
                            result.push(undefined);
                        }
                    }
                    return result;
                })();
            }
        }
    };

    var freeStates = (__range__(0, maxDepth + 1, true).map((x) => new State));
    const state = freeStates.pop().init(this);
    phase1search(state);
    freeStates.push(state);

    // Trim the trailing space and return
    return solution.trim();
};

const faceNums = {
    U: 0,
    R: 1,
    F: 2,
    D: 3,
    L: 4,
    B: 5
};

const faceNames = {
    0: 'U',
    1: 'R',
    2: 'F',
    3: 'D',
    4: 'L',
    5: 'B'
};

Cube.prototype.solve = function (maxDepth) {
    if (maxDepth == null) { maxDepth = 22; }
    const clone = this.clone();
    const upright = clone.upright();
    clone.move(upright);
    const rotation = new Cube().move(upright).center;
    const uprightSolution = clone.solveUpright(maxDepth);
    const solution = [];
    for (var move of Array.from(uprightSolution.split(' '))) {
        solution.push(faceNames[rotation[faceNums[move[0]]]]);
        if (move.length > 1) {
            solution[solution.length - 1] += move[1];
        }
    }
    return solution.join(' ');
};

Cube.scramble = () => Cube.inverse(Cube.random().solve());
