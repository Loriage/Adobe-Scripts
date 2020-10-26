removeNamedLayer(app.activeDocument.artLayers);
browseLayerSets(app.activeDocument.layerSets);

function removeNamedLayer (layers) {
	for (var i = 0, len = layers.length; i < len; i++) {
	 	if (layers[i].name === "대사 복사") { // replace 대사 복사 by the name of the layer you want to delete.
	    	layers[i].remove();
	    	i--;
	    	len--;
		}
	}
}
function browseLayerSets (sets) {
    for (var i = 0, len = sets.length; i < len; i++) {
        removeNamedLayer(sets[i].artLayers);

        if(sets[i].layerSets.length > 0){
            browseLayerSets(sets[i].layerSets);
        }
    }
}
