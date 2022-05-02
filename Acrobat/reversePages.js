function reversePages() {
	var t = app.thermometer;
	t.duration = this.numPages;
	t.begin();
	for (i = this.numPages - 1; i >= 0; i--) {
		t.value = (i-this.numPages)*-1;
		this.movePage(i);
		t.text = 'Moving page ' + (i + 1);
	}
	t.end();
}
