# MWM with Ties
import networkx as nx
import os
import re
import time

def maximalWeightedMatchingWithTiesExtender(previousResult, bipartiteGraph, resultFile, newLayerStatus):
    matchedCommunities = []
    matchedCommunities2 = [] # for new layer
    content = []
    start_time = time.time()


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
#                print(edge)
                edges.append(edge)
        else: # both layers processed
            if ((line_data[1]) in matchedCommunities and (line_data[3]) in matchedCommunities2):
                edge = [(int(line_data[0]), int(line_data[1])), (int(line_data[2]), int(line_data[3])), float(line_data[4])]
                edges.append(edge)            
    for ii in edges:
        g.add_node(ii[0], bipartite=0)
        g.add_node(ii[1], bipartite=1)
    g.add_weighted_edges_from(edges)

    print("-- Extendor BEFORE MWMT %s seconds ---" % (time.time() - start_time))

    start_time = time.time()

    match = nx.max_weight_matching(g)
    #print("match")
    #print(match)


####
    matchingTable = {}
    for left, right in match:
        left_max = g[left][right]['weight']
        right_max = g[left][right]['weight']
        for i,j in g[left].items():
            if left_max == j['weight']:
                if left in matchingTable:
                    if i not in matchingTable[left]:
                        matchingTable[left].append(i)
                else:
                    matchingTable[left] = [i]
                if i in matchingTable:
                    if left not in matchingTable[i]:
                        matchingTable[i].append(left)
                else:
                    matchingTable[i] = [left]
        for i,j in g[right].items():
            if right_max == j['weight']:
                if right in matchingTable:
                    if i not in matchingTable[right]:
                        matchingTable[right].append(i)
                else:
                    matchingTable[right] = [i]
                if i in matchingTable:
                    if right not in matchingTable[i]:
                        matchingTable[i].append(right)
                else:
                    matchingTable[i] = [right]

    if not os.path.exists(os.path.dirname(resultFile)):
        os.makedirs(os.path.dirname(resultFile))
    with open(resultFile, "w")as r:
        for k in matchingTable:
            if k[0] == 1:
                for i in range(0, len(matchingTable[k])):
                    r.write("<{0},{1};{2}>\n".format(k[1], matchingTable[k][i][1], content[1]))
#                    r.write("<{0},{1};{2}>\n".format(k[1], matchingTable[k][i][1], g[k][matchingTable[k][i]]['weight']))

    extend(previousResult, resultFile, bipartiteGraph)

    print("-- MWMT with EXTENSION %s seconds ---" % (time.time() - start_time))
    
def maximalWeightedMatchingWithTiesGenerator(bipartiteGraph, resultFile):
    #print("in generator")
    start_time = time.time()    
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
    
    print("-- Generator Before MWMT %s seconds ---" % (time.time() - start_time))
    start_time = time.time()    
    
    match = nx.max_weight_matching(g)
    # Just for each matched edge check an edge with equal weight exists. If yes. append it to the list
    matchingTable = {}
 
#    print(match)
    for left, right in match:
        left_max = g[left][right]['weight']
        right_max = g[left][right]['weight']
#        left_match = [] # which nodes are higher from left
#        right_match = [] # which nodes are higher from right
        for i,j in g[left].items():
            if left_max == j['weight']:
                if left in matchingTable:
                    if i not in matchingTable[left]:
                        matchingTable[left].append(i)
                else:
                    matchingTable[left] = [i]
                if i in matchingTable:
                    if left not in matchingTable[i]:
                        matchingTable[i].append(left)
                else:
                    matchingTable[i] = [left]
        for i,j in g[right].items():
            if right_max == j['weight']:
                if right in matchingTable:
                    if i not in matchingTable[right]:
                        matchingTable[right].append(i)
                else:
                    matchingTable[right] = [i]
                if i in matchingTable:
                    if right not in matchingTable[i]:
                        matchingTable[i].append(right)
                else:
                    matchingTable[i] = [right]

    
#    for i in matchingTable:
#        print(i, matchingTable[i])

####
#    print(matchingTable)
    if not os.path.exists(os.path.dirname(resultFile)):
        os.makedirs(os.path.dirname(resultFile))
    with open(resultFile, "w")as r:
        for k in matchingTable:
            if k[0] == 1:
                for i in range(0, len(matchingTable[k])):
                    r.write("<{0},{1};{2}>\n".format(k[1], matchingTable[k][i][1], bipartiteGraph))
#                    r.write("<{0},{1};{2}>\n".format(k[1], matchingTable[k][i][1], g[k][matchingTable[k][i]]['weight']))
            #    else:
            #        r.write("<{0},{1};{2}>\n".format(matchingTable[k][i][1], k[1], bipartiteGraph))
#                    r.write("<{0},{1};{2}>\n".format(matchingTable[k][i][1], k[1], g[k][matchingTable[k][i]]['weight']))

    print("-- MWMT Generator %s seconds ---" % (time.time() - start_time))

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