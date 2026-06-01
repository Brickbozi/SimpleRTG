#version 300 es
uniform mat4 model;
uniform mat4 view;
uniform mat4 projection;
uniform vec3 camera;
layout(location=0) in vec3 position;
layout(location=1) in vec3 normal;
out float intensity;
out float specular;
uniform float minZ;
uniform float maxZ;
out vec3 v_normal;
out float z_pos;
void main() {
    
    vec3 pos = position;
    
    vec4 worldPos = model * vec4(pos, 1.0);
    z_pos = worldPos.z;
    
    gl_Position = projection * view * worldPos;

    mat3 normalMatrix = transpose(inverse(mat3(model)));
    vec3 N = normalize(normalMatrix * normal);
    vec3 lightPos = vec3(0.2, 0.5, -1.2);
    vec3 L = normalize(lightPos - worldPos.xyz);
    intensity = max(dot(N, L), 0.0);
    v_normal = N;

    vec3 V = normalize(camera - worldPos.xyz);
    vec3 R = reflect(-L, N);
    specular = pow(max(dot(R, V), 0.0), 16.);
}