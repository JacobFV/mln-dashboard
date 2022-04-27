import os
import fnmatch
import os.path
from os import path
import networkx as nx
from igraph import *
from Community_Detection_Algorithms import *
from FileProcessing import *

# Scans all the config files in graph directory and lets you pick file
print("Select Graph inputConfig file: ")
count = 1
inputConfigs = []
# Searches Graph folder for all text files with Config substring
for file in os.listdir("Graphs"):
    if fnmatch.fnmatch(file, '*Config.txt'):
        print(str(count) + ": " + file)
        inputConfigs.append(file)
        count = count + 1

if len(inputConfigs) == 0:
    print("Config files not found")
    exit(0)

if len(inputConfigs) == 1:
    graphInput = 1
else:
    # Get the input selection for the file name based on the ones found in directory Graphs
    graphInput = input("Select file number: ")

# Save the filename to inputConfigFile variable
inputConfigFile = inputConfigs[int(graphInput) - 1]

# Scans all the config files in analysis directory and lets you pick file
print("Select Analysis Config file: ")
count = 1
analysisConfigs = []
# Searches Analysis folder for all text files with Config substring
for file in os.listdir("Analysis"):
    if fnmatch.fnmatch(file, '*Config.txt'):
        print(str(count) + ": " + file)
        analysisConfigs.append(file)
        count = count + 1

if len(analysisConfigs) == 0:
    print("Config files not found")
    exit(0)

if len(analysisConfigs) == 1:
    analysisInput = 1
else:
    # Get the input selection for the file name based on the ones found in directory Analysis
    analysisInput = input("Select file number: ")

# Save the filename to analysisConfigFile variable
analysisConfigFile = analysisConfigs[int(analysisInput) - 1]

# dictonary containing the layers and their file paths
layers = {}

# open Inputconfig file and get HeMLN layer order and layers with directories
with open("Graphs/" + inputConfigFile) as file:
    for line in file:

        # Skip all comments
        if not line.startswith('#'):
            # Save the base directory into BASE_DIR variable
            if line.startswith("BASE"):
                terms = line.split("=")
                BASE_DIR = terms[1].strip()
            else:
                terms = line.split("=")
                layers[str(terms[0].strip())] = terms[1].strip()

# Concat the base directory and graph location in the dictionary
for key, value in layers.items():
    if len(key) == 1:
        layers[key] = BASE_DIR + value

#list that contains all results.
resultsList = []

with open("Analysis/" + analysisConfigFile) as file:

    querynumber = 0

    for line in file:

        # Skip all comments and empty lines
        if not line.startswith('#') and not line.strip() == "":

            if line.startswith("OUTPUT_DIR ="):

                # Save output directory
                terms = line.split("=")
                outputDirectory = terms[1].strip()

            else:
                # Detect queries and split with ,
                terms = line.split(",")

                # save algorithm name to variable
                CommunityDetectionAlgorithm = terms[1].lower()
                GraphLayer = terms[2].strip()

                # check if query is for single layer community detection
                if terms[0] == 'SingleLayer':

                    querynumber += 1

                    print("----------------------------------------------------------------------------------------")
                    print("Processing Query " + str(querynumber) + "...")

                    # split file path to get graph name
                    head, tail = os.path.split(layers[GraphLayer])
                    file = tail.split(".")
                    graphName = str(file[0])

                    # check the algorithm mentioned
                    if CommunityDetectionAlgorithm == "louvain":

                        print("Reading file and creating graph...")
                        # Read and processing input file to create Graph
                        Graph, edges = create_nx_Graph(layers[GraphLayer])

                        print("Applying Louvain Community Detection Algorithm to Graph...")
                        #LOUVAIN function
                        result, time = louvain(Graph)
                        # convert louvain result format to VertexClusteringObject for comparision
                        resultAsVCO = createVertexClusteringObjectLouvain(result, layers[GraphLayer])

                        # append the result of louvain algorithm to the resultsList for comparision function later
                        resultsList.append([resultAsVCO, querynumber, time])

                        print("Writing Results to files...")
                        writeResultsLouvain(result, outputDirectory, querynumber, Graph.edges(), graphName, time)

                        print("Results saved for query " + str(querynumber) + ".")

                    elif CommunityDetectionAlgorithm == "infomap":

                        #INFOMAP function
                        result, edges, time = infomapAlgo(layers[GraphLayer])

                        print("Writing Results to files...")
                        write_Results_Infomap(im, outputDirectory, querynumber, edges, graphName)

                        # convert infomap result format to VertexClusteringObject for comparision
                        resultAsVCO = createVertexClusteringObjectInfomap(result, layers[GraphLayer])

                        # append the result of infomap algorithm to the resultsList for comparision function later
                        resultsList.append([resultAsVCO, querynumber, time])

                        print("Output saved for query " + str(querynumber) + ".")

                    elif CommunityDetectionAlgorithm == "fastgreedy":

                        print("Reading file and creating graph...")
                        # Send graph location to function and returns ig graph
                        Graph, edges, edgeWeights = create_ig_Graph(layers[GraphLayer])
                        Graph.add_vertex(0)

                        print("Applying Fast Greedy Community Detection Algorithm to Graph...")
                        # FASTGREEDY function
                        result, time = fastgreedy(Graph, edgeWeights)

                        # append the result of algorithm to the resultsList for comparision function later
                        resultsList.append([result, querynumber, time])

                        print("Writing Results to files...")
                        writeResults(result, outputDirectory, querynumber, edges, graphName, "FastGreedy", time)

                        print("Output saved for query " + str(querynumber) + ".")


                    elif CommunityDetectionAlgorithm == "walktrap":

                        print("Reading file and creating graph...")
                        # Send graph location to function and returns ig graph
                        Graph, edges, edgeWeights = create_ig_Graph(layers[GraphLayer])
                        Graph.add_vertex(0)

                        print("Applying Walk Trap Community Detection Algorithm to Graph...")
                        # WALKTRAP function
                        try:
                            result, time = walktrap(Graph, edgeWeights)
                            print("Writing Results to files...")
                            writeResults(result, outputDirectory, querynumber, edges, graphName, "Walktrap", time)
                            # append the result of louvain algorithm to the resultsList for comparision function later
                            resultsList.append([result, querynumber, time])
                            print("Output saved for query " + str(querynumber) + ".")
                        except Exception as e:
                            print(e)

                    elif CommunityDetectionAlgorithm == "leadingeigenvector":

                        print("Reading file and creating graph...")
                        # Send graph location to function and returns ig graph
                        Graph, edges, edgeWeights = create_ig_Graph(layers[GraphLayer])
                        Graph.add_vertex(0)

                        print("Applying Leading Eigen Vector Community Detection Algorithm to Graph...")
                        # LEADING EIGEN VECTOR function
                        result, time = leadingeigenvector(Graph, edgeWeights)

                        print("Writing Results to files...")
                        writeResults(result, outputDirectory, querynumber, edges, graphName, "LeadingEigenVector", time)

                        # append the result of louvain algorithm to the resultsList for comparision function later
                        resultsList.append([result, querynumber, time])

                        print("Output saved for query " + str(querynumber) + ".")

                    elif CommunityDetectionAlgorithm == "multilevel":

                        print("Reading file and creating graph...")
                        # Send graph location to function and returns ig graph
                        Graph, edges, edgeWeights = create_ig_Graph(layers[GraphLayer])
                        Graph.add_vertex(0)

                        print("Applying Multilevel Community Detection Algorithm to Graph...")
                        # MULTILEVEL function
                        result, time = multilevel(Graph, edgeWeights)

                        print("Writing Results to files...")
                        writeResults(result, outputDirectory, querynumber, edges, graphName, "Multilevel", time)

                        # append the result of louvain algorithm to the resultsList for comparision function later
                        resultsList.append([result, querynumber, time])

                        print("Output saved for query " + str(querynumber) + ".")

                    else:
                        print("Incorrect algorithm mentioned")
                        querynumber -= 1



#Comparing algorithms function resultList = [result_as_vertexClusteringObject, querynumber to identify algorithm, time taken by algorithm]
print("----------------------------------------------------------------------------------------")
print("Comparing Results..")
compareAlgorithms(resultsList)
