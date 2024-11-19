attribute vec4 otherPoints;

uniform float uTime;

varying vec3 vViewPosition;

void main() {
    vec3 transformed = position;
    transformed.y = sin(uTime * 0.4 + transformed.z * transformed.x * 1000.0) * 0.5;
    vViewPosition = transformed;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(transformed, 1.0);
}