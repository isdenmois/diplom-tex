all:	
	pdflatex --interaction=batchmode  main.tex; echo
	pdflatex --interaction=batchmode  main.tex; echo
	pdfunite title.pdf main.pdf 45Moiseev.pdf;

join:
	pdfunite title.pdf main.pdf 45Moiseev.pdf;

