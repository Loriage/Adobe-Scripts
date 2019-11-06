findLayersText(app.activeDocument.artLayers);
browseLayerSets(app.activeDocument.layerSets);

function findLayersText (layers) {
    for (var i = 0, len = layers.length; i < len; i++) {
        if (layers[i].kind == "LayerKind.TEXT") {
            layers[i].remove();
			i--;
            len--;
        }
    }
}

//check all art layers then
//check if there are any inner layer sets
function browseLayerSets (sets) {
    for (var i = 0, len = sets.length; i < len; i++) {
        findLayersText(sets[i].artLayers);

        if(sets[i].layerSets.length > 0){
            browseLayerSets(sets[i].layerSets);
        }
    }
}
