https://discoverthreejs.com/book/first-steps/world-app/

We should expect to be able to plugin our ThreeJS world into any framework and expect it to work. Shouldn't be dependant on the web app.

Rules:

- This web app cannot know about the existence of three.js (the only thing it should know is we have a component capable of generating 3D scenes, but not know how it does it)
- `src/World` contains everything related to ThreeJS. Inside this folder/component we are free to use ThreeJS however we like and forbidden from using it outside this folder.
- expect this component/folder to be a self-contained component that knows nothing about the web app on which it's being displayed. - this means we can take this World/ folder and drop it into any web app.

### World/main.js

Everything about the implementation of the world app should be hidden. From within main.js, we should not be able to access the scene, camera, renderer, or cube. If we later need to add this functionality, we'll do so by expanding the interface, not by exposing three.js functions to the outside world.

### World/components & World/systems

We divide the remaining tasks like setting up our camera, scene, lights, renderer, and window resizer into these folders. At first, they will be quite small and simple but ass your app grows it will be easier to control and manage.

Components - are anything that can be placed into the scene, like the cube, camera, and scene itself.

Systems - are things that operate on the components or other systems. I.e. animation loop, renderer, and `Resizer` later you might want to add additional categories like utils, stores...

note: Resizer.js is a capital R because it will be a class.

### World/systems/Loop

reference: https://discoverthreejs.com/book/first-steps/animation-loop/

This will handle all the looping logic and the animation system.
Loop tick() assumes that each object will have a .tick() method that will handle its own animation tick logic. (example look at the cube.js)

With this approach, we can design each object as a self-contained entity.
