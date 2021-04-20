import { createCamera } from "./components/camera.js";
import { createCube } from "./components/cube.js";
import { createScene } from "./components/scene.js";
import { createLights } from "./components/light.js";

import { createRenderer } from "./systems/renderer.js";
import { Resizer } from "./systems/Resizer.js";
import { Loop } from "./systems/Loop.js";
import { createControls } from "./systems/controls.js";

/**
 * note: instead of having this.camera within our class which exposes it to
 * anything that creates a world, i.e. new World(container).camera
 * we defined "Module scopred variables" these will act as privite variables in module scope.
 *
 * Important note: this solution will not work if we create two instances of the World class,
 * since the module scoped variables will be shared between both instances, so the second instance
 * will overwrite the variables of the first. However, we only ever intend to create one world at a time, so we’ll accept this limitation.
 */

let camera, renderer, scene, light;

// systems
let loop;

class World {
  constructor(container) {
    camera = createCamera();
    scene = createScene();
    renderer = createRenderer();
    light = createLights();
    loop = new Loop(camera, scene, renderer);
    const controls = new createControls(camera, renderer.domElement);
    container.append(renderer.domElement);

    const cube = createCube();
    // disabled mesh rotation
    // loop.updatables.push(cube);

    scene.add(light, cube);

    const resizer = new Resizer(container, camera, renderer);
  }

  render() {
    renderer.render(scene, camera);
  }

  start() {
    loop.start();
  }

  stop() {
    loop.stop();
  }
}

export { World };
