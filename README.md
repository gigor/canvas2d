# What is it
Just a test task that allows creating, dragging & resizing of rectangles on an HTML5 Canvas

[Live Demo]()

# How does it work
Information about layers is stored in Pinia Store, including selected status.

There are two canvases: one for selected layers (`canvasOverlay`) and the other for all the others(`canvas`). 

When the “New Layer” button is clicked
- A layer with the type  `rectangle`  is added to the store  `layers`  with random width & height on a random position within a visible area of the canvas
- Canvases are redrawn

When a layer is selected:
- Its state `selected`  is changed to true;
- Canvases are redrawn
- coordinates of the first selected layer are saved to the store `selectedLayer`

When a layer is dragged:
- The `canvasOverlay` is moved with CSS transform.
- The store `selectedLayer` is updated by delta movement.

When a layer is dropped:
- The coordinates for all selected layers are changed in the store by the difference in mouse positions between the drag start and drag end.
- Canvases are redrawn

This approach gives the best performance possible without significantly decreasing speed, even if there are thousands of layers.

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
