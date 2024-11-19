uniform float uTime;

varying vec3 vViewPosition;

void main() {
    vec3 nfdx = dFdx(vViewPosition);
    vec3 nfdy = dFdy(vViewPosition);
    vec3 normal = normalize(cross(nfdx, nfdy));
    gl_FragColor = vec4(normal, 1.0);
    gl_FragColor = linearToOutputTexel(gl_FragColor);
}