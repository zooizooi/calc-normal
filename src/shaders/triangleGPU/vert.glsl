attribute vec4 otherPoints;

uniform float uTime;

varying vec3 vNormal;

void main() {
    vec3 pointA = position;
    vec3 pointB = vec3(otherPoints.x, 0.0, otherPoints.y);
    vec3 pointC = vec3(otherPoints.z, 0.0, otherPoints.w);
    pointA.y = sin(uTime * 0.4 + pointA.z * pointA.x * 1000.0) * 0.5;
    pointB.y = sin(uTime * 0.4 + pointB.z * pointB.x * 1000.0) * 0.5;
    pointC.y = sin(uTime * 0.4 + pointC.z * pointC.x * 1000.0) * 0.5;

    vec3 directionPointA = normalize(pointB - pointA);
    vec3 directionPointB = normalize(pointC - pointA);
    vec3 normal = normalize(cross(directionPointB, directionPointA));
    vNormal = normal;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pointA, 1.0);
}