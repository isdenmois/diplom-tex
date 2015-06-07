all:	
	pdflatex --interaction=batchmode  main.tex; echo
	pdflatex --interaction=batchmode  main.tex; echo
	pdfunite title.pdf main.pdf 35группаВойтова.pdf; 
