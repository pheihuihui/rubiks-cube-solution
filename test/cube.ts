import assert from "node:assert";
import { describe, it, test } from "node:test";
import { add1 } from "../src/util/utilities";

describe("add1", () => {
    it("should add 1 to a number", () => {
        assert.equal(add1(1), 2);
    });
    it("should add 1 to a negative number", () => {
        assert.equal(add1(-1), 0);
    });
    it("should add 1 to zero", () => {
        assert.equal(add1(0), 1);
    });
});