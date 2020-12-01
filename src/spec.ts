import assert from "assert"
import { getPermutationGroups } from "./solution/Validation"

it('test', () => {
    let arr = [] as string[]
    let brr = ['..']
    let res = getPermutationGroups(arr, brr)
    assert.strictEqual(res.length, 0)
})

it('print', () => {
    let arr = ['0', '1', '3', '5']
    let brr = ['1', '3', '0', '5']
    let res = getPermutationGroups(arr, brr)
    console.log(res)
})