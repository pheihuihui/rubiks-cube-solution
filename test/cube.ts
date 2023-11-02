import assert from "node:assert";
import { describe, it } from "node:test";
import { Cube } from "../src/solution/cube";

describe("Cube", () => {
    it('should serialize a cube to string for a default cube', function () {
        const cube = new Cube();
        const str = cube.asString();
        assert.strictEqual(str, "UUUUUUUUURRRRRRRRRFFFFFFFFFDDDDDDDDDLLLLLLLLLBBBBBBBBB")
    });
    it('should initiate a cube when provide a String', function () {
        const cube = Cube.fromString('UUUUUUUUURRRRRRRRRFFFFFFFFFDDDDDDDDDLLLLLLLLLBBBBBBBBB');
        const str = cube.asString();
        assert.strictEqual(str, "UUUUUUUUURRRRRRRRRFFFFFFFFFDDDDDDDDDLLLLLLLLLBBBBBBBBB")
    });
    it('should serialize a cube to JSON for a default cube', function () {
        const cube = new Cube();
        const expectedJSON = {
            center: [0, 1, 2, 3, 4, 5],
            cp: [0, 1, 2, 3, 4, 5, 6, 7],
            co: [0, 0, 0, 0, 0, 0, 0, 0],
            ep: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
            eo: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        };
        const j1 = JSON.stringify(cube.toJSON())
        const j2 = JSON.stringify(expectedJSON)
        assert.strictEqual(j1, j2);
    });
    it('should rotate U face when move U', function () {
        const cube = new Cube();
        cube.move('U');
        assert.strictEqual(cube.asString(), "UUUUUUUUUBBBRRRRRRRRRFFFFFFDDDDDDDDDFFFLLLLLLLLLBBBBBB");
    });
    it('should rotate cuve face when apply a moves sequence', function () {
        const cube = new Cube();
        cube.move("U R F' L'");
        assert.strictEqual(cube.asString(), "DURRUFRRRBRBDRBDRBFDDDFFDFFBLLBDBLDLFUUFLLFLLULRUBUUBU");
    });
    it('should rotate cuve face when apply a moves sequence includes additional notation', function () {
        const cube = new Cube();
        cube.move("M' u2 z' S");
        assert.strictEqual(cube.asString(), "LLRUFULLRDLDBLBDRDBBFUUDBBFRRLDBDRRLURUFRFULUBFFUDDBFF");
    });
    it('should resets the cube to the identity cube', function () {
        const cube = new Cube();
        cube.move("U R F' L'");
        cube.identity();
        assert.strictEqual(cube.asString(), "UUUUUUUUURRRRRRRRRFFFFFFFFFDDDDDDDDDLLLLLLLLLBBBBBBBBB");
    });
    it('should return true when the cube is solved (default cube)', function () {
        const cube = new Cube();
        assert.strictEqual(cube.isSolved(), true);
    });
    it('should return false when the cube is not solved (random cube), and runs without errors in normal time', function () {
        const cube = Cube.random();
        console.log(cube.asString())
        assert.strictEqual(cube.isSolved(), false);
    });
    it('should return inverse moves', function () {
        const moves = Cube.inverse("F B' R");
        assert.strictEqual(moves, "R' B F'");
    });
    // it('should solve a solved cube :) ', function () {
    //     Cube.initSolver();
    //     const cube = new Cube;
    //     assert.strictEqual(cube.solve(), "R L U2 R L F2 R2 U2 R2 F2 R2 U2 F2 L2");
    // });
});