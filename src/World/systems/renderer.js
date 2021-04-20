import { WebGLRenderer } from "three";

function createRenderer() {
  const renderer = new WebGLRenderer();
  renderer.antialias = true;
  renderer.physicallyCorrectLights = true;

  return renderer;
}

export { createRenderer };
