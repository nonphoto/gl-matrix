import { ARRAY_TYPE, EPSILON, IndexedCollection } from "./common";
import { Quat, ReadonlyQuat } from "./quat";
import { ReadonlyQuat2 } from "./quat2";
import { ReadonlyVec3, Vec3 } from "./vec3";

// prettier-ignore
export type Mat4 =
  | [number, number, number, number,
     number, number, number, number,
     number, number, number, number,
     number, number, number, number]
  | IndexedCollection;

  // prettier-ignore
export type ReadonlyMat4 =
  | readonly [
    number, number, number, number,
    number, number, number, number,
    number, number, number, number,
    number, number, number, number
  ]
  | IndexedCollection;

/**
 * Creates a new identity Mat4
 *
 * @returns {Mat4} a new 4x4 matrix
 */
export function mat4Create(): Mat4 {
  let out = new ARRAY_TYPE(16);
  if (ARRAY_TYPE != Float32Array) {
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
  }
  out[0] = 1;
  out[5] = 1;
  out[10] = 1;
  out[15] = 1;
  return out;
}

/**
 * Creates a new Mat4 initialized with values from an existing matrix
 *
 * @param {ReadonlyMat4} a matrix to clone
 * @returns {Mat4} a new 4x4 matrix
 */
export function mat4Clone(a: ReadonlyMat4): Mat4 {
  let out = new ARRAY_TYPE(16);
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  out[3] = a[3];
  out[4] = a[4];
  out[5] = a[5];
  out[6] = a[6];
  out[7] = a[7];
  out[8] = a[8];
  out[9] = a[9];
  out[10] = a[10];
  out[11] = a[11];
  out[12] = a[12];
  out[13] = a[13];
  out[14] = a[14];
  out[15] = a[15];
  return out;
}

/**
 * Copy the values from one Mat4 to another
 *
 * @param {Mat4} out the receiving matrix
 * @param {ReadonlyMat4} a the source matrix
 * @returns {Mat4} out
 */
export function mat4Copy(out: Mat4, a: ReadonlyMat4): Mat4 {
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  out[3] = a[3];
  out[4] = a[4];
  out[5] = a[5];
  out[6] = a[6];
  out[7] = a[7];
  out[8] = a[8];
  out[9] = a[9];
  out[10] = a[10];
  out[11] = a[11];
  out[12] = a[12];
  out[13] = a[13];
  out[14] = a[14];
  out[15] = a[15];
  return out;
}

/**
 * Create a new Mat4 with the given values
 *
 * @param {Number} m00 Component in column 0, row 0 position (index 0)
 * @param {Number} m01 Component in column 0, row 1 position (index 1)
 * @param {Number} m02 Component in column 0, row 2 position (index 2)
 * @param {Number} m03 Component in column 0, row 3 position (index 3)
 * @param {Number} m10 Component in column 1, row 0 position (index 4)
 * @param {Number} m11 Component in column 1, row 1 position (index 5)
 * @param {Number} m12 Component in column 1, row 2 position (index 6)
 * @param {Number} m13 Component in column 1, row 3 position (index 7)
 * @param {Number} m20 Component in column 2, row 0 position (index 8)
 * @param {Number} m21 Component in column 2, row 1 position (index 9)
 * @param {Number} m22 Component in column 2, row 2 position (index 10)
 * @param {Number} m23 Component in column 2, row 3 position (index 11)
 * @param {Number} m30 Component in column 3, row 0 position (index 12)
 * @param {Number} m31 Component in column 3, row 1 position (index 13)
 * @param {Number} m32 Component in column 3, row 2 position (index 14)
 * @param {Number} m33 Component in column 3, row 3 position (index 15)
 * @returns {Mat4} A new Mat4
 */
export function mat4FromValues(
  m00: number,
  m01: number,
  m02: number,
  m03: number,
  m10: number,
  m11: number,
  m12: number,
  m13: number,
  m20: number,
  m21: number,
  m22: number,
  m23: number,
  m30: number,
  m31: number,
  m32: number,
  m33: number
): Mat4 {
  let out = new ARRAY_TYPE(16);
  out[0] = m00;
  out[1] = m01;
  out[2] = m02;
  out[3] = m03;
  out[4] = m10;
  out[5] = m11;
  out[6] = m12;
  out[7] = m13;
  out[8] = m20;
  out[9] = m21;
  out[10] = m22;
  out[11] = m23;
  out[12] = m30;
  out[13] = m31;
  out[14] = m32;
  out[15] = m33;
  return out;
}

/**
 * Set the components of a Mat4 to the given values
 *
 * @param {Mat4} out the receiving matrix
 * @param {Number} m00 Component in column 0, row 0 position (index 0)
 * @param {Number} m01 Component in column 0, row 1 position (index 1)
 * @param {Number} m02 Component in column 0, row 2 position (index 2)
 * @param {Number} m03 Component in column 0, row 3 position (index 3)
 * @param {Number} m10 Component in column 1, row 0 position (index 4)
 * @param {Number} m11 Component in column 1, row 1 position (index 5)
 * @param {Number} m12 Component in column 1, row 2 position (index 6)
 * @param {Number} m13 Component in column 1, row 3 position (index 7)
 * @param {Number} m20 Component in column 2, row 0 position (index 8)
 * @param {Number} m21 Component in column 2, row 1 position (index 9)
 * @param {Number} m22 Component in column 2, row 2 position (index 10)
 * @param {Number} m23 Component in column 2, row 3 position (index 11)
 * @param {Number} m30 Component in column 3, row 0 position (index 12)
 * @param {Number} m31 Component in column 3, row 1 position (index 13)
 * @param {Number} m32 Component in column 3, row 2 position (index 14)
 * @param {Number} m33 Component in column 3, row 3 position (index 15)
 * @returns {Mat4} out
 */
export function mat4Set(
  out: Mat4,
  m00: number,
  m01: number,
  m02: number,
  m03: number,
  m10: number,
  m11: number,
  m12: number,
  m13: number,
  m20: number,
  m21: number,
  m22: number,
  m23: number,
  m30: number,
  m31: number,
  m32: number,
  m33: number
): Mat4 {
  out[0] = m00;
  out[1] = m01;
  out[2] = m02;
  out[3] = m03;
  out[4] = m10;
  out[5] = m11;
  out[6] = m12;
  out[7] = m13;
  out[8] = m20;
  out[9] = m21;
  out[10] = m22;
  out[11] = m23;
  out[12] = m30;
  out[13] = m31;
  out[14] = m32;
  out[15] = m33;
  return out;
}

/**
 * Set a Mat4 to the identity matrix
 *
 * @param {Mat4} out the receiving matrix
 * @returns {Mat4} out
 */
export function mat4Identity(out: Mat4): Mat4 {
  out[0] = 1;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 0;
  out[5] = 1;
  out[6] = 0;
  out[7] = 0;
  out[8] = 0;
  out[9] = 0;
  out[10] = 1;
  out[11] = 0;
  out[12] = 0;
  out[13] = 0;
  out[14] = 0;
  out[15] = 1;
  return out;
}

/**
 * Transpose the values of a Mat4
 *
 * @param {Mat4} out the receiving matrix
 * @param {ReadonlyMat4} a the source matrix
 * @returns {Mat4} out
 */
export function mat4Transpose(out: Mat4, a: ReadonlyMat4): Mat4 {
  // If we are transposing ourselves we can skip a few steps but have to cache some values
  if (out === a) {
    let a01 = a[1],
      a02 = a[2],
      a03 = a[3];
    let a12 = a[6],
      a13 = a[7];
    let a23 = a[11];

    out[1] = a[4];
    out[2] = a[8];
    out[3] = a[12];
    out[4] = a01;
    out[6] = a[9];
    out[7] = a[13];
    out[8] = a02;
    out[9] = a12;
    out[11] = a[14];
    out[12] = a03;
    out[13] = a13;
    out[14] = a23;
  } else {
    out[0] = a[0];
    out[1] = a[4];
    out[2] = a[8];
    out[3] = a[12];
    out[4] = a[1];
    out[5] = a[5];
    out[6] = a[9];
    out[7] = a[13];
    out[8] = a[2];
    out[9] = a[6];
    out[10] = a[10];
    out[11] = a[14];
    out[12] = a[3];
    out[13] = a[7];
    out[14] = a[11];
    out[15] = a[15];
  }

  return out;
}

/**
 * Inverts a Mat4
 *
 * @param {Mat4} out the receiving matrix
 * @param {ReadonlyMat4} a the source matrix
 * @returns {Mat4} out
 */
export function mat4Invert(out: Mat4, a: ReadonlyMat4): Mat4 | null {
  let a00 = a[0],
    a01 = a[1],
    a02 = a[2],
    a03 = a[3];
  let a10 = a[4],
    a11 = a[5],
    a12 = a[6],
    a13 = a[7];
  let a20 = a[8],
    a21 = a[9],
    a22 = a[10],
    a23 = a[11];
  let a30 = a[12],
    a31 = a[13],
    a32 = a[14],
    a33 = a[15];

  let b00 = a00 * a11 - a01 * a10;
  let b01 = a00 * a12 - a02 * a10;
  let b02 = a00 * a13 - a03 * a10;
  let b03 = a01 * a12 - a02 * a11;
  let b04 = a01 * a13 - a03 * a11;
  let b05 = a02 * a13 - a03 * a12;
  let b06 = a20 * a31 - a21 * a30;
  let b07 = a20 * a32 - a22 * a30;
  let b08 = a20 * a33 - a23 * a30;
  let b09 = a21 * a32 - a22 * a31;
  let b10 = a21 * a33 - a23 * a31;
  let b11 = a22 * a33 - a23 * a32;

  // Calculate the determinant
  let det =
    b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;

  if (!det) {
    return null;
  }
  det = 1.0 / det;

  out[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
  out[1] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
  out[2] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
  out[3] = (a22 * b04 - a21 * b05 - a23 * b03) * det;
  out[4] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
  out[5] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
  out[6] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
  out[7] = (a20 * b05 - a22 * b02 + a23 * b01) * det;
  out[8] = (a10 * b10 - a11 * b08 + a13 * b06) * det;
  out[9] = (a01 * b08 - a00 * b10 - a03 * b06) * det;
  out[10] = (a30 * b04 - a31 * b02 + a33 * b00) * det;
  out[11] = (a21 * b02 - a20 * b04 - a23 * b00) * det;
  out[12] = (a11 * b07 - a10 * b09 - a12 * b06) * det;
  out[13] = (a00 * b09 - a01 * b07 + a02 * b06) * det;
  out[14] = (a31 * b01 - a30 * b03 - a32 * b00) * det;
  out[15] = (a20 * b03 - a21 * b01 + a22 * b00) * det;

  return out;
}

/**
 * Calculates the adjugate of a Mat4
 *
 * @param {Mat4} out the receiving matrix
 * @param {ReadonlyMat4} a the source matrix
 * @returns {Mat4} out
 */
export function mat4Adjoint(out: Mat4, a: ReadonlyMat4): Mat4 {
  let a00 = a[0],
    a01 = a[1],
    a02 = a[2],
    a03 = a[3];
  let a10 = a[4],
    a11 = a[5],
    a12 = a[6],
    a13 = a[7];
  let a20 = a[8],
    a21 = a[9],
    a22 = a[10],
    a23 = a[11];
  let a30 = a[12],
    a31 = a[13],
    a32 = a[14],
    a33 = a[15];

  let b00 = a00 * a11 - a01 * a10;
  let b01 = a00 * a12 - a02 * a10;
  let b02 = a00 * a13 - a03 * a10;
  let b03 = a01 * a12 - a02 * a11;
  let b04 = a01 * a13 - a03 * a11;
  let b05 = a02 * a13 - a03 * a12;
  let b06 = a20 * a31 - a21 * a30;
  let b07 = a20 * a32 - a22 * a30;
  let b08 = a20 * a33 - a23 * a30;
  let b09 = a21 * a32 - a22 * a31;
  let b10 = a21 * a33 - a23 * a31;
  let b11 = a22 * a33 - a23 * a32;

  out[0] = a11 * b11 - a12 * b10 + a13 * b09;
  out[1] = a02 * b10 - a01 * b11 - a03 * b09;
  out[2] = a31 * b05 - a32 * b04 + a33 * b03;
  out[3] = a22 * b04 - a21 * b05 - a23 * b03;
  out[4] = a12 * b08 - a10 * b11 - a13 * b07;
  out[5] = a00 * b11 - a02 * b08 + a03 * b07;
  out[6] = a32 * b02 - a30 * b05 - a33 * b01;
  out[7] = a20 * b05 - a22 * b02 + a23 * b01;
  out[8] = a10 * b10 - a11 * b08 + a13 * b06;
  out[9] = a01 * b08 - a00 * b10 - a03 * b06;
  out[10] = a30 * b04 - a31 * b02 + a33 * b00;
  out[11] = a21 * b02 - a20 * b04 - a23 * b00;
  out[12] = a11 * b07 - a10 * b09 - a12 * b06;
  out[13] = a00 * b09 - a01 * b07 + a02 * b06;
  out[14] = a31 * b01 - a30 * b03 - a32 * b00;
  out[15] = a20 * b03 - a21 * b01 + a22 * b00;
  return out;
}

/**
 * Calculates the determinant of a Mat4
 *
 * @param {ReadonlyMat4} a the source matrix
 * @returns {Number} determinant of a
 */
export function mat4Determinant(a: ReadonlyMat4): number {
  let a00 = a[0],
    a01 = a[1],
    a02 = a[2],
    a03 = a[3];
  let a10 = a[4],
    a11 = a[5],
    a12 = a[6],
    a13 = a[7];
  let a20 = a[8],
    a21 = a[9],
    a22 = a[10],
    a23 = a[11];
  let a30 = a[12],
    a31 = a[13],
    a32 = a[14],
    a33 = a[15];

  let b0 = a00 * a11 - a01 * a10;
  let b1 = a00 * a12 - a02 * a10;
  let b2 = a01 * a12 - a02 * a11;
  let b3 = a20 * a31 - a21 * a30;
  let b4 = a20 * a32 - a22 * a30;
  let b5 = a21 * a32 - a22 * a31;
  let b6 = a00 * b5 - a01 * b4 + a02 * b3;
  let b7 = a10 * b5 - a11 * b4 + a12 * b3;
  let b8 = a20 * b2 - a21 * b1 + a22 * b0;
  let b9 = a30 * b2 - a31 * b1 + a32 * b0;

  // Calculate the determinant
  return a13 * b6 - a03 * b7 + a33 * b8 - a23 * b9;
}

/**
 * Multiplies two Mat4s
 *
 * @param {Mat4} out the receiving matrix
 * @param {ReadonlyMat4} a the first operand
 * @param {ReadonlyMat4} b the second operand
 * @returns {Mat4} out
 */
export function mat4Multiply(out: Mat4, a: ReadonlyMat4, b: ReadonlyMat4): Mat4 {
  let a00 = a[0],
    a01 = a[1],
    a02 = a[2],
    a03 = a[3];
  let a10 = a[4],
    a11 = a[5],
    a12 = a[6],
    a13 = a[7];
  let a20 = a[8],
    a21 = a[9],
    a22 = a[10],
    a23 = a[11];
  let a30 = a[12],
    a31 = a[13],
    a32 = a[14],
    a33 = a[15];

  // Cache only the current line of the second matrix
  let b0 = b[0],
    b1 = b[1],
    b2 = b[2],
    b3 = b[3];
  out[0] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
  out[1] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
  out[2] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
  out[3] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;

  b0 = b[4];
  b1 = b[5];
  b2 = b[6];
  b3 = b[7];
  out[4] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
  out[5] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
  out[6] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
  out[7] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;

  b0 = b[8];
  b1 = b[9];
  b2 = b[10];
  b3 = b[11];
  out[8] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
  out[9] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
  out[10] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
  out[11] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;

  b0 = b[12];
  b1 = b[13];
  b2 = b[14];
  b3 = b[15];
  out[12] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
  out[13] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
  out[14] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
  out[15] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
  return out;
}

/**
 * Translate a Mat4 by the given vector
 *
 * @param {Mat4} out the receiving matrix
 * @param {ReadonlyMat4} a the matrix to translate
 * @param {ReadonlyVec3} v vector to translate by
 * @returns {Mat4} out
 */
export function mat4Translate(out: Mat4, a: ReadonlyMat4, v: ReadonlyVec3): Mat4 {
  let x = v[0],
    y = v[1],
    z = v[2];
  let a00, a01, a02, a03;
  let a10, a11, a12, a13;
  let a20, a21, a22, a23;

  if (a === out) {
    out[12] = a[0] * x + a[4] * y + a[8] * z + a[12];
    out[13] = a[1] * x + a[5] * y + a[9] * z + a[13];
    out[14] = a[2] * x + a[6] * y + a[10] * z + a[14];
    out[15] = a[3] * x + a[7] * y + a[11] * z + a[15];
  } else {
    a00 = a[0];
    a01 = a[1];
    a02 = a[2];
    a03 = a[3];
    a10 = a[4];
    a11 = a[5];
    a12 = a[6];
    a13 = a[7];
    a20 = a[8];
    a21 = a[9];
    a22 = a[10];
    a23 = a[11];

    out[0] = a00;
    out[1] = a01;
    out[2] = a02;
    out[3] = a03;
    out[4] = a10;
    out[5] = a11;
    out[6] = a12;
    out[7] = a13;
    out[8] = a20;
    out[9] = a21;
    out[10] = a22;
    out[11] = a23;

    out[12] = a00 * x + a10 * y + a20 * z + a[12];
    out[13] = a01 * x + a11 * y + a21 * z + a[13];
    out[14] = a02 * x + a12 * y + a22 * z + a[14];
    out[15] = a03 * x + a13 * y + a23 * z + a[15];
  }

  return out;
}

/**
 * Scales the Mat4 by the dimensions in the given vec3 not using vectorization
 *
 * @param {Mat4} out the receiving matrix
 * @param {ReadonlyMat4} a the matrix to scale
 * @param {ReadonlyVec3} v the vec3 to scale the matrix by
 * @returns {Mat4} out
 **/
export function mat4Scale(out: Mat4, a: ReadonlyMat4, v: ReadonlyVec3): Mat4 {
  let x = v[0],
    y = v[1],
    z = v[2];

  out[0] = a[0] * x;
  out[1] = a[1] * x;
  out[2] = a[2] * x;
  out[3] = a[3] * x;
  out[4] = a[4] * y;
  out[5] = a[5] * y;
  out[6] = a[6] * y;
  out[7] = a[7] * y;
  out[8] = a[8] * z;
  out[9] = a[9] * z;
  out[10] = a[10] * z;
  out[11] = a[11] * z;
  out[12] = a[12];
  out[13] = a[13];
  out[14] = a[14];
  out[15] = a[15];
  return out;
}

/**
 * Rotates a Mat4 by the given angle around the given axis
 *
 * @param {Mat4} out the receiving matrix
 * @param {ReadonlyMat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @param {ReadonlyVec3} axis the axis to rotate around
 * @returns {Mat4} out
 */
export function mat4Rotate(out: Mat4, a: ReadonlyMat4, rad: number, axis: ReadonlyVec3): Mat4 | null {
  let x = axis[0],
    y = axis[1],
    z = axis[2];
  let len = Math.sqrt(x * x + y * y + z * z);
  let s, c, t;
  let a00, a01, a02, a03;
  let a10, a11, a12, a13;
  let a20, a21, a22, a23;
  let b00, b01, b02;
  let b10, b11, b12;
  let b20, b21, b22;

  if (len < EPSILON) {
    return null;
  }

  len = 1 / len;
  x *= len;
  y *= len;
  z *= len;

  s = Math.sin(rad);
  c = Math.cos(rad);
  t = 1 - c;

  a00 = a[0];
  a01 = a[1];
  a02 = a[2];
  a03 = a[3];
  a10 = a[4];
  a11 = a[5];
  a12 = a[6];
  a13 = a[7];
  a20 = a[8];
  a21 = a[9];
  a22 = a[10];
  a23 = a[11];

  // Construct the elements of the rotation matrix
  b00 = x * x * t + c;
  b01 = y * x * t + z * s;
  b02 = z * x * t - y * s;
  b10 = x * y * t - z * s;
  b11 = y * y * t + c;
  b12 = z * y * t + x * s;
  b20 = x * z * t + y * s;
  b21 = y * z * t - x * s;
  b22 = z * z * t + c;

  // Perform rotation-specific matrix multiplication
  out[0] = a00 * b00 + a10 * b01 + a20 * b02;
  out[1] = a01 * b00 + a11 * b01 + a21 * b02;
  out[2] = a02 * b00 + a12 * b01 + a22 * b02;
  out[3] = a03 * b00 + a13 * b01 + a23 * b02;
  out[4] = a00 * b10 + a10 * b11 + a20 * b12;
  out[5] = a01 * b10 + a11 * b11 + a21 * b12;
  out[6] = a02 * b10 + a12 * b11 + a22 * b12;
  out[7] = a03 * b10 + a13 * b11 + a23 * b12;
  out[8] = a00 * b20 + a10 * b21 + a20 * b22;
  out[9] = a01 * b20 + a11 * b21 + a21 * b22;
  out[10] = a02 * b20 + a12 * b21 + a22 * b22;
  out[11] = a03 * b20 + a13 * b21 + a23 * b22;

  if (a !== out) {
    // If the source and destination differ, copy the unchanged last row
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
  }
  return out;
}

/**
 * Rotates a matrix by the given angle around the X axis
 *
 * @param {Mat4} out the receiving matrix
 * @param {ReadonlyMat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {Mat4} out
 */
export function mat4RotateX(out: Mat4, a: ReadonlyMat4, rad: number): Mat4 {
  let s = Math.sin(rad);
  let c = Math.cos(rad);
  let a10 = a[4];
  let a11 = a[5];
  let a12 = a[6];
  let a13 = a[7];
  let a20 = a[8];
  let a21 = a[9];
  let a22 = a[10];
  let a23 = a[11];

  if (a !== out) {
    // If the source and destination differ, copy the unchanged rows
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
  }

  // Perform axis-specific matrix multiplication
  out[4] = a10 * c + a20 * s;
  out[5] = a11 * c + a21 * s;
  out[6] = a12 * c + a22 * s;
  out[7] = a13 * c + a23 * s;
  out[8] = a20 * c - a10 * s;
  out[9] = a21 * c - a11 * s;
  out[10] = a22 * c - a12 * s;
  out[11] = a23 * c - a13 * s;
  return out;
}

/**
 * Rotates a matrix by the given angle around the Y axis
 *
 * @param {Mat4} out the receiving matrix
 * @param {ReadonlyMat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {Mat4} out
 */
export function mat4RotateY(out: Mat4, a: ReadonlyMat4, rad: number): Mat4 {
  let s = Math.sin(rad);
  let c = Math.cos(rad);
  let a00 = a[0];
  let a01 = a[1];
  let a02 = a[2];
  let a03 = a[3];
  let a20 = a[8];
  let a21 = a[9];
  let a22 = a[10];
  let a23 = a[11];

  if (a !== out) {
    // If the source and destination differ, copy the unchanged rows
    out[4] = a[4];
    out[5] = a[5];
    out[6] = a[6];
    out[7] = a[7];
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
  }

  // Perform axis-specific matrix multiplication
  out[0] = a00 * c - a20 * s;
  out[1] = a01 * c - a21 * s;
  out[2] = a02 * c - a22 * s;
  out[3] = a03 * c - a23 * s;
  out[8] = a00 * s + a20 * c;
  out[9] = a01 * s + a21 * c;
  out[10] = a02 * s + a22 * c;
  out[11] = a03 * s + a23 * c;
  return out;
}

/**
 * Rotates a matrix by the given angle around the Z axis
 *
 * @param {Mat4} out the receiving matrix
 * @param {ReadonlyMat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {Mat4} out
 */
export function mat4RotateZ(out: Mat4, a: ReadonlyMat4, rad: number): Mat4 {
  let s = Math.sin(rad);
  let c = Math.cos(rad);
  let a00 = a[0];
  let a01 = a[1];
  let a02 = a[2];
  let a03 = a[3];
  let a10 = a[4];
  let a11 = a[5];
  let a12 = a[6];
  let a13 = a[7];

  if (a !== out) {
    // If the source and destination differ, copy the unchanged last row
    out[8] = a[8];
    out[9] = a[9];
    out[10] = a[10];
    out[11] = a[11];
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
  }

  // Perform axis-specific matrix multiplication
  out[0] = a00 * c + a10 * s;
  out[1] = a01 * c + a11 * s;
  out[2] = a02 * c + a12 * s;
  out[3] = a03 * c + a13 * s;
  out[4] = a10 * c - a00 * s;
  out[5] = a11 * c - a01 * s;
  out[6] = a12 * c - a02 * s;
  out[7] = a13 * c - a03 * s;
  return out;
}

/**
 * Creates a matrix from a vector translation
 * This is equivalent to (but much faster than):
 *
 *     Mat4.identity(dest);
 *     Mat4.translate(dest, dest, vec);
 *
 * @param {Mat4} out Mat4 receiving operation result
 * @param {ReadonlyVec3} v Translation vector
 * @returns {Mat4} out
 */
export function mat4FromTranslation(out: Mat4, v: ReadonlyVec3): Mat4 {
  out[0] = 1;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 0;
  out[5] = 1;
  out[6] = 0;
  out[7] = 0;
  out[8] = 0;
  out[9] = 0;
  out[10] = 1;
  out[11] = 0;
  out[12] = v[0];
  out[13] = v[1];
  out[14] = v[2];
  out[15] = 1;
  return out;
}

/**
 * Creates a matrix from a vector scaling
 * This is equivalent to (but much faster than):
 *
 *     Mat4.identity(dest);
 *     Mat4.scale(dest, dest, vec);
 *
 * @param {Mat4} out Mat4 receiving operation result
 * @param {ReadonlyVec3} v Scaling vector
 * @returns {Mat4} out
 */
export function mat4FromScaling(out: Mat4, v: ReadonlyVec3): Mat4 {
  out[0] = v[0];
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 0;
  out[5] = v[1];
  out[6] = 0;
  out[7] = 0;
  out[8] = 0;
  out[9] = 0;
  out[10] = v[2];
  out[11] = 0;
  out[12] = 0;
  out[13] = 0;
  out[14] = 0;
  out[15] = 1;
  return out;
}

/**
 * Creates a matrix from a given angle around a given axis
 * This is equivalent to (but much faster than):
 *
 *     Mat4.identity(dest);
 *     Mat4.rotate(dest, dest, rad, axis);
 *
 * @param {Mat4} out Mat4 receiving operation result
 * @param {Number} rad the angle to rotate the matrix by
 * @param {ReadonlyVec3} axis the axis to rotate around
 * @returns {Mat4} out
 */
export function mat4FromRotation(out: Mat4, rad: number, axis: ReadonlyVec3): Mat4 | null {
  let x = axis[0],
    y = axis[1],
    z = axis[2];
  let len = Math.sqrt(x * x + y * y + z * z);
  let s, c, t;

  if (len < EPSILON) {
    return null;
  }

  len = 1 / len;
  x *= len;
  y *= len;
  z *= len;

  s = Math.sin(rad);
  c = Math.cos(rad);
  t = 1 - c;

  // Perform rotation-specific matrix multiplication
  out[0] = x * x * t + c;
  out[1] = y * x * t + z * s;
  out[2] = z * x * t - y * s;
  out[3] = 0;
  out[4] = x * y * t - z * s;
  out[5] = y * y * t + c;
  out[6] = z * y * t + x * s;
  out[7] = 0;
  out[8] = x * z * t + y * s;
  out[9] = y * z * t - x * s;
  out[10] = z * z * t + c;
  out[11] = 0;
  out[12] = 0;
  out[13] = 0;
  out[14] = 0;
  out[15] = 1;
  return out;
}

/**
 * Creates a matrix from the given angle around the X axis
 * This is equivalent to (but much faster than):
 *
 *     Mat4.identity(dest);
 *     Mat4.rotateX(dest, dest, rad);
 *
 * @param {Mat4} out Mat4 receiving operation result
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {Mat4} out
 */
export function mat4FromXRotation(out: Mat4, rad: number): Mat4 {
  let s = Math.sin(rad);
  let c = Math.cos(rad);

  // Perform axis-specific matrix multiplication
  out[0] = 1;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 0;
  out[5] = c;
  out[6] = s;
  out[7] = 0;
  out[8] = 0;
  out[9] = -s;
  out[10] = c;
  out[11] = 0;
  out[12] = 0;
  out[13] = 0;
  out[14] = 0;
  out[15] = 1;
  return out;
}

/**
 * Creates a matrix from the given angle around the Y axis
 * This is equivalent to (but much faster than):
 *
 *     Mat4.identity(dest);
 *     Mat4.rotateY(dest, dest, rad);
 *
 * @param {Mat4} out Mat4 receiving operation result
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {Mat4} out
 */
export function mat4FromYRotation(out: Mat4, rad: number): Mat4 {
  let s = Math.sin(rad);
  let c = Math.cos(rad);

  // Perform axis-specific matrix multiplication
  out[0] = c;
  out[1] = 0;
  out[2] = -s;
  out[3] = 0;
  out[4] = 0;
  out[5] = 1;
  out[6] = 0;
  out[7] = 0;
  out[8] = s;
  out[9] = 0;
  out[10] = c;
  out[11] = 0;
  out[12] = 0;
  out[13] = 0;
  out[14] = 0;
  out[15] = 1;
  return out;
}

/**
 * Creates a matrix from the given angle around the Z axis
 * This is equivalent to (but much faster than):
 *
 *     Mat4.identity(dest);
 *     Mat4.rotateZ(dest, dest, rad);
 *
 * @param {Mat4} out Mat4 receiving operation result
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {Mat4} out
 */
export function mat4FromZRotation(out: Mat4, rad: number): Mat4 {
  let s = Math.sin(rad);
  let c = Math.cos(rad);

  // Perform axis-specific matrix multiplication
  out[0] = c;
  out[1] = s;
  out[2] = 0;
  out[3] = 0;
  out[4] = -s;
  out[5] = c;
  out[6] = 0;
  out[7] = 0;
  out[8] = 0;
  out[9] = 0;
  out[10] = 1;
  out[11] = 0;
  out[12] = 0;
  out[13] = 0;
  out[14] = 0;
  out[15] = 1;
  return out;
}

/**
 * Creates a matrix from a quaternion rotation and vector translation
 * This is equivalent to (but much faster than):
 *
 *     Mat4.identity(dest);
 *     Mat4.translate(dest, vec);
 *     let quatMat = Mat4.create();
 *     ReadonlyQuat.toMat4(quat, quatMat);
 *     Mat4.multiply(dest, quatMat);
 *
 * @param {Mat4} out Mat4 receiving operation result
 * @param {ReadonlyQuat} q Rotation quaternion
 * @param {ReadonlyVec3} v Translation vector
 * @returns {Mat4} out
 */
export function mat4FromRotationTranslation(out: Mat4, q: ReadonlyQuat, v: ReadonlyVec3): Mat4 {
  // Quaternion math
  let x = q[0],
    y = q[1],
    z = q[2],
    w = q[3];
  let x2 = x + x;
  let y2 = y + y;
  let z2 = z + z;

  let xx = x * x2;
  let xy = x * y2;
  let xz = x * z2;
  let yy = y * y2;
  let yz = y * z2;
  let zz = z * z2;
  let wx = w * x2;
  let wy = w * y2;
  let wz = w * z2;

  out[0] = 1 - (yy + zz);
  out[1] = xy + wz;
  out[2] = xz - wy;
  out[3] = 0;
  out[4] = xy - wz;
  out[5] = 1 - (xx + zz);
  out[6] = yz + wx;
  out[7] = 0;
  out[8] = xz + wy;
  out[9] = yz - wx;
  out[10] = 1 - (xx + yy);
  out[11] = 0;
  out[12] = v[0];
  out[13] = v[1];
  out[14] = v[2];
  out[15] = 1;

  return out;
}

/**
 * Creates a new Mat4 from a dual quat.
 *
 * @param {Mat4} out Matrix
 * @param {ReadonlyQuat2} a Dual Quaternion
 * @returns {Mat4} Mat4 receiving operation result
 */
export function mat4FromQuat2(out: Mat4, a: ReadonlyQuat2): Mat4 {
  let translation = new ARRAY_TYPE(3);
  let bx = -a[0],
    by = -a[1],
    bz = -a[2],
    bw = a[3],
    ax = a[4],
    ay = a[5],
    az = a[6],
    aw = a[7];

  let magnitude = bx * bx + by * by + bz * bz + bw * bw;
  //Only scale if it makes sense
  if (magnitude > 0) {
    translation[0] = ((ax * bw + aw * bx + ay * bz - az * by) * 2) / magnitude;
    translation[1] = ((ay * bw + aw * by + az * bx - ax * bz) * 2) / magnitude;
    translation[2] = ((az * bw + aw * bz + ax * by - ay * bx) * 2) / magnitude;
  } else {
    translation[0] = (ax * bw + aw * bx + ay * bz - az * by) * 2;
    translation[1] = (ay * bw + aw * by + az * bx - ax * bz) * 2;
    translation[2] = (az * bw + aw * bz + ax * by - ay * bx) * 2;
  }
  mat4FromRotationTranslation(out, a, translation);
  return out;
}

/**
 * Returns the translation vector component of a transformation
 *  matrix. If a matrix is built with fromRotationTranslation,
 *  the returned vector will be the same as the translation vector
 *  originally supplied.
 * @param  {vec3} out Vector to receive translation component
 * @param  {ReadonlyMat4} mat Matrix to be decomposed (input)
 * @return {vec3} out
 */
export function mat4GetTranslation(out: Vec3, mat: ReadonlyMat4): Vec3 {
  out[0] = mat[12];
  out[1] = mat[13];
  out[2] = mat[14];

  return out;
}

/**
 * Returns the scaling factor component of a transformation
 *  matrix. If a matrix is built with fromRotationTranslationScale
 *  with a normalized Quaternion paramter, the returned vector will be
 *  the same as the scaling vector
 *  originally supplied.
 * @param  {vec3} out Vector to receive scaling factor component
 * @param  {ReadonlyMat4} mat Matrix to be decomposed (input)
 * @return {vec3} out
 */
export function mat4GetScaling(out: Vec3, mat: ReadonlyMat4): Vec3 {
  let m11 = mat[0];
  let m12 = mat[1];
  let m13 = mat[2];
  let m21 = mat[4];
  let m22 = mat[5];
  let m23 = mat[6];
  let m31 = mat[8];
  let m32 = mat[9];
  let m33 = mat[10];

  out[0] = Math.sqrt(m11 * m11 + m12 * m12 + m13 * m13);
  out[1] = Math.sqrt(m21 * m21 + m22 * m22 + m23 * m23);
  out[2] = Math.sqrt(m31 * m31 + m32 * m32 + m33 * m33);

  return out;
}

/**
 * Returns a quaternion representing the rotational component
 *  of a transformation matrix. If a matrix is built with
 *  fromRotationTranslation, the returned quaternion will be the
 *  same as the quaternion originally supplied.
 * @param {quat} out Quaternion to receive the rotation component
 * @param {ReadonlyMat4} mat Matrix to be decomposed (input)
 * @return {quat} out
 */
export function mat4GetRotation(out: Quat, mat: ReadonlyMat4): Quat {
  let scaling = new ARRAY_TYPE(3);
  mat4GetScaling(scaling, mat);

  let is1 = 1 / scaling[0];
  let is2 = 1 / scaling[1];
  let is3 = 1 / scaling[2];

  let sm11 = mat[0] * is1;
  let sm12 = mat[1] * is2;
  let sm13 = mat[2] * is3;
  let sm21 = mat[4] * is1;
  let sm22 = mat[5] * is2;
  let sm23 = mat[6] * is3;
  let sm31 = mat[8] * is1;
  let sm32 = mat[9] * is2;
  let sm33 = mat[10] * is3;

  let trace = sm11 + sm22 + sm33;
  let S = 0;

  if (trace > 0) {
    S = Math.sqrt(trace + 1.0) * 2;
    out[3] = 0.25 * S;
    out[0] = (sm23 - sm32) / S;
    out[1] = (sm31 - sm13) / S;
    out[2] = (sm12 - sm21) / S;
  } else if (sm11 > sm22 && sm11 > sm33) {
    S = Math.sqrt(1.0 + sm11 - sm22 - sm33) * 2;
    out[3] = (sm23 - sm32) / S;
    out[0] = 0.25 * S;
    out[1] = (sm12 + sm21) / S;
    out[2] = (sm31 + sm13) / S;
  } else if (sm22 > sm33) {
    S = Math.sqrt(1.0 + sm22 - sm11 - sm33) * 2;
    out[3] = (sm31 - sm13) / S;
    out[0] = (sm12 + sm21) / S;
    out[1] = 0.25 * S;
    out[2] = (sm23 + sm32) / S;
  } else {
    S = Math.sqrt(1.0 + sm33 - sm11 - sm22) * 2;
    out[3] = (sm12 - sm21) / S;
    out[0] = (sm31 + sm13) / S;
    out[1] = (sm23 + sm32) / S;
    out[2] = 0.25 * S;
  }

  return out;
}

/**
 * Decomposes a transformation matrix into its rotation, translation
 * and scale components. Returns only the rotation component
 * @param  {quat} out_r Quaternion to receive the rotation component
 * @param  {vec3} out_t Vector to receive the translation vector
 * @param  {vec3} out_s Vector to receive the scaling factor
 * @param  {ReadonlyMat4} mat Matrix to be decomposed (input)
 * @returns {quat} out_r
 */
export function mat4Decompose(out_r: Quat, out_t: Vec3, out_s: Vec3, mat: ReadonlyMat4): Quat {
  out_t[0] = mat[12];
  out_t[1] = mat[13];
  out_t[2] = mat[14];

  let m11 = mat[0];
  let m12 = mat[1];
  let m13 = mat[2];
  let m21 = mat[4];
  let m22 = mat[5];
  let m23 = mat[6];
  let m31 = mat[8];
  let m32 = mat[9];
  let m33 = mat[10];

  out_s[0] = Math.sqrt(m11 * m11 + m12 * m12 + m13 * m13);
  out_s[1] = Math.sqrt(m21 * m21 + m22 * m22 + m23 * m23);
  out_s[2] = Math.sqrt(m31 * m31 + m32 * m32 + m33 * m33);

  let is1 = 1 / out_s[0];
  let is2 = 1 / out_s[1];
  let is3 = 1 / out_s[2];

  let sm11 = m11 * is1;
  let sm12 = m12 * is2;
  let sm13 = m13 * is3;
  let sm21 = m21 * is1;
  let sm22 = m22 * is2;
  let sm23 = m23 * is3;
  let sm31 = m31 * is1;
  let sm32 = m32 * is2;
  let sm33 = m33 * is3;

  let trace = sm11 + sm22 + sm33;
  let S = 0;

  if (trace > 0) {
    S = Math.sqrt(trace + 1.0) * 2;
    out_r[3] = 0.25 * S;
    out_r[0] = (sm23 - sm32) / S;
    out_r[1] = (sm31 - sm13) / S;
    out_r[2] = (sm12 - sm21) / S;
  } else if (sm11 > sm22 && sm11 > sm33) {
    S = Math.sqrt(1.0 + sm11 - sm22 - sm33) * 2;
    out_r[3] = (sm23 - sm32) / S;
    out_r[0] = 0.25 * S;
    out_r[1] = (sm12 + sm21) / S;
    out_r[2] = (sm31 + sm13) / S;
  } else if (sm22 > sm33) {
    S = Math.sqrt(1.0 + sm22 - sm11 - sm33) * 2;
    out_r[3] = (sm31 - sm13) / S;
    out_r[0] = (sm12 + sm21) / S;
    out_r[1] = 0.25 * S;
    out_r[2] = (sm23 + sm32) / S;
  } else {
    S = Math.sqrt(1.0 + sm33 - sm11 - sm22) * 2;
    out_r[3] = (sm12 - sm21) / S;
    out_r[0] = (sm31 + sm13) / S;
    out_r[1] = (sm23 + sm32) / S;
    out_r[2] = 0.25 * S;
  }

  return out_r;
}

/**
 * Creates a matrix from a quaternion rotation, vector translation and vector scale
 * This is equivalent to (but much faster than):
 *
 *     Mat4.identity(dest);
 *     Mat4.translate(dest, vec);
 *     let quatMat = Mat4.create();
 *     ReadonlyQuat.toMat4(quat, quatMat);
 *     Mat4.multiply(dest, quatMat);
 *     Mat4.scale(dest, scale)
 *
 * @param {Mat4} out Mat4 receiving operation result
 * @param {ReadonlyQuat} q Rotation quaternion
 * @param {ReadonlyVec3} v Translation vector
 * @param {ReadonlyVec3} s Scaling vector
 * @returns {Mat4} out
 */
export function mat4FromRotationTranslationScale(out: Mat4, q: ReadonlyQuat, v: ReadonlyVec3, s: ReadonlyVec3): Mat4 {
  // Quaternion math
  let x = q[0],
    y = q[1],
    z = q[2],
    w = q[3];
  let x2 = x + x;
  let y2 = y + y;
  let z2 = z + z;

  let xx = x * x2;
  let xy = x * y2;
  let xz = x * z2;
  let yy = y * y2;
  let yz = y * z2;
  let zz = z * z2;
  let wx = w * x2;
  let wy = w * y2;
  let wz = w * z2;
  let sx = s[0];
  let sy = s[1];
  let sz = s[2];

  out[0] = (1 - (yy + zz)) * sx;
  out[1] = (xy + wz) * sx;
  out[2] = (xz - wy) * sx;
  out[3] = 0;
  out[4] = (xy - wz) * sy;
  out[5] = (1 - (xx + zz)) * sy;
  out[6] = (yz + wx) * sy;
  out[7] = 0;
  out[8] = (xz + wy) * sz;
  out[9] = (yz - wx) * sz;
  out[10] = (1 - (xx + yy)) * sz;
  out[11] = 0;
  out[12] = v[0];
  out[13] = v[1];
  out[14] = v[2];
  out[15] = 1;

  return out;
}

/**
 * Creates a matrix from a quaternion rotation, vector translation and vector scale, rotating and scaling around the given origin
 * This is equivalent to (but much faster than):
 *
 *     Mat4.identity(dest);
 *     Mat4.translate(dest, vec);
 *     Mat4.translate(dest, origin);
 *     let quatMat = Mat4.create();
 *     ReadonlyQuat.toMat4(quat, quatMat);
 *     Mat4.multiply(dest, quatMat);
 *     Mat4.scale(dest, scale)
 *     Mat4.translate(dest, negativeOrigin);
 *
 * @param {Mat4} out Mat4 receiving operation result
 * @param {ReadonlyQuat} q Rotation quaternion
 * @param {ReadonlyVec3} v Translation vector
 * @param {ReadonlyVec3} s Scaling vector
 * @param {ReadonlyVec3} o The origin vector around which to scale and rotate
 * @returns {Mat4} out
 */
export function mat4FromRotationTranslationScaleOrigin(out: Mat4, q: ReadonlyQuat, v: ReadonlyVec3, s: ReadonlyVec3, o: ReadonlyVec3): Mat4 {
  // Quaternion math
  let x = q[0],
    y = q[1],
    z = q[2],
    w = q[3];
  let x2 = x + x;
  let y2 = y + y;
  let z2 = z + z;

  let xx = x * x2;
  let xy = x * y2;
  let xz = x * z2;
  let yy = y * y2;
  let yz = y * z2;
  let zz = z * z2;
  let wx = w * x2;
  let wy = w * y2;
  let wz = w * z2;

  let sx = s[0];
  let sy = s[1];
  let sz = s[2];

  let ox = o[0];
  let oy = o[1];
  let oz = o[2];

  let out0 = (1 - (yy + zz)) * sx;
  let out1 = (xy + wz) * sx;
  let out2 = (xz - wy) * sx;
  let out4 = (xy - wz) * sy;
  let out5 = (1 - (xx + zz)) * sy;
  let out6 = (yz + wx) * sy;
  let out8 = (xz + wy) * sz;
  let out9 = (yz - wx) * sz;
  let out10 = (1 - (xx + yy)) * sz;

  out[0] = out0;
  out[1] = out1;
  out[2] = out2;
  out[3] = 0;
  out[4] = out4;
  out[5] = out5;
  out[6] = out6;
  out[7] = 0;
  out[8] = out8;
  out[9] = out9;
  out[10] = out10;
  out[11] = 0;
  out[12] = v[0] + ox - (out0 * ox + out4 * oy + out8 * oz);
  out[13] = v[1] + oy - (out1 * ox + out5 * oy + out9 * oz);
  out[14] = v[2] + oz - (out2 * ox + out6 * oy + out10 * oz);
  out[15] = 1;

  return out;
}

/**
 * Calculates a 4x4 matrix from the given quaternion
 *
 * @param {Mat4} out Mat4 receiving operation result
 * @param {ReadonlyQuat} q Quaternion to create matrix from
 *
 * @returns {Mat4} out
 */
export function mat4FromQuat(out: Mat4, q: ReadonlyQuat): Mat4 {
  let x = q[0],
    y = q[1],
    z = q[2],
    w = q[3];
  let x2 = x + x;
  let y2 = y + y;
  let z2 = z + z;

  let xx = x * x2;
  let yx = y * x2;
  let yy = y * y2;
  let zx = z * x2;
  let zy = z * y2;
  let zz = z * z2;
  let wx = w * x2;
  let wy = w * y2;
  let wz = w * z2;

  out[0] = 1 - yy - zz;
  out[1] = yx + wz;
  out[2] = zx - wy;
  out[3] = 0;

  out[4] = yx - wz;
  out[5] = 1 - xx - zz;
  out[6] = zy + wx;
  out[7] = 0;

  out[8] = zx + wy;
  out[9] = zy - wx;
  out[10] = 1 - xx - yy;
  out[11] = 0;

  out[12] = 0;
  out[13] = 0;
  out[14] = 0;
  out[15] = 1;

  return out;
}

/**
 * Generates a frustum matrix with the given bounds
 *
 * @param {Mat4} out Mat4 frustum matrix will be written into
 * @param {Number} left Left bound of the frustum
 * @param {Number} right Right bound of the frustum
 * @param {Number} bottom Bottom bound of the frustum
 * @param {Number} top Top bound of the frustum
 * @param {Number} near Near bound of the frustum
 * @param {Number} far Far bound of the frustum
 * @returns {Mat4} out
 */
export function mat4Frustum(out: Mat4, left: number, right: number, bottom: number, top: number, near: number, far: number): Mat4 {
  let rl = 1 / (right - left);
  let tb = 1 / (top - bottom);
  let nf = 1 / (near - far);
  out[0] = near * 2 * rl;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 0;
  out[5] = near * 2 * tb;
  out[6] = 0;
  out[7] = 0;
  out[8] = (right + left) * rl;
  out[9] = (top + bottom) * tb;
  out[10] = (far + near) * nf;
  out[11] = -1;
  out[12] = 0;
  out[13] = 0;
  out[14] = far * near * 2 * nf;
  out[15] = 0;
  return out;
}

/**
 * Generates a perspective projection matrix with the given bounds.
 * The near/far clip planes correspond to a normalized device coordinate Z range of [-1, 1],
 * which matches WebGL/OpenGL's clip volume.
 * Passing null/undefined/no value for far will generate infinite projection matrix.
 *
 * @param {Mat4} out Mat4 frustum matrix will be written into
 * @param {number} fovy Vertical field of view in radians
 * @param {number} aspect Aspect ratio. typically viewport width/height
 * @param {number} near Near bound of the frustum
 * @param {number} far Far bound of the frustum, can be null or Infinity
 * @returns {Mat4} out
 */
export function mat4PerspectiveNO(out: Mat4, fovy: number, aspect: number, near: number, far: number): Mat4 {
  const f = 1.0 / Math.tan(fovy / 2);
  out[0] = f / aspect;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 0;
  out[5] = f;
  out[6] = 0;
  out[7] = 0;
  out[8] = 0;
  out[9] = 0;
  out[11] = -1;
  out[12] = 0;
  out[13] = 0;
  out[15] = 0;
  if (far != null && far !== Infinity) {
    const nf = 1 / (near - far);
    out[10] = (far + near) * nf;
    out[14] = 2 * far * near * nf;
  } else {
    out[10] = -1;
    out[14] = -2 * near;
  }
  return out;
}

/**
 * Alias for {@link mat4PerspectiveNO}
 * @function
 */
export const mat4Perspective = mat4PerspectiveNO;

/**
 * Generates a perspective projection matrix suitable for WebGPU with the given bounds.
 * The near/far clip planes correspond to a normalized device coordinate Z range of [0, 1],
 * which matches WebGPU/Vulkan/DirectX/Metal's clip volume.
 * Passing null/undefined/no value for far will generate infinite projection matrix.
 *
 * @param {Mat4} out Mat4 frustum matrix will be written into
 * @param {number} fovy Vertical field of view in radians
 * @param {number} aspect Aspect ratio. typically viewport width/height
 * @param {number} near Near bound of the frustum
 * @param {number} far Far bound of the frustum, can be null or Infinity
 * @returns {Mat4} out
 */
export function mat4PerspectiveZO(out: Mat4, fovy: number, aspect: number, near: number, far: number): Mat4 {
  const f = 1.0 / Math.tan(fovy / 2);
  out[0] = f / aspect;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 0;
  out[5] = f;
  out[6] = 0;
  out[7] = 0;
  out[8] = 0;
  out[9] = 0;
  out[11] = -1;
  out[12] = 0;
  out[13] = 0;
  out[15] = 0;
  if (far != null && far !== Infinity) {
    const nf = 1 / (near - far);
    out[10] = far * nf;
    out[14] = far * near * nf;
  } else {
    out[10] = -1;
    out[14] = -near;
  }
  return out;
}

/**
 * Generates a perspective projection matrix with the given field of view.
 * This is primarily useful for generating projection matrices to be used
 * with the still experiemental WebVR API.
 *
 * @param {Mat4} out Mat4 frustum matrix will be written into
 * @param {Object} fov Object containing the following values: upDegrees, downDegrees, leftDegrees, rightDegrees
 * @param {number} near Near bound of the frustum
 * @param {number} far Far bound of the frustum
 * @returns {Mat4} out
 */
export function mat4PerspectiveFromFieldOfView(out: Mat4, fov: {upDegrees:number, downDegrees:number, leftDegrees: number, rightDegrees: number}, near: number, far: number): Mat4 {
  let upTan = Math.tan((fov.upDegrees * Math.PI) / 180.0);
  let downTan = Math.tan((fov.downDegrees * Math.PI) / 180.0);
  let leftTan = Math.tan((fov.leftDegrees * Math.PI) / 180.0);
  let rightTan = Math.tan((fov.rightDegrees * Math.PI) / 180.0);
  let xScale = 2.0 / (leftTan + rightTan);
  let yScale = 2.0 / (upTan + downTan);

  out[0] = xScale;
  out[1] = 0.0;
  out[2] = 0.0;
  out[3] = 0.0;
  out[4] = 0.0;
  out[5] = yScale;
  out[6] = 0.0;
  out[7] = 0.0;
  out[8] = -((leftTan - rightTan) * xScale * 0.5);
  out[9] = (upTan - downTan) * yScale * 0.5;
  out[10] = far / (near - far);
  out[11] = -1.0;
  out[12] = 0.0;
  out[13] = 0.0;
  out[14] = (far * near) / (near - far);
  out[15] = 0.0;
  return out;
}

/**
 * Generates a orthogonal projection matrix with the given bounds.
 * The near/far clip planes correspond to a normalized device coordinate Z range of [-1, 1],
 * which matches WebGL/OpenGL's clip volume.
 *
 * @param {Mat4} out Mat4 frustum matrix will be written into
 * @param {number} left Left bound of the frustum
 * @param {number} right Right bound of the frustum
 * @param {number} bottom Bottom bound of the frustum
 * @param {number} top Top bound of the frustum
 * @param {number} near Near bound of the frustum
 * @param {number} far Far bound of the frustum
 * @returns {Mat4} out
 */
export function mat4OrthoNO(out: Mat4, left: number, right: number, bottom: number, top: number, near: number, far: number): Mat4 {
  const lr = 1 / (left - right);
  const bt = 1 / (bottom - top);
  const nf = 1 / (near - far);
  out[0] = -2 * lr;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 0;
  out[5] = -2 * bt;
  out[6] = 0;
  out[7] = 0;
  out[8] = 0;
  out[9] = 0;
  out[10] = 2 * nf;
  out[11] = 0;
  out[12] = (left + right) * lr;
  out[13] = (top + bottom) * bt;
  out[14] = (far + near) * nf;
  out[15] = 1;
  return out;
}

/**
 * Alias for {@link mat4OrthoNO}
 * @function
 */
export const mat4Ortho = mat4OrthoNO;

/**
 * Generates a orthogonal projection matrix with the given bounds.
 * The near/far clip planes correspond to a normalized device coordinate Z range of [0, 1],
 * which matches WebGPU/Vulkan/DirectX/Metal's clip volume.
 *
 * @param {Mat4} out Mat4 frustum matrix will be written into
 * @param {number} left Left bound of the frustum
 * @param {number} right Right bound of the frustum
 * @param {number} bottom Bottom bound of the frustum
 * @param {number} top Top bound of the frustum
 * @param {number} near Near bound of the frustum
 * @param {number} far Far bound of the frustum
 * @returns {Mat4} out
 */
export function mat4OrthoZO(out: Mat4, left: number, right: number, bottom: number, top: number, near: number, far: number): Mat4 {
  const lr = 1 / (left - right);
  const bt = 1 / (bottom - top);
  const nf = 1 / (near - far);
  out[0] = -2 * lr;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 0;
  out[5] = -2 * bt;
  out[6] = 0;
  out[7] = 0;
  out[8] = 0;
  out[9] = 0;
  out[10] = nf;
  out[11] = 0;
  out[12] = (left + right) * lr;
  out[13] = (top + bottom) * bt;
  out[14] = near * nf;
  out[15] = 1;
  return out;
}

/**
 * Generates a look-at matrix with the given eye position, focal point, and up axis.
 * If you want a matrix that actually makes an object look at another object, you should use targetTo instead.
 *
 * @param {Mat4} out Mat4 frustum matrix will be written into
 * @param {ReadonlyVec3} eye Position of the viewer
 * @param {ReadonlyVec3} center Point the viewer is looking at
 * @param {ReadonlyVec3} up vec3 pointing up
 * @returns {Mat4} out
 */
export function mat4LookAt(out: Mat4, eye: ReadonlyVec3, center: ReadonlyVec3, up: ReadonlyVec3): Mat4 {
  let x0, x1, x2, y0, y1, y2, z0, z1, z2, len;
  let eyex = eye[0];
  let eyey = eye[1];
  let eyez = eye[2];
  let upx = up[0];
  let upy = up[1];
  let upz = up[2];
  let centerx = center[0];
  let centery = center[1];
  let centerz = center[2];

  if (
    Math.abs(eyex - centerx) < EPSILON &&
    Math.abs(eyey - centery) < EPSILON &&
    Math.abs(eyez - centerz) < EPSILON
  ) {
    return mat4Identity(out);
  }

  z0 = eyex - centerx;
  z1 = eyey - centery;
  z2 = eyez - centerz;

  len = 1 / Math.sqrt(z0 * z0 + z1 * z1 + z2 * z2);
  z0 *= len;
  z1 *= len;
  z2 *= len;

  x0 = upy * z2 - upz * z1;
  x1 = upz * z0 - upx * z2;
  x2 = upx * z1 - upy * z0;
  len = Math.sqrt(x0 * x0 + x1 * x1 + x2 * x2);
  if (!len) {
    x0 = 0;
    x1 = 0;
    x2 = 0;
  } else {
    len = 1 / len;
    x0 *= len;
    x1 *= len;
    x2 *= len;
  }

  y0 = z1 * x2 - z2 * x1;
  y1 = z2 * x0 - z0 * x2;
  y2 = z0 * x1 - z1 * x0;

  len = Math.sqrt(y0 * y0 + y1 * y1 + y2 * y2);
  if (!len) {
    y0 = 0;
    y1 = 0;
    y2 = 0;
  } else {
    len = 1 / len;
    y0 *= len;
    y1 *= len;
    y2 *= len;
  }

  out[0] = x0;
  out[1] = y0;
  out[2] = z0;
  out[3] = 0;
  out[4] = x1;
  out[5] = y1;
  out[6] = z1;
  out[7] = 0;
  out[8] = x2;
  out[9] = y2;
  out[10] = z2;
  out[11] = 0;
  out[12] = -(x0 * eyex + x1 * eyey + x2 * eyez);
  out[13] = -(y0 * eyex + y1 * eyey + y2 * eyez);
  out[14] = -(z0 * eyex + z1 * eyey + z2 * eyez);
  out[15] = 1;

  return out;
}

/**
 * Generates a matrix that makes something look at something else.
 *
 * @param {Mat4} out Mat4 frustum matrix will be written into
 * @param {ReadonlyVec3} eye Position of the viewer
 * @param {ReadonlyVec3} target Point the viewer is looking at
 * @param {ReadonlyVec3} up vec3 pointing up
 * @returns {Mat4} out
 */
export function mat4TargetTo(out: Mat4, eye: ReadonlyVec3, target: ReadonlyVec3, up: ReadonlyVec3): Mat4 {
  let eyex = eye[0],
    eyey = eye[1],
    eyez = eye[2],
    upx = up[0],
    upy = up[1],
    upz = up[2];

  let z0 = eyex - target[0],
    z1 = eyey - target[1],
    z2 = eyez - target[2];

  let len = z0 * z0 + z1 * z1 + z2 * z2;
  if (len > 0) {
    len = 1 / Math.sqrt(len);
    z0 *= len;
    z1 *= len;
    z2 *= len;
  }

  let x0 = upy * z2 - upz * z1,
    x1 = upz * z0 - upx * z2,
    x2 = upx * z1 - upy * z0;

  len = x0 * x0 + x1 * x1 + x2 * x2;
  if (len > 0) {
    len = 1 / Math.sqrt(len);
    x0 *= len;
    x1 *= len;
    x2 *= len;
  }

  out[0] = x0;
  out[1] = x1;
  out[2] = x2;
  out[3] = 0;
  out[4] = z1 * x2 - z2 * x1;
  out[5] = z2 * x0 - z0 * x2;
  out[6] = z0 * x1 - z1 * x0;
  out[7] = 0;
  out[8] = z0;
  out[9] = z1;
  out[10] = z2;
  out[11] = 0;
  out[12] = eyex;
  out[13] = eyey;
  out[14] = eyez;
  out[15] = 1;
  return out;
}

/**
 * Returns a string representation of a Mat4
 *
 * @param {ReadonlyMat4} a matrix to represent as a string
 * @returns {String} string representation of the matrix
 */
export function mat4Str(a: ReadonlyMat4): string {
  return (
    "Mat4(" +
    a[0] +
    ", " +
    a[1] +
    ", " +
    a[2] +
    ", " +
    a[3] +
    ", " +
    a[4] +
    ", " +
    a[5] +
    ", " +
    a[6] +
    ", " +
    a[7] +
    ", " +
    a[8] +
    ", " +
    a[9] +
    ", " +
    a[10] +
    ", " +
    a[11] +
    ", " +
    a[12] +
    ", " +
    a[13] +
    ", " +
    a[14] +
    ", " +
    a[15] +
    ")"
  );
}

/**
 * Returns Frobenius norm of a Mat4
 *
 * @param {ReadonlyMat4} a the matrix to calculate Frobenius norm of
 * @returns {Number} Frobenius norm
 */
export function mat4Frob(a: ReadonlyMat4): number {
  return Math.sqrt(
    a[0] * a[0] +
    a[1] * a[1] +
    a[2] * a[2] +
    a[3] * a[3] +
    a[4] * a[4] +
    a[5] * a[5] +
    a[6] * a[6] +
    a[7] * a[7] +
    a[8] * a[8] +
    a[9] * a[9] +
    a[10] * a[10] +
    a[11] * a[11] +
    a[12] * a[12] +
    a[13] * a[13] +
    a[14] * a[14] +
    a[15] * a[15]
  );
}

/**
 * Adds two Mat4's
 *
 * @param {Mat4} out the receiving matrix
 * @param {ReadonlyMat4} a the first operand
 * @param {ReadonlyMat4} b the second operand
 * @returns {Mat4} out
 */
export function mat4Add(out: Mat4, a: ReadonlyMat4, b: ReadonlyMat4): Mat4 {
  out[0] = a[0] + b[0];
  out[1] = a[1] + b[1];
  out[2] = a[2] + b[2];
  out[3] = a[3] + b[3];
  out[4] = a[4] + b[4];
  out[5] = a[5] + b[5];
  out[6] = a[6] + b[6];
  out[7] = a[7] + b[7];
  out[8] = a[8] + b[8];
  out[9] = a[9] + b[9];
  out[10] = a[10] + b[10];
  out[11] = a[11] + b[11];
  out[12] = a[12] + b[12];
  out[13] = a[13] + b[13];
  out[14] = a[14] + b[14];
  out[15] = a[15] + b[15];
  return out;
}

/**
 * Subtracts matrix b from matrix a
 *
 * @param {Mat4} out the receiving matrix
 * @param {ReadonlyMat4} a the first operand
 * @param {ReadonlyMat4} b the second operand
 * @returns {Mat4} out
 */
export function mat4Subtract(out: Mat4, a: ReadonlyMat4, b: ReadonlyMat4): Mat4 {
  out[0] = a[0] - b[0];
  out[1] = a[1] - b[1];
  out[2] = a[2] - b[2];
  out[3] = a[3] - b[3];
  out[4] = a[4] - b[4];
  out[5] = a[5] - b[5];
  out[6] = a[6] - b[6];
  out[7] = a[7] - b[7];
  out[8] = a[8] - b[8];
  out[9] = a[9] - b[9];
  out[10] = a[10] - b[10];
  out[11] = a[11] - b[11];
  out[12] = a[12] - b[12];
  out[13] = a[13] - b[13];
  out[14] = a[14] - b[14];
  out[15] = a[15] - b[15];
  return out;
}

/**
 * Multiply each element of the matrix by a scalar.
 *
 * @param {Mat4} out the receiving matrix
 * @param {ReadonlyMat4} a the matrix to scale
 * @param {Number} b amount to scale the matrix's elements by
 * @returns {Mat4} out
 */
export function mat4MultiplyScalar(out: Mat4, a: ReadonlyMat4, b: number): Mat4 {
  out[0] = a[0] * b;
  out[1] = a[1] * b;
  out[2] = a[2] * b;
  out[3] = a[3] * b;
  out[4] = a[4] * b;
  out[5] = a[5] * b;
  out[6] = a[6] * b;
  out[7] = a[7] * b;
  out[8] = a[8] * b;
  out[9] = a[9] * b;
  out[10] = a[10] * b;
  out[11] = a[11] * b;
  out[12] = a[12] * b;
  out[13] = a[13] * b;
  out[14] = a[14] * b;
  out[15] = a[15] * b;
  return out;
}

/**
 * Adds two Mat4's after multiplying each element of the second operand by a scalar value.
 *
 * @param {Mat4} out the receiving vector
 * @param {ReadonlyMat4} a the first operand
 * @param {ReadonlyMat4} b the second operand
 * @param {Number} scale the amount to scale b's elements by before adding
 * @returns {Mat4} out
 */
export function mat4MultiplyScalarAndAdd(out: Mat4, a: ReadonlyMat4, b: ReadonlyMat4, scale: number): Mat4 {
  out[0] = a[0] + b[0] * scale;
  out[1] = a[1] + b[1] * scale;
  out[2] = a[2] + b[2] * scale;
  out[3] = a[3] + b[3] * scale;
  out[4] = a[4] + b[4] * scale;
  out[5] = a[5] + b[5] * scale;
  out[6] = a[6] + b[6] * scale;
  out[7] = a[7] + b[7] * scale;
  out[8] = a[8] + b[8] * scale;
  out[9] = a[9] + b[9] * scale;
  out[10] = a[10] + b[10] * scale;
  out[11] = a[11] + b[11] * scale;
  out[12] = a[12] + b[12] * scale;
  out[13] = a[13] + b[13] * scale;
  out[14] = a[14] + b[14] * scale;
  out[15] = a[15] + b[15] * scale;
  return out;
}

/**
 * Returns whether or not the matrices have exactly the same elements in the same position (when compared with ===)
 *
 * @param {ReadonlyMat4} a The first matrix.
 * @param {ReadonlyMat4} b The second matrix.
 * @returns {Boolean} True if the matrices are equal, false otherwise.
 */
export function mat4ExactEquals(a: ReadonlyMat4, b: ReadonlyMat4): boolean {
  return (
    a[0] === b[0] &&
    a[1] === b[1] &&
    a[2] === b[2] &&
    a[3] === b[3] &&
    a[4] === b[4] &&
    a[5] === b[5] &&
    a[6] === b[6] &&
    a[7] === b[7] &&
    a[8] === b[8] &&
    a[9] === b[9] &&
    a[10] === b[10] &&
    a[11] === b[11] &&
    a[12] === b[12] &&
    a[13] === b[13] &&
    a[14] === b[14] &&
    a[15] === b[15]
  );
}

/**
 * Returns whether or not the matrices have approximately the same elements in the same position.
 *
 * @param {ReadonlyMat4} a The first matrix.
 * @param {ReadonlyMat4} b The second matrix.
 * @returns {Boolean} True if the matrices are equal, false otherwise.
 */
export function mat4Equals(a: ReadonlyMat4, b: ReadonlyMat4): boolean {
  let a0 = a[0],
    a1 = a[1],
    a2 = a[2],
    a3 = a[3];
  let a4 = a[4],
    a5 = a[5],
    a6 = a[6],
    a7 = a[7];
  let a8 = a[8],
    a9 = a[9],
    a10 = a[10],
    a11 = a[11];
  let a12 = a[12],
    a13 = a[13],
    a14 = a[14],
    a15 = a[15];

  let b0 = b[0],
    b1 = b[1],
    b2 = b[2],
    b3 = b[3];
  let b4 = b[4],
    b5 = b[5],
    b6 = b[6],
    b7 = b[7];
  let b8 = b[8],
    b9 = b[9],
    b10 = b[10],
    b11 = b[11];
  let b12 = b[12],
    b13 = b[13],
    b14 = b[14],
    b15 = b[15];

  return (
    Math.abs(a0 - b0) <=
      EPSILON * Math.max(1.0, Math.abs(a0), Math.abs(b0)) &&
    Math.abs(a1 - b1) <=
      EPSILON * Math.max(1.0, Math.abs(a1), Math.abs(b1)) &&
    Math.abs(a2 - b2) <=
      EPSILON * Math.max(1.0, Math.abs(a2), Math.abs(b2)) &&
    Math.abs(a3 - b3) <=
      EPSILON * Math.max(1.0, Math.abs(a3), Math.abs(b3)) &&
    Math.abs(a4 - b4) <=
      EPSILON * Math.max(1.0, Math.abs(a4), Math.abs(b4)) &&
    Math.abs(a5 - b5) <=
      EPSILON * Math.max(1.0, Math.abs(a5), Math.abs(b5)) &&
    Math.abs(a6 - b6) <=
      EPSILON * Math.max(1.0, Math.abs(a6), Math.abs(b6)) &&
    Math.abs(a7 - b7) <=
      EPSILON * Math.max(1.0, Math.abs(a7), Math.abs(b7)) &&
    Math.abs(a8 - b8) <=
      EPSILON * Math.max(1.0, Math.abs(a8), Math.abs(b8)) &&
    Math.abs(a9 - b9) <=
      EPSILON * Math.max(1.0, Math.abs(a9), Math.abs(b9)) &&
    Math.abs(a10 - b10) <=
      EPSILON * Math.max(1.0, Math.abs(a10), Math.abs(b10)) &&
    Math.abs(a11 - b11) <=
      EPSILON * Math.max(1.0, Math.abs(a11), Math.abs(b11)) &&
    Math.abs(a12 - b12) <=
      EPSILON * Math.max(1.0, Math.abs(a12), Math.abs(b12)) &&
    Math.abs(a13 - b13) <=
      EPSILON * Math.max(1.0, Math.abs(a13), Math.abs(b13)) &&
    Math.abs(a14 - b14) <=
      EPSILON * Math.max(1.0, Math.abs(a14), Math.abs(b14)) &&
    Math.abs(a15 - b15) <=
      EPSILON * Math.max(1.0, Math.abs(a15), Math.abs(b15))
  );
}

/**
 * Alias for {@link mat4Multiply}
 * @function
 */
export const mat4Mul = mat4Multiply;

/**
 * Alias for {@link mat4Subtract}
 * @function
 */
export const mat4Sub = mat4Subtract;
