#version 300 es
precision mediump float;
in float intensity;
in float specular;
out vec4 fragColor;
in vec3 v_normal;


void main() {
    
    vec3 baseColor = vec3(169./255.,161./255.,140./255.);
    fragColor = vec4((baseColor * intensity + .25) + vec3(1.0) * (specular * .45), 1.0);
    
}
