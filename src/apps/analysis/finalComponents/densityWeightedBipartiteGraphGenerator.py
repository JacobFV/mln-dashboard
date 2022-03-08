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

    director_community_info = []
    director_community_dict = {}
    movie_community_info = []
    movie_community_dict = {}
    no_of_vertices_in_movie_communities = {}
    no_of_vertices_in_director_communities = {}
    with open(layer1CommunityFile) as f:
        for line in f:
            director_community_info.append(line.split(' '))
        for i in director_community_info:
            if (len(i) == 3):
                director_community_dict[i[0]] = i[1]
                if i[1] not in no_of_vertices_in_director_communities:
                    no_of_vertices_in_director_communities[i[1]] = 1
                else:
                    no_of_vertices_in_director_communities[i[1]]+=1

    with open(layer2CommunityFile) as f:
        for line in f:
            movie_community_info.append(line.split(' '))
        for i in movie_community_info:
            if (len(i) == 3):
                movie_community_dict[i[0]] = i[1]
                if i[1] not in no_of_vertices_in_movie_communities:
                    no_of_vertices_in_movie_communities[i[1]] = 1
                else:
                    no_of_vertices_in_movie_communities[i[1]]+=1






    def edge_density_weights(intraEdgeFile, communityFile):
        graph_info = []
        edge_info_dict = {}
        community_info = []
        no_of_edges_in_community = {}
        community_dict = {}
        edge_density_of_community = {}
        with open(intraEdgeFile) as f:
            for line in f:
#                graph_info.append(line.split(' '))
#            for i in graph_info:
#                if len(i) > 2 :
#                    if i[0] not in edge_info_dict:
#                        edge_info_dict[i[0]] = [i[1]]
#                    else:
#                        edge_info_dict[i[0]].append(i[1])
                line-data = line.split(' ')
                if len(line-data) > 2 :
                    if i[0] not in edge_info_dict:
                        edge_info_dict[i[0]] = [i[1]]
                    else:
                        edge_info_dict[i[0]].append(i[1])

        # storing the vertices belonging to each community
        with open(communityFile) as f:
            for line in f:
                community_info.append(line.split(' '))
            for i in community_info:
                if (len(i) == 3):
                    if i[1] not in community_dict:
                        community_dict[i[1]] = [i[0]]
                    else:
                        community_dict[i[1]].append(i[0])


        for community_id in community_dict:
            temp =0
            for vertices in community_dict[community_id]:
                if vertices in edge_info_dict:
                    for vertex in edge_info_dict[vertices]:
                        if vertex in community_dict[community_id]:
                            no_of_edges_in_community[community_id] = temp+1
                            temp+=1
        for comm_id in no_of_edges_in_community:
            vertices_count = len(community_dict[comm_id])
            edge_density = (2 * no_of_edges_in_community[comm_id]) / (vertices_count * (vertices_count - 1))
            edge_density_of_community[comm_id] = edge_density
        return edge_density_of_community





    director_communities_density = edge_density_weights(layer1IntraEdgeFile,layer1CommunityFile)
    movie_communities_density = edge_density_weights(layer2IntraEdgeFile, layer2CommunityFile)
    with open(layer12SimpleEdgeBipartiteFile,"r") as fp:
        if not os.path.exists(os.path.dirname(resultFile)):
            os.makedirs(os.path.dirname(resultFile))
        fs = open(resultFile, "w")
        for items in fp:
            item = items.strip().split(",")
            actorComm = item[1]
            directorComm = item[3]
            edgesWeight = int(item[4])
            den1 = get_comm_info(actorComm, director_communities_density)
            den2 = get_comm_info(directorComm, movie_communities_density)
            ver1 = no_of_vertices_in_director_communities[actorComm]
            ver2 = no_of_vertices_in_movie_communities[directorComm]
            if ver1 > 1 and ver2 > 1:
                weight = den1 * den2 * (edgesWeight/(ver1 * ver2))
                if weight != 0:
                    fs.write("{0},{1},{2},{3},{4}\n".format("1",actorComm,"0", directorComm,weight, "\n"))






