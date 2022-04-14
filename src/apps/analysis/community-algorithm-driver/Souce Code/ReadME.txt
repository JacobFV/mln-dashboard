1)Place input graphs in /Graphs directory.
2)Update BASE_DIR in InputConfig and AnalysisConfig(/Analysis).
3)Place query in AnalysisConfig. Format : SLC,<communityAlgo>,<layer-name> 
	algorithms called: infomap, louvain, fastgreedy, walktrap, leadingeigenvector, multilevel
	layer names example: A, D, T, Am, CoA, F
4)Run using Driver.py
5)Select InputConfig file and AnalysisConfig file if there are multiple, otherwise program will automatically select the existing files.
6)Check results in Analysis folder under corresponding expression directory.
7)Comparision results are printed out on the console.

comments are mentioned with almost every line of code for understanding.


