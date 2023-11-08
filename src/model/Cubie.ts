export const rotationDirections = ["L", "L'", "R", "R'", "F", "F'", "B", "B'", "U", "U'", "D", "D'", "L2", "R2", "F2", "B2", "U2", "D2"] as const
export type TRotationDirection = (typeof rotationDirections)[number]

export type TFaceColor = "yel" | "ora" | "blu" | "red" | "gre" | "whi" | "blk"

export class Cubie {
	colorL: TFaceColor
	colorR: TFaceColor
	colorU: TFaceColor
	colorD: TFaceColor
	colorF: TFaceColor
	colorB: TFaceColor

	constructor(faces: { l?: TFaceColor; r?: TFaceColor; u?: TFaceColor; d?: TFaceColor; f?: TFaceColor; b?: TFaceColor }) {
		this.colorB = faces.b ?? "blk"
		this.colorD = faces.d ?? "blk"
		this.colorF = faces.f ?? "blk"
		this.colorL = faces.l ?? "blk"
		this.colorR = faces.r ?? "blk"
		this.colorU = faces.u ?? "blk"
	}

	setColors(faces: { l?: TFaceColor; r?: TFaceColor; u?: TFaceColor; d?: TFaceColor; f?: TFaceColor; b?: TFaceColor }) {
		if (faces.l) this.colorL = faces.l
		if (faces.r) this.colorR = faces.r
		if (faces.u) this.colorU = faces.u
		if (faces.d) this.colorD = faces.d
		if (faces.f) this.colorF = faces.f
		if (faces.b) this.colorB = faces.b
	}

	rotate(direction: TRotationDirection) {
		switch (direction) {
			case "F":
			case "B'":
				;[this.colorU, this.colorR, this.colorD, this.colorL] = [this.colorL, this.colorU, this.colorR, this.colorD]
				break
			case "B":
			case "F'":
				;[this.colorU, this.colorR, this.colorD, this.colorL] = [this.colorR, this.colorD, this.colorL, this.colorU]
				break
			case "U":
			case "D'":
				;[this.colorF, this.colorL, this.colorB, this.colorR] = [this.colorR, this.colorF, this.colorL, this.colorB]
				break
			case "D":
			case "U'":
				;[this.colorF, this.colorL, this.colorB, this.colorR] = [this.colorL, this.colorB, this.colorR, this.colorF]
				break
			case "L":
			case "R'":
				;[this.colorF, this.colorD, this.colorB, this.colorU] = [this.colorU, this.colorF, this.colorD, this.colorB]
				break
			case "R":
			case "L'":
				;[this.colorF, this.colorD, this.colorB, this.colorU] = [this.colorD, this.colorB, this.colorU, this.colorF]
				break
			default:
				return
		}
	}

	printFaces() {
		console.log([this.colorF, this.colorB, this.colorU, this.colorD, this.colorL, this.colorR])
	}
}
