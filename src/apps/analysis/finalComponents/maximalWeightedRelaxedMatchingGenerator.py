# MWM with relaxing the uniqueness constraint and DOES NOT include ties;
# number of matches equal to MWM; first sort the edges in MWM from low to high, then start replcing with the highest unique alternative edge
import networkx as nx
import os
import re
def maximalWeightedRelaxedMatchingExtender(previousResult, bipartiteGraph, resultFile, newLayerStatus):
  print("in extendor")
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
  print("content")
  print(content)
  print("matched coms1")
  print(matchedCommunities)
  print("matched coms2", newLayerStatus)
  print(matchedCommunities2)
  g = nx.Graph()
  edges = []
  bipartite_data = open(bipartiteGraph, "r").read().splitlines()
  for line in bipartite_data:
    line_data = line.split(",")
    #  print("line data")
    #  print(line_data)

    if newLayerStatus == -1:     # only ONE layer processed
      if ((line_data[1]) in matchedCommunities):
        edge = [(int(line_data[0]), int(line_data[1])), (int(line_data[2]), int(line_data[3])), float(line_data[4])]
        print(edge)
        edges.append(edge)
    else: # both layers processed
      if ((line_data[1]) in matchedCommunities and (line_data[3]) in matchedCommunities2):
        edge = [(int(line_data[0]), int(line_data[1])), (int(line_data[2]), int(line_data[3])), float(line_data[4])]
        edges.append(edge)        
  for ii in edges:
    g.add_node(ii[0], bipartite=0)
    g.add_node(ii[1], bipartite=1)
  g.add_weighted_edges_from(edges)
  cur_match = nx.max_weight_matching(g)
  print(cur_match)

#  match = cur_match
  weightMatch = {}
  for left, right in cur_match:
    if g[left][right]['weight'] not in weightMatch: # weight of this match
      weightMatch[g[left][right]['weight']] = [(left, right)]
    else:
      weightMatch[g[left][right]['weight']].append((left, right))
    
#  for key in weightMatch:
#    print(key, ": ", weightMatch[key])
      
  sorted_match = {} # sorted by weight
  for key in sorted(weightMatch.keys()):
    #print(key, ": ", weightMatch[key])
    for i in range(0, len(weightMatch[key])):
      sorted_match[weightMatch[key][i][0]] = weightMatch[key][i][1]
      #print(weightMatch[key][i], ",")
    
#  for left in sorted_match:
#    right = sorted_match[left]
#    print(left, right)    
  #print(sorted_match)

  matchingTable = {}

  for left in sorted_match: # check if higher or equal weighted edge is available
    right = sorted_match[left]
    left_max = g[left][right]['weight'] # initialize to MWM matched edge weight
    right_max = g[left][right]['weight']
    left_match = right # which nodes are higher from left; initialize to MWM matched vertex
#    right_match = [] # which nodes are higher from right
    for i,j in g[left].items():
      if i != right: # (left, right) needs to considered ONLY once during initialization
        if left_max < j['weight']:
          chk = 0 # checking if this edge is already considered or not
          if left not in matchingTable:
            chk = 1
          elif left in matchingTable:
            if i not in matchingTable[left]:
              chk = 1
          if chk == 1:
            left_match = i
            left_max = j['weight'] # we JUST CHECK for higher edge weight
    for i,j in g[right].items():
      if i != left:
        if right_max < j['weight']:
          chk = 0 # checking if this edge is already considered or not
          if right not in matchingTable:
            chk = 1
          elif right in matchingTable:
            if i not in matchingTable[right]:
              chk = 1
          if chk == 1:
            right_match = i
            right_max = j['weight']
    if left_max >= right_max: # is the unique weight from left higher or from right ?
#      for i in left_match:
      if left in matchingTable:
        if left_match not in matchingTable[left]: # it is not a set
          matchingTable[left].append(left_match)
      else:
        matchingTable[left] = [left_match]
      # adding both directions
      if left_match in matchingTable:
        if left not in matchingTable[left_match]:
          matchingTable[left_match].append(left)
      else:
        matchingTable[left_match] = [left]

    elif left_max < right_max:
#      for i in right_match:
      if right in matchingTable:
        if right_match not in matchingTable[right]: # it is not a set
          matchingTable[right].append(right_match)
      else:
        matchingTable[right] = [right_match]
      if right_match in matchingTable:
        if right not in matchingTable[right_match]:
          matchingTable[right_match].append(right)
      else:
        matchingTable[right_match] = [right]
####
  print("second phase ** ", matchingTable)
  if not os.path.exists(os.path.dirname(resultFile)):
    os.makedirs(os.path.dirname(resultFile))
  with open(resultFile, "w")as r:
    for k in matchingTable:
      if k[0] == 1:
        for i in range(0, len(matchingTable[k])):
          r.write("<{0},{1};{2}>\n".format(k[1], matchingTable[k][i][1], content[1]))
#          r.write("<{0},{1};{2}>\n".format(k[1], matchingTable[k][i][1], g[k][matchingTable[k][i]]['weight']))

    
  extend(previousResult, resultFile, bipartiteGraph)

def maximalWeightedRelaxedMatchingGenerator(bipartiteGraph, resultFile):
  print("in generator")
  # comment/uncomment the next line if testing with an example weighted biparite graph
  # bipartiteGraph = "D:\\UTA\ITLab\\HeMLN-Match\\v2-noweights\\IMDB-Top-500-Actors\\Analysis\\expression1-test\\bipartiteFiles\\AD_we.bg"
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
  cur_match = nx.max_weight_matching(g)
  print(cur_match)

  match = cur_match
  weightMatch = {}
  for left, right in cur_match:
    if g[left][right]['weight'] not in weightMatch: # weight of this match
      weightMatch[g[left][right]['weight']] = [(left, right)]
    else:
      weightMatch[g[left][right]['weight']].append((left, right))
    
#  for key in weightMatch:
#    print(key, ": ", weightMatch[key])
      
  sorted_match = {} # sorted by weight
  for key in sorted(weightMatch.keys()):
    #print(key, ": ", weightMatch[key])
    for i in range(0, len(weightMatch[key])):
      sorted_match[weightMatch[key][i][0]] = weightMatch[key][i][1]
      #print(weightMatch[key][i], ",")
    
#  for left in sorted_match:
#    right = sorted_match[left]
#    print(left, right)    
  #print(sorted_match)

  matchingTable = {}

  for left in sorted_match: # check if higher or equal weighted edge is available
    right = sorted_match[left]
    left_max = g[left][right]['weight'] # initialize to MWM matched edge weight
    right_max = g[left][right]['weight']
    left_match = right # which nodes are higher from left; initialize to MWM matched vertex
#    right_match = [] # which nodes are higher from right
    for i,j in g[left].items():
      if i != right: # (left, right) needs to considered ONLY once during initialization
        if left_max < j['weight']:
          chk = 0 # checking if this edge is already considered or not
          if left not in matchingTable:
            chk = 1
          elif left in matchingTable:
            if i not in matchingTable[left]:
              chk = 1
          if chk == 1:
            left_match = i
            left_max = j['weight'] # we JUST CHECK for higher edge weight
    for i,j in g[right].items():
      if i != left:
        if right_max < j['weight']:
          chk = 0 # checking if this edge is already considered or not
          if right not in matchingTable:
            chk = 1
          elif right in matchingTable:
            if i not in matchingTable[right]:
              chk = 1
          if chk == 1:
            right_match = i
            right_max = j['weight']
    if left_max >= right_max: # is the unique weight from left higher or from right ?
#      for i in left_match:
      if left in matchingTable:
        if left_match not in matchingTable[left]: # it is not a set
          matchingTable[left].append(left_match)
      else:
        matchingTable[left] = [left_match]
      # adding both directions
      if left_match in matchingTable:
        if left not in matchingTable[left_match]:
          matchingTable[left_match].append(left)
      else:
        matchingTable[left_match] = [left]

    elif left_max < right_max:
#      for i in right_match:
      if right in matchingTable:
        if right_match not in matchingTable[right]: # it is not a set
          matchingTable[right].append(right_match)
      else:
        matchingTable[right] = [right_match]
      if right_match in matchingTable:
        if right not in matchingTable[right_match]:
          matchingTable[right_match].append(right)
      else:
        matchingTable[right_match] = [right]

####
#  print(matchingTable)
  if not os.path.exists(os.path.dirname(resultFile)):
    os.makedirs(os.path.dirname(resultFile))
  with open(resultFile, "w")as r:
    for k in matchingTable:
      if k[0] == 1:
        for i in range(0, len(matchingTable[k])):
          r.write("<{0},{1};{2}>\n".format(k[1], matchingTable[k][i][1], bipartiteGraph))
#          r.write("<{0},{1};{2}>\n".format(k[1], matchingTable[k][i][1], g[k][matchingTable[k][i]]['weight']))
      #  else:
      #    r.write("<{0},{1};{2}>\n".format(matchingTable[k][i][1], k[1], bipartiteGraph))
#          r.write("<{0},{1};{2}>\n".format(matchingTable[k][i][1], k[1], g[k][matchingTable[k][i]]['weight']))


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
   #     print("MWM1")
   #     print(items)
      #bipartiteFileName1 = items[1]
      currentResult.append([items[0][0],items[0][1]])
  with open(previousResultFile,"r") as p:
    for line in p:
      temp = re.sub('[<>]', '', line)
      items = [l.split(',') for l in temp.strip().split(';')]
    #    print("MWM2")
     #   print(items)
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