 /**
  * Fetches, reads, and compiles GLSL; sets two global variables; and begins
  * the animation
  */




 async function setup() {
     window.gl = document.querySelector('canvas').getContext('webgl2')
     gl.enable(gl.BLEND)
     gl.disable(gl.CULL_FACE)
     gl.enable(gl.DEPTH_TEST);
     const vs = await fetch('vs.glsl').then(res => res.text())
     const fs = await fetch('fs.glsl').then(res => res.text())
     window.program = compile(vs, fs)
     fillScreen()
     window.addEventListener('resize', fillScreen)
     tick(0) // <- ensure this function is called only once, at the end of setup
 }


 /**
  * Compiles two shaders, links them together, looks up their uniform locations,
  * and returns the result. Reports any shader errors to the console.
  *
  * @param {string} vs_source - the source code of the vertex shader
  * @param {string} fs_source - the source code of the fragment shader
  * @return {WebGLProgram} the compiled and linked program
  */
 function compile(vs_source, fs_source) {
     const vs = gl.createShader(gl.VERTEX_SHADER)

     gl.shaderSource(vs, vs_source)
     gl.compileShader(vs)
     if (!gl.getShaderParameter(vs, gl.COMPILE_STATUS)) {
         console.error(gl.getShaderInfoLog(vs))
         throw Error("Vertex shader compilation failed")
     }

     const fs = gl.createShader(gl.FRAGMENT_SHADER)
     gl.shaderSource(fs, fs_source)
     gl.compileShader(fs)
     if (!gl.getShaderParameter(fs, gl.COMPILE_STATUS)) {
         console.error(gl.getShaderInfoLog(fs))
         throw Error("Fragment shader compilation failed")
     }

     const program = gl.createProgram()
     gl.attachShader(program, vs)
     gl.attachShader(program, fs)
     gl.linkProgram(program)
     if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
         console.error(gl.getProgramInfoLog(program))
         throw Error("Linking failed")
     }

     const uniforms = {}
     for (let i = 0; i < gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS); i += 1) {
         let info = gl.getActiveUniform(program, i)
         uniforms[info.name] = gl.getUniformLocation(program, info.name)
     }
     program.uniforms = uniforms

     return program
 }

 setup()

 //window.addEventListener('load', setup)