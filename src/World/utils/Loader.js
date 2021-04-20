import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";

/**
 * type Resource {
 *  source: string
 *  name: string
 * }
 */

export default class Loader {
  constructor() {
    this.numItemsToLoad = 0;
    this.loaded = 0;
    this.items = {};

    this._setupLoaders();
  }

  _setupLoaders() {
    this.loaders = [];

    this.gltfLoader = new GLTFLoader();
    this.dracoLoader = new DRACOLoader();
    this.dracoLoader.setDecoderPath("/draco/");
    this.gltfLoader.setDRACOLoader(this.dracoLoader);

    this.loaders.push({
      extensions: ["glb", "gltf"],
      action: (resource) =>
        new Promise((resolve) => {
          this.gltfLoader.load(resource.source, (gltfData) => {
            this._fileLoadEnd(resource, gltfData);
            resolve(gltfData);
          });
        })
    });
  }

  _findLoaderForResource(resource) {
    const extensionMatch = resource.source.match(/\.([a-z]+)$/);
    const extension = extensionMatch[1];
    const loader = this.loaders.find((loader) =>
      loader.extensions.find((_extension) => _extension === extension)
    );
    return loader;
  }

  async load(resources = []) {
    console.log("load");
    const promises = [];
    for (const resource of resources) {
      this.numItemsToLoad++;
      console.log(resource.name);
      const loader = this._findLoaderForResource(resource);
      if (loader) {
        promises.push(loader.action(resource));
      } else {
        console.warn(`Cannot find loader for (${resource})`);
      }
    }
    return Promise.all(promises);
  }

  /**
   * Called after we have finished loading a resource.
   * @param {*} resource
   * @param {*} data - gltf data or data result from loader
   */
  _fileLoadEnd(resource, data) {
    this.loaded++;
    this.items[resource.name] = data;
  }
}
