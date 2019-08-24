import { CubePosition, CubeCell } from '../src/CubeUnit'
import { Vector3 } from 'three';
import { RubiksCube } from '../src/RubiksCube'
import { } from 'jest'

let cube = new CubeCell('blk', 'blk', 'blk', 'blk', 'blk', 'blk', { x: 1, y: 1, z: 1 })

test('buckle test', () => {
    cube.applyRotation('Xc')
    console.log(cube.getCoordinate())
})