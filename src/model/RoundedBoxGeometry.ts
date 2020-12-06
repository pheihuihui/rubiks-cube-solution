import { BufferAttribute, BufferGeometry, Vector3 } from 'three'

export class RoundedBoxGeometry extends BufferGeometry {
    private width: number
    private height: number
    private depth: number
    private radius: number
    private radiusSegments: number

    private edgeHalfWidth: number
    private edgeHalfHeight: number
    private edgeHalfDepth: number

    private cornerVerts: Vector3[][] = []
    private cornerNormals: Vector3[][] = []
    private normal = new Vector3()
    private vertex = new Vector3()
    private vertexPool: Vector3[] = []
    private normalPool: Vector3[] = []
    private indices: number[] = []

    private rs1: number
    private totalVertexCount: number

    private positions: BufferAttribute
    private normals: BufferAttribute

    private lastVertex: number
    private cornerVertNumber: number

    constructor(width?: number, height?: number, depth?: number, radius?: number, radiusSegments?: number) {
        super()
        this.radiusSegments = radiusSegments ? Math.max(1, Math.floor(radiusSegments)) : 1;
        this.width = width ? width : 1;
        this.height = height ? height : 1;
        this.depth = depth ? depth : 1;
        this.radius = radius ? radius : 0.15;
        this.radius = Math.min(this.radius, Math.min(this.width, Math.min(this.height, Math.min(this.depth))) / 2);

        this.edgeHalfWidth = this.width / 2 - this.radius;
        this.edgeHalfHeight = this.height / 2 - this.radius;
        this.edgeHalfDepth = this.depth / 2 - this.radius;

        this.rs1 = this.radiusSegments + 1
        this.totalVertexCount = (this.rs1 * this.radiusSegments + 1) << 3

        this.positions = new BufferAttribute(new Float32Array(this.totalVertexCount * 3), 3)
        this.normals = new BufferAttribute(new Float32Array(this.totalVertexCount * 3), 3)

        this.lastVertex = this.rs1 * this.radiusSegments
        this.cornerVertNumber = this.rs1 * this.radiusSegments + 1

        this.doVertices()
        this.doFaces()
        this.doCorners()
        this.doHeightEdges()
        this.doWidthEdges()
        this.doDepthEdges()

        var index = 0;

        for (var i = 0; i < this.vertexPool.length; i++) {

            this.positions.setXYZ(
                index,
                this.vertexPool[i].x,
                this.vertexPool[i].y,
                this.vertexPool[i].z
            );

            this.normals.setXYZ(
                index,
                this.normalPool[i].x,
                this.normalPool[i].y,
                this.normalPool[i].z
            );

            index++;

        }

        this.setIndex(new BufferAttribute(new Uint16Array(this.indices), 1));

        this.setAttribute('position', this.positions);

        this.setAttribute('normal', this.normals);

    }

    private doVertices() {
        //corner offsets
        var cornerLayout = [
            new Vector3(1, 1, 1),
            new Vector3(1, 1, -1),
            new Vector3(-1, 1, -1),
            new Vector3(-1, 1, 1),
            new Vector3(1, -1, 1),
            new Vector3(1, -1, -1),
            new Vector3(-1, -1, -1),
            new Vector3(-1, -1, 1)
        ];
        //corner holder 
        for (var j = 0; j < 8; j++) {

            this.cornerVerts.push([]);
            this.cornerNormals.push([]);
        }

        //construct 1/8 sphere ==============================

        var PIhalf = Math.PI / 2;
        var cornerOffset = new Vector3(this.edgeHalfWidth, this.edgeHalfHeight, this.edgeHalfDepth);
        for (var y = 0; y <= this.radiusSegments; y++) {
            var v = y / this.radiusSegments;
            var va = v * PIhalf; //arrange in 90 deg
            var cosVa = Math.cos(va); //scale of vertical angle 
            var sinVa = Math.sin(va);
            if (y == this.radiusSegments) {
                this.vertex.set(0, 1, 0);
                var vert = this.vertex.clone().multiplyScalar(this.radius).add(cornerOffset);
                this.cornerVerts[0].push(vert);
                this.vertexPool.push(vert);
                var norm = this.vertex.clone();
                this.cornerNormals[0].push(norm);
                this.normalPool.push(norm);
                continue; //skip row loop
            }

            for (var x = 0; x <= this.radiusSegments; x++) {
                var u = x / this.radiusSegments;
                var ha = u * PIhalf;
                //make 1/8 sphere points
                this.vertex.x = cosVa * Math.cos(ha);
                this.vertex.y = sinVa;
                this.vertex.z = cosVa * Math.sin(ha);
                //copy sphere point, scale by radius, offset by half whd
                var vert = this.vertex.clone().multiplyScalar(this.radius).add(cornerOffset);
                this.cornerVerts[0].push(vert);
                this.vertexPool.push(vert);
                //sphere already normalized, just clone
                var norm = this.vertex.clone().normalize();
                this.cornerNormals[0].push(norm);
                this.normalPool.push(norm);
            }
        }

        //distribute corner verts ===========================

        for (var i = 1; i < 8; i++) {
            for (var j = 0; j < this.cornerVerts[0].length; j++) {
                var vert = this.cornerVerts[0][j].clone().multiply(cornerLayout[i]);
                this.cornerVerts[i].push(vert);
                this.vertexPool.push(vert);
                var norm = this.cornerNormals[0][j].clone().multiply(cornerLayout[i]);
                this.cornerNormals[i].push(norm);
                this.normalPool.push(norm);
            }
        }
    }

    private doCorners() {

        var indexInd = 0;
        var flips = [
            true,
            false,
            true,
            false,
            false,
            true,
            false,
            true
        ];

        var lastRowOffset = this.rs1 * (this.radiusSegments - 1);

        for (var i = 0; i < 8; i++) {
            var cornerOffset = this.cornerVertNumber * i;
            for (var v = 0; v < this.radiusSegments - 1; v++) {
                var r1 = v * this.rs1; 		//row offset
                var r2 = (v + 1) * this.rs1; //next row
                for (var u = 0; u < this.radiusSegments; u++) {
                    var u1 = u + 1;
                    var a = cornerOffset + r1 + u;
                    var b = cornerOffset + r1 + u1;
                    var c = cornerOffset + r2 + u;
                    var d = cornerOffset + r2 + u1;
                    if (!flips[i]) {
                        [a, b, c, b, d, c].forEach(x => {
                            this.indices.push(x)
                        })
                    } else {
                        [a, c, b, b, c, d].forEach(x => {
                            this.indices.push(x)
                        })
                    }
                }
            }

            for (var u = 0; u < this.radiusSegments; u++) {
                var a = cornerOffset + lastRowOffset + u;
                var b = cornerOffset + lastRowOffset + u + 1;
                var c = cornerOffset + this.lastVertex;
                if (!flips[i]) {
                    [a, b, c].forEach(x => {
                        this.indices.push(x)
                    })
                } else {
                    [a, c, b].forEach(x => {
                        this.indices.push(x)
                    })
                }
            }

        }

    }

    private doFaces() {

        //top
        var a = this.lastVertex;// + cornerVertNumber * 0;
        var b = this.lastVertex + this.cornerVertNumber;// * 1;
        var c = this.lastVertex + this.cornerVertNumber * 2;
        var d = this.lastVertex + this.cornerVertNumber * 3;
        [a, b, c, a, c, d].forEach(x => {
            this.indices.push(x)
        })

        //bottom
        a = this.lastVertex + this.cornerVertNumber * 4;// + cornerVertNumber * 0;
        b = this.lastVertex + this.cornerVertNumber * 5;// * 1;
        c = this.lastVertex + this.cornerVertNumber * 6;
        d = this.lastVertex + this.cornerVertNumber * 7;
        [a, c, b, a, d, c].forEach(x => {
            this.indices.push(x)
        })

        //left 
        a = 0;
        b = this.cornerVertNumber;
        c = this.cornerVertNumber * 4;
        d = this.cornerVertNumber * 5;
        [a, c, b, b, c, d].forEach(x => {
            this.indices.push(x)
        })

        //right 
        a = this.cornerVertNumber * 2;
        b = this.cornerVertNumber * 3;
        c = this.cornerVertNumber * 6;
        d = this.cornerVertNumber * 7;
        [a, c, b, b, c, d].forEach(x => {
            this.indices.push(x)
        })

        //front 
        a = this.radiusSegments;
        b = this.radiusSegments + this.cornerVertNumber * 3;
        c = this.radiusSegments + this.cornerVertNumber * 4;
        d = this.radiusSegments + this.cornerVertNumber * 7;
        [a, b, c, b, d, c].forEach(x => {
            this.indices.push(x)
        })

        //back 
        a = this.radiusSegments + this.cornerVertNumber;
        b = this.radiusSegments + this.cornerVertNumber * 2;
        c = this.radiusSegments + this.cornerVertNumber * 5;
        d = this.radiusSegments + this.cornerVertNumber * 6;
        [a, c, b, b, c, d].forEach(x => {
            this.indices.push(x)
        })

    }

    private doHeightEdges() {
        for (var i = 0; i < 4; i++) {
            var cOffset = i * this.cornerVertNumber;
            var cRowOffset = 4 * this.cornerVertNumber + cOffset;
            var needsFlip = (i & 1) == 1;
            for (var u = 0; u < this.radiusSegments; u++) {
                var u1 = u + 1;
                var a = cOffset + u;
                var b = cOffset + u1;
                var c = cRowOffset + u;
                var d = cRowOffset + u1;
                if (!needsFlip) {
                    [a, b, c, b, d, c].forEach(x => {
                        this.indices.push(x)
                    })
                } else {
                    [a, c, b, b, c, d].forEach(x => {
                        this.indices.push(x)
                    })
                }
            }
        }
    }

    private doDepthEdges() {

        var cStarts = [0, 2, 4, 6];
        var cEnds = [1, 3, 5, 7];

        for (var i = 0; i < 4; i++) {

            var cStart = this.cornerVertNumber * cStarts[i];
            var cEnd = this.cornerVertNumber * cEnds[i];

            var needsFlip = 1 >= i;

            for (var u = 0; u < this.radiusSegments; u++) {

                var urs1 = u * this.rs1;
                var u1rs1 = (u + 1) * this.rs1;

                var a = cStart + urs1;
                var b = cStart + u1rs1;
                var c = cEnd + urs1;
                var d = cEnd + u1rs1

                if (needsFlip) {
                    [a, c, b, b, c, d].forEach(x => {
                        this.indices.push(x)
                    })
                } else {
                    [a, b, c, b, d, c].forEach(x => {
                        this.indices.push(x)
                    })
                }

            }

        }

    }

    private doWidthEdges() {

        var end = this.radiusSegments - 1;

        var cStarts = [0, 1, 4, 5];
        var cEnds = [3, 2, 7, 6];
        var needsFlip = [0, 1, 1, 0];

        for (var i = 0; i < 4; i++) {

            var cStart = cStarts[i] * this.cornerVertNumber;
            var cEnd = cEnds[i] * this.cornerVertNumber;


            for (var u = 0; u <= end; u++) {

                // var dInd = u != end ? radiusSegments + u * rs1 : cornerVertNumber - 1;

                var a = cStart + this.radiusSegments + u * this.rs1;
                var b = cStart + (u != end ? this.radiusSegments + (u + 1) * this.rs1 : this.cornerVertNumber - 1);

                var c = cEnd + this.radiusSegments + u * this.rs1;
                var d = cEnd + (u != end ? this.radiusSegments + (u + 1) * this.rs1 : this.cornerVertNumber - 1);

                if (!needsFlip[i]) {
                    [a, b, c, b, d, c].forEach(x => {
                        this.indices.push(x)
                    })
                }
                else {
                    [a, c, b, b, c, d].forEach(x => {
                        this.indices.push(x)
                    })
                }

            }

        }

    }

}
