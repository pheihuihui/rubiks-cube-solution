"use strict";
(() => {
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };

  // node_modules/cubejs/lib/cube.js
  var require_cube = __commonJS({
    "node_modules/cubejs/lib/cube.js"(exports, module) {
      (function() {
        var B, BL, BR, Cube2, D, DB, DBL, DF, DFR, DL, DLF, DR, DRB, F, FL, FR, L, R, U, UB, UBR, UF, UFL, UL, ULB, UR, URF, centerColor, centerFacelet, cornerColor, cornerFacelet, edgeColor, edgeFacelet;
        [U, R, F, D, L, B] = [0, 1, 2, 3, 4, 5];
        [URF, UFL, ULB, UBR, DFR, DLF, DBL, DRB] = [0, 1, 2, 3, 4, 5, 6, 7];
        [UR, UF, UL, UB, DR, DF, DL, DB, FR, FL, BL, BR] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
        [centerFacelet, cornerFacelet, edgeFacelet] = function() {
          var _B, _D, _F, _L, _R, _U;
          _U = function(x) {
            return x - 1;
          };
          _R = function(x) {
            return _U(9) + x;
          };
          _F = function(x) {
            return _R(9) + x;
          };
          _D = function(x) {
            return _F(9) + x;
          };
          _L = function(x) {
            return _D(9) + x;
          };
          _B = function(x) {
            return _L(9) + x;
          };
          return [
            [
              4,
              13,
              22,
              31,
              40,
              49
            ],
            [
              [
                _U(9),
                _R(1),
                _F(3)
              ],
              [
                _U(7),
                _F(1),
                _L(3)
              ],
              [
                _U(1),
                _L(1),
                _B(3)
              ],
              [
                _U(3),
                _B(1),
                _R(3)
              ],
              [
                _D(3),
                _F(9),
                _R(7)
              ],
              [
                _D(1),
                _L(9),
                _F(7)
              ],
              [
                _D(7),
                _B(9),
                _L(7)
              ],
              [
                _D(9),
                _R(9),
                _B(7)
              ]
            ],
            [
              [
                _U(6),
                _R(2)
              ],
              [
                _U(8),
                _F(2)
              ],
              [
                _U(4),
                _L(2)
              ],
              [
                _U(2),
                _B(2)
              ],
              [
                _D(6),
                _R(8)
              ],
              [
                _D(2),
                _F(8)
              ],
              [
                _D(4),
                _L(8)
              ],
              [
                _D(8),
                _B(8)
              ],
              [
                _F(6),
                _R(4)
              ],
              [
                _F(4),
                _L(6)
              ],
              [
                _B(6),
                _L(4)
              ],
              [
                _B(4),
                _R(6)
              ]
            ]
          ];
        }();
        centerColor = ["U", "R", "F", "D", "L", "B"];
        cornerColor = [["U", "R", "F"], ["U", "F", "L"], ["U", "L", "B"], ["U", "B", "R"], ["D", "F", "R"], ["D", "L", "F"], ["D", "B", "L"], ["D", "R", "B"]];
        edgeColor = [["U", "R"], ["U", "F"], ["U", "L"], ["U", "B"], ["D", "R"], ["D", "F"], ["D", "L"], ["D", "B"], ["F", "R"], ["F", "L"], ["B", "L"], ["B", "R"]];
        Cube2 = function() {
          var faceNames, faceNums, parseAlg;
          class Cube3 {
            constructor(other) {
              var x;
              if (other != null) {
                this.init(other);
              } else {
                this.identity();
              }
              this.newCenter = function() {
                var k, results;
                results = [];
                for (x = k = 0; k <= 5; x = ++k) {
                  results.push(0);
                }
                return results;
              }();
              this.newCp = function() {
                var k, results;
                results = [];
                for (x = k = 0; k <= 7; x = ++k) {
                  results.push(0);
                }
                return results;
              }();
              this.newEp = function() {
                var k, results;
                results = [];
                for (x = k = 0; k <= 11; x = ++k) {
                  results.push(0);
                }
                return results;
              }();
              this.newCo = function() {
                var k, results;
                results = [];
                for (x = k = 0; k <= 7; x = ++k) {
                  results.push(0);
                }
                return results;
              }();
              this.newEo = function() {
                var k, results;
                results = [];
                for (x = k = 0; k <= 11; x = ++k) {
                  results.push(0);
                }
                return results;
              }();
            }
            init(state) {
              this.center = state.center.slice(0);
              this.co = state.co.slice(0);
              this.ep = state.ep.slice(0);
              this.cp = state.cp.slice(0);
              return this.eo = state.eo.slice(0);
            }
            identity() {
              var x;
              this.center = [0, 1, 2, 3, 4, 5];
              this.cp = [0, 1, 2, 3, 4, 5, 6, 7];
              this.co = function() {
                var k, results;
                results = [];
                for (x = k = 0; k <= 7; x = ++k) {
                  results.push(0);
                }
                return results;
              }();
              this.ep = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
              return this.eo = function() {
                var k, results;
                results = [];
                for (x = k = 0; k <= 11; x = ++k) {
                  results.push(0);
                }
                return results;
              }();
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
              var corner, edge, i, k, l, m, n, o, ori, p, result;
              result = [];
              for (i = k = 0; k <= 5; i = ++k) {
                result[9 * i + 4] = centerColor[this.center[i]];
              }
              for (i = l = 0; l <= 7; i = ++l) {
                corner = this.cp[i];
                ori = this.co[i];
                for (n = m = 0; m <= 2; n = ++m) {
                  result[cornerFacelet[i][(n + ori) % 3]] = cornerColor[corner][n];
                }
              }
              for (i = o = 0; o <= 11; i = ++o) {
                edge = this.ep[i];
                ori = this.eo[i];
                for (n = p = 0; p <= 1; n = ++p) {
                  result[edgeFacelet[i][(n + ori) % 2]] = edgeColor[edge][n];
                }
              }
              return result.join("");
            }
            static fromString(str) {
              var col1, col2, cube2, i, j, k, l, m, o, ori, p, q, r, ref;
              cube2 = new Cube3();
              for (i = k = 0; k <= 5; i = ++k) {
                for (j = l = 0; l <= 5; j = ++l) {
                  if (str[9 * i + 4] === centerColor[j]) {
                    cube2.center[i] = j;
                  }
                }
              }
              for (i = m = 0; m <= 7; i = ++m) {
                for (ori = o = 0; o <= 2; ori = ++o) {
                  if ((ref = str[cornerFacelet[i][ori]]) === "U" || ref === "D") {
                    break;
                  }
                }
                col1 = str[cornerFacelet[i][(ori + 1) % 3]];
                col2 = str[cornerFacelet[i][(ori + 2) % 3]];
                for (j = p = 0; p <= 7; j = ++p) {
                  if (col1 === cornerColor[j][1] && col2 === cornerColor[j][2]) {
                    cube2.cp[i] = j;
                    cube2.co[i] = ori % 3;
                  }
                }
              }
              for (i = q = 0; q <= 11; i = ++q) {
                for (j = r = 0; r <= 11; j = ++r) {
                  if (str[edgeFacelet[i][0]] === edgeColor[j][0] && str[edgeFacelet[i][1]] === edgeColor[j][1]) {
                    cube2.ep[i] = j;
                    cube2.eo[i] = 0;
                    break;
                  }
                  if (str[edgeFacelet[i][0]] === edgeColor[j][1] && str[edgeFacelet[i][1]] === edgeColor[j][0]) {
                    cube2.ep[i] = j;
                    cube2.eo[i] = 1;
                    break;
                  }
                }
              }
              return cube2;
            }
            clone() {
              return new Cube3(this.toJSON());
            }
            static random() {
              return new Cube3().randomize();
            }
            isSolved() {
              var c, cent, clone, e, k, l, m;
              clone = this.clone();
              clone.move(clone.upright());
              for (cent = k = 0; k <= 5; cent = ++k) {
                if (clone.center[cent] !== cent) {
                  return false;
                }
              }
              for (c = l = 0; l <= 7; c = ++l) {
                if (clone.cp[c] !== c) {
                  return false;
                }
                if (clone.co[c] !== 0) {
                  return false;
                }
              }
              for (e = m = 0; m <= 11; e = ++m) {
                if (clone.ep[e] !== e) {
                  return false;
                }
                if (clone.eo[e] !== 0) {
                  return false;
                }
              }
              return true;
            }
            centerMultiply(other) {
              var from, k, to;
              for (to = k = 0; k <= 5; to = ++k) {
                from = other.center[to];
                this.newCenter[to] = this.center[from];
              }
              [this.center, this.newCenter] = [this.newCenter, this.center];
              return this;
            }
            cornerMultiply(other) {
              var from, k, to;
              for (to = k = 0; k <= 7; to = ++k) {
                from = other.cp[to];
                this.newCp[to] = this.cp[from];
                this.newCo[to] = (this.co[from] + other.co[to]) % 3;
              }
              [this.cp, this.newCp] = [this.newCp, this.cp];
              [this.co, this.newCo] = [this.newCo, this.co];
              return this;
            }
            edgeMultiply(other) {
              var from, k, to;
              for (to = k = 0; k <= 11; to = ++k) {
                from = other.ep[to];
                this.newEp[to] = this.ep[from];
                this.newEo[to] = (this.eo[from] + other.eo[to]) % 2;
              }
              [this.ep, this.newEp] = [this.newEp, this.ep];
              [this.eo, this.newEo] = [this.newEo, this.eo];
              return this;
            }
            multiply(other) {
              this.centerMultiply(other);
              this.cornerMultiply(other);
              this.edgeMultiply(other);
              return this;
            }
            move(arg) {
              var face, k, l, len, move, power, ref, ref1, x;
              ref = parseAlg(arg);
              for (k = 0, len = ref.length; k < len; k++) {
                move = ref[k];
                face = move / 3 | 0;
                power = move % 3;
                for (x = l = 0, ref1 = power; 0 <= ref1 ? l <= ref1 : l >= ref1; x = 0 <= ref1 ? ++l : --l) {
                  this.multiply(Cube3.moves[face]);
                }
              }
              return this;
            }
            upright() {
              var clone, i, j, k, l, result;
              clone = this.clone();
              result = [];
              for (i = k = 0; k <= 5; i = ++k) {
                if (clone.center[i] === F) {
                  break;
                }
              }
              switch (i) {
                case D:
                  result.push("x");
                  break;
                case U:
                  result.push("x'");
                  break;
                case B:
                  result.push("x2");
                  break;
                case R:
                  result.push("y");
                  break;
                case L:
                  result.push("y'");
              }
              if (result.length) {
                clone.move(result[0]);
              }
              for (j = l = 0; l <= 5; j = ++l) {
                if (clone.center[j] === U) {
                  break;
                }
              }
              switch (j) {
                case L:
                  result.push("z");
                  break;
                case R:
                  result.push("z'");
                  break;
                case D:
                  result.push("z2");
              }
              return result.join(" ");
            }
            static inverse(arg) {
              var face, k, len, move, power, result, str;
              result = function() {
                var k2, len2, ref, results;
                ref = parseAlg(arg);
                results = [];
                for (k2 = 0, len2 = ref.length; k2 < len2; k2++) {
                  move = ref[k2];
                  face = move / 3 | 0;
                  power = move % 3;
                  results.push(face * 3 + -(power - 1) + 1);
                }
                return results;
              }();
              result.reverse();
              if (typeof arg === "string") {
                str = "";
                for (k = 0, len = result.length; k < len; k++) {
                  move = result[k];
                  face = move / 3 | 0;
                  power = move % 3;
                  str += faceNames[face];
                  if (power === 1) {
                    str += "2";
                  } else if (power === 2) {
                    str += "'";
                  }
                  str += " ";
                }
                return str.substring(0, str.length - 1);
              } else if (arg.length != null) {
                return result;
              } else {
                return result[0];
              }
            }
          }
          ;
          Cube3.prototype.randomize = function() {
            var arePermutationsValid, generateValidRandomOrientation, generateValidRandomPermutation, getNumSwaps, isOrientationValid, randint, randomizeOrientation, result, shuffle;
            randint = function(min, max) {
              return min + Math.floor(Math.random() * (max - min + 1));
            };
            shuffle = function(array) {
              var currentIndex, randomIndex, temporaryValue;
              currentIndex = array.length;
              while (currentIndex !== 0) {
                randomIndex = randint(0, currentIndex - 1);
                currentIndex -= 1;
                temporaryValue = array[currentIndex];
                [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
              }
            };
            getNumSwaps = function(arr) {
              var cur, cycleLength, i, k, numSwaps, ref, seen, x;
              numSwaps = 0;
              seen = function() {
                var k2, ref2, results;
                results = [];
                for (x = k2 = 0, ref2 = arr.length - 1; 0 <= ref2 ? k2 <= ref2 : k2 >= ref2; x = 0 <= ref2 ? ++k2 : --k2) {
                  results.push(false);
                }
                return results;
              }();
              while (true) {
                cur = -1;
                for (i = k = 0, ref = arr.length - 1; 0 <= ref ? k <= ref : k >= ref; i = 0 <= ref ? ++k : --k) {
                  if (!seen[i]) {
                    cur = i;
                    break;
                  }
                }
                if (cur === -1) {
                  break;
                }
                cycleLength = 0;
                while (!seen[cur]) {
                  seen[cur] = true;
                  cycleLength++;
                  cur = arr[cur];
                }
                numSwaps += cycleLength + 1;
              }
              return numSwaps;
            };
            arePermutationsValid = function(cp, ep) {
              var numSwaps;
              numSwaps = getNumSwaps(ep) + getNumSwaps(cp);
              return numSwaps % 2 === 0;
            };
            generateValidRandomPermutation = function(cp, ep) {
              shuffle(ep);
              shuffle(cp);
              while (!arePermutationsValid(cp, ep)) {
                shuffle(ep);
                shuffle(cp);
              }
            };
            randomizeOrientation = function(arr, numOrientations) {
              var i, k, ori, ref;
              ori = 0;
              for (i = k = 0, ref = arr.length - 1; 0 <= ref ? k <= ref : k >= ref; i = 0 <= ref ? ++k : --k) {
                ori += arr[i] = randint(0, numOrientations - 1);
              }
            };
            isOrientationValid = function(arr, numOrientations) {
              return arr.reduce(function(a, b) {
                return a + b;
              }) % numOrientations === 0;
            };
            generateValidRandomOrientation = function(co, eo) {
              randomizeOrientation(co, 3);
              while (!isOrientationValid(co, 3)) {
                randomizeOrientation(co, 3);
              }
              randomizeOrientation(eo, 2);
              while (!isOrientationValid(eo, 2)) {
                randomizeOrientation(eo, 2);
              }
            };
            result = function() {
              generateValidRandomPermutation(this.cp, this.ep);
              generateValidRandomOrientation(this.co, this.eo);
              return this;
            };
            return result;
          }();
          Cube3.moves = [
            {
              center: [0, 1, 2, 3, 4, 5],
              cp: [
                UBR,
                URF,
                UFL,
                ULB,
                DFR,
                DLF,
                DBL,
                DRB
              ],
              co: [
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0
              ],
              ep: [
                UB,
                UR,
                UF,
                UL,
                DR,
                DF,
                DL,
                DB,
                FR,
                FL,
                BL,
                BR
              ],
              eo: [
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0
              ]
            },
            {
              center: [0, 1, 2, 3, 4, 5],
              cp: [
                DFR,
                UFL,
                ULB,
                URF,
                DRB,
                DLF,
                DBL,
                UBR
              ],
              co: [
                2,
                0,
                0,
                1,
                1,
                0,
                0,
                2
              ],
              ep: [
                FR,
                UF,
                UL,
                UB,
                BR,
                DF,
                DL,
                DB,
                DR,
                FL,
                BL,
                UR
              ],
              eo: [
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0
              ]
            },
            {
              center: [0, 1, 2, 3, 4, 5],
              cp: [
                UFL,
                DLF,
                ULB,
                UBR,
                URF,
                DFR,
                DBL,
                DRB
              ],
              co: [
                1,
                2,
                0,
                0,
                2,
                1,
                0,
                0
              ],
              ep: [
                UR,
                FL,
                UL,
                UB,
                DR,
                FR,
                DL,
                DB,
                UF,
                DF,
                BL,
                BR
              ],
              eo: [
                0,
                1,
                0,
                0,
                0,
                1,
                0,
                0,
                1,
                1,
                0,
                0
              ]
            },
            {
              center: [0, 1, 2, 3, 4, 5],
              cp: [
                URF,
                UFL,
                ULB,
                UBR,
                DLF,
                DBL,
                DRB,
                DFR
              ],
              co: [
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0
              ],
              ep: [
                UR,
                UF,
                UL,
                UB,
                DF,
                DL,
                DB,
                DR,
                FR,
                FL,
                BL,
                BR
              ],
              eo: [
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0
              ]
            },
            {
              center: [0, 1, 2, 3, 4, 5],
              cp: [
                URF,
                ULB,
                DBL,
                UBR,
                DFR,
                UFL,
                DLF,
                DRB
              ],
              co: [
                0,
                1,
                2,
                0,
                0,
                2,
                1,
                0
              ],
              ep: [
                UR,
                UF,
                BL,
                UB,
                DR,
                DF,
                FL,
                DB,
                FR,
                UL,
                DL,
                BR
              ],
              eo: [
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0
              ]
            },
            {
              center: [0, 1, 2, 3, 4, 5],
              cp: [
                URF,
                UFL,
                UBR,
                DRB,
                DFR,
                DLF,
                ULB,
                DBL
              ],
              co: [
                0,
                0,
                1,
                2,
                0,
                0,
                2,
                1
              ],
              ep: [
                UR,
                UF,
                UL,
                BR,
                DR,
                DF,
                DL,
                BL,
                FR,
                FL,
                UB,
                DB
              ],
              eo: [
                0,
                0,
                0,
                1,
                0,
                0,
                0,
                1,
                0,
                0,
                1,
                1
              ]
            },
            {
              center: [
                U,
                F,
                L,
                D,
                B,
                R
              ],
              cp: [
                URF,
                UFL,
                ULB,
                UBR,
                DFR,
                DLF,
                DBL,
                DRB
              ],
              co: [
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0
              ],
              ep: [
                UR,
                UF,
                UL,
                UB,
                DR,
                DF,
                DL,
                DB,
                FL,
                BL,
                BR,
                FR
              ],
              eo: [
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                1,
                1,
                1,
                1
              ]
            },
            {
              center: [
                B,
                R,
                U,
                F,
                L,
                D
              ],
              cp: [
                URF,
                UFL,
                ULB,
                UBR,
                DFR,
                DLF,
                DBL,
                DRB
              ],
              co: [
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0
              ],
              ep: [
                UR,
                UB,
                UL,
                DB,
                DR,
                UF,
                DL,
                DF,
                FR,
                FL,
                BL,
                BR
              ],
              eo: [
                0,
                1,
                0,
                1,
                0,
                1,
                0,
                1,
                0,
                0,
                0,
                0
              ]
            },
            {
              center: [
                L,
                U,
                F,
                R,
                D,
                B
              ],
              cp: [
                URF,
                UFL,
                ULB,
                UBR,
                DFR,
                DLF,
                DBL,
                DRB
              ],
              co: [
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0
              ],
              ep: [
                UL,
                UF,
                DL,
                UB,
                UR,
                DF,
                DR,
                DB,
                FR,
                FL,
                BL,
                BR
              ],
              eo: [
                1,
                0,
                1,
                0,
                1,
                0,
                1,
                0,
                0,
                0,
                0,
                0
              ]
            }
          ];
          faceNums = {
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
          faceNames = {
            0: "U",
            1: "R",
            2: "F",
            3: "D",
            4: "L",
            5: "B",
            6: "E",
            7: "M",
            8: "S",
            9: "x",
            10: "y",
            11: "z",
            12: "u",
            13: "r",
            14: "f",
            15: "d",
            16: "l",
            17: "b"
          };
          parseAlg = function(arg) {
            var k, len, move, part, power, ref, results;
            if (typeof arg === "string") {
              ref = arg.split(/\s+/);
              results = [];
              for (k = 0, len = ref.length; k < len; k++) {
                part = ref[k];
                if (part.length === 0) {
                  continue;
                }
                if (part.length > 2) {
                  throw new Error(`Invalid move: ${part}`);
                }
                move = faceNums[part[0]];
                if (move === void 0) {
                  throw new Error(`Invalid move: ${part}`);
                }
                if (part.length === 1) {
                  power = 0;
                } else {
                  if (part[1] === "2") {
                    power = 1;
                  } else if (part[1] === "'") {
                    power = 2;
                  } else {
                    throw new Error(`Invalid move: ${part}`);
                  }
                }
                results.push(move * 3 + power);
              }
              return results;
            } else if (arg.length != null) {
              return arg;
            } else {
              return [arg];
            }
          };
          Cube3.moves.push(new Cube3().move("R M' L'").toJSON());
          Cube3.moves.push(new Cube3().move("U E' D'").toJSON());
          Cube3.moves.push(new Cube3().move("F S B'").toJSON());
          Cube3.moves.push(new Cube3().move("U E'").toJSON());
          Cube3.moves.push(new Cube3().move("R M'").toJSON());
          Cube3.moves.push(new Cube3().move("F S").toJSON());
          Cube3.moves.push(new Cube3().move("D E").toJSON());
          Cube3.moves.push(new Cube3().move("L M").toJSON());
          Cube3.moves.push(new Cube3().move("B S'").toJSON());
          return Cube3;
        }.call(this);
        if (typeof module !== "undefined" && module !== null) {
          module.exports = Cube2;
        } else {
          this.Cube = Cube2;
        }
      }).call(exports);
    }
  });

  // node_modules/cubejs/lib/solve.js
  var require_solve = __commonJS({
    "node_modules/cubejs/lib/solve.js"(exports) {
      (function() {
        var B, BL, BR, Cnk, Cube2, D, DB, DBL, DF, DFR, DL, DLF, DR, DRB, F, FL, FR, Include, L, N_FLIP, N_FRtoBR, N_PARITY, N_SLICE1, N_SLICE2, N_TWIST, N_UBtoDF, N_URFtoDLF, N_URtoDF, N_URtoUL, R, U, UB, UBR, UF, UFL, UL, ULB, UR, URF, allMoves1, allMoves2, computeMoveTable, computePruningTable, faceNames, faceNums, factorial, key, max, mergeURtoDF, moveTableParams, nextMoves1, nextMoves2, permutationIndex, pruning, pruningTableParams, rotateLeft, rotateRight, value, indexOf = [].indexOf;
        Cube2 = this.Cube || require_cube();
        [U, R, F, D, L, B] = [0, 1, 2, 3, 4, 5];
        [URF, UFL, ULB, UBR, DFR, DLF, DBL, DRB] = [0, 1, 2, 3, 4, 5, 6, 7];
        [UR, UF, UL, UB, DR, DF, DL, DB, FR, FL, BL, BR] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
        Cnk = function(n, k) {
          var i, j, s;
          if (n < k) {
            return 0;
          }
          if (k > n / 2) {
            k = n - k;
          }
          s = 1;
          i = n;
          j = 1;
          while (i !== n - k) {
            s *= i;
            s /= j;
            i--;
            j++;
          }
          return s;
        };
        factorial = function(n) {
          var f, i, m, ref;
          f = 1;
          for (i = m = 2, ref = n; 2 <= ref ? m <= ref : m >= ref; i = 2 <= ref ? ++m : --m) {
            f *= i;
          }
          return f;
        };
        max = function(a, b) {
          if (a > b) {
            return a;
          } else {
            return b;
          }
        };
        rotateLeft = function(array, l, r) {
          var i, m, ref, ref1, tmp;
          tmp = array[l];
          for (i = m = ref = l, ref1 = r - 1; ref <= ref1 ? m <= ref1 : m >= ref1; i = ref <= ref1 ? ++m : --m) {
            array[i] = array[i + 1];
          }
          return array[r] = tmp;
        };
        rotateRight = function(array, l, r) {
          var i, m, ref, ref1, tmp;
          tmp = array[r];
          for (i = m = ref = r, ref1 = l + 1; ref <= ref1 ? m <= ref1 : m >= ref1; i = ref <= ref1 ? ++m : --m) {
            array[i] = array[i - 1];
          }
          return array[l] = tmp;
        };
        permutationIndex = function(context, start, end, fromEnd = false) {
          var i, maxAll, maxB, maxOur, our, permName;
          maxOur = end - start;
          maxB = factorial(maxOur + 1);
          if (context === "corners") {
            maxAll = 7;
            permName = "cp";
          } else {
            maxAll = 11;
            permName = "ep";
          }
          our = function() {
            var m, ref, results;
            results = [];
            for (i = m = 0, ref = maxOur; 0 <= ref ? m <= ref : m >= ref; i = 0 <= ref ? ++m : --m) {
              results.push(0);
            }
            return results;
          }();
          return function(index) {
            var a, b, c, j, k, m, o, p, perm, q, ref, ref1, ref10, ref2, ref3, ref4, ref5, ref6, ref7, ref8, ref9, t, u, w, x, y, z;
            if (index != null) {
              for (i = m = 0, ref = maxOur; 0 <= ref ? m <= ref : m >= ref; i = 0 <= ref ? ++m : --m) {
                our[i] = i + start;
              }
              b = index % maxB;
              a = index / maxB | 0;
              perm = this[permName];
              for (i = o = 0, ref1 = maxAll; 0 <= ref1 ? o <= ref1 : o >= ref1; i = 0 <= ref1 ? ++o : --o) {
                perm[i] = -1;
              }
              for (j = p = 1, ref2 = maxOur; 1 <= ref2 ? p <= ref2 : p >= ref2; j = 1 <= ref2 ? ++p : --p) {
                k = b % (j + 1);
                b = b / (j + 1) | 0;
                while (k > 0) {
                  rotateRight(our, 0, j);
                  k--;
                }
              }
              x = maxOur;
              if (fromEnd) {
                for (j = q = 0, ref3 = maxAll; 0 <= ref3 ? q <= ref3 : q >= ref3; j = 0 <= ref3 ? ++q : --q) {
                  c = Cnk(maxAll - j, x + 1);
                  if (a - c >= 0) {
                    perm[j] = our[maxOur - x];
                    a -= c;
                    x--;
                  }
                }
              } else {
                for (j = t = ref4 = maxAll; ref4 <= 0 ? t <= 0 : t >= 0; j = ref4 <= 0 ? ++t : --t) {
                  c = Cnk(j, x + 1);
                  if (a - c >= 0) {
                    perm[j] = our[x];
                    a -= c;
                    x--;
                  }
                }
              }
              return this;
            } else {
              perm = this[permName];
              for (i = u = 0, ref5 = maxOur; 0 <= ref5 ? u <= ref5 : u >= ref5; i = 0 <= ref5 ? ++u : --u) {
                our[i] = -1;
              }
              a = b = x = 0;
              if (fromEnd) {
                for (j = w = ref6 = maxAll; ref6 <= 0 ? w <= 0 : w >= 0; j = ref6 <= 0 ? ++w : --w) {
                  if (start <= (ref7 = perm[j]) && ref7 <= end) {
                    a += Cnk(maxAll - j, x + 1);
                    our[maxOur - x] = perm[j];
                    x++;
                  }
                }
              } else {
                for (j = y = 0, ref8 = maxAll; 0 <= ref8 ? y <= ref8 : y >= ref8; j = 0 <= ref8 ? ++y : --y) {
                  if (start <= (ref9 = perm[j]) && ref9 <= end) {
                    a += Cnk(j, x + 1);
                    our[x] = perm[j];
                    x++;
                  }
                }
              }
              for (j = z = ref10 = maxOur; ref10 <= 0 ? z <= 0 : z >= 0; j = ref10 <= 0 ? ++z : --z) {
                k = 0;
                while (our[j] !== start + j) {
                  rotateLeft(our, 0, j);
                  k++;
                }
                b = (j + 1) * b + k;
              }
              return a * maxB + b;
            }
          };
        };
        Include = {
          twist: function(twist) {
            var i, m, o, ori, parity, v;
            if (twist != null) {
              parity = 0;
              for (i = m = 6; m >= 0; i = --m) {
                ori = twist % 3;
                twist = twist / 3 | 0;
                this.co[i] = ori;
                parity += ori;
              }
              this.co[7] = (3 - parity % 3) % 3;
              return this;
            } else {
              v = 0;
              for (i = o = 0; o <= 6; i = ++o) {
                v = 3 * v + this.co[i];
              }
              return v;
            }
          },
          flip: function(flip) {
            var i, m, o, ori, parity, v;
            if (flip != null) {
              parity = 0;
              for (i = m = 10; m >= 0; i = --m) {
                ori = flip % 2;
                flip = flip / 2 | 0;
                this.eo[i] = ori;
                parity += ori;
              }
              this.eo[11] = (2 - parity % 2) % 2;
              return this;
            } else {
              v = 0;
              for (i = o = 0; o <= 10; i = ++o) {
                v = 2 * v + this.eo[i];
              }
              return v;
            }
          },
          cornerParity: function() {
            var i, j, m, o, ref, ref1, ref2, ref3, s;
            s = 0;
            for (i = m = ref = DRB, ref1 = URF + 1; ref <= ref1 ? m <= ref1 : m >= ref1; i = ref <= ref1 ? ++m : --m) {
              for (j = o = ref2 = i - 1, ref3 = URF; ref2 <= ref3 ? o <= ref3 : o >= ref3; j = ref2 <= ref3 ? ++o : --o) {
                if (this.cp[j] > this.cp[i]) {
                  s++;
                }
              }
            }
            return s % 2;
          },
          edgeParity: function() {
            var i, j, m, o, ref, ref1, ref2, ref3, s;
            s = 0;
            for (i = m = ref = BR, ref1 = UR + 1; ref <= ref1 ? m <= ref1 : m >= ref1; i = ref <= ref1 ? ++m : --m) {
              for (j = o = ref2 = i - 1, ref3 = UR; ref2 <= ref3 ? o <= ref3 : o >= ref3; j = ref2 <= ref3 ? ++o : --o) {
                if (this.ep[j] > this.ep[i]) {
                  s++;
                }
              }
            }
            return s % 2;
          },
          URFtoDLF: permutationIndex("corners", URF, DLF),
          URtoUL: permutationIndex("edges", UR, UL),
          UBtoDF: permutationIndex("edges", UB, DF),
          URtoDF: permutationIndex("edges", UR, DF),
          FRtoBR: permutationIndex("edges", FR, BR, true)
        };
        for (key in Include) {
          value = Include[key];
          Cube2.prototype[key] = value;
        }
        computeMoveTable = function(context, coord, size) {
          var apply, cube2, i, inner, j, k, m, move, o, p, ref, results;
          apply = context === "corners" ? "cornerMultiply" : "edgeMultiply";
          cube2 = new Cube2();
          results = [];
          for (i = m = 0, ref = size - 1; 0 <= ref ? m <= ref : m >= ref; i = 0 <= ref ? ++m : --m) {
            cube2[coord](i);
            inner = [];
            for (j = o = 0; o <= 5; j = ++o) {
              move = Cube2.moves[j];
              for (k = p = 0; p <= 2; k = ++p) {
                cube2[apply](move);
                inner.push(cube2[coord]());
              }
              cube2[apply](move);
            }
            results.push(inner);
          }
          return results;
        };
        mergeURtoDF = function() {
          var a, b;
          a = new Cube2();
          b = new Cube2();
          return function(URtoUL, UBtoDF) {
            var i, m;
            a.URtoUL(URtoUL);
            b.UBtoDF(UBtoDF);
            for (i = m = 0; m <= 7; i = ++m) {
              if (a.ep[i] !== -1) {
                if (b.ep[i] !== -1) {
                  return -1;
                } else {
                  b.ep[i] = a.ep[i];
                }
              }
            }
            return b.URtoDF();
          };
        }();
        N_TWIST = 2187;
        N_FLIP = 2048;
        N_PARITY = 2;
        N_FRtoBR = 11880;
        N_SLICE1 = 495;
        N_SLICE2 = 24;
        N_URFtoDLF = 20160;
        N_URtoDF = 20160;
        N_URtoUL = 1320;
        N_UBtoDF = 1320;
        Cube2.moveTables = {
          parity: [[1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1], [0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0]],
          twist: null,
          flip: null,
          FRtoBR: null,
          URFtoDLF: null,
          URtoDF: null,
          URtoUL: null,
          UBtoDF: null,
          mergeURtoDF: null
        };
        moveTableParams = {
          twist: ["corners", N_TWIST],
          flip: ["edges", N_FLIP],
          FRtoBR: ["edges", N_FRtoBR],
          URFtoDLF: ["corners", N_URFtoDLF],
          URtoDF: ["edges", N_URtoDF],
          URtoUL: ["edges", N_URtoUL],
          UBtoDF: ["edges", N_UBtoDF],
          mergeURtoDF: []
        };
        Cube2.computeMoveTables = function(...tables) {
          var len, m, name, scope, size, tableName;
          if (tables.length === 0) {
            tables = function() {
              var results;
              results = [];
              for (name in moveTableParams) {
                results.push(name);
              }
              return results;
            }();
          }
          for (m = 0, len = tables.length; m < len; m++) {
            tableName = tables[m];
            if (this.moveTables[tableName] !== null) {
              continue;
            }
            if (tableName === "mergeURtoDF") {
              this.moveTables.mergeURtoDF = function() {
                var UBtoDF, URtoUL, o, results;
                results = [];
                for (URtoUL = o = 0; o <= 335; URtoUL = ++o) {
                  results.push(function() {
                    var p, results1;
                    results1 = [];
                    for (UBtoDF = p = 0; p <= 335; UBtoDF = ++p) {
                      results1.push(mergeURtoDF(URtoUL, UBtoDF));
                    }
                    return results1;
                  }());
                }
                return results;
              }();
            } else {
              [scope, size] = moveTableParams[tableName];
              this.moveTables[tableName] = computeMoveTable(scope, tableName, size);
            }
          }
          return this;
        };
        allMoves1 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17];
        nextMoves1 = function() {
          var face, lastFace, m, next, o, p, power, results;
          results = [];
          for (lastFace = m = 0; m <= 5; lastFace = ++m) {
            next = [];
            for (face = o = 0; o <= 5; face = ++o) {
              if (face !== lastFace && face !== lastFace - 3) {
                for (power = p = 0; p <= 2; power = ++p) {
                  next.push(face * 3 + power);
                }
              }
            }
            results.push(next);
          }
          return results;
        }();
        allMoves2 = [0, 1, 2, 4, 7, 9, 10, 11, 13, 16];
        nextMoves2 = function() {
          var face, lastFace, len, m, next, o, p, power, powers, results;
          results = [];
          for (lastFace = m = 0; m <= 5; lastFace = ++m) {
            next = [];
            for (face = o = 0; o <= 5; face = ++o) {
              if (!(face !== lastFace && face !== lastFace - 3)) {
                continue;
              }
              powers = face === 0 || face === 3 ? [0, 1, 2] : [1];
              for (p = 0, len = powers.length; p < len; p++) {
                power = powers[p];
                next.push(face * 3 + power);
              }
            }
            results.push(next);
          }
          return results;
        }();
        pruning = function(table, index, value2) {
          var pos, shift, slot;
          pos = index % 8;
          slot = index >> 3;
          shift = pos << 2;
          if (value2 != null) {
            table[slot] &= ~(15 << shift);
            table[slot] |= value2 << shift;
            return value2;
          } else {
            return (table[slot] & 15 << shift) >>> shift;
          }
        };
        computePruningTable = function(phase, size, currentCoords, nextIndex) {
          var current, depth, done, index, len, m, move, moves, next, o, ref, table, x;
          table = function() {
            var m2, ref2, results;
            results = [];
            for (x = m2 = 0, ref2 = Math.ceil(size / 8) - 1; 0 <= ref2 ? m2 <= ref2 : m2 >= ref2; x = 0 <= ref2 ? ++m2 : --m2) {
              results.push(4294967295);
            }
            return results;
          }();
          if (phase === 1) {
            moves = allMoves1;
          } else {
            moves = allMoves2;
          }
          depth = 0;
          pruning(table, 0, depth);
          done = 1;
          while (done !== size) {
            for (index = m = 0, ref = size - 1; 0 <= ref ? m <= ref : m >= ref; index = 0 <= ref ? ++m : --m) {
              if (!(pruning(table, index) === depth)) {
                continue;
              }
              current = currentCoords(index);
              for (o = 0, len = moves.length; o < len; o++) {
                move = moves[o];
                next = nextIndex(current, move);
                if (pruning(table, next) === 15) {
                  pruning(table, next, depth + 1);
                  done++;
                }
              }
            }
            depth++;
          }
          return table;
        };
        Cube2.pruningTables = {
          sliceTwist: null,
          sliceFlip: null,
          sliceURFtoDLFParity: null,
          sliceURtoDFParity: null
        };
        pruningTableParams = {
          sliceTwist: [
            1,
            N_SLICE1 * N_TWIST,
            function(index) {
              return [
                index % N_SLICE1,
                index / N_SLICE1 | 0
              ];
            },
            function(current, move) {
              var newSlice, newTwist, slice, twist;
              [
                slice,
                twist
              ] = current;
              newSlice = Cube2.moveTables.FRtoBR[slice * 24][move] / 24 | 0;
              newTwist = Cube2.moveTables.twist[twist][move];
              return newTwist * N_SLICE1 + newSlice;
            }
          ],
          sliceFlip: [
            1,
            N_SLICE1 * N_FLIP,
            function(index) {
              return [
                index % N_SLICE1,
                index / N_SLICE1 | 0
              ];
            },
            function(current, move) {
              var flip, newFlip, newSlice, slice;
              [
                slice,
                flip
              ] = current;
              newSlice = Cube2.moveTables.FRtoBR[slice * 24][move] / 24 | 0;
              newFlip = Cube2.moveTables.flip[flip][move];
              return newFlip * N_SLICE1 + newSlice;
            }
          ],
          sliceURFtoDLFParity: [
            2,
            N_SLICE2 * N_URFtoDLF * N_PARITY,
            function(index) {
              return [
                index % 2,
                (index / 2 | 0) % N_SLICE2,
                (index / 2 | 0) / N_SLICE2 | 0
              ];
            },
            function(current, move) {
              var URFtoDLF, newParity, newSlice, newURFtoDLF, parity, slice;
              [
                parity,
                slice,
                URFtoDLF
              ] = current;
              newParity = Cube2.moveTables.parity[parity][move];
              newSlice = Cube2.moveTables.FRtoBR[slice][move];
              newURFtoDLF = Cube2.moveTables.URFtoDLF[URFtoDLF][move];
              return (newURFtoDLF * N_SLICE2 + newSlice) * 2 + newParity;
            }
          ],
          sliceURtoDFParity: [
            2,
            N_SLICE2 * N_URtoDF * N_PARITY,
            function(index) {
              return [
                index % 2,
                (index / 2 | 0) % N_SLICE2,
                (index / 2 | 0) / N_SLICE2 | 0
              ];
            },
            function(current, move) {
              var URtoDF, newParity, newSlice, newURtoDF, parity, slice;
              [
                parity,
                slice,
                URtoDF
              ] = current;
              newParity = Cube2.moveTables.parity[parity][move];
              newSlice = Cube2.moveTables.FRtoBR[slice][move];
              newURtoDF = Cube2.moveTables.URtoDF[URtoDF][move];
              return (newURtoDF * N_SLICE2 + newSlice) * 2 + newParity;
            }
          ]
        };
        Cube2.computePruningTables = function(...tables) {
          var len, m, name, params, tableName;
          if (tables.length === 0) {
            tables = function() {
              var results;
              results = [];
              for (name in pruningTableParams) {
                results.push(name);
              }
              return results;
            }();
          }
          for (m = 0, len = tables.length; m < len; m++) {
            tableName = tables[m];
            if (this.pruningTables[tableName] !== null) {
              continue;
            }
            params = pruningTableParams[tableName];
            this.pruningTables[tableName] = computePruningTable(...params);
          }
          return this;
        };
        Cube2.initSolver = function() {
          Cube2.computeMoveTables();
          return Cube2.computePruningTables();
        };
        Cube2.prototype.solveUpright = function(maxDepth = 22) {
          var State, freeStates, moveNames, phase1, phase1search, phase2, phase2search, solution, state, x;
          moveNames = function() {
            var face, faceName, m, o, power, powerName, result;
            faceName = ["U", "R", "F", "D", "L", "B"];
            powerName = ["", "2", "'"];
            result = [];
            for (face = m = 0; m <= 5; face = ++m) {
              for (power = o = 0; o <= 2; power = ++o) {
                result.push(faceName[face] + powerName[power]);
              }
            }
            return result;
          }();
          State = class State {
            constructor(cube2) {
              this.parent = null;
              this.lastMove = null;
              this.depth = 0;
              if (cube2) {
                this.init(cube2);
              }
            }
            init(cube2) {
              this.flip = cube2.flip();
              this.twist = cube2.twist();
              this.slice = cube2.FRtoBR() / N_SLICE2 | 0;
              this.parity = cube2.cornerParity();
              this.URFtoDLF = cube2.URFtoDLF();
              this.FRtoBR = cube2.FRtoBR();
              this.URtoUL = cube2.URtoUL();
              this.UBtoDF = cube2.UBtoDF();
              return this;
            }
            solution() {
              if (this.parent) {
                return this.parent.solution() + moveNames[this.lastMove] + " ";
              } else {
                return "";
              }
            }
            move(table, index, move) {
              return Cube2.moveTables[table][index][move];
            }
            pruning(table, index) {
              return pruning(Cube2.pruningTables[table], index);
            }
            moves1() {
              if (this.lastMove !== null) {
                return nextMoves1[this.lastMove / 3 | 0];
              } else {
                return allMoves1;
              }
            }
            minDist1() {
              var d1, d2;
              d1 = this.pruning("sliceFlip", N_SLICE1 * this.flip + this.slice);
              d2 = this.pruning("sliceTwist", N_SLICE1 * this.twist + this.slice);
              return max(d1, d2);
            }
            next1(move) {
              var next;
              next = freeStates.pop();
              next.parent = this;
              next.lastMove = move;
              next.depth = this.depth + 1;
              next.flip = this.move("flip", this.flip, move);
              next.twist = this.move("twist", this.twist, move);
              next.slice = this.move("FRtoBR", this.slice * 24, move) / 24 | 0;
              return next;
            }
            moves2() {
              if (this.lastMove !== null) {
                return nextMoves2[this.lastMove / 3 | 0];
              } else {
                return allMoves2;
              }
            }
            minDist2() {
              var d1, d2, index1, index2;
              index1 = (N_SLICE2 * this.URtoDF + this.FRtoBR) * N_PARITY + this.parity;
              d1 = this.pruning("sliceURtoDFParity", index1);
              index2 = (N_SLICE2 * this.URFtoDLF + this.FRtoBR) * N_PARITY + this.parity;
              d2 = this.pruning("sliceURFtoDLFParity", index2);
              return max(d1, d2);
            }
            init2(top = true) {
              if (this.parent === null) {
                return;
              }
              this.parent.init2(false);
              this.URFtoDLF = this.move("URFtoDLF", this.parent.URFtoDLF, this.lastMove);
              this.FRtoBR = this.move("FRtoBR", this.parent.FRtoBR, this.lastMove);
              this.parity = this.move("parity", this.parent.parity, this.lastMove);
              this.URtoUL = this.move("URtoUL", this.parent.URtoUL, this.lastMove);
              this.UBtoDF = this.move("UBtoDF", this.parent.UBtoDF, this.lastMove);
              if (top) {
                return this.URtoDF = this.move("mergeURtoDF", this.URtoUL, this.UBtoDF);
              }
            }
            next2(move) {
              var next;
              next = freeStates.pop();
              next.parent = this;
              next.lastMove = move;
              next.depth = this.depth + 1;
              next.URFtoDLF = this.move("URFtoDLF", this.URFtoDLF, move);
              next.FRtoBR = this.move("FRtoBR", this.FRtoBR, move);
              next.parity = this.move("parity", this.parity, move);
              next.URtoDF = this.move("URtoDF", this.URtoDF, move);
              return next;
            }
          };
          solution = null;
          phase1search = function(state2) {
            var depth, m, ref, results;
            depth = 0;
            results = [];
            for (depth = m = 1, ref = maxDepth; 1 <= ref ? m <= ref : m >= ref; depth = 1 <= ref ? ++m : --m) {
              phase1(state2, depth);
              if (solution !== null) {
                break;
              }
              results.push(depth++);
            }
            return results;
          };
          phase1 = function(state2, depth) {
            var len, m, move, next, ref, ref1, results;
            if (depth === 0) {
              if (state2.minDist1() === 0) {
                if (state2.lastMove === null || (ref = state2.lastMove, indexOf.call(allMoves2, ref) < 0)) {
                  return phase2search(state2);
                }
              }
            } else if (depth > 0) {
              if (state2.minDist1() <= depth) {
                ref1 = state2.moves1();
                results = [];
                for (m = 0, len = ref1.length; m < len; m++) {
                  move = ref1[m];
                  next = state2.next1(move);
                  phase1(next, depth - 1);
                  freeStates.push(next);
                  if (solution !== null) {
                    break;
                  } else {
                    results.push(void 0);
                  }
                }
                return results;
              }
            }
          };
          phase2search = function(state2) {
            var depth, m, ref, results;
            state2.init2();
            results = [];
            for (depth = m = 1, ref = maxDepth - state2.depth; 1 <= ref ? m <= ref : m >= ref; depth = 1 <= ref ? ++m : --m) {
              phase2(state2, depth);
              if (solution !== null) {
                break;
              }
              results.push(depth++);
            }
            return results;
          };
          phase2 = function(state2, depth) {
            var len, m, move, next, ref, results;
            if (depth === 0) {
              if (state2.minDist2() === 0) {
                return solution = state2.solution();
              }
            } else if (depth > 0) {
              if (state2.minDist2() <= depth) {
                ref = state2.moves2();
                results = [];
                for (m = 0, len = ref.length; m < len; m++) {
                  move = ref[m];
                  next = state2.next2(move);
                  phase2(next, depth - 1);
                  freeStates.push(next);
                  if (solution !== null) {
                    break;
                  } else {
                    results.push(void 0);
                  }
                }
                return results;
              }
            }
          };
          freeStates = function() {
            var m, ref, results;
            results = [];
            for (x = m = 0, ref = maxDepth + 1; 0 <= ref ? m <= ref : m >= ref; x = 0 <= ref ? ++m : --m) {
              results.push(new State());
            }
            return results;
          }();
          state = freeStates.pop().init(this);
          phase1search(state);
          freeStates.push(state);
          if (solution.length > 0) {
            solution = solution.substring(0, solution.length - 1);
          }
          return solution;
        };
        faceNums = {
          U: 0,
          R: 1,
          F: 2,
          D: 3,
          L: 4,
          B: 5
        };
        faceNames = {
          0: "U",
          1: "R",
          2: "F",
          3: "D",
          4: "L",
          5: "B"
        };
        Cube2.prototype.solve = function(maxDepth = 22) {
          var clone, len, m, move, ref, rotation, solution, upright, uprightSolution;
          clone = this.clone();
          upright = clone.upright();
          clone.move(upright);
          rotation = new Cube2().move(upright).center;
          uprightSolution = clone.solveUpright(maxDepth);
          solution = [];
          ref = uprightSolution.split(" ");
          for (m = 0, len = ref.length; m < len; m++) {
            move = ref[m];
            solution.push(faceNames[rotation[faceNums[move[0]]]]);
            if (move.length > 1) {
              solution[solution.length - 1] += move[1];
            }
          }
          return solution.join(" ");
        };
        Cube2.scramble = function() {
          return Cube2.inverse(Cube2.random().solve());
        };
      }).call(exports);
    }
  });

  // node_modules/cubejs/index.js
  var require_cubejs = __commonJS({
    "node_modules/cubejs/index.js"(exports, module) {
      module.exports = require_cube();
      require_solve();
    }
  });

  // src/model/Cubie.ts
  var Cubie = class {
    colorL;
    colorR;
    colorU;
    colorD;
    colorF;
    colorB;
    constructor(faces) {
      this.colorB = faces.b ?? "blk";
      this.colorD = faces.d ?? "blk";
      this.colorF = faces.f ?? "blk";
      this.colorL = faces.l ?? "blk";
      this.colorR = faces.r ?? "blk";
      this.colorU = faces.u ?? "blk";
    }
    setColors(faces) {
      if (faces.l)
        this.colorL = faces.l;
      if (faces.r)
        this.colorR = faces.r;
      if (faces.u)
        this.colorU = faces.u;
      if (faces.d)
        this.colorD = faces.d;
      if (faces.f)
        this.colorF = faces.f;
      if (faces.b)
        this.colorB = faces.b;
    }
    rotate(direction) {
      switch (direction) {
        case "F":
        case "B'":
          [this.colorU, this.colorR, this.colorD, this.colorL] = [this.colorL, this.colorU, this.colorR, this.colorD];
          break;
        case "B":
        case "F'":
          [this.colorU, this.colorR, this.colorD, this.colorL] = [this.colorR, this.colorD, this.colorL, this.colorU];
          break;
        case "U":
        case "D'":
          [this.colorF, this.colorL, this.colorB, this.colorR] = [this.colorR, this.colorF, this.colorL, this.colorB];
          break;
        case "D":
        case "U'":
          [this.colorF, this.colorL, this.colorB, this.colorR] = [this.colorL, this.colorB, this.colorR, this.colorF];
          break;
        case "L":
        case "R'":
          [this.colorF, this.colorD, this.colorB, this.colorU] = [this.colorU, this.colorF, this.colorD, this.colorB];
          break;
        case "R":
        case "L'":
          [this.colorF, this.colorD, this.colorB, this.colorU] = [this.colorD, this.colorB, this.colorU, this.colorF];
          break;
        default:
          return;
      }
    }
    printFaces() {
      console.log([this.colorF, this.colorB, this.colorU, this.colorD, this.colorL, this.colorR]);
    }
  };

  // src/util/utilities.ts
  var EventDispatcher = class {
    handlers = [];
    excute(event) {
      for (let h of this.handlers)
        h.action(event);
    }
    register(handler) {
      let nameIndex = this.handlers.findIndex((x) => x.name == handler.name);
      if (nameIndex == -1) {
        this.handlers.push(handler);
      } else {
        console.log("duplicated handler name");
      }
    }
    remove(name) {
      let index = this.handlers.findIndex((x) => x.name == name);
      if (index != -1) {
        this.handlers.splice(index, 1);
      }
    }
  };
  var getColorString = (hexes) => {
    let R = Number(hexes[0]).toString(16);
    let G = Number(hexes[1]).toString(16);
    let B = Number(hexes[2]).toString(16);
    return "#" + R + G + B;
  };
  var fromRGB = (rgb) => {
    return {
      toString: () => {
        return getColorString(rgb);
      }
    };
  };
  var fromPlaneView = (plane) => {
    let _plane = plane;
    return {
      toString: () => {
        let res = "";
        for (const key in cubeOrientationAndColors) {
          if (Object.prototype.hasOwnProperty.call(cubeOrientationAndColors, key)) {
            const element = cubeOrientationAndColors[key];
            let arr = _plane[element];
            res += `${key}: ${arr.toString()};
`;
          }
        }
        return res;
      },
      getCurrent: () => _plane,
      refresh: (newplane) => {
        _plane = newplane;
      },
      updateCurrent: (ora, index, newColor) => {
        let faceColor = cubeOrientationAndColors[ora];
        let newFaceColor = "blk";
        for (const key in cssFaceColors) {
          if (Object.prototype.hasOwnProperty.call(cssFaceColors, key)) {
            const element = cssFaceColors[key];
            if (element == newColor) {
              newFaceColor = key;
            }
          }
        }
        _plane[faceColor][index] = newFaceColor;
      }
    };
  };
  var cssFaceColors = {
    yel: "#b6be46",
    ora: "#c78d29",
    blu: "#297dc7",
    red: "#ce276a",
    whi: "#ffffff",
    gre: "#5ea66c"
  };

  // src/model/RubiksCube.ts
  var restoredCubePlaneView = {
    blu: Array(8).fill("blu"),
    gre: Array(8).fill("gre"),
    ora: Array(8).fill("ora"),
    red: Array(8).fill("red"),
    whi: Array(8).fill("whi"),
    yel: Array(8).fill("yel")
  };
  var cubeOrientationAndColors = {
    "L": "ora",
    "R": "red",
    "U": "yel",
    "D": "whi",
    "F": "blu",
    "B": "gre"
  };
  var getIndexFromCoord = (coord) => {
    return [coord.x, coord.y, coord.z].map((a) => {
      if (a == -1)
        return "-";
      if (a == 0)
        return "0";
      if (a == 1)
        return "1";
      return "";
    }).join("");
  };
  var RubiksCube = class {
    cells;
    onDidRestoreDispatcher = new EventDispatcher();
    onDidRotateDispatcher = new EventDispatcher();
    getAllCells() {
      return this.cells;
    }
    constructor(planes) {
      this.cells = {};
      for (const xx of [-1, 0, 1]) {
        for (const yy of [-1, 0, 1]) {
          for (const zz of [-1, 0, 1]) {
            let index = getIndexFromCoord({ x: xx, y: yy, z: zz });
            this.cells[index] = new Cubie({});
          }
        }
      }
      this.setColorsToSide("B", planes["gre"], "gre");
      this.setColorsToSide("F", planes["blu"], "blu");
      this.setColorsToSide("L", planes["ora"], "ora");
      this.setColorsToSide("R", planes["red"], "red");
      this.setColorsToSide("U", planes["yel"], "yel");
      this.setColorsToSide("D", planes["whi"], "whi");
    }
    setColorsToSide(side, colors, center) {
      let face = this.getSideCellsWithOrder(side);
      for (const it of [0, 1, 2, 3]) {
        this.cells[face[it]].setColors({ [side.toLowerCase()]: colors[it] });
      }
      this.cells[face[4]].setColors({ [side.toLowerCase()]: center });
      for (const it of [5, 6, 7, 8]) {
        this.cells[face[it]].setColors({ [side.toLowerCase()]: colors[it - 1] });
      }
    }
    rotateFace(cells, dir) {
      if (dir == "clock") {
        return [cells[6], cells[3], cells[0], cells[7], cells[4], cells[1], cells[8], cells[5], cells[2]];
      }
      if (dir == "rever") {
        return [cells[2], cells[5], cells[8], cells[1], cells[4], cells[7], cells[0], cells[3], cells[6]];
      }
      return cells;
    }
    _rotate(sideCells, dirF, dirC) {
      let oldIndex = sideCells;
      let newIndex = this.rotateFace(oldIndex, dirF);
      [
        this.cells[oldIndex[0]],
        this.cells[oldIndex[1]],
        this.cells[oldIndex[2]],
        this.cells[oldIndex[3]],
        this.cells[oldIndex[4]],
        this.cells[oldIndex[5]],
        this.cells[oldIndex[6]],
        this.cells[oldIndex[7]],
        this.cells[oldIndex[8]]
      ] = [
        this.cells[newIndex[0]],
        this.cells[newIndex[1]],
        this.cells[newIndex[2]],
        this.cells[newIndex[3]],
        this.cells[newIndex[4]],
        this.cells[newIndex[5]],
        this.cells[newIndex[6]],
        this.cells[newIndex[7]],
        this.cells[newIndex[8]]
      ];
      for (const it of sideCells.map((v) => this.cells[v])) {
        it.rotate(dirC);
      }
    }
    rotate(dir) {
      switch (dir) {
        case "F":
          this._rotate(this.getSideCellsWithOrder("F"), "clock", dir);
          break;
        case "F'":
          this._rotate(this.getSideCellsWithOrder("F"), "rever", dir);
          break;
        case "F2":
          this._rotate(this.getSideCellsWithOrder("F"), "clock", "F");
          this._rotate(this.getSideCellsWithOrder("F"), "clock", "F");
          break;
        case "B":
          this._rotate(this.getSideCellsWithOrder("B"), "clock", dir);
          break;
        case "B'":
          this._rotate(this.getSideCellsWithOrder("B"), "rever", dir);
          break;
        case "B2":
          this._rotate(this.getSideCellsWithOrder("B"), "clock", "B");
          this._rotate(this.getSideCellsWithOrder("B"), "clock", "B");
          break;
        case "L":
          this._rotate(this.getSideCellsWithOrder("L"), "clock", dir);
          break;
        case "L'":
          this._rotate(this.getSideCellsWithOrder("L"), "rever", dir);
          break;
        case "L2":
          this._rotate(this.getSideCellsWithOrder("L"), "clock", "L");
          this._rotate(this.getSideCellsWithOrder("L"), "clock", "L");
          break;
        case "R":
          this._rotate(this.getSideCellsWithOrder("R"), "clock", dir);
          break;
        case "R'":
          this._rotate(this.getSideCellsWithOrder("R"), "rever", dir);
          break;
        case "R2":
          this._rotate(this.getSideCellsWithOrder("R"), "clock", "R");
          this._rotate(this.getSideCellsWithOrder("R"), "clock", "R");
          break;
        case "U":
          this._rotate(this.getSideCellsWithOrder("U"), "clock", dir);
          break;
        case "U'":
          this._rotate(this.getSideCellsWithOrder("U"), "rever", dir);
          break;
        case "U2":
          this._rotate(this.getSideCellsWithOrder("U"), "clock", "U");
          this._rotate(this.getSideCellsWithOrder("U"), "clock", "U");
          break;
        case "D":
          this._rotate(this.getSideCellsWithOrder("D"), "clock", dir);
          break;
        case "D'":
          this._rotate(this.getSideCellsWithOrder("D"), "rever", dir);
          break;
        case "D2":
          this._rotate(this.getSideCellsWithOrder("D"), "clock", "D");
          this._rotate(this.getSideCellsWithOrder("D"), "clock", "D");
          break;
        default:
          const _ = dir;
          break;
      }
      this.onDidRotateDispatcher.excute(dir);
    }
    rotated(dir) {
      let plane = this.getAllFaces();
      let newCube = new RubiksCube(plane);
      newCube.rotate(dir);
      return newCube;
    }
    getSideCellsWithOrder(side) {
      switch (side) {
        case "F": {
          return ["-11", "011", "111", "-01", "001", "101", "--1", "0-1", "1-1"];
        }
        case "B": {
          return ["11-", "01-", "-1-", "10-", "00-", "-0-", "1--", "0--", "---"];
        }
        case "L": {
          return ["-1-", "-10", "-11", "-0-", "-00", "-01", "---", "--0", "--1"];
        }
        case "R": {
          return ["111", "110", "11-", "101", "100", "10-", "1-1", "1-0", "1--"];
        }
        case "U": {
          return ["-1-", "01-", "11-", "-10", "010", "110", "-11", "011", "111"];
        }
        case "D": {
          return ["--1", "0-1", "1-1", "--0", "0-0", "1-0", "---", "0--", "1--"];
        }
        default:
          const checking = side;
          return [];
      }
    }
    getAllFaces() {
      let _blu = this.getSideCellsWithOrder("F").map((a) => this.cells[a].colorF);
      let _ora = this.getSideCellsWithOrder("L").map((a) => this.cells[a].colorL);
      let _red = this.getSideCellsWithOrder("R").map((a) => this.cells[a].colorR);
      let _yel = this.getSideCellsWithOrder("U").map((a) => this.cells[a].colorU);
      let _gre = this.getSideCellsWithOrder("B").map((a) => this.cells[a].colorB);
      let _whi = this.getSideCellsWithOrder("D").map((a) => this.cells[a].colorD);
      for (const it of [_blu, _ora, _red, _yel, _gre, _whi]) {
        it.splice(4, 1);
      }
      return {
        blu: _blu,
        ora: _ora,
        red: _red,
        yel: _yel,
        gre: _gre,
        whi: _whi
      };
    }
    isEqualTo(rb) {
      let a = this.getAllFaces();
      let b = rb.getAllFaces();
      return JSON.stringify(a.blu) == JSON.stringify(b.blu) && JSON.stringify(a.gre) == JSON.stringify(b.gre) && JSON.stringify(a.ora) == JSON.stringify(b.ora) && JSON.stringify(a.red) == JSON.stringify(b.red) && JSON.stringify(a.whi) == JSON.stringify(b.whi) && JSON.stringify(a.yel) == JSON.stringify(b.yel);
    }
    restore(planes) {
      this.cells = {};
      for (const xx of [-1, 0, 1]) {
        for (const yy of [-1, 0, 1]) {
          for (const zz of [-1, 0, 1]) {
            let index = getIndexFromCoord({ x: xx, y: yy, z: zz });
            this.cells[index] = new Cubie({});
          }
        }
      }
      if (planes) {
        this.setColorsToSide("B", planes["gre"], "gre");
        this.setColorsToSide("F", planes["blu"], "blu");
        this.setColorsToSide("L", planes["ora"], "ora");
        this.setColorsToSide("R", planes["red"], "red");
        this.setColorsToSide("U", planes["yel"], "yel");
        this.setColorsToSide("D", planes["whi"], "whi");
      } else {
        this.setColorsToSide("B", restoredCubePlaneView["gre"], "gre");
        this.setColorsToSide("F", restoredCubePlaneView["blu"], "blu");
        this.setColorsToSide("L", restoredCubePlaneView["ora"], "ora");
        this.setColorsToSide("R", restoredCubePlaneView["red"], "red");
        this.setColorsToSide("U", restoredCubePlaneView["yel"], "yel");
        this.setColorsToSide("D", restoredCubePlaneView["whi"], "whi");
      }
      this.onDidRestoreDispatcher.excute();
    }
  };
  var restoredRubiksCube = new RubiksCube(restoredCubePlaneView);

  // src/util/constants.ts
  var _Cube = require_cubejs();
  var cube = new RubiksCube(restoredCubePlaneView);
  var currentPlaneView = fromPlaneView(restoredCubePlaneView);
  var globalColors = {
    documentBodyBackgroudColor: fromRGB([51, 128, 123])
  };

  // src/solution/tmp.ts
  var Cube = require_cubejs();
  var __getSolution = (dcube) => {
    let cc = Cube.fromString(dcube);
    Cube.initSolver();
    let solstr = cc.solve();
    let sol = solstr.split(" ");
    let p1 = sol.splice(0, 8);
    let p2 = sol;
    return {
      Phase1: p1,
      Phase2: p2
    };
  };

  // src/worker.ts
  onmessage = function(e) {
    if (e.data?.messageType == "cube") {
      let res = __getSolution(e.data.content);
      let ret = { messageType: "solution", content: res };
      postMessage(ret);
    }
  };
})();
