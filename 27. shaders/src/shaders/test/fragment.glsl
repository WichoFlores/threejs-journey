// precision mediump float;

varying float vRandom;
varying vec2 vUv;
varying float vElevation;

uniform vec3 uColor;
uniform sampler2D uTexture; // Texture


void main() {
  // gl_FragColor = vec4(0.5, vRandom, 1.0, 1.0);
  // gl_FragColor = vec4(uColor, 1.0);

  vec4 textureColor = texture2D(uTexture, vUv); // This is a vec4
  textureColor.rgb *= vElevation + 0.85;
  gl_FragColor = textureColor;
}