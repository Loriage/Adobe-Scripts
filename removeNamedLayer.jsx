var layers = app.activeDocument.layers;

for (var i = 0; i<layers.length; i++) {
  if (layers[i].name === "대사 복사") {
    layers[i].remove;
  }
}
