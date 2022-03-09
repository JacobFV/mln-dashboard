import os

def density_weighted_bgg(
  layer1IntraEdgeFile, 
  layer2IntraEdgeFile, 
  layer1CommunityFile, 
  layer2CommunityFile, 
  interLayer12,
  simpleEdgeBipartiteFile, 
  resultFile
):

  layer1community_dict = {}
  layer1community_vertices = {}
  layer1community_edges = {}
    
  layer2community_dict = {}
  layer2community_vertices = {}
  layer2community_edges = {}

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

  with open(layer1IntraEdgeFile) as f:
    for line in f:
      line_data = line.strip().split(',')
      if len(line_data) > 2:
        if layer1community_dict[line_data[0]] == layer1community_dict[line_data[1]]:
          if layer1community_dict[line_data[0]] not in layer1community_edges:
            layer1community_edges[layer1community_dict[line_data[0]]] = 1
          else:
            layer1community_edges[layer1community_dict[line_data[0]]] += 1

  with open(layer2IntraEdgeFile) as f:
    for line in f:
      line_data = line.strip().split(',')
      if len(line_data) > 2:
        if layer2community_dict[line_data[0]] == layer2community_dict[line_data[1]]:
          if layer2community_dict[line_data[0]] not in layer2community_edges:
            layer2community_edges[layer2community_dict[line_data[0]]] = 1
          else:
            layer2community_edges[layer2community_dict[line_data[0]]] += 1

  with open(simpleEdgeBipartiteFile,"r") as fp:
    if not os.path.exists(os.path.dirname(resultFile)):
      os.makedirs(os.path.dirname(resultFile))
    fs = open(resultFile, "w")
    for items in fp:
      item = items.strip().split(",")
      layer1CommID = item[1]
      layer2CommID = item[3]
      edgesWeight = int(item[4])
      ver1 = layer1community_vertices[layer1CommID]
      ver2 = layer2community_vertices[layer2CommID]
      if ver1 > 1 and ver2 > 1:
        if layer1CommID in layer1community_vertices and layer1CommID in layer1community_edges:
          den1 = (2 * layer1community_edges[layer1CommID])/ ( layer1community_vertices[layer1CommID] * (layer1community_vertices[layer1CommID] - 1) )
        else:
          den1 = 0
        if layer2CommID in layer2community_vertices and layer2CommID in layer2community_edges:
          den2 = (2 * layer2community_edges[layer2CommID])/ ( layer2community_vertices[layer2CommID] * (layer2community_vertices[layer2CommID] - 1) )
        else:
          den2 = 0
        weight = den1 * den2 * (edgesWeight/(ver1 * ver2))
        if weight != 0:
          fs.write("{0},{1},{2},{3},{4}\n".format("1",layer1CommID,"0",layer2CommID,weight, "\n"))