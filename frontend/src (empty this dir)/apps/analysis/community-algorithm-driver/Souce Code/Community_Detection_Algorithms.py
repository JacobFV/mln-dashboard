import networkx as nx
import igraph as ig
from igraph import *
import community
from FileProcessing import *
import infomap
import os
import time
from itertools import permutations

im = infomap.Infomap()


def louvain(G):
    t0 = time.time()

    # performs louvain on graph using louvain package for python (import community)
    partition = community.best_partition(G)

    t1 = time.time() - t0

    t1 = str(t1)

    return partition, t1


def infomapAlgo(graphFile):
    edges = []

    # create the graph according to the infomap package by reading from the input file
    print("Reading file and creating graph...")
    with open(graphFile) as file:

        for line in file:
            # Skip comments
            if not line.startswith('#'):
                value = line.split(",")
                # read lines that are for edges (Node1, Node2, Edge Weight)
                if len(value) >= 2:
                    try:
                        im.add_link(int(value[0]), int(value[1]), weight=float(value[2].strip()))
                    except:
                        im.add_link(int(value[0]), int(value[1]), weight=float(1.0))

                    edges.append([int(value[0]), int(value[1])])

    print("Applying Infomap Community Detection Algorithm to Graph...")
    t0 = time.time()

    # performs infomap on graph using infomap package for python. Results are stored in im (im is the infomap object that is created on the top of the file)
    # im = infomap.Infomap() object initialized at the top of the file
    im.run()
    t1 = str(time.time() - t0)
    return im, edges, t1


def fastgreedy(G, edgeWeights):
    t0 = time.time()

    # simplify graph if it has multiple edges connecting the same nodes
    G = G.simplify()

    # performs fastgreedy on graph G using community_fastgreedy function
    partition = G.community_fastgreedy(weights=edgeWeights)

    # result need to be converted into a vertex clustering object which .as_clustering does. inbuilt igraph function
    print("Creating vertex clustering object...")
    result = partition.as_clustering(n=None)

    t1 = time.time() - t0

    t1 = str(t1)

    return result, t1


def walktrap(G, edgeWeights):
    t0 = time.time()

    # performs walktrap on graph G using community_walktrap function
    partition = G.community_walktrap(weights=edgeWeights, steps=4)

    print("Creating vertex clustering object...")
    result = partition.as_clustering(n=None)

    t1 = time.time() - t0
    t1 = str(t1)

    return result, t1


def leadingeigenvector(G, edgeWeights):

    t0 = time.time()
    # performs leading eigen vector on graph G using community_leading_eigenvector function
    partition = G.community_leading_eigenvector()
    t1 = time.time() - t0
    t1 = str(t1)

    return partition, t1


def multilevel(G, edgeWeights):

    t0 = time.time()

    # performs multilevel on graph G using community_multilevel function
    partition = G.community_multilevel(weights=edgeWeights, return_levels=False)
    t1 = time.time() - t0
    t1 = str(t1)

    return partition, t1


def getClusteringCoefficient(result, final_list, index):

    cc = []
    for i in range(len(final_list)):
        # inbuilt igraph function. Calculates clustering coefficient for the communities by making them into a subgraph
        graphResult = ig.VertexClustering.subgraph(result, index[i])
        cc.append(graphResult.transitivity_undirected())
    avg = sum(cc) / len(cc)

    return round(avg, 2)


def calculateJaccard(list1, list2):
    intersection = len(list(set(list1).intersection(list2)))
    union = (len(list1) + len(list2)) - intersection
    return float(intersection) / union


def getJaccard(i, resultList, largest10ResultList):

    # get largest 10 communities from result
    resultIndices = largest10ResultList[i][1]

    # create a list of 10 communities
    resultTop10 = []
    for x in resultIndices:
        resultTop10.append(resultList[i][0][x])

    # Compare our main result with other results to get its jaccard
    listOfJaccard = []

    for j in range(len(resultList)):
        if j != i:

            # get largest 10 communities from result we are comparing with
            otherIndices = largest10ResultList[j][1]

            # create a list of 10 communities
            otherResultTop10 = []
            for x in otherIndices:
                otherResultTop10.append(resultList[j][0][x])

            max = 0

            jaccardList = []
            for community in resultTop10:
                for communityToCompare in otherResultTop10:
                    value = calculateJaccard(community, communityToCompare)
                    if value > max:
                        max = value
                # max jaccard between 1 community of result and all communities of otherResult
                jaccardList.append(max)

            # saving the avg jaccard between algorithm and other algorithm
            listOfJaccard.append(sum(jaccardList) / len(jaccardList))

    return listOfJaccard



def getLargest10Communities(result):

    # get largest 10 communities for result by checking the length of all the communities in the result
    size = []
    for i in range(len(result)):
        size.append(len(result[i]))

    final_list = []

    for i in range(10):
        max1 = 0
        for j in range(len(size)):
            if size[j] >= max1:
                max1 = size[j]

        size.remove(max1)
        final_list.append(max1)

    index = []
    for j in range(len(final_list)):
        for i in range(len(result)):
            if len(result[i]) == final_list[j]:
                index.append(i)
    # return the final list (all the community length values) and index (index position of the communities that are the largest)
    return final_list, index


def getNumberOfSingleCommunities(result):

    # count all the communities with single nodes only using len() function
    singleCommunities = 0
    for community in result:
        if len(community) == 1:
            singleCommunities += 1

    return singleCommunities


def compareAlgorithms(resultList):

    # Time taken by algorithm
    for result in resultList:
        print("Time Taken for query " + str(result[1]) + "= " + str(result[2]))

    # Number of Communities
    for result in resultList:
        print("Number of Communities for query " + str(result[1]) + "= " + str(len(result[0])) + ", " + str(getNumberOfSingleCommunities(result[0])) + " are single node communities")

    # find indices of largest 10 communities from the results for Jaccard and Clustering Coefficient
    largest10ResultList = []
    for result in resultList:
        largest10ResultList.append(getLargest10Communities(result[0]))

    # Modularity--------------
    for result in resultList:
        print("Modularity for query " + str(result[1]) + "= " + str(result[0].modularity))  # .modularity is an igraph function that works on result vertexClusteringObject

    # Clustering Coefficient-------------- Gets CC for top 10 communities
    for i in range(len(resultList)):
        print("Clustering Coefficient for query " + str(resultList[i][1]) + "= " + str(getClusteringCoefficient(resultList[i][0], largest10ResultList[i][0], largest10ResultList[i][1])))


    # Jaccard-------------- Gets Jaccard for top 10 communities
    for i in range(len(resultList)):
        print("Jaccard for query " + str(resultList[i][1]) + " with other queries = " + str(getJaccard(i, resultList, largest10ResultList)))

    # NMI------------
    # Create permutation pairs for all results with each other for comparision
    if len(resultList) != 1:

        myl = []
        for x in range(len(resultList)):
            myl.append(x)

        seq = permutations(myl, 2)
        resultPairs = []
        for p in list(seq):
            a = sorted(list(permutations(p)))
            if a[0] not in resultPairs:
                resultPairs.append(a[0])

        for pairs in resultPairs:

            # Compare result of A with result of B
            AlgorithmA = resultList[pairs[0]][0]

            AlgorithmB = resultList[pairs[1]][0]
            AlgorithmAQuery = resultList[pairs[0]][1]
            AlgorithmBQuery = resultList[pairs[1]][1]

            print("NMI between Query " + str(AlgorithmAQuery) + " and Query " + str(AlgorithmBQuery) + " = " + str(ig.compare_communities(AlgorithmA, AlgorithmB, method="nmi")))

