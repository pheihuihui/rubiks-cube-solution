import { BufferAttribute, BufferGeometry, Vector3 } from 'three'

export class RoundedBoxGeometry extends BufferGeometry {
    width: number
    height: number
    depth: number
    radius: number
    radiusSegments: number
    parameters: {
        width: number
        height: number
        depth: number
        radius: number
        radiusSegments: number
    }

    constructor(width?: number, height?: number, depth?: number, radius?: number, radiusSegments?: number) {
        super()
        this.radiusSegments = radiusSegments ? Math.max(1, Math.floor(radiusSegments)) : 1;
        this.width = width ? width : 1;
        this.height = height ? height : 1;
        this.depth = depth ? depth : 1;
        this.radius = radius ? radius : 0.15;
        this.radius = Math.min(this.radius, Math.min(this.width, Math.min(this.height, Math.min(this.depth))) / 2);

        let edgeHalfWidth = this.width / 2 - this.radius;
        let edgeHalfHeight = this.height / 2 - this.radius;
        let edgeHalfDepth = this.depth / 2 - this.radius;

        this.parameters = {
            width: this.width,
            height: this.height,
            depth: this.depth,
            radius: this.radius,
            radiusSegments: this.radiusSegments
        };

        let rs1 = this.radiusSegments + 1; //radius segments + 1 

        let totalVertexCount = (rs1 * this.radiusSegments + 1) << 3;


        //make buffers ======================================

        let positions = new BufferAttribute(new Float32Array(totalVertexCount * 3), 3);
        let normals = new BufferAttribute(new Float32Array(totalVertexCount * 3), 3);


   
        let cornerVerts = []
        let cornerNormals = []
        let normal = new Vector3()
        let vertex = new Vector3()
        let vertexPool = []
        let normalPool = []
        let indices = []

    
        let lastVertex = rs1 * this.radiusSegments
        let cornerVertNumber = rs1 * this.radiusSegments + 1


        function doVertices() {

            //corner offsets
            let cornerLayout = [
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
            for (let j = 0; j < 8; j++) {

                cornerVerts.push([]);
                cornerNormals.push([]);

            }

            //construct 1/8 sphere ==============================

            let PIhalf = Math.PI / 2;

            let cornerOffset = new THREE.Vector3(edgeHalfWidth, edgeHalfHeight, edgeHalfDepth);

            for (let y = 0; y <= radiusSegments; y++) {

                let v = y / radiusSegments;

                let va = v * PIhalf; //arrange in 90 deg

                let cosVa = Math.cos(va); //scale of vertical angle 

                let sinVa = Math.sin(va);

                if (y == radiusSegments) {

                    vertex.set(0, 1, 0);

                    let vert = vertex.clone().multiplyScalar(radius).add(cornerOffset);

                    cornerVerts[0].push(vert);

                    vertexPool.push(vert);

                    let norm = vertex.clone();

                    cornerNormals[0].push(norm);

                    normalPool.push(norm);

                    continue; //skip row loop

                }

                for (let x = 0; x <= radiusSegments; x++) {

                    let u = x / radiusSegments;

                    let ha = u * PIhalf;

                    //make 1/8 sphere points
                    vertex.x = cosVa * Math.cos(ha);
                    vertex.y = sinVa;
                    vertex.z = cosVa * Math.sin(ha);

                    //copy sphere point, scale by radius, offset by half whd
                    let vert = vertex.clone().multiplyScalar(radius).add(cornerOffset);

                    cornerVerts[0].push(vert);

                    vertexPool.push(vert);

                    //sphere already normalized, just clone

                    let norm = vertex.clone().normalize();
                    cornerNormals[0].push(norm);
                    normalPool.push(norm);

                }

            }

            //distribute corner verts ===========================

            for (let i = 1; i < 8; i++) {

                for (let j = 0; j < cornerVerts[0].length; j++) {

                    let vert = cornerVerts[0][j].clone().multiply(cornerLayout[i]);

                    cornerVerts[i].push(vert);

                    vertexPool.push(vert);

                    let norm = cornerNormals[0][j].clone().multiply(cornerLayout[i]);

                    cornerNormals[i].push(norm);

                    normalPool.push(norm);

                }

            }

        }


    }
}