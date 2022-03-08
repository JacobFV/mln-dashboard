import os
def get_comm_info(community_id, community_dict):
    community_id = str(community_id)
    if community_id in community_dict:
        return community_dict[community_id]
    else:
        return 0

def edgeFractionWeightedBipartiteGraphGenerator(layer1CommunityFile,
                                      layer2CommunityFile,
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







    with open(layer12SimpleEdgeBipartiteFile,"r") as fp:
        if not os.path.exists(os.path.dirname(resultFile)):
            os.makedirs(os.path.dirname(resultFile))
        fs = open(resultFile, "w")
        for items in fp:
            item = items.strip().split(",")
            actorComm = item[1]
            directorComm = item[3]
            edgesWeight = int(item[4])
            if actorComm in no_of_vertices_in_director_communities:
                ver1 = no_of_vertices_in_director_communities[actorComm]
            else:
                ver1 = 0
            if directorComm in no_of_vertices_in_movie_communities:
                ver2 = no_of_vertices_in_movie_communities[directorComm]
            else:
                ver2 = 0
            if ver1 > 1 and ver2 > 1:
                weight = (edgesWeight/(ver1 * ver2))
                if weight != 0:
                    fs.write("{0},{1},{2},{3},{4}\n".format("1",actorComm,"0", directorComm,weight, "\n"))






