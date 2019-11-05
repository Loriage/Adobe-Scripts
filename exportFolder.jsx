// Choosing working directory
main();
function main() {
	var inputFolder = Folder.selectDialog("Select a folder to process");
	if (!inputFolder)
		return;
	var fileList = inputFolder.getFiles("*.psd");
	var doc_path = String(inputFolder).slice(0, -3);

	// Open and save all PSD files in ../720
	for(var i=0; i<fileList.length; i++) {
		if (fileList[i] instanceof File) {
			open(fileList[i]);
			var doc = app.activeDocument;
			var sub_directory = new Folder( doc_path + '/720');
			if ( !sub_directory.exists ) sub_directory.create()
			var new_path = sub_directory + '/' + doc.name.split('.')[0] + '.jpg';

			saveJPG(new_path);
		}
	}
	// Resize and save all PSD files in ../480
	for(var i=fileList.length; i>0; i--) {
		var doc = app.activeDocument;
		var sub_directory = new Folder( doc_path + '/480');
		if ( !sub_directory.exists ) sub_directory.create()
		var new_path = sub_directory + '/' + doc.name.split('.')[0] + '.jpg';

		var idImgS = charIDToTypeID( "ImgS" );
		    var desc52 = new ActionDescriptor();
		    var idWdth = charIDToTypeID( "Wdth" );
		    var idPxl = charIDToTypeID( "#Pxl" );
		    desc52.putUnitDouble( idWdth, idPxl, 480.000000 );
		    var idscaleStyles = stringIDToTypeID( "scaleStyles" );
		    desc52.putBoolean( idscaleStyles, true );
		    var idCnsP = charIDToTypeID( "CnsP" );
		    desc52.putBoolean( idCnsP, true );
		    var idIntr = charIDToTypeID( "Intr" );
		    var idIntp = charIDToTypeID( "Intp" );
		    var idautomaticInterpolation = stringIDToTypeID( "automaticInterpolation" );
		    desc52.putEnumerated( idIntr, idIntp, idautomaticInterpolation );
		executeAction( idImgS, desc52, DialogModes.NO );

		saveJPG(new_path);
		app.activeDocument.close(SaveOptions.DONOTSAVECHANGES);
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
}
