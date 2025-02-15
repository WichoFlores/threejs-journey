varying vec2 vUv;

void main()
{
  // Gradient 1
  // gl_FragColor = vec4(vUv, 1.0, 1.0);

  // Gradient 2
  // gl_FragColor = vec4(vUv, 0.0, 1.0);

  // Gradient 3
  // float strength = vUv.x;
  // gl_FragColor = vec4(strength, strength, strength, 1.0);

  // Gradient 4
  // float strength = vUv.y;
  // gl_FragColor = vec4(strength, strength, strength, 1.0);

  // Gradient 5
  // float strength = 1.0 - vUv.y;
  // gl_FragColor = vec4(strength, strength, strength, 1.0);

  // Gradient 6
  // float strength = vUv.y * 10.0;
  // gl_FragColor = vec4(strength, strength, strength, 1.0);

  // Gradient 7
  // float strength = mod(vUv.y * 10.0, 10.0);
  // gl_FragColor = vec4(strength, strength, strength, 1.0);

  // Gradient 8
  // float strength = mod(vUv.y * 10.0, 1.0);

  // Avoid ifs
  // if (strength > 0.5) {
  //   strength = 1.0;
  // } else {
  //   strength = 0.0;
  // }

  // strength = step(0.5, strength);

  // Gradient 9
  // float strength = mod(vUv.y * 10.0, 1.0);
  // strength = step(0.8, strength);

  // Gradient 10
  // float strength = mod(vUv.x * 10.0, 1.0);
  // strength = step(0.8, strength);

  // Gradient 11
  // float strength = step(0.8,  mod(vUv.x * 10.0, 1.0));
  // strength += step(0.8,  mod(vUv.y * 10.0, 1.0));

  // Gradient 12
  // float strength = step(0.8,  mod(vUv.x * 10.0, 1.0));
  // strength -= step(0.2,  mod(vUv.y * 10.0, 1.0));

  // float strength = step(0.8,  mod(vUv.x * 10.0, 1.0));
  // strength *= step(0.8,  mod(vUv.y * 10.0, 1.0));

  // Gradient 13
  // float strength = step(0.4,  mod(vUv.x * 10.0, 1.0));
  // strength *= step(0.8,  mod(vUv.y * 10.0, 1.0));

  // Gradient 14
  float barX = step(0.4,  mod(vUv.x * 10.0, 1.0));
  barX *= step(0.8,  mod(vUv.y * 10.0, 1.0));

  float barY = step(0.8,  mod(vUv.x * 10.0, 1.0));
  barY *= step(0.4,  mod(vUv.y * 10.0, 1.0));

  float strength = barY + barX;

  gl_FragColor = vec4(strength, strength, strength, 1.0);

  // gl_FragColor = vec4(0.5, 0.0, 1.0, 1.0);
}