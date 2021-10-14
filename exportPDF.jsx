main();

function main() {
    // Select folder
	var inputFolder = Folder.selectDialog("Select a folder to process");
	if (!inputFolder)
		return;
	var fileList = inputFolder.getFiles("*.ps*");

    // Adaptative path
	var regex = new RegExp('/[^/]*$');
	var doc_path = String(inputFolder).replace(regex, '/');

	// Open and save all PSD files in ../720
	for(var i=0; i<fileList.length; i++) {
		if (fileList[i] instanceof File) {
			open(fileList[i]);
			var doc = app.activeDocument;
			var sub_directory = new Folder(doc_path + '720');
			if ( !sub_directory.exists )
                sub_directory.create()
			var new_path = sub_directory + '/' + doc.name.split('.')[0] + '.jpg';
			saveJPG(new_path);
            app.activeDocument.close(SaveOptions.DONOTSAVECHANGES);
		}
	}

    // Export to multipage PDF presentations
    app.makePDFPresentation(sub_directory.getFiles("*.jpg"), File(doc_path + fileList[0].name.slice(0, -7) + '.pdf'))
}

// Saving parameters
function saveJPG(new_path) {
    var idsave = charIDToTypeID( "save" );
        var desc17 = new ActionDescriptor();
        var idAs = charIDToTypeID( "As  " );
            var desc18 = new ActionDescriptor();
            var idEQlt = charIDToTypeID( "EQlt" );
            desc18.putInteger( idEQlt, 12 );
            var idMttC = charIDToTypeID( "MttC" );
            var idNone = charIDToTypeID( "None" );
            desc18.putEnumerated( idMttC, idMttC, idNone );
        var idJPEG = charIDToTypeID( "JPEG" );
        desc17.putObject( idAs, idJPEG, desc18 );
        var idIn = charIDToTypeID( "In  " );
        desc17.putPath( idIn, new File( new_path ) );
        var idDocI = charIDToTypeID( "DocI" );
        desc17.putInteger( idDocI, 432 );
        var idLwCs = charIDToTypeID( "LwCs" );
        desc17.putBoolean( idLwCs, true );
        var idsaveStage = stringIDToTypeID( "saveStage" );
        var idsaveStageType = stringIDToTypeID( "saveStageType" );
        var idsaveBegin = stringIDToTypeID( "saveBegin" );
        desc17.putEnumerated( idsaveStage, idsaveStageType, idsaveBegin );
    executeAction( idsave, desc17, DialogModes.NO );
}
