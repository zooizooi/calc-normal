varying vec3 vNormal;

void main() {
    gl_FragColor = vec4(vNormal, 1.0);
    gl_FragColor = linearToOutputTexel( gl_FragColor );
}