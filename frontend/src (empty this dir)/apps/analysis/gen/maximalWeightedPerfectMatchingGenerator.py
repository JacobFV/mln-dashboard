# Maximum weighted perfect matching; more importance is given to number of pairs as compared to weight. If multiple sets with same number of pairs possible then picks up the set with highest overall weight
import networkx as nx
import os
import re
def maximalWeightedPerfectMatchingExtender(previousResult, bipartiteGraph, resultFile, newLayerStatus):
    matchedCommunities = []
    matchedCommunities2 = [] # for new layer
    content = []
    with open(previousResult, "r") as p:
        for line in p:
            #myList = [x.strip() for x in re.sub('[<>]', '',line).split(';')]
            temp =  re.sub('[<>]','',line)
            content = [l.split(',') for l in temp.strip().split(';')]
            matchedCommunities.append(content[0][-1])
            if newLayerStatus != -1:
                matchedCommunities2.append(content[0][newLayerStatus])
    #print("content")
    #print(content)
    #print("matched coms1")
    #print(matchedCommunities)
    #print("matched coms2", newLayerStatus)
    #print(matchedCommunities2)
    g = nx.Graph()
    edges = []
    bipartite_data = open(bipartiteGraph, "r").read().splitlines()
    for line in bipartite_data:
        line_data = line.split(",")
      #  print("line data")
      #  print(line_data)

        if newLayerStatus == -1:       # only ONE layer processed
            if ((line_data[1]) in matchedCommunities):
                edge = [(int(line_data[0]), int(line_data[1])), (int(line_data[2]), int(line_data[3])), float(line_data[4])]
                #print(edge)
                edges.append(edge)
        else: # both layers processed
            if ((line_data[1]) in matchedCommunities and (line_data[3]) in matchedCommunities2):
                edge = [(int(line_data[0]), int(line_data[1])), (int(line_data[2]), int(line_data[3])), float(line_data[4])]
                edges.append(edge)            
    for ii in edges:
        g.add_node(ii[0], bipartite=0)
        g.add_node(ii[1], bipartite=1)
    g.add_weighted_edges_from(edges)
    match = nx.max_weight_matching(g, maxcardinality=True)
    #print("match")
    #print(match)

    if not os.path.exists(os.path.dirname(resultFile)):
        os.makedirs(os.path.dirname(resultFile))
    with open(resultFile, "w")as r:
        for ii in match:
            if ii[0][0] == 0:
                r.write("<{0},{1};{2}>\n".format(ii[1][1], ii[0][1], content[1]))
#                r.write("<{0},{1};{2}>\n".format(ii[1][1], ii[0][1], g[ii[0]][ii[1]]['weight']))
            elif ii[0][0] == 1:
                r.write("<{0},{1};{2}>\n".format(ii[0][1], ii[1][1],content[1]))
#                r.write("<{0},{1};{2}>\n".format(ii[0][1], ii[1][1], g[ii[0]][ii[1]]['weight']))
            print("ii")
            print(ii)
    extend(previousResult, resultFile, bipartiteGraph)

def maximalWeightedPerfectMatchingGenerator(bipartiteGraph, resultFile):
    g = nx.Graph()
    edges = []
    bipartite_data = open(bipartiteGraph, "r").read().splitlines()
    for line in bipartite_data:
        line_data = line.split(",")
        edge = [(int(line_data[0]), int(line_data[1])), (int(line_data[2]), int(line_data[3])), float(line_data[4])]
        edges.append(edge)
    for ii in edges:
        g.add_node(ii[0], bipartite=0)
        g.add_node(ii[1], bipartite=1)
    g.add_weighted_edges_from(edges)
    match = nx.max_weight_matching(g, maxcardinality=True) # maximizes the sum_e and number of matches
    if not os.path.exists(os.path.dirname(resultFile)):
        os.makedirs(os.path.dirname(resultFile))
    with open(resultFile, "w")as r:
        for ii in match:
            if ii[0][0]== 0:
#                r.write("<{0},{1};{2}>\n".format(ii[1][1], ii[0][1], g[ii[0]][ii[1]]['weight']))
                r.write("<{0},{1};{2}>\n".format(ii[1][1], ii[0][1], bipartiteGraph))
            elif ii[0][0] == 1:
#                r.write("<{0},{1};{2}>\n".format(ii[0][1], ii[1][1], g[ii[0]][ii[1]]['weight']))
                r.write("<{0},{1};{2}>\n".format(ii[0][1], ii[1][1], bipartiteGraph))


def extend(previousResultFile, resultFile, bipartiteFile):
    extendedResultSet = []
    currentResult = []
    previousResult = []
    #bipartiteFileName1 = ""
    bipartiteFileName2 = ""
    with open(resultFile,"r") as r:
        for line in r:
            temp = re.sub('[<>]', '', line)
            items = [l.split(',') for l in temp.strip().split(';')]
     #       print("MWM1")
     #       print(items)
            #bipartiteFileName1 = items[1]
            currentResult.append([items[0][0],items[0][1]])
    with open(previousResultFile,"r") as p:
        for line in p:
            temp = re.sub('[<>]', '', line)
            items = [l.split(',') for l in temp.strip().split(';')]
      #      print("MWM2")
       #     print(items)
            previousResult.append([items[0][0], items[0]][1])
            bipartiteFileName2 = items[1]
    #bipartiteFileName1 = " ".join(str(x) for x in bipartiteFileName1)
    bipartiteFileName2 = " ".join(str(x) for x in bipartiteFileName2)
    for i in previousResult:
        flag = 0
        for j in currentResult:
            if int(i[-1]) == int(j[0]):
                extendedResultSet.append([*i, j[1]])
                flag = 1
        if flag == 0:
            extendedResultSet.append([*i, str(0)])
    with open(resultFile, "w") as r:
        for i in extendedResultSet:
            string = ','.join(i)
            r.write("<"+string + ";" + bipartiteFileName2+","+ bipartiteFile+ ">\n")

