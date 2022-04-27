import os

def edge_fraction_bgg(
  layer1,
  layer2,
  layer1CommunityFile,
  layer2CommunityFile,
  layer12SimpleEdgeBipartiteFile,
  simpleEdgeBipartiteFile,
  resultFile
):

  layer1community_info = []
  layer1community_dict = {}

  layer2community_info = []
  layer2community_dict = {}

  layer1community_vertices = {}
  layer2community_vertices = {}

  i = 0
  with open(layer1CommunityFile) as f:
    for line in f:
      i = i + 1
      line_data = line.strip().split(',')
      if (i >= 8):
        layer1community_dict[line_data[0]] = line_data[1]
        if line_data[1] not in layer1community_vertices:
          layer1community_vertices[line_data[1]] = 1
        else:
          layer1community_vertices[line_data[1]]+=1
  i = 0
  with open(layer2CommunityFile) as f:
    for line in f:
      i = i + 1
      line_data = line.strip().split(',')
      if (i >= 8):
        layer2community_dict[line_data[0]] = line_data[1]
        if line_data[1] not in layer2community_vertices:
          layer2community_vertices[line_data[1]] = 1
        else:
          layer2community_vertices[line_data[1]]+=1

            
  with open(layer12SimpleEdgeBipartiteFile,"r") as fp:
    if not os.path.exists(os.path.dirname(resultFile)):
      os.makedirs(os.path.dirname(resultFile))
    fs = open(resultFile, "w")
    for items in fp:
      item = items.strip().split(",")
      comm1 = item[1]
      comm2 = item[3]
      edgesWeight = int(item[4])
      if comm1 in layer1community_vertices:
        ver1 = layer1community_vertices[comm1]
      else:
        ver1 = 0
      if comm2 in layer2community_vertices:
        ver2 = layer2community_vertices[comm2]
      else:
        ver2 = 0
      if ver1 > 1 and ver2 > 1:
        weight = (edgesWeight/(ver1 * ver2))
        if weight != 0:
          fs.write("{0},{1},{2},{3},{4}\n".format("1",comm1,"0",comm2,weight, "\n"))