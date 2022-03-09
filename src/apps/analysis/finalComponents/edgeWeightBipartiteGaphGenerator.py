import os


def get_comm_no(community_id, community_dict):
  community_id = str(community_id)
  if community_id in community_dict:
    return community_dict[community_id]
  else:
    return 0


def edgeWeightBipartiteGraphGenerator(
  layer1, 
  layer2, 
  layer1CommunityFile, 
  layer2CommunityFile, 
  layer12InterEdgeFile, 
  resultFile
):

  # it looks like this was written for the IMDb dataset in particular.
  # shouldn't it be more general?
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
      if len(i) == 3:
        director_community_dict[i[0]] = i[1]
        if i[1] not in no_of_vertices_in_director_communities:
          no_of_vertices_in_director_communities[i[1]] = 1
        else:
          no_of_vertices_in_director_communities[i[1]] += 1

  with open(layer2CommunityFile) as f:
    for line in f:
      movie_community_info.append(line.split(' '))
    for i in movie_community_info:
      if (len(i) == 3):
        movie_community_dict[i[0]] = i[1]
        if i[1] not in no_of_vertices_in_movie_communities:
          no_of_vertices_in_movie_communities[i[1]] = 1
        else:
          no_of_vertices_in_movie_communities[i[1]] += 1
  edges_between_director_movie_communities = {}
  with open(layer12InterEdgeFile) as b:
    for line in b:
      item = line.strip().split(',')
      comm1 = get_comm_no(item[0], director_community_dict)
      comm2 = get_comm_no(item[1], movie_community_dict)
      if comm1 in no_of_vertices_in_director_communities:
        ver1 = no_of_vertices_in_director_communities[comm1]
      else:
        ver1 = 0
      if comm2 in no_of_vertices_in_movie_communities:
        ver2 = no_of_vertices_in_movie_communities[comm2]
      else:
        ver2 = 0
      if ver1 > 0 and ver2 > 0:
        if (comm1, comm2) not in edges_between_director_movie_communities:
          edges_between_director_movie_communities[(comm1, comm2)] = 1
        else:
          edges_between_director_movie_communities[(comm1, comm2)] += 1
  if not os.path.exists(os.path.dirname(resultFile)):
    os.makedirs(os.path.dirname(resultFile))
  fs = open(resultFile, "w")
  for k, v in edges_between_director_movie_communities.items():
    fs.write("{0},{1},{2},{3},{4}\n".format("1", k[0], "0", k[1], v, "\n"))
