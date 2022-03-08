import os
def get_comm_info(community_id, community_dict):
    community_id = str(community_id)
    if community_id in community_dict:
        return community_dict[community_id]
    else:
        return 0

def densityWeightedBipartiteGraphGenerator(layer1CommunityFile,
                                      layer2CommunityFile,
                                      layer1IntraEdgeFile,
                                      layer2IntraEdgeFile,
                                      layer12SimpleEdgeBipartiteFile,
                                      resultFile):

    layer1community_dict = {}
    layer2community_dict = {}
    layer1community_vertices = {}
    layer2community_vertices = {}
    with open(layer1CommunityFile) as f:
        for line in f:
            line_data = line.split(' ')
            if (len(line_data) == 3):
                layer1community_dict[line_data[0]] = line_data[1]
                if line_data[1] not in layer1community_vertices:
                    layer1community_vertices[line_data[1]] = 1
                else:
                    layer1community_vertices[line_data[1]]+=1

    with open(layer2CommunityFile) as f:
        for line in f:
            line_data = line.split(' ')
            if (len(line_data) == 3):
                layer2community_dict[line_data[0]] = line_data[1]
                if line_data[1] not in layer2community_vertices:
                    layer2community_vertices[line_data[1]] = 1
                else:
                    layer2community_vertices[line_data[1]]+=1






    def edge_density_weights(intraEdgeFile, communityFile):
        community_dict = {}
        community_vertices = {}
        community_edges = {}
        community_density = {}
        with open(communityFile) as f:
            for line in f:
                line_data = line.split(' ')
                if (len(line_data) == 3):
                    community_dict[line_data[0]] = line_data[1]
                    if line_data[1] not in community_vertices:
                        community_vertices[line_data[1]] = 1
                    else:
                        community_vertices[line_data[1]]+=1

        with open(intraEdgeFile) as f:
            for line in f:
                line_data = line.split(' ')
                if len(line_data) > 2 and line_data[0] != '':
                    #print("\n *** ", line_data)
                    if community_dict[line_data[0]] == community_dict[line_data[1]]:
                        if community_dict[line_data[0]] not in community_edges:
                            community_edges[community_dict[line_data[0]]] = 1
                        else:
                            community_edges[community_dict[line_data[0]]] += 1



        for comm_id in community_vertices:
            if community_vertices[comm_id] == 1:
                edge_density = 0
            else:
                edge_density = (2 * community_edges[comm_id]) / (community_vertices[comm_id] * (community_vertices[comm_id] - 1)) 
            community_density[comm_id] = edge_density
        return community_density





    layer1community_density = edge_density_weights(layer1IntraEdgeFile,layer1CommunityFile)
    layer2community_density = edge_density_weights(layer2IntraEdgeFile, layer2CommunityFile)
    with open(layer12SimpleEdgeBipartiteFile,"r") as fp:
        if not os.path.exists(os.path.dirname(resultFile)):
            os.makedirs(os.path.dirname(resultFile))
        fs = open(resultFile, "w")
        for items in fp:
            item = items.strip().split(",")
            layer1CommID = item[1]
            layer2CommID = item[3]
            edgesWeight = int(item[4])
            den1 = get_comm_info(layer1CommID, layer1community_density)
            den2 = get_comm_info(layer2CommID, layer2community_density)
            ver1 = layer1community_vertices[layer1CommID]
            ver2 = layer2community_vertices[layer2CommID]
            if ver1 > 1 and ver2 > 1:
                weight = den1 * den2 * (edgesWeight/(ver1 * ver2))
                if weight != 0:
                    fs.write("{0},{1},{2},{3},{4}\n".format("1",layer1CommID,"0",layer2CommID,weight, "\n"))