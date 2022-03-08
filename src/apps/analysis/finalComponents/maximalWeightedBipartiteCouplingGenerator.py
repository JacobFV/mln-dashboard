import os
import re
def maximumWeightBipartiteCouplingExtender(previousResult, bipartiteFile, resultFile, newLayerStatus):
    layerTwoMatchingTable = {}
    matchedCommunities = []
    matchedCommunities2 = [] # to be used for new layer
    content = []
    with open(previousResult, "r") as p:
        for line in p:
            temp = re.sub('[<>]', '', line)
            content = [l.split(',') for l in temp.strip().split(';')]
            matchedCommunities.append(content[0][-1].strip())
            if newLayerStatus != -1:
                matchedCommunities2.append(content[0][newLayerStatus])

    if newLayerStatus == -1: # new layer
        with open(bipartiteFile, "r") as f:
            for line in f:
                items = line.strip().split(',')
                if items[1] in layerTwoMatchingTable:
                    previousWeight = float(layerTwoMatchingTable[items[1]][0])
                    if previousWeight == float(items[4]):
                        layerTwoMatchingTable[items[1]].append(items[3])
                    elif previousWeight < float(items[4]):
                        layerTwoMatchingTable[items[1]] = [items[4], items[3]]
                #elif not matchedCommunities:
                #   layerTwoMatchingTable[items[1]] = [items[4], items[3]]
                else:
                    if items[1] in matchedCommunities:
                        layerTwoMatchingTable[items[1]] = [items[4], items[3]]
            if not os.path.exists(os.path.dirname(resultFile)):
                os.makedirs(os.path.dirname(resultFile))
            with open(resultFile,"w") as r:
                for k in layerTwoMatchingTable:
                    for i in range(1, len(layerTwoMatchingTable[k])):
                        r.write("<{0},{1};{2}>\n".format (k ,layerTwoMatchingTable[k][i], content[1]))
    else: # already processed
        with open(bipartiteFile, "r") as f:
            for line in f:
                items = line.strip().split(',')
                if items[1] in layerTwoMatchingTable:
                    if items[3] in matchedCommunities2:
                        previousWeight = float(layerTwoMatchingTable[items[1]][0])
                        if previousWeight == float(items[4]):
                            layerTwoMatchingTable[items[1]].append(items[3])
                        elif previousWeight < float(items[4]):
                            layerTwoMatchingTable[items[1]] = [items[4], items[3]]
                #elif not matchedCommunities:
                 #  layerTwoMatchingTable[items[1]] = [items[4], items[3]]
                else:
                    if items[1] in matchedCommunities and items[3] in matchedCommunities2:
                        layerTwoMatchingTable[items[1]] = [items[4], items[3]]
            if not os.path.exists(os.path.dirname(resultFile)):
                os.makedirs(os.path.dirname(resultFile))
            with open(resultFile,"w") as r:
                for k in layerTwoMatchingTable:
                    for i in range(1, len(layerTwoMatchingTable[k])):
                        r.write("<{0},{1};{2}>\n".format (k, layerTwoMatchingTable[k][i], content[1]))
#                        r.write("<{0},{1};{2}>\n".format (k, layerTwoMatchingTable[k][i], layerTwoMatchingTable[k][0])) 

    extend(previousResult, resultFile, bipartiteFile)

def maximumWeightBipartiteCouplingGenerator(bipartiteFile, resultFile):
    layerTwoMatchingTable = {}
    with open(bipartiteFile, "r") as f:
        for line in f:
            items = line.strip().split(',')
            if items[1] in layerTwoMatchingTable:
                previousWeight = float(layerTwoMatchingTable[items[1]][0])
                if previousWeight == float(items[4]):
                    layerTwoMatchingTable[items[1]].append(items[3])
                elif previousWeight < float(items[4]):
                    layerTwoMatchingTable[items[1]] = [items[4], items[3]]
            else:
                layerTwoMatchingTable[items[1]] = [items[4], items[3]]
        if not os.path.exists(os.path.dirname(resultFile)):
            os.makedirs(os.path.dirname(resultFile))
        with open(resultFile,"w") as r:
            for k in layerTwoMatchingTable:
                for i in range(1, len(layerTwoMatchingTable[k])):
                    r.write("<{0},{1};{2}>\n".format (k , layerTwoMatchingTable[k][i],bipartiteFile))
#                    r.write("<{0},{1};{2}>\n".format (k , layerTwoMatchingTable[k][i],layerTwoMatchingTable[k][0]))


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