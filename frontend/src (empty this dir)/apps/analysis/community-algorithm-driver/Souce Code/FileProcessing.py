import operator
import os
import networkx as nx
import igraph as ig
from copy import deepcopy
import time
import infomap
from igraph import *


im = infomap.Infomap()


def create_nx_Graph(Graphfile):

    # create the networkx graph function from networkx package as this is the input for louvain
    G = nx.Graph()
    edges = []

    with open(Graphfile) as file:
        for line in file:
            # Skip comments
            if not line.startswith('#'):
                value = line.split(",")
                # read lines that are for edges (Node1, Node2, Edge Weight)
                if len(value) >= 2:
                    edges.append((int(value[0]) - 1, int(value[1]) - 1))
                    try:
                        G.add_edge(value[0], value[1], weight=float(value[2].strip()))
                    except:
                        G.add_edge(value[0], value[1], weight=float(1.0))

    # G is the graph object in networkx package format. edges is a list of all the edges in the graph which we need when writing results for edges in communities
    return G, edges


def create_ig_Graph(GraphFile):
    g = ig.Graph()

    # list containing all the edge weights in order since igraph add edge method doesnt take edgeweight
    edgeWeights = []
    edges = []

    with open(GraphFile) as file:

        # skip first line since it is usually graph name (DirectorGenre, ActorGenre, etc)
        next(file)

        # add as last vertex in graph since igraph reads nodes from 0
        g.add_vertices(int(file.readline()))

        for line in file:
            value = line.split(",")
            if len(value) >= 2:
                edges.append((int(value[0]) - 1, int(value[1]) - 1))
                # append edge weight to list
                try:
                    edgeWeights.append(float(value[2]))
                except:
                    edgeWeights.append(float(1.0))

    g.add_edges(edges)

    # g is the graph object in igraph package format. edges is a list of all the edges in the graph which we need when writing results for edges in communities
    # edgeWeights is a seperate list of edgeWeights with the same length as number of vertices of the graph that the community detection algorithm takes.
    return g, edges, edgeWeights


def writeResults(result, outputpath, querynumber, edges, graphName, algo, t):

    # Function to write results with igraph VertexClusteringObject format

    print("Writing the result...")

    path = outputpath + "\expression" + str(querynumber)

    if not os.path.exists(path):
        os.makedirs(path)

    t0 = time.time()
    # Write node and community into a file
    with open(path + "\\Nodes_In_Communities.txt", 'w') as f:

        f.write("#" + graphName + "\n")
        f.write("#" + algo + "\n")
        f.write("#Time taken "+t+"s\n")

        for index, community in enumerate(result):
            for node in community:
                f.write('%s,%s\n' % (node+1, index+1))

    communityBridgeEdges = deepcopy(edges)
    count = 0

    t1 = time.time() - t0
    t2 = time.time()

    # Write edges and the community they are in
    with open(path + "\\Edges_In_Communities.txt", 'w') as f:

        f.write("#" + graphName + "\n")
        f.write("#" + algo + "\n")
        f.write("#Time taken " + t + "s\n")

        for i, edge in enumerate(edges):
            for index, community in enumerate(result):
                if edge[0] in community and edge[1] in community:
                    f.write('%s,%s,%s\n' % (edge[0]+1, edge[1]+1, index + 1))
                    communityBridgeEdges.pop(i - count)
                    count += 1

    t3 = time.time() - t2
    t4 = time.time()

    # Write bridge edges into a file
    with open(path + "\\Bridge_Edges.txt", 'w') as f:

        f.write("#" + graphName + "\n")
        f.write("#" + algo + "\n")
        f.write("#Time taken " + t + "s\n")

        for edge in communityBridgeEdges:
            f.write('%s,%s\n' % (edge[0]+1, edge[1]+1))

    t5 = time.time() - t4
    t6 = time.time()
    total = t6 - t0

    with open(path + "\\Write_time.txt", 'w') as f:
        f.write("#Time to write nodes: " + str(t1) + "s\n")
        f.write("#Time to write edges: " + str(t3) + "s\n")
        f.write("#Time to write bridge edges: " + str(t5) + "s\n")
        f.write("#Total time taken: " + str(total) + "s\n")


def writeResultsLouvain(partition, outputpath, querynumber, edges, graphName, t):

    # Function to write results with louvain result format which is a dictionary with format
    # key is node_ID and value is community_ID
    # { 'node_ID' : community_ID}
    path = outputpath + "\expression" + str(querynumber)

    if not os.path.exists(path):
        os.makedirs(path)

    with open(path + "\\Nodes_In_Communities.txt", 'w') as f:

        f.write("#" + graphName + "\n")
        f.write("#Louvain\n")
        f.write("#Time taken "+t+"s\n")

        for key, value in sorted(partition.items(), key=operator.itemgetter(1)):
            f.write('%s,%s\n' % (key, value + 1))
        f.write('\n')
        with open(path + "\\Edges_In_Communities.txt", 'w') as f2:

            f2.write("#" + graphName + "\n")
            f2.write("#Louvain\n")
            f2.write("#Time taken " + t + "s\n")

            with open(path + "\\Bridge_Edges.txt", 'w') as f3:

                f3.write("#" + graphName + "\n")
                f3.write("#Louvain\n")
                f3.write("#Time taken " + t + "s\n")

                for edge in edges:
                    if partition[edge[0]] == partition[edge[1]]:
                        f2.write('%s,%s %s\n' % (edge[0], edge[1], partition[edge[0]] + 1))
                    else:
                        f3.write('%s,%s\n' % (edge[0], edge[1]))


def write_Results_Infomap(infomap, outputpath, querynumber, edges, graphName):

    # Function to write results with infomap result format
    # result is in im.modules which we can iterate through like this
    # for node_id, module_id in infomap.modules: (here module_id is the same as community_id)

    path = outputpath + "\expression" + str(querynumber)

    if not os.path.exists(path):
        os.makedirs(path)

    infomap.write_clu(path + "\\Communities.clu")

    currentCommunity = 0
    communityList = []

    t0 = time.time()

    # Write node and community into a file
    with open(path + "\\Nodes_In_Communities.txt", 'w') as f:

        f.write("#" + graphName + "\n")
        f.write("#Infomap\n")

        for node_id, module_id in infomap.modules:

            if module_id != currentCommunity:
                communityList.append([])
                currentCommunity = module_id

            if len(communityList) > module_id - 1:
                communityList[module_id - 1].append(node_id)

            f.write('%s,%s\n' % (node_id, module_id))

    communityBridgeEdges = deepcopy(edges)
    count = 0

    t1 = time.time() - t0
    t2 = time.time()

    #Write edges and the community they are in
    with open(path + "\\Edges_In_Communities.txt", 'w') as f:

        f.write("#" + graphName + "\n")
        f.write("#Infomap\n")

        for i, edge in enumerate(edges):
            for index, community in enumerate(communityList):
                if edge[0] in community and edge[1] in community:
                    f.write('%s,%s,%s\n' % (edge[0], edge[1], index + 1))
                    communityBridgeEdges.pop(i-count)
                    count += 1

    t3 = time.time() - t2
    t4 = time.time()

    #Write bridge edges into a file
    with open(path + "\\Bridge_Edges.txt", 'w') as f:

        f.write("#" + graphName + "\n")
        f.write("#Infomap\n")

        for edge in communityBridgeEdges:
            f.write('%s,%s\n' % (edge[0], edge[1]))

    t5 = time.time() - t4
    t6 = time.time()

    total = t6 - t0

    with open(path + "\\Write_time.txt", 'w') as f:
        f.write("#Time to write nodes: " + str(t1) + "s\n")
        f.write("#Time to write edges: " + str(t3) + "s\n")
        f.write("#Time to write bridge edges: " + str(t5) + "s\n")
        f.write("#Total time taken: " + str(total) + "s\n")


def createVertexClusteringObjectLouvain(partition, graphLocation):


    # create a VertexClusteringObject for louvain dictionary since comparision format is a VCO
    igG, _, _ = create_ig_Graph(graphLocation)
    igG.add_vertex(0)

    membership = [None] * (igG.vcount())

    for node_id, community_id in partition.items():
        index = int(node_id)
        membership[index] = int(community_id)

    m = max(partition.values()) + 1

    # membership is a list which contains all community_IDs of the graph
    # example [0,0,0,1,1,1]
    # here nodes 0,1,2 are in community 0 and nodes 3,4,5 are in community 1 (vertices count of graph should match membership length)
    for val in range(len(membership)):
        if membership[val] is None:
            membership[val] = m
            m += 1

    # inbuilt igraph function to create a vertex_clustering_object with ig.graph and membership list as parameters
    return ig.VertexClustering(igG, membership=membership)


def createVertexClusteringObjectInfomap(im, graphLocation):

    # create a VertexClusteringObject for infomap object since comparision format is a VCO
    igG, _, _ = create_ig_Graph(graphLocation)
    igG.add_vertex(0)

    membership = [None] * (igG.vcount())
    m = 0

    for node_id, module_id in im.modules:
        if module_id - 1 > m:
            m = module_id - 1
        index = int(node_id)
        membership[index] = int(module_id - 1)

    # membership is a list which contains all community_IDs of the graph
    # example [0,0,0,1,1,1]
    # here nodes 0,1,2 are in community 0 and nodes 3,4,5 are in community 1 (vertices count of graph should match membership length)
    for val in range(len(membership)):
        if membership[val] is None:
            membership[val] = m
            m += 1

    # inbuilt igraph function to create a vertex_clustering_object with ig.graph and membership list as parameters
    return ig.VertexClustering(igG, membership=membership)




