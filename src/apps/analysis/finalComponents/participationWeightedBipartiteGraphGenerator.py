import os

def getCommId(vertexId, dict):
    return dict[vertexId]

def getNoOfVertices(commId, dict):
    return dict[commId]

def getDegree(vertexId, dict):
    if vertexId in dict:
        return dict[vertexId]
    else:
        return 0

def getAverageDegree(commId, dict):
    if commId in dict:
        return dict[commId]
    else:
        return 0

def getParticipation(commId, dict):
    if commId in dict:
        return dict[commId]
    else:
        return 0
def participationBipartiteGraphGenerator(layer1CommunityFile,
                                             layer2CommunityFile,
                                             layer1IntraEdgeFIle,
                                             layer2IntraEdgeFile,
                                             layer12InterEdgeFile,
                                             layer12SimpleEdgeBipartiteFile,
                                             resultFile):

    actorVertexToCommunityMapping = {}
    directorVertexToCommunityMapping = {}
    noOfVerticesInActorCommunities = {}
    noOfVerticesInDirectorCommunities = {}
    actorDirectorParticipation = {}
    directorActorParticipation = {}
    participatedActorsVertices = []
    participatedDirectotVertices = []


    with open(layer1CommunityFile, "r") as fp:
        for items in fp:
            item = items.split(" ")
            if len(items)>3:
                if item [0] not in actorVertexToCommunityMapping:
                    actorVertexToCommunityMapping[item[0]] = item[1]
                if item[1] not in noOfVerticesInActorCommunities:
                    noOfVerticesInActorCommunities[item[1]] = 1
                else:
                    noOfVerticesInActorCommunities[item[1]]+=1
    with open(layer2CommunityFile, "r") as fp:
        for items in fp:
            item = items.split(" ")
            if len(items)>3:
                if item [0] not in directorVertexToCommunityMapping:
                    directorVertexToCommunityMapping[item[0]] = item[1]
                if item[1] not in noOfVerticesInDirectorCommunities:
                    noOfVerticesInDirectorCommunities[item[1]] = 1
                else:
                    noOfVerticesInDirectorCommunities[item[1]]+=1





    actorVertexDegree = {}
    with open(layer1IntraEdgeFIle) as fp:
        for items in fp:
            item = items.strip().split(" ")
            if len(item) > 2:
                commid1 = getCommId(item[0], actorVertexToCommunityMapping)
                commid2 = getCommId(item[1], actorVertexToCommunityMapping)
                if commid1 == commid2:
                    if item[0] in actorVertexDegree:
                        actorVertexDegree[item[0]]+=1
                    else:
                        actorVertexDegree[item[0]] = 1
                    if item[1] in actorVertexDegree:
                        actorVertexDegree[item[1]]+=1
                    else:
                        actorVertexDegree[item[1]] = 1

        actorCommunityAvergeDegree = {}
        actorCommunityTotalDegree= {}
        for k,v in actorVertexDegree.items():
            commid = getCommId(k, actorVertexToCommunityMapping)
            if commid in actorCommunityTotalDegree:
                actorCommunityTotalDegree[commid]+=v
            else:
                actorCommunityTotalDegree[commid] = v

        for k,v in actorCommunityTotalDegree.items():
            noOfVertex = getNoOfVertices(k,noOfVerticesInActorCommunities)
            averageDegree = v/noOfVertex
            actorCommunityAvergeDegree[k] = averageDegree
    directoVertexDegree = {}
    with open(layer2IntraEdgeFile) as fp:
        for items in fp:
            item = items.strip().split(" ")
            if len(item) > 2:
                commid1 = getCommId(item[0], directorVertexToCommunityMapping)
                commid2 = getCommId(item[1], directorVertexToCommunityMapping)
                if commid1 == commid2:
                    if item[0] in directoVertexDegree:
                        directoVertexDegree[item[0]] += 1
                    else:
                        directoVertexDegree[item[0]] = 1
                    if item[1] in directoVertexDegree:
                        directoVertexDegree[item[1]] += 1
                    else:
                        directoVertexDegree[item[1]] = 1

        directorCommunityAvergeDegree = {}
        directorCommunityTotalDegree = {}
        for k, v in directoVertexDegree.items():
            commid = getCommId(k, directorVertexToCommunityMapping)
            if commid in directorCommunityTotalDegree:
                directorCommunityTotalDegree[commid] += v
            else:
                directorCommunityTotalDegree[commid] = v

        for k, v in directorCommunityTotalDegree.items():
            noOfVertex = getNoOfVertices(k, noOfVerticesInDirectorCommunities)
            averageDegree = v / noOfVertex
            directorCommunityAvergeDegree[k] = averageDegree




    with open(layer12InterEdgeFile, "r") as fp:
        for items in fp:
            item = items.strip().split(",")
            comm1 = getCommId(item[0], actorVertexToCommunityMapping)
            comm2 = getCommId(item[1], directorVertexToCommunityMapping)
            if item[0] not in participatedActorsVertices:
                if (comm1, comm2) in actorDirectorParticipation:
                    actorDirectorParticipation[(comm1, comm2)]+=1
                else:
                    actorDirectorParticipation[(comm1, comm2)] = 1
                participatedActorsVertices.append(item[0])

            if item[1] not in participatedDirectotVertices:
                if (comm2,comm1) in directorActorParticipation:
                    directorActorParticipation[(comm2,comm1)]+=1
                else:
                    directorActorParticipation[(comm2,comm1)] = 1
                participatedDirectotVertices.append(item[1])


    with open(layer12SimpleEdgeBipartiteFile,"r") as fp:
        if not os.path.exists(os.path.dirname(resultFile)):
            os.makedirs(os.path.dirname(resultFile))
        result_file = open(resultFile, "w")
        for items in fp:
            item = items.strip().split(",")
            actorComm = item[1]
            directorComm =  item[3]
            edgesWeight = int(item[4])
            noOfActorVertices = int(getNoOfVertices(actorComm, noOfVerticesInActorCommunities))
            noOfDirectorVertices = int(getNoOfVertices(directorComm, noOfVerticesInDirectorCommunities))
            if noOfActorVertices > 1 and noOfDirectorVertices >1:
                actorParticipation = int(getParticipation((actorComm,directorComm), actorDirectorParticipation))
                directorParticipation = int(getParticipation((directorComm, actorComm), directorActorParticipation))
                if actorParticipation > 0 and directorParticipation > 0:
                    weight = ((actorParticipation/noOfActorVertices) *
                              (edgesWeight/(noOfActorVertices*noOfDirectorVertices))*(directorParticipation/noOfDirectorVertices))
                    if weight != 0:
                        result_file.write("{0},{1},{2},{3},{4}\n".format("1",actorComm,"0", directorComm,weight, "\n"))

        result_file.close()

