
python3 driver.py [-vb]

    options:
        -v          verbose -- log extra information to console
        -b path     BASE path -- specify the path of the BASE directory

The BASE directory is specified as an argument to the driver command -- if not given, the current directory (from which `driver.py` is called) is used as the BASE directory. 
All information & data needed for analysis is found in the BASE directory.
The general structure of the BASE directory is as follows:

BASE/
    |--config.json      -> analysis configuration file.
    |--Analysis/        -> default location for analysis results (OUTPUT_DIR).
    |--Layers/          -> location of .inter and .intra layer files.
        |--Community/   -> location of community info files for each layer.


Configuration (BASE/config.json)
The configuration file includes:
    > information about the structure of a heterogeneous MLN, if one exists
    > the names & locations of data files to be used in analysis
    > a list of Analysis Objectives to be executed


Analysis Objective format: 

    CommunityDetectionAlgorithm,WeightMetrics,MatchingAlgorithm,LayersToBeComputed

    eg: infomap,we,mwm,ActorFBLikes-DirectorAvgBudget

    communityDetectionAlgorithm options:
    Infomap, Louvain

    WeightMetrics options (bipartite graph generation):
        we = edge weight
        wf = edge fraction
        wd = edge density
        wp = vertices participation
        wh = participating hubs weight

    MacthingAlgorithm options:
        mwm (Maximal Weighted Matching)
        mwpm (Maximal Weighted Perfect Matching)
        mwmt (Maximal Weighted Matching with Ties)
        mwrm (Maximal Weighted Relaxed Matching)

    LayersToBeComputed:
        a hyphen-separated list of layer names from the layers list.


To Run Infomap refer:
    https://www.mapequation.org/code.html#Windows
To run louvain refer:
    read me in the Louvain Files


General Analysis Expression Format
---------------------------------

\PSI(Layer_i, {\PSI parameter list}) [\THETA,{\THETA Parameter List},[<connectingLayer_left>,<connectingLayer_right>]] \PSI(Layer-j,{\PSI parameter list})
Parameter Lists are optional, provided as per requirement

\Psi Options: Community_LOUVAIN, Community_INFOMAP, Centrality_DEGREE, Centrality_CLOSENESS, Centrality_BETWEENNESS, Substructure_SUBDUE, ...
\Theta Options (Aggregation Algorithms): Ho_CE-AND, Ho_CE-OR, Ho_CV-AND, Ho_NOT, He_MWM, He_MWMT, He_MWPM, He_MWRM, ...
\Theta Format: [<Aggregation Algorithm>{,<Weight Metric>,<connectingLayer_left>,<connectingLayer_right>}]

Examples:
---------------

1. HeMLN Communities
    <CommunityAlgorithm>(<Layer_i, {\Psi Parameters}) [<MatchingAlgo>,<weightMetric>,<connectingLayer_left>,<connectingLayer_right>] <CommunityAlgorithm>(<Layer_j>, {\Psi Parameters})

    Eg: ( ( Louvain(P) [He_MWM,we,P,A] Louvain(NOT A) ) [He_MWMT,wf,P,Y] ( Louvain(A) [He_MWMT,we,A,Y] Louvain(Y) ) )

2. HoMLN Communities
    <CommunityAlgorithm>(<Layer_i, {\Psi Parameters}) [<Boolean Operation>,<weightMetric>] <CommunityAlgorithm>(<Layer_j>, {\Psi Parameters})

    Eg: ( ( Louvain(L1) [Ho_CV-AND] Louvain(Ho_NOT L2) ) [Ho_CE-AND] ( Louvain(L3) [Ho_CE-OR,we] Louvain(L4) ) )

3. HyMLN Communities

    Eg: ( ( Louvain(L1) [Ho_CE-AND] Louvain(Ho_NOT L2) ) [He_MWM,we,L1,X1] ( Louvain(X1) [CE-OR,we] Louvain(X2) ) )

Rules
-----
1. USE commance
2. stored keyword: for storing partial results in the later phases
3. Should it be Louvain(P) or P(Louvain)