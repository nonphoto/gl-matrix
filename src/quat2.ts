import { ARRAY_TYPE, EPSILON, IndexedCollection } from "./common";
import { ReadonlyMat4, mat4GetRotation, mat4GetTranslation } from "./mat4";
import { Quat, ReadonlyQuat, quatCopy, quatCreate, quatDot, quatLength, quatRotateX, quatRotateY, quatRotateZ, quatSquaredLength } from "./quat";
import { ReadonlyVec3, Vec3 } from "./vec3";

export type Quat2 =
  | [number, number, number, number,
    number, number, number, number]
  | IndexedCollection;

export type ReadonlyQuat2 =
  | readonly [number, number, number, number, number, number, number, number]
  | IndexedCollection;

/**
 * Dual Quaternion<br>
 * Format: [real, dual]<br>
 * Quaternion format: XYZW<br>
 * Make sure to have normalized dual quaternions, otherwise the functions may not work as intended.<br>
 * @module Quat2
 */

/**
 * Creates a new identity dual quat
 *
 * @returns {Quat2} a new dual quaternion [real -> rotation, dual -> translation]
 */
export function quat2Create(): Quat2 {
  let dq = new ARRAY_TYPE(8);
  if (ARRAY_TYPE != Float32Array) {
    dq[0] = 0;
    dq[1] = 0;
    dq[2] = 0;
    dq[4] = 0;
    dq[5] = 0;
    dq[6] = 0;
    dq[7] = 0;
  }
  dq[3] = 1;
  return dq;
}

/**
 * Creates a new quat initialized with values from an existing quaternion
 *
 * @param {ReadonlyQuat2} a dual quaternion to clone
 * @returns {Quat2} new dual quaternion
 * @function
 */
export function quat2Clone(a: ReadonlyQuat2): Quat2 {
  let dq = new ARRAY_TYPE(8);
  dq[0] = a[0];
  dq[1] = a[1];
  dq[2] = a[2];
  dq[3] = a[3];
  dq[4] = a[4];
  dq[5] = a[5];
  dq[6] = a[6];
  dq[7] = a[7];
  return dq;
}

/**
 * Creates a new dual quat initialized with the given values
 *
 * @param {Number} x1 X component
 * @param {Number} y1 Y component
 * @param {Number} z1 Z component
 * @param {Number} w1 W component
 * @param {Number} x2 X component
 * @param {Number} y2 Y component
 * @param {Number} z2 Z component
 * @param {Number} w2 W component
 * @returns {Quat2} new dual quaternion
 * @function
 */
export function quat2FromValues(x1: number, y1: number, z1: number, w1: number, x2: number, y2: number, z2: number, w2: number): Quat2 {
  let dq = new ARRAY_TYPE(8);
  dq[0] = x1;
  dq[1] = y1;
  dq[2] = z1;
  dq[3] = w1;
  dq[4] = x2;
  dq[5] = y2;
  dq[6] = z2;
  dq[7] = w2;
  return dq;
}

/**
 * Creates a new dual quat from the given values (quat and translation)
 *
 * @param {Number} x1 X component
 * @param {Number} y1 Y component
 * @param {Number} z1 Z component
 * @param {Number} w1 W component
 * @param {Number} x2 X component (translation)
 * @param {Number} y2 Y component (translation)
 * @param {Number} z2 Z component (translation)
 * @returns {Quat2} new dual quaternion
 * @function
 */
export function quat2FromRotationTranslationValues(x1: number, y1: number, z1: number, w1: number, x2: number, y2: number, z2: number): Quat2 {
  let dq = new ARRAY_TYPE(8);
  dq[0] = x1;
  dq[1] = y1;
  dq[2] = z1;
  dq[3] = w1;
  let ax = x2 * 0.5,
    ay = y2 * 0.5,
    az = z2 * 0.5;
  dq[4] = ax * w1 + ay * z1 - az * y1;
  dq[5] = ay * w1 + az * x1 - ax * z1;
  dq[6] = az * w1 + ax * y1 - ay * x1;
  dq[7] = -ax * x1 - ay * y1 - az * z1;
  return dq;
}

/**
 * Creates a dual quat from a quaternion and a translation
 *
 * @param {ReadonlyQuat2} out quaternion receiving operation result
 * @param {ReadonlyQuat} q a normalized quaternion
 * @param {ReadonlyVec3} t translation vector
 * @returns {Quat2} dual quaternion receiving operation result
 * @function
 */
export function quat2FromRotationTranslation(out: Quat2, q: ReadonlyQuat, t: ReadonlyVec3): Quat2 {
  let ax = t[0] * 0.5,
    ay = t[1] * 0.5,
    az = t[2] * 0.5,
    bx = q[0],
    by = q[1],
    bz = q[2],
    bw = q[3];
  out[0] = bx;
  out[1] = by;
  out[2] = bz;
  out[3] = bw;
  out[4] = ax * bw + ay * bz - az * by;
  out[5] = ay * bw + az * bx - ax * bz;
  out[6] = az * bw + ax * by - ay * bx;
  out[7] = -ax * bx - ay * by - az * bz;
  return out;
}

/**
 * Creates a dual quat from a translation
 *
 * @param {ReadonlyQuat2} out quaternion receiving operation result
 * @param {ReadonlyVec3} t translation vector
 * @returns {Quat2} dual quaternion receiving operation result
 * @function
 */
export function quat2FromTranslation(out: Quat2, t: ReadonlyVec3): Quat2 {
  out[0] = 0;
  out[1] = 0;
  out[2] = 0;
  out[3] = 1;
  out[4] = t[0] * 0.5;
  out[5] = t[1] * 0.5;
  out[6] = t[2] * 0.5;
  out[7] = 0;
  return out;
}

/**
 * Creates a dual quat from a quaternion
 *
 * @param {ReadonlyQuat2} out quaternion receiving operation result
 * @param {ReadonlyQuat} q the quaternion
 * @returns {Quat2} dual quaternion receiving operation result
 * @function
 */
export function quat2FromRotation(out: Quat2, q: ReadonlyQuat): Quat2 {
  out[0] = q[0];
  out[1] = q[1];
  out[2] = q[2];
  out[3] = q[3];
  out[4] = 0;
  out[5] = 0;
  out[6] = 0;
  out[7] = 0;
  return out;
}

/**
 * Creates a new dual quat from a matrix (4x4)
 *
 * @param {Quat2} out the dual quaternion
 * @param {ReadonlyMat4} a the matrix
 * @returns {Quat2} dual quat receiving operation result
 * @function
 */
export function quat2FromMat4(out: Quat2, a: ReadonlyMat4): Quat2 {
  //TODO Optimize this
  let outer = quatCreate();
  mat4GetRotation(outer, a);
  let t = new ARRAY_TYPE(3);
  mat4GetTranslation(t, a);
  quat2FromRotationTranslation(out, outer, t);
  return out;
}

/**
 * Copy the values from one dual quat to another
 *
 * @param {Quat2} out the receiving dual quaternion
 * @param {ReadonlyQuat2} a the source dual quaternion
 * @returns {Quat2} out
 * @function
 */
export function quat2Copy(out: Quat2, a: ReadonlyQuat2): Quat2 {
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  out[3] = a[3];
  out[4] = a[4];
  out[5] = a[5];
  out[6] = a[6];
  out[7] = a[7];
  return out;
}

/**
 * Set a dual quat to the identity dual quaternion
 *
 * @param {Quat2} out the receiving quaternion
 * @returns {Quat2} out
 */
export function quat2Identity(out: Quat2): Quat2 {
  out[0] = 0;
  out[1] = 0;
  out[2] = 0;
  out[3] = 1;
  out[4] = 0;
  out[5] = 0;
  out[6] = 0;
  out[7] = 0;
  return out;
}

/**
 * Set the components of a dual quat to the given values
 *
 * @param {Quat2} out the receiving quaternion
 * @param {Number} x1 X component
 * @param {Number} y1 Y component
 * @param {Number} z1 Z component
 * @param {Number} w1 W component
 * @param {Number} x2 X component
 * @param {Number} y2 Y component
 * @param {Number} z2 Z component
 * @param {Number} w2 W component
 * @returns {Quat2} out
 * @function
 */
export function quat2Set(out: Quat2, x1: number, y1: number, z1: number, w1: number, x2: number, y2: number, z2: number, w2: number): Quat2 {
  out[0] = x1;
  out[1] = y1;
  out[2] = z1;
  out[3] = w1;

  out[4] = x2;
  out[5] = y2;
  out[6] = z2;
  out[7] = w2;
  return out;
}

/**
 * Gets the real part of a dual quat
 * @param  {quat} out real part
 * @param  {ReadonlyQuat2} a Dual Quaternion
 * @return {quat} real part
 */
export const quat2GetReal = quatCopy;

/**
 * Gets the dual part of a dual quat
 * @param  {Quat} out dual part
 * @param  {ReadonlyQuat2} a Dual Quaternion
 * @return {Quat} dual part
 */
export function quat2GetDual(out: Quat, a: ReadonlyQuat2): Quat {
  out[0] = a[4];
  out[1] = a[5];
  out[2] = a[6];
  out[3] = a[7];
  return out;
}

/**
 * Set the real component of a dual quat to the given quaternion
 *
 * @param {Quat2} out the receiving quaternion
 * @param {ReadonlyQuat} q a quaternion representing the real part
 * @returns {Quat2} out
 * @function
 */
export const setReal = quatCopy;

/**
 * Set the dual component of a dual quat to the given quaternion
 *
 * @param {Quat2} out the receiving quaternion
 * @param {ReadonlyQuat} q a quaternion representing the dual part
 * @returns {Quat2} out
 * @function
 */
export function quat2SetDual(out: Quat2, q: ReadonlyQuat): Quat2 {
  out[4] = q[0];
  out[5] = q[1];
  out[6] = q[2];
  out[7] = q[3];
  return out;
}

/**
 * Gets the translation of a normalized dual quat
 * @param  {Vec3} out translation
 * @param  {ReadonlyQuat2} a Dual Quaternion to be decomposed
 * @return {Vec3} translation
 */
export function quat2GetTranslation(out: Vec3, a: ReadonlyQuat2): Vec3 {
  let ax = a[4],
    ay = a[5],
    az = a[6],
    aw = a[7],
    bx = -a[0],
    by = -a[1],
    bz = -a[2],
    bw = a[3];
  out[0] = (ax * bw + aw * bx + ay * bz - az * by) * 2;
  out[1] = (ay * bw + aw * by + az * bx - ax * bz) * 2;
  out[2] = (az * bw + aw * bz + ax * by - ay * bx) * 2;
  return out;
}

/**
 * Translates a dual quat by the given vector
 *
 * @param {Quat2} out the receiving dual quaternion
 * @param {ReadonlyQuat2} a the dual quaternion to translate
 * @param {ReadonlyVec3} v vector to translate by
 * @returns {Quat2} out
 */
export function quat2Translate(out: Quat2, a: ReadonlyQuat2, v: ReadonlyVec3): Quat2 {
  let ax1 = a[0],
    ay1 = a[1],
    az1 = a[2],
    aw1 = a[3],
    bx1 = v[0] * 0.5,
    by1 = v[1] * 0.5,
    bz1 = v[2] * 0.5,
    ax2 = a[4],
    ay2 = a[5],
    az2 = a[6],
    aw2 = a[7];
  out[0] = ax1;
  out[1] = ay1;
  out[2] = az1;
  out[3] = aw1;
  out[4] = aw1 * bx1 + ay1 * bz1 - az1 * by1 + ax2;
  out[5] = aw1 * by1 + az1 * bx1 - ax1 * bz1 + ay2;
  out[6] = aw1 * bz1 + ax1 * by1 - ay1 * bx1 + az2;
  out[7] = -ax1 * bx1 - ay1 * by1 - az1 * bz1 + aw2;
  return out;
}

/**
 * Rotates a dual quat around the X axis
 *
 * @param {Quat2} out the receiving dual quaternion
 * @param {ReadonlyQuat2} a the dual quaternion to rotate
 * @param {number} rad how far should the rotation be
 * @returns {Quat2} out
 */
export function quat2RotateX(out: Quat2, a: ReadonlyQuat2, rad: number): Quat2 {
  let bx = -a[0],
    by = -a[1],
    bz = -a[2],
    bw = a[3],
    ax = a[4],
    ay = a[5],
    az = a[6],
    aw = a[7],
    ax1 = ax * bw + aw * bx + ay * bz - az * by,
    ay1 = ay * bw + aw * by + az * bx - ax * bz,
    az1 = az * bw + aw * bz + ax * by - ay * bx,
    aw1 = aw * bw - ax * bx - ay * by - az * bz;
  quatRotateX(out, a, rad);
  bx = out[0];
  by = out[1];
  bz = out[2];
  bw = out[3];
  out[4] = ax1 * bw + aw1 * bx + ay1 * bz - az1 * by;
  out[5] = ay1 * bw + aw1 * by + az1 * bx - ax1 * bz;
  out[6] = az1 * bw + aw1 * bz + ax1 * by - ay1 * bx;
  out[7] = aw1 * bw - ax1 * bx - ay1 * by - az1 * bz;
  return out;
}

/**
 * Rotates a dual quat around the Y axis
 *
 * @param {Quat2} out the receiving dual quaternion
 * @param {ReadonlyQuat2} a the dual quaternion to rotate
 * @param {number} rad how far should the rotation be
 * @returns {Quat2} out
 */
export function quat2RotateY(out: Quat2, a: ReadonlyQuat2, rad: number): Quat2 {
  let bx = -a[0],
    by = -a[1],
    bz = -a[2],
    bw = a[3],
    ax = a[4],
    ay = a[5],
    az = a[6],
    aw = a[7],
    ax1 = ax * bw + aw * bx + ay * bz - az * by,
    ay1 = ay * bw + aw * by + az * bx - ax * bz,
    az1 = az * bw + aw * bz + ax * by - ay * bx,
    aw1 = aw * bw - ax * bx - ay * by - az * bz;
  quatRotateY(out, a, rad);
  bx = out[0];
  by = out[1];
  bz = out[2];
  bw = out[3];
  out[4] = ax1 * bw + aw1 * bx + ay1 * bz - az1 * by;
  out[5] = ay1 * bw + aw1 * by + az1 * bx - ax1 * bz;
  out[6] = az1 * bw + aw1 * bz + ax1 * by - ay1 * bx;
  out[7] = aw1 * bw - ax1 * bx - ay1 * by - az1 * bz;
  return out;
}

/**
 * Rotates a dual quat around the Z axis
 *
 * @param {Quat2} out the receiving dual quaternion
 * @param {ReadonlyQuat2} a the dual quaternion to rotate
 * @param {number} rad how far should the rotation be
 * @returns {Quat2} out
 */
export function quat2RotateZ(out: Quat2, a: ReadonlyQuat2, rad: number): Quat2 {
  let bx = -a[0],
    by = -a[1],
    bz = -a[2],
    bw = a[3],
    ax = a[4],
    ay = a[5],
    az = a[6],
    aw = a[7],
    ax1 = ax * bw + aw * bx + ay * bz - az * by,
    ay1 = ay * bw + aw * by + az * bx - ax * bz,
    az1 = az * bw + aw * bz + ax * by - ay * bx,
    aw1 = aw * bw - ax * bx - ay * by - az * bz;
  quatRotateZ(out, a, rad);
  bx = out[0];
  by = out[1];
  bz = out[2];
  bw = out[3];
  out[4] = ax1 * bw + aw1 * bx + ay1 * bz - az1 * by;
  out[5] = ay1 * bw + aw1 * by + az1 * bx - ax1 * bz;
  out[6] = az1 * bw + aw1 * bz + ax1 * by - ay1 * bx;
  out[7] = aw1 * bw - ax1 * bx - ay1 * by - az1 * bz;
  return out;
}

/**
 * Rotates a dual quat by a given quaternion (a * q)
 *
 * @param {Quat2} out the receiving dual quaternion
 * @param {ReadonlyQuat2} a the dual quaternion to rotate
 * @param {ReadonlyQuat} q quaternion to rotate by
 * @returns {Quat2} out
 */
export function quat2RotateByQuatAppend(out: Quat2, a: ReadonlyQuat2, q: ReadonlyQuat): Quat2 {
  let qx = q[0],
    qy = q[1],
    qz = q[2],
    qw = q[3],
    ax = a[0],
    ay = a[1],
    az = a[2],
    aw = a[3];

  out[0] = ax * qw + aw * qx + ay * qz - az * qy;
  out[1] = ay * qw + aw * qy + az * qx - ax * qz;
  out[2] = az * qw + aw * qz + ax * qy - ay * qx;
  out[3] = aw * qw - ax * qx - ay * qy - az * qz;
  ax = a[4];
  ay = a[5];
  az = a[6];
  aw = a[7];
  out[4] = ax * qw + aw * qx + ay * qz - az * qy;
  out[5] = ay * qw + aw * qy + az * qx - ax * qz;
  out[6] = az * qw + aw * qz + ax * qy - ay * qx;
  out[7] = aw * qw - ax * qx - ay * qy - az * qz;
  return out;
}

/**
 * Rotates a dual quat by a given quaternion (q * a)
 *
 * @param {Quat2} out the receiving dual quaternion
 * @param {ReadonlyQuat} q quaternion to rotate by
 * @param {ReadonlyQuat2} a the dual quaternion to rotate
 * @returns {Quat2} out
 */
export function quat2RotateByQuatPrepend(out: Quat2, q: ReadonlyQuat, a: ReadonlyQuat2): Quat2 {
  let qx = q[0],
    qy = q[1],
    qz = q[2],
    qw = q[3],
    bx = a[0],
    by = a[1],
    bz = a[2],
    bw = a[3];

  out[0] = qx * bw + qw * bx + qy * bz - qz * by;
  out[1] = qy * bw + qw * by + qz * bx - qx * bz;
  out[2] = qz * bw + qw * bz + qx * by - qy * bx;
  out[3] = qw * bw - qx * bx - qy * by - qz * bz;
  bx = a[4];
  by = a[5];
  bz = a[6];
  bw = a[7];
  out[4] = qx * bw + qw * bx + qy * bz - qz * by;
  out[5] = qy * bw + qw * by + qz * bx - qx * bz;
  out[6] = qz * bw + qw * bz + qx * by - qy * bx;
  out[7] = qw * bw - qx * bx - qy * by - qz * bz;
  return out;
}

/**
 * Rotates a dual quat around a given axis. Does the normalisation automatically
 *
 * @param {Quat2} out the receiving dual quaternion
 * @param {ReadonlyQuat2} a the dual quaternion to rotate
 * @param {ReadonlyVec3} axis the axis to rotate around
 * @param {Number} rad how far the rotation should be
 * @returns {Quat2} out
 */
export function quat2RotateAroundAxis(out: Quat2, a: ReadonlyQuat2, axis: ReadonlyVec3, rad: number): Quat2 {
  //Special case for rad = 0
  if (Math.abs(rad) < EPSILON) {
    return quat2Copy(out, a);
  }
  let axisLength = Math.sqrt(axis[0] * axis[0] + axis[1] * axis[1] + axis[2] * axis[2]);

  rad = rad * 0.5;
  let s = Math.sin(rad);
  let bx = (s * axis[0]) / axisLength;
  let by = (s * axis[1]) / axisLength;
  let bz = (s * axis[2]) / axisLength;
  let bw = Math.cos(rad);

  let ax1 = a[0],
    ay1 = a[1],
    az1 = a[2],
    aw1 = a[3];
  out[0] = ax1 * bw + aw1 * bx + ay1 * bz - az1 * by;
  out[1] = ay1 * bw + aw1 * by + az1 * bx - ax1 * bz;
  out[2] = az1 * bw + aw1 * bz + ax1 * by - ay1 * bx;
  out[3] = aw1 * bw - ax1 * bx - ay1 * by - az1 * bz;

  let ax = a[4],
    ay = a[5],
    az = a[6],
    aw = a[7];
  out[4] = ax * bw + aw * bx + ay * bz - az * by;
  out[5] = ay * bw + aw * by + az * bx - ax * bz;
  out[6] = az * bw + aw * bz + ax * by - ay * bx;
  out[7] = aw * bw - ax * bx - ay * by - az * bz;

  return out;
}

/**
 * Adds two dual quat's
 *
 * @param {Quat2} out the receiving dual quaternion
 * @param {ReadonlyQuat2} a the first operand
 * @param {ReadonlyQuat2} b the second operand
 * @returns {Quat2} out
 * @function
 */
export function quat2Add(out: Quat2, a: ReadonlyQuat2, b: ReadonlyQuat2): Quat2 {
  out[0] = a[0] + b[0];
  out[1] = a[1] + b[1];
  out[2] = a[2] + b[2];
  out[3] = a[3] + b[3];
  out[4] = a[4] + b[4];
  out[5] = a[5] + b[5];
  out[6] = a[6] + b[6];
  out[7] = a[7] + b[7];
  return out;
}

/**
 * Multiplies two dual quat's
 *
 * @param {Quat2} out the receiving dual quaternion
 * @param {ReadonlyQuat2} a the first operand
 * @param {ReadonlyQuat2} b the second operand
 * @returns {Quat2} out
 */
export function quat2Multiply(out: Quat2, a: ReadonlyQuat2, b: ReadonlyQuat2): Quat2 {
  let ax0 = a[0],
    ay0 = a[1],
    az0 = a[2],
    aw0 = a[3],
    bx1 = b[4],
    by1 = b[5],
    bz1 = b[6],
    bw1 = b[7],
    ax1 = a[4],
    ay1 = a[5],
    az1 = a[6],
    aw1 = a[7],
    bx0 = b[0],
    by0 = b[1],
    bz0 = b[2],
    bw0 = b[3];
  out[0] = ax0 * bw0 + aw0 * bx0 + ay0 * bz0 - az0 * by0;
  out[1] = ay0 * bw0 + aw0 * by0 + az0 * bx0 - ax0 * bz0;
  out[2] = az0 * bw0 + aw0 * bz0 + ax0 * by0 - ay0 * bx0;
  out[3] = aw0 * bw0 - ax0 * bx0 - ay0 * by0 - az0 * bz0;
  out[4] =
    ax0 * bw1 +
    aw0 * bx1 +
    ay0 * bz1 -
    az0 * by1 +
    ax1 * bw0 +
    aw1 * bx0 +
    ay1 * bz0 -
    az1 * by0;
  out[5] =
    ay0 * bw1 +
    aw0 * by1 +
    az0 * bx1 -
    ax0 * bz1 +
    ay1 * bw0 +
    aw1 * by0 +
    az1 * bx0 -
    ax1 * bz0;
  out[6] =
    az0 * bw1 +
    aw0 * bz1 +
    ax0 * by1 -
    ay0 * bx1 +
    az1 * bw0 +
    aw1 * bz0 +
    ax1 * by0 -
    ay1 * bx0;
  out[7] =
    aw0 * bw1 -
    ax0 * bx1 -
    ay0 * by1 -
    az0 * bz1 +
    aw1 * bw0 -
    ax1 * bx0 -
    ay1 * by0 -
    az1 * bz0;
  return out;
}

/**
 * Alias for {@link quat2Multiply}
 * @function
 */
export const quat2Mul = quat2Multiply;

/**
 * Scales a dual quat by a scalar number
 *
 * @param {Quat2} out the receiving dual quat
 * @param {ReadonlyQuat2} a the dual quat to scale
 * @param {Number} b amount to scale the dual quat by
 * @returns {Quat2} out
 * @function
 */
export function quat2Scale(out: Quat2, a: ReadonlyQuat2, b: number): Quat2 {
  out[0] = a[0] * b;
  out[1] = a[1] * b;
  out[2] = a[2] * b;
  out[3] = a[3] * b;
  out[4] = a[4] * b;
  out[5] = a[5] * b;
  out[6] = a[6] * b;
  out[7] = a[7] * b;
  return out;
}

/**
 * Calculates the dot product of two dual quat's (The dot product of the real parts)
 *
 * @param {ReadonlyQuat2} a the first operand
 * @param {ReadonlyQuat2} b the second operand
 * @returns {Number} dot product of a and b
 * @function
 */
export const quat2Dot = quatDot;

/**
 * Performs a linear interpolation between two dual quats's
 * NOTE: The resulting dual quaternions won't always be normalized (The error is most noticeable when t = 0.5)
 *
 * @param {Quat2} out the receiving dual quat
 * @param {ReadonlyQuat2} a the first operand
 * @param {ReadonlyQuat2} b the second operand
 * @param {Number} t interpolation amount, in the range [0-1], between the two inputs
 * @returns {Quat2} out
 */
export function quat2Lerp(out: Quat2, a: ReadonlyQuat2, b: ReadonlyQuat2, t: number): Quat2 {
  let mt = 1 - t;
  if (quat2Dot(a, b) < 0) t = -t;

  out[0] = a[0] * mt + b[0] * t;
  out[1] = a[1] * mt + b[1] * t;
  out[2] = a[2] * mt + b[2] * t;
  out[3] = a[3] * mt + b[3] * t;
  out[4] = a[4] * mt + b[4] * t;
  out[5] = a[5] * mt + b[5] * t;
  out[6] = a[6] * mt + b[6] * t;
  out[7] = a[7] * mt + b[7] * t;

  return out;
}

/**
 * Calculates the inverse of a dual quat. If they are normalized, conjugate is cheaper
 *
 * @param {Quat2} out the receiving dual quaternion
 * @param {ReadonlyQuat2} a dual quat to calculate inverse of
 * @returns {Quat2} out
 */
export function quat2Invert(out: Quat2, a: ReadonlyQuat2): Quat2 {
  let sqlen = quat2SquaredLength(a);
  out[0] = -a[0] / sqlen;
  out[1] = -a[1] / sqlen;
  out[2] = -a[2] / sqlen;
  out[3] = a[3] / sqlen;
  out[4] = -a[4] / sqlen;
  out[5] = -a[5] / sqlen;
  out[6] = -a[6] / sqlen;
  out[7] = a[7] / sqlen;
  return out;
}

/**
 * Calculates the conjugate of a dual quat
 * If the dual quaternion is normalized, this function is faster than Quat2.inverse and produces the same result.
 *
 * @param {Quat2} out the receiving quaternion
 * @param {ReadonlyQuat2} a quat to calculate conjugate of
 * @returns {Quat2} out
 */
export function quat2Conjugate(out: Quat2, a: ReadonlyQuat2): Quat2 {
  out[0] = -a[0];
  out[1] = -a[1];
  out[2] = -a[2];
  out[3] = a[3];
  out[4] = -a[4];
  out[5] = -a[5];
  out[6] = -a[6];
  out[7] = a[7];
  return out;
}

/**
 * Calculates the length of a dual quat
 *
 * @param {ReadonlyQuat2} a dual quat to calculate length of
 * @returns {Number} length of a
 * @function
 */
export const quat2Length = quatLength;

/**
 * Alias for {@link Quat2.length}
 * @function
 */
export const quat2Len = quat2Length;

/**
 * Calculates the squared length of a dual quat
 *
 * @param {ReadonlyQuat2} a dual quat to calculate squared length of
 * @returns {Number} squared length of a
 * @function
 */
export const quat2SquaredLength = quatSquaredLength;

/**
 * Alias for {@link Quat2.squaredLength}
 * @function
 */
export const quat2SqrLen = quatSquaredLength;

/**
 * Normalize a dual quat
 *
 * @param {Quat2} out the receiving dual quaternion
 * @param {ReadonlyQuat2} a dual quaternion to normalize
 * @returns {Quat2} out
 * @function
 */
export function quat2Normalize(out: Quat2, a: ReadonlyQuat2): Quat2 {
  let magnitude = quat2SquaredLength(a);
  if (magnitude > 0) {
    magnitude = Math.sqrt(magnitude);

    let a0 = a[0] / magnitude;
    let a1 = a[1] / magnitude;
    let a2 = a[2] / magnitude;
    let a3 = a[3] / magnitude;

    let b0 = a[4];
    let b1 = a[5];
    let b2 = a[6];
    let b3 = a[7];

    let a_dot_b = a0 * b0 + a1 * b1 + a2 * b2 + a3 * b3;

    out[0] = a0;
    out[1] = a1;
    out[2] = a2;
    out[3] = a3;

    out[4] = (b0 - a0 * a_dot_b) / magnitude;
    out[5] = (b1 - a1 * a_dot_b) / magnitude;
    out[6] = (b2 - a2 * a_dot_b) / magnitude;
    out[7] = (b3 - a3 * a_dot_b) / magnitude;
  }
  return out;
}

/**
 * Returns a string representation of a dual quaternion
 *
 * @param {ReadonlyQuat2} a dual quaternion to represent as a string
 * @returns {String} string representation of the dual quat
 */
export function quat2Str(a: ReadonlyQuat2): string {
  return (
    "Quat2(" +
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
    ")"
  );
}

/**
 * Returns whether or not the dual quaternions have exactly the same elements in the same position (when compared with ===)
 *
 * @param {ReadonlyQuat2} a the first dual quaternion.
 * @param {ReadonlyQuat2} b the second dual quaternion.
 * @returns {Boolean} true if the dual quaternions are equal, false otherwise.
 */
export function quat2ExactEquals(a: ReadonlyQuat2, b: ReadonlyQuat2): boolean {
  return (
    a[0] === b[0] &&
    a[1] === b[1] &&
    a[2] === b[2] &&
    a[3] === b[3] &&
    a[4] === b[4] &&
    a[5] === b[5] &&
    a[6] === b[6] &&
    a[7] === b[7]
  );
}

/**
 * Returns whether or not the dual quaternions have approximately the same elements in the same position.
 *
 * @param {ReadonlyQuat2} a the first dual quat.
 * @param {ReadonlyQuat2} b the second dual quat.
 * @returns {Boolean} true if the dual quats are equal, false otherwise.
 */
export function quat2Equals(a: ReadonlyQuat2, b: ReadonlyQuat2): boolean {
  let a0 = a[0],
    a1 = a[1],
    a2 = a[2],
    a3 = a[3],
    a4 = a[4],
    a5 = a[5],
    a6 = a[6],
    a7 = a[7];
  let b0 = b[0],
    b1 = b[1],
    b2 = b[2],
    b3 = b[3],
    b4 = b[4],
    b5 = b[5],
    b6 = b[6],
    b7 = b[7];
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
      EPSILON * Math.max(1.0, Math.abs(a7), Math.abs(b7))
  );
}
