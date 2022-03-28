import sys
import os
import regex as re
import json

from gen.maximalWeightedMatchingGenerator import *
from gen.maximalWeightedBipartiteCouplingGenerator import *
from gen.maximalWeightedMatchingWithTiesGenerator_time import *
from gen.maximalWeightedPerfectMatchingGenerator import *
from gen.maximalWeightedMatchingRelaxedWithTiesGenerator import *
from gen.maximalWeightedRelaxedMatchingGenerator import *

from gen.edgeWeightBipartiteGraphGenerator_WithoutSingleton_time import *
from gen.edgeFractionWeightBipartiteGraphGenerator import *
from gen.densityWeightedBipartiteGraphGenerator import *
from gen.participationWeightedBipartiteGraphGenerator import *
from gen.participatingHubsBipartiteGraphGenerator import *

# bgg = bipartite graph generator
WEIGHT_METRIC_FUNC = {
  'we': edge_weight_bgg,
  'wf': edge_fraction_bgg,
  'wd': density_weighted_bgg,
  'wp': participation_weighted_bgg,
  'wh': participating_hubs_bgg
}

# community detection algorithms
COMM_ALGO_FUNC = {
  'louvain': lambda *args: f'louvain({args})',
  'infomap': lambda *args: f'infomap({args})'
}


def main():

  with open(sys.argv[1], 'r') as mln_file:

    MLN_file_paths = {}

    for line in mln_file:
      if line[0] in '#/': continue
      else:
        layers = line.strip().split("=")
        if layers[0].strip() == 'BASE':
          break
        MLN_file_paths[layers[0].strip()] = layers[1].strip()
    BASE_DIR = layers[1].strip()

    for line in mln_file:
      if line[0] in '#/': continue
      else:
        layers = line.strip().split("=")
        MLN_file_paths[layers[0].strip()] = BASE_DIR + layers[1].strip()

    if 'HeMLN' in MLN_file_paths:
      MLN_structure = MLN_file_paths['HeMLN'].split(",")

        
  with open(sys.argv[2], 'r') as analysis_file:
    count = 1
    flag = 0
    output_dirs = {}
    for line in analysis_file:

      if line[0] in '#/': continue
      else:

        # No examples for analysis configuration that match
        # this case (first character in line being `0`)
        if line[0] == "O":
          output_dirs[count] = line.split('=')[1].strip()

        else:
          equation = line.strip().split(",")
          analysis_objective = equation[3].strip().split("-")
          bi_layer_ct = len(analysis_objective)-1
          layers = set(equation[3].strip().split("-"))
          print("***layers", layers)
          print("**exp", analysis_objective)
          print("**number of bipartite", bi_layer_ct)
          layer_ct = len(layers)
          print("number of layers in analysis: ", layer_ct)





          #--------------------------------------------------------------------------
          # Apply matching algorithms

          processedLayers = [analysis_objective[0]]
          processedLayersFilePath = {}
          for i in range(0, bi_layer_ct):

            match_name = f''
            match_path = f''
            
            if OBJ['match_algo'] == "mwm":
              print("MWM")
              if i != 0:# and analysisObjective[i] in processedLayers:
                string = ""
                for j in range(0, i):
                  string += analysis_objective[j]
                if i == bi_layer_ct -1:
                  if count in output_dirs.keys():
                    fileString = str(output_dirs[count])
                    resultFileStringmwm = fileString + "/" + "expression"+str(count)+"/"+"MWM/FinalResults/" + \
                              string+\
                              analysis_objective[i] \
                              + analysis_objective[i + 1] + \
                              "_" + weight_metrics + \
                              "_" + communityDetectionAlgo + \
                              "_" + ".mwm"
                  else:

                    resultFileStringmwm = "expression"+str(count)+"/"+"MWM/FinalResults/"  + \
                               string+\
                              analysis_objective[i] \
                              + analysis_objective[i + 1] + \
                              "_" + weight_metrics + \
                              "_" + communityDetectionAlgo + \
                              "_" + ".mwm"
                else:
                  if count in output_dirs.keys():
                    fileString = str(output_dirs[count])
                    resultFileStringmwm = fileString + "/" + "expression"+str(count)+"/"+ "MWM/FinalResults/" + \
                              string+\
                              analysis_objective[i] \
                              + analysis_objective[i + 1] + \
                              "_" + weight_metrics + \
                              "_" + communityDetectionAlgo + \
                              "_" + ".mwm"
                  else:
                    resultFileStringmwm = "expression"+str(count)+"/"+"MWM/" +string+analysis_objective[i] +\
                             analysis_objective[i + 1] +\
                            "_"+weight_metrics+\
                             "_" + communityDetectionAlgo+\
                             ".mwm"
                if not os.path.exists(resultFileStringmwm):
                  print("processed layers: ", processedLayers)
                  if analysis_objective[i+1] in processedLayers: # check if both layers have been processed
                    print("same layer", analysis_objective[i+1])
                    for j in range(0, i-1):
                      if analysis_objective[j] == analysis_objective[i+1]:
                        break
                    maximalWeightedMatchingExtender(
                      processedLayersFilePath[analysis_objective[i]],
                      MLN_file_paths[(weight_metrics,analysis_objective[i]+analysis_objective[i+1])],
                      resultFileStringmwm, 
                      j
                    )

                  else:
                    maximalWeightedMatchingExtender(
                      processedLayersFilePath[analysis_objective[i]],
                      MLN_file_paths[(weight_metrics,analysis_objective[i]+analysis_objective[i+1])],
                      resultFileStringmwm, 
                      -1
                    )

                MLN_file_paths[( OBJ['match_algo'], analysis_objective[i] + analysis_objective[i + 1])] = resultFileStringmwm

              else:
                if i == bi_layer_ct -1:
                  string = ""
                  for j in range(0, i):
                    string += analysis_objective[j]
                  if count in output_dirs.keys():
                    fileString = str(output_dirs[count])
                    resultFileStringmwm = fileString + "/" + "expression"+str(count)+"/" +"MWM/FinalResults/" + \
                              string+\
                              analysis_objective[i] \
                              + analysis_objective[i + 1] + \
                              "_" + weight_metrics + \
                              "_" + communityDetectionAlgo + \
                              "_" + ".mwm"
                  else:
                    resultFileStringmwm = "expression"+str(count)+"/"+"MWM/FinalResults/" + \
                               string+\
                              analysis_objective[i] \
                              + analysis_objective[i + 1] + \
                              "_" + weight_metrics + \
                              "_" + communityDetectionAlgo + \
                              "_" + ".mwm"
                else:
                  if count in output_dirs.keys():
                    fileString = str(output_dirs[count])
                    resultFileStringmwm = fileString + "/" + "expression"+str(count)+"/" +"MWM/FinalResults/" + \
                              analysis_objective[i] \
                              + analysis_objective[i + 1] + \
                              "_" + weight_metrics + \
                              "_" + communityDetectionAlgo + \
                              "_" + ".mwm"
                  else:
                    resultFileStringmwm = "expression"+str(count)+"/"+"MWM/"+analysis_objective[i]+\
                             analysis_objective[i+1]+ \
                             "_" + weight_metrics + \
                             "_" + communityDetectionAlgo + \
                             ".mwm"
                if not os.path.exists(resultFileStringmwm):
                  maximalWeightedMatchingGenerator(MLN_file_paths[(weight_metrics,analysis_objective[i]+analysis_objective[i+1])],
                                  resultFileStringmwm)


                MLN_file_paths[(OBJ['match_algo'], analysis_objective[i]+analysis_objective[i+1])] = resultFileStringmwm

              processedLayers.append(analysis_objective[i+1])
              processedLayersFilePath[analysis_objective[i+1]] = resultFileStringmwm

            elif OBJ['match_algo'] == "mwbc":
              print("MWBC")
              if i != 0: #analysisObjective[i] in processedLayers:
                string = ""
                for j in range(0, i):
                  string += analysis_objective[j]
                if i == bi_layer_ct -1:
                  if count in output_dirs.keys():
                    fileString = str(output_dirs[count])
                    resultFileStringmwbc = fileString + "/" + "expression"+str(count)+"/" +"MWBC/FinalResults/" + \
                              string+\
                              analysis_objective[i] \
                              + analysis_objective[i + 1] + \
                              "_" + weight_metrics + \
                              "_" + communityDetectionAlgo + \
                              "_" + ".mwbc"
                  else:

                    resultFileStringmwbc = "expression"+str(count)+"/"+"MWBC/FinalResults/"  + \
                               string+\
                              analysis_objective[i] \
                              + analysis_objective[i + 1] + \
                              "_" + weight_metrics + \
                              "_" + communityDetectionAlgo + \
                              "_" + ".mwbc"
                else:
                  if count in output_dirs.keys():
                    fileString = str(output_dirs[count])
                    resultFileStringmwbc = fileString + "/" + "expression"+str(count)+"/" + "MWBC/FinalResults/" + \
                              string+\
                              analysis_objective[i] \
                              + analysis_objective[i + 1] + \
                              "_" + weight_metrics + \
                              "_" + communityDetectionAlgo + \
                              "_" + ".mwbc"
                  else:
                    resultFileStringmwbc = "expression"+str(count)+"/"+"MWBC/" +string+analysis_objective[i] +\
                             analysis_objective[i + 1] +\
                            "_"+weight_metrics+\
                             "_" + communityDetectionAlgo+\
                             ".mwbc"
                if not os.path.exists(resultFileStringmwbc):
                  print("processed layers: ", processedLayers)
                  if analysis_objective[i+1] in processedLayers: # check if both layers have been processed
                    print("same layer", analysis_objective[i+1])
                    for j in range(0, i-1):
                      if analysis_objective[j] == analysis_objective[i+1]:
                        break
                    maximumWeightBipartiteCouplingExtender(processedLayersFilePath[analysis_objective[i]],
                                  MLN_file_paths[(weight_metrics,analysis_objective[i]+analysis_objective[i+1])],
                                   resultFileStringmwbc, j)
                  else:
                    maximumWeightBipartiteCouplingExtender(processedLayersFilePath[analysis_objective[i]],
                                  MLN_file_paths[(weight_metrics,analysis_objective[i]+analysis_objective[i+1])],
                                   resultFileStringmwbc, -1)
                MLN_file_paths[(
                OBJ['match_algo'], analysis_objective[i] + analysis_objective[i + 1])] = resultFileStringmwbc

              else:
                if i == bi_layer_ct -1:
                  string = ""
                  for j in range(0, i):
                    string += analysis_objective[j]
                  if count in output_dirs.keys():
                    fileString = str(output_dirs[count])
                    resultFileStringmwbc = fileString + "/" + "expression"+str(count)+"/" +"MWBC/FinalResults/" + \
                              string+\
                              analysis_objective[i] \
                              + analysis_objective[i + 1] + \
                              "_" + weight_metrics + \
                              "_" + communityDetectionAlgo + \
                              "_" + ".mwbc"
                  else:
                    resultFileStringmwbc = "expression"+str(count)+"/"+"MWBC/FinalResults/" + \
                               string+\
                              analysis_objective[i] \
                              + analysis_objective[i + 1] + \
                              "_" + weight_metrics + \
                              "_" + communityDetectionAlgo + \
                              "_" + ".mwbc"
                else:
                  if count in output_dirs.keys():
                    fileString = str(output_dirs[count])
                    resultFileStringmwbc = fileString + "/" + "expression"+str(count)+"/" +"MWBC/FinalResults/" + \
                              analysis_objective[i] \
                              + analysis_objective[i + 1] + \
                              "_" + weight_metrics + \
                              "_" + communityDetectionAlgo + \
                              "_" + ".mwbc"
                  else:
                    resultFileStringmwbc = "expression"+str(count)+"/"+"MWBC/"+analysis_objective[i]+\
                             analysis_objective[i+1]+ \
                             "_" + weight_metrics + \
                             "_" + communityDetectionAlgo + \
                             ".mwbc"
                if not os.path.exists(resultFileStringmwbc):
                  maximumWeightBipartiteCouplingGenerator(MLN_file_paths[(weight_metrics,analysis_objective[i]+analysis_objective[i+1])],
                                  resultFileStringmwbc)
                MLN_file_paths[(OBJ['match_algo'], analysis_objective[i]+analysis_objective[i+1])] = resultFileStringmwbc
              processedLayers.append(analysis_objective[i+1])
              processedLayersFilePath[analysis_objective[i+1]] = resultFileStringmwbc
              #print(processedLayers)
            
            elif OBJ['match_algo'] == "mwpm":
              print("MWPM")
              if i != 0: #analysisObjective[i] in processedLayers:
                string = ""
                for j in range(0, i):
                  string += analysis_objective[j]
                if i == bi_layer_ct -1:
                  if count in output_dirs.keys():
                    fileString = str(output_dirs[count])
                    resultFileStringmwpm = fileString + "/" + "expression"+str(count)+"/" +"MWPM/FinalResults/" + \
                              string+\
                              analysis_objective[i] \
                              + analysis_objective[i + 1] + \
                              "_" + weight_metrics + \
                              "_" + communityDetectionAlgo + \
                              "_" + ".mwpm"
                  else:

                    resultFileStringmwpm = "expression"+str(count)+"/"+"MWPM/FinalResults/"  + \
                               string+\
                              analysis_objective[i] \
                              + analysis_objective[i + 1] + \
                              "_" + weight_metrics + \
                              "_" + communityDetectionAlgo + \
                              "_" + ".mwpm"
                else:
                  if count in output_dirs.keys():
                    fileString = str(output_dirs[count])
                    resultFileStringmwpm = fileString + "/" + "expression"+str(count)+"/" + "MWPM/FinalResults/" + \
                              string+\
                              analysis_objective[i] \
                              + analysis_objective[i + 1] + \
                              "_" + weight_metrics + \
                              "_" + communityDetectionAlgo + \
                              "_" + ".mwpm"
                  else:
                    resultFileStringmwpm = "expression"+str(count)+"/"+"MWPM/" +string+analysis_objective[i] +\
                             analysis_objective[i + 1] +\
                            "_"+weight_metrics+\
                             "_" + communityDetectionAlgo+\
                             ".mwpm"
                if not os.path.exists(resultFileStringmwpm):
                  print("processed layers: ", processedLayers)
                  if analysis_objective[i+1] in processedLayers: # check if both layers have been processed
                    print("same layer", analysis_objective[i+1])
                    for j in range(0, i-1):
                      if analysis_objective[j] == analysis_objective[i+1]:
                        break
                    maximalWeightedPerfectMatchingExtender(processedLayersFilePath[analysis_objective[i]],
                                  MLN_file_paths[(weight_metrics,analysis_objective[i]+analysis_objective[i+1])],
                                   resultFileStringmwpm, j)
                  else:
                    maximalWeightedPerfectMatchingExtender(processedLayersFilePath[analysis_objective[i]],
                                  MLN_file_paths[(weight_metrics,analysis_objective[i]+analysis_objective[i+1])],
                                   resultFileStringmwpm, -1)
                MLN_file_paths[(
                OBJ['match_algo'], analysis_objective[i] + analysis_objective[i + 1])] = resultFileStringmwpm

              else:
                if i == bi_layer_ct -1:
                  string = ""
                  for j in range(0, i):
                    string += analysis_objective[j]
                  if count in output_dirs.keys():
                    fileString = str(output_dirs[count])
                    resultFileStringmwpm = fileString + "/" + "expression"+str(count)+"/" +"MWPM/FinalResults/" + \
                              string+\
                              analysis_objective[i] \
                              + analysis_objective[i + 1] + \
                              "_" + weight_metrics + \
                              "_" + communityDetectionAlgo + \
                              "_" + ".mwpm"
                  else:
                    resultFileStringmwpm = "expression"+str(count)+"/"+"MWPM/FinalResults/" + \
                               string+\
                              analysis_objective[i] \
                              + analysis_objective[i + 1] + \
                              "_" + weight_metrics + \
                              "_" + communityDetectionAlgo + \
                              "_" + ".mwpm"
                else:
                  if count in output_dirs.keys():
                    fileString = str(output_dirs[count])
                    resultFileStringmwpm = fileString + "/" + "expression"+str(count)+"/" +"MWPM/FinalResults/" + \
                              analysis_objective[i] \
                              + analysis_objective[i + 1] + \
                              "_" + weight_metrics + \
                              "_" + communityDetectionAlgo + \
                              "_" + ".mwpm"
                  else:
                    resultFileStringmwpm = "expression"+str(count)+"/"+"MWPM/"+analysis_objective[i]+\
                             analysis_objective[i+1]+ \
                             "_" + weight_metrics + \
                             "_" + communityDetectionAlgo + \
                             ".mwpm"
                if not os.path.exists(resultFileStringmwpm):
                  maximalWeightedPerfectMatchingGenerator(MLN_file_paths[(weight_metrics,analysis_objective[i]+analysis_objective[i+1])],
                                  resultFileStringmwpm)
                MLN_file_paths[(OBJ['match_algo'], analysis_objective[i]+analysis_objective[i+1])] = resultFileStringmwpm
              processedLayers.append(analysis_objective[i+1])
              processedLayersFilePath[analysis_objective[i+1]] = resultFileStringmwpm
              #print(processedLayers)
            
            elif OBJ['match_algo'] == "mwmt":
              print("MWMT")
              if i != 0: #analysisObjective[i] in processedLayers:
                string = ""
                for j in range(0, i):
                  string += analysis_objective[j]
                if i == bi_layer_ct -1:
                  if count in output_dirs.keys():
                    fileString = str(output_dirs[count])
                    resultFileStringmwmt = fileString + "/" + "expression"+str(count)+"/" +"MWMT/FinalResults/" + \
                              string+\
                              analysis_objective[i] \
                              + analysis_objective[i + 1] + \
                              "_" + weight_metrics + \
                              "_" + communityDetectionAlgo + \
                              "_" + ".mwmt"
                  else:

                    resultFileStringmwmt = "expression"+str(count)+"/"+"MWMT/FinalResults/"  + \
                               string+\
                              analysis_objective[i] \
                              + analysis_objective[i + 1] + \
                              "_" + weight_metrics + \
                              "_" + communityDetectionAlgo + \
                              "_" + ".mwmt"
                else:
                  if count in output_dirs.keys():
                    fileString = str(output_dirs[count])
                    resultFileStringmwmt = fileString + "/" + "expression"+str(count)+"/" + "MWMT/FinalResults/" + \
                              string+\
                              analysis_objective[i] \
                              + analysis_objective[i + 1] + \
                              "_" + weight_metrics + \
                              "_" + communityDetectionAlgo + \
                              "_" + ".mwmt"
                  else:
                    resultFileStringmwmt = "expression"+str(count)+"/"+"MWMT/" +string+analysis_objective[i] +\
                             analysis_objective[i + 1] +\
                            "_"+weight_metrics+\
                             "_" + communityDetectionAlgo+\
                             ".mwmt"
                if not os.path.exists(resultFileStringmwmt):
                  print("processed layers: ", processedLayers)
                  if analysis_objective[i+1] in processedLayers: # check if both layers have been processed
                    print("same layer", analysis_objective[i+1])
                    for j in range(0, i-1):
                      if analysis_objective[j] == analysis_objective[i+1]:
                        break
                    maximalWeightedMatchingWithTiesExtender(processedLayersFilePath[analysis_objective[i]],
                                  MLN_file_paths[(weight_metrics,analysis_objective[i]+analysis_objective[i+1])],
                                   resultFileStringmwmt, j)
                  else:
                    maximalWeightedMatchingWithTiesExtender(processedLayersFilePath[analysis_objective[i]],
                                  MLN_file_paths[(weight_metrics,analysis_objective[i]+analysis_objective[i+1])],
                                   resultFileStringmwmt, -1)
                MLN_file_paths[(
                OBJ['match_algo'], analysis_objective[i] + analysis_objective[i + 1])] = resultFileStringmwmt

              else:
                if i == bi_layer_ct -1:
                  string = ""
                  for j in range(0, i):
                    string += analysis_objective[j]
                  if count in output_dirs.keys():
                    fileString = str(output_dirs[count])
                    resultFileStringmwmt = fileString + "/" + "expression"+str(count)+"/" +"MWMT/FinalResults/" + \
                              string+\
                              analysis_objective[i] \
                              + analysis_objective[i + 1] + \
                              "_" + weight_metrics + \
                              "_" + communityDetectionAlgo + \
                              "_" + ".mwmt"
                  else:
                    resultFileStringmwmt = "expression"+str(count)+"/"+"MWMT/FinalResults/" + \
                               string+\
                              analysis_objective[i] \
                              + analysis_objective[i + 1] + \
                              "_" + weight_metrics + \
                              "_" + communityDetectionAlgo + \
                              "_" + ".mwmt"
                else:
                  if count in output_dirs.keys():
                    fileString = str(output_dirs[count])
                    resultFileStringmwmt = fileString + "/" + "expression"+str(count)+"/" +"MWMT/FinalResults/" + \
                              analysis_objective[i] \
                              + analysis_objective[i + 1] + \
                              "_" + weight_metrics + \
                              "_" + communityDetectionAlgo + \
                              "_" + ".mwmt"
                  else:
                    resultFileStringmwmt = "expression"+str(count)+"/"+"MWMT/"+analysis_objective[i]+\
                             analysis_objective[i+1]+ \
                             "_" + weight_metrics + \
                             "_" + communityDetectionAlgo + \
                             ".mwmt"
                if not os.path.exists(resultFileStringmwmt):
                  maximalWeightedMatchingWithTiesGenerator(MLN_file_paths[(weight_metrics,analysis_objective[i]+analysis_objective[i+1])],
                                  resultFileStringmwmt)
                MLN_file_paths[(OBJ['match_algo'], analysis_objective[i]+analysis_objective[i+1])] = resultFileStringmwmt
              processedLayers.append(analysis_objective[i+1])
              processedLayersFilePath[analysis_objective[i+1]] = resultFileStringmwmt
              #print(processedLayers)
            
            elif OBJ['match_algo'] == "mwrmt":
              print("MWRMT")
              if i != 0: #analysisObjective[i] in processedLayers:
                string = ""
                for j in range(0, i):
                  string += analysis_objective[j]
                if i == bi_layer_ct -1:
                  if count in output_dirs.keys():
                    fileString = str(output_dirs[count])
                    resultFileStringmwrmt = fileString + "/" + "expression"+str(count)+"/" +"MWRMT/FinalResults/" + \
                              string+\
                              analysis_objective[i] \
                              + analysis_objective[i + 1] + \
                              "_" + weight_metrics + \
                              "_" + communityDetectionAlgo + \
                              "_" + ".mwrmt"
                  else:

                    resultFileStringmwrmt = "expression"+str(count)+"/"+"MWRMT/FinalResults/"  + \
                               string+\
                              analysis_objective[i] \
                              + analysis_objective[i + 1] + \
                              "_" + weight_metrics + \
                              "_" + communityDetectionAlgo + \
                              "_" + ".mwrmt"
                else:
                  if count in output_dirs.keys():
                    fileString = str(output_dirs[count])
                    resultFileStringmwrmt = fileString + "/" + "expression"+str(count)+"/" + "MWRMT/FinalResults/" + \
                              string+\
                              analysis_objective[i] \
                              + analysis_objective[i + 1] + \
                              "_" + weight_metrics + \
                              "_" + communityDetectionAlgo + \
                              "_" + ".mwrmt"
                  else:
                    resultFileStringmwrmt = "expression"+str(count)+"/"+"MWRMT/" +string+analysis_objective[i] +\
                             analysis_objective[i + 1] +\
                            "_"+weight_metrics+\
                             "_" + communityDetectionAlgo+\
                             ".mwrmt"
                if not os.path.exists(resultFileStringmwrmt):
                  print("processed layers: ", processedLayers)
                  if analysis_objective[i+1] in processedLayers: # check if both layers have been processed
                    print("same layer", analysis_objective[i+1])
                    for j in range(0, i-1):
                      if analysis_objective[j] == analysis_objective[i+1]:
                        break
                    maximalWeightedMatchingRelaxedWithTiesExtender(processedLayersFilePath[analysis_objective[i]],
                                  MLN_file_paths[(weight_metrics,analysis_objective[i]+analysis_objective[i+1])],
                                   resultFileStringmwrmt, j)
                  else:
                    maximalWeightedMatchingRelaxedWithTiesExtender(processedLayersFilePath[analysis_objective[i]],
                                  MLN_file_paths[(weight_metrics,analysis_objective[i]+analysis_objective[i+1])],
                                   resultFileStringmwrmt, -1)
                MLN_file_paths[(
                OBJ['match_algo'], analysis_objective[i] + analysis_objective[i + 1])] = resultFileStringmwrmt

              else:
                if i == bi_layer_ct -1:
                  string = ""
                  for j in range(0, i):
                    string += analysis_objective[j]
                  if count in output_dirs.keys():
                    fileString = str(output_dirs[count])
                    resultFileStringmwrmt = fileString + "/" + "expression"+str(count)+"/" +"MWRMT/FinalResults/" + \
                              string+\
                              analysis_objective[i] \
                              + analysis_objective[i + 1] + \
                              "_" + weight_metrics + \
                              "_" + communityDetectionAlgo + \
                              "_" + ".mwrmt"
                  else:
                    resultFileStringmwrmt = "expression"+str(count)+"/"+"MWRMT/FinalResults/" + \
                               string+\
                              analysis_objective[i] \
                              + analysis_objective[i + 1] + \
                              "_" + weight_metrics + \
                              "_" + communityDetectionAlgo + \
                              "_" + ".mwrmt"
                else:
                  if count in output_dirs.keys():
                    fileString = str(output_dirs[count])
                    resultFileStringmwrmt = fileString + "/" + "expression"+str(count)+"/" +"MWRMT/FinalResults/" + \
                              analysis_objective[i] \
                              + analysis_objective[i + 1] + \
                              "_" + weight_metrics + \
                              "_" + communityDetectionAlgo + \
                              "_" + ".mwrmt"
                  else:
                    resultFileStringmwrmt = "expression"+str(count)+"/"+"MWRMT/"+analysis_objective[i]+\
                             analysis_objective[i+1]+ \
                             "_" + weight_metrics + \
                             "_" + communityDetectionAlgo + \
                             ".mwrmt"
                if not os.path.exists(resultFileStringmwrmt):
                  maximalWeightedMatchingRelaxedWithTiesGenerator(MLN_file_paths[(weight_metrics,analysis_objective[i]+analysis_objective[i+1])],
                                  resultFileStringmwrmt)
                MLN_file_paths[(OBJ['match_algo'], analysis_objective[i]+analysis_objective[i+1])] = resultFileStringmwrmt
              processedLayers.append(analysis_objective[i+1])
              processedLayersFilePath[analysis_objective[i+1]] = resultFileStringmwrmt
              #print(processedLayers)
            
            elif OBJ['match_algo'] == "mwrm":
              print("MWRM")
              if i != 0: #analysisObjective[i] in processedLayers:
                string = ""
                for j in range(0, i):
                  string += analysis_objective[j]
                if i == bi_layer_ct -1:
                  if count in output_dirs.keys():
                    fileString = str(output_dirs[count])
                    resultFileStringmwrm = fileString + "/" + "expression"+str(count)+"/" +"MWRM/FinalResults/" + \
                              string+\
                              analysis_objective[i] \
                              + analysis_objective[i + 1] + \
                              "_" + weight_metrics + \
                              "_" + communityDetectionAlgo + \
                              "_" + ".mwrm"
                  else:

                    resultFileStringmwrm = "expression"+str(count)+"/"+"MWRM/FinalResults/"  + \
                               string+\
                              analysis_objective[i] \
                              + analysis_objective[i + 1] + \
                              "_" + weight_metrics + \
                              "_" + communityDetectionAlgo + \
                              "_" + ".mwrm"
                else:
                  if count in output_dirs.keys():
                    fileString = str(output_dirs[count])
                    resultFileStringmwrm = fileString + "/" + "expression"+str(count)+"/" + "MWRM/FinalResults/" + \
                              string+\
                              analysis_objective[i] \
                              + analysis_objective[i + 1] + \
                              "_" + weight_metrics + \
                              "_" + communityDetectionAlgo + \
                              "_" + ".mwrm"
                  else:
                    resultFileStringmwrm = "expression"+str(count)+"/"+"MWRM/" +string+analysis_objective[i] +\
                             analysis_objective[i + 1] +\
                            "_"+weight_metrics+\
                             "_" + communityDetectionAlgo+\
                             ".mwrm"
                if not os.path.exists(resultFileStringmwrm):
                  print("processed layers: ", processedLayers)
                  if analysis_objective[i+1] in processedLayers: # check if both layers have been processed
                    print("same layer", analysis_objective[i+1])
                    for j in range(0, i-1):
                      if analysis_objective[j] == analysis_objective[i+1]:
                        break
                    maximalWeightedRelaxedMatchingExtender(processedLayersFilePath[analysis_objective[i]],
                                  MLN_file_paths[(weight_metrics,analysis_objective[i]+analysis_objective[i+1])],
                                   resultFileStringmwrm, j)
                  else:
                    maximalWeightedRelaxedMatchingExtender(processedLayersFilePath[analysis_objective[i]],
                                  MLN_file_paths[(weight_metrics,analysis_objective[i]+analysis_objective[i+1])],
                                   resultFileStringmwrm, -1)
                MLN_file_paths[(
                OBJ['match_algo'], analysis_objective[i] + analysis_objective[i + 1])] = resultFileStringmwrm

              else:
                if i == bi_layer_ct -1:
                  string = ""
                  for j in range(0, i):
                    string += analysis_objective[j]
                  if count in output_dirs.keys():
                    fileString = str(output_dirs[count])
                    resultFileStringmwrm = fileString + "/" + "expression"+str(count)+"/" +"MWRM/FinalResults/" + \
                              string+\
                              analysis_objective[i] \
                              + analysis_objective[i + 1] + \
                              "_" + weight_metrics + \
                              "_" + communityDetectionAlgo + \
                              "_" + ".mwrm"
                  else:
                    resultFileStringmwrm = "expression"+str(count)+"/"+"MWRM/FinalResults/" + \
                               string+\
                              analysis_objective[i] \
                              + analysis_objective[i + 1] + \
                              "_" + weight_metrics + \
                              "_" + communityDetectionAlgo + \
                              "_" + ".mwrm"
                else:
                  if count in output_dirs.keys():
                    fileString = str(output_dirs[count])
                    resultFileStringmwrm = fileString + "/" + "expression"+str(count)+"/" +"MWRM/FinalResults/" + \
                              analysis_objective[i] \
                              + analysis_objective[i + 1] + \
                              "_" + weight_metrics + \
                              "_" + communityDetectionAlgo + \
                              "_" + ".mwrm"
                  else:
                    resultFileStringmwrm = "expression"+str(count)+"/"+"MWRM/"+analysis_objective[i]+\
                             analysis_objective[i+1]+ \
                             "_" + weight_metrics + \
                             "_" + communityDetectionAlgo + \
                             ".mwrm"
                if not os.path.exists(resultFileStringmwrm):
                  maximalWeightedRelaxedMatchingGenerator(MLN_file_paths[(weight_metrics,analysis_objective[i]+analysis_objective[i+1])],
                                  resultFileStringmwrm)
                MLN_file_paths[(OBJ['match_algo'], analysis_objective[i]+analysis_objective[i+1])] = resultFileStringmwrm
              processedLayers.append(analysis_objective[i+1])
              processedLayersFilePath[analysis_objective[i+1]] = resultFileStringmwrm
              #print(processedLayers)                
            
            else:
              print("Please enter the correct matching algorithm")
          count += 1



if __name__== "__main__":

  DEBUG = '-v' in sys.argv

  if '-b' in sys.argv:
    BASE_DIR = os.path.abspath( sys.argv[ sys.argv.index('-b') + 1 ] )
  else:
    BASE_DIR = os.path.abspath( '.' )

  if DEBUG: print( f'\nBASE_DIR: "{ BASE_DIR }"' )

  with open( f'{ BASE_DIR }/config.json', 'r' ) as f: config = json.load(f)

  for k, v in config['layer_paths'].items():
    config['layer_paths'][k] = f'{ BASE_DIR }/{ v }' 

  if DEBUG:
    print( '\nLayer paths: ' )
    for k, v in config['layer_paths'].items(): print( f' | {k: >30}: {v}' )

  if DEBUG:
    print( '\nObjectives:' )
    for l in config['objectives']: print( f' | {l}' )


  for obj_num, obj in enumerate( config['objectives']) :

    # objective: "infomap,we,mwm,ActorFBLikes-DirectorAvgBudget"
    #   
    #    ⬇
    #
    # OBJ = {
    #   "comm_algo": "infomap", 
    #   "weight_metric": "we", 
    #   "matching_algo": "mwm", 
    #   "layers": ["ActorFBLikes", "DirectorAvgBudget"]
    # }

    tok = obj.split( ',' )
    OBJ = {
      "comm_algo": tok[0], 
      "weight_metric": tok[1], 
      "matching_algo": tok[2], 
      "layers": tok[3].split( '-' )
    }


    #---------------------------------------------------------------------------
    # Community (comm) detection

    for i, layer in enumerate( OBJ[ 'layers' ] ):
      comm_name = f'{ layer }_{ OBJ["comm_algo"] }.vcomm'
      comm_path = f'{ BASE_DIR }/Analysis/obj{ obj_num }/comm/{ comm_name }'

      if os.path.exists( comm_path ):
        print( f'Community { comm_name } already exists.' )
      else:
        COMM_ALGO_FUNC[ OBJ[ 'comm_algo' ] ]( 

          'what are the arguments to these functions?' 

        )

        config['layer_paths'][comm_name] = comm_path


    #---------------------------------------------------------------------------
    # Bipartite graph (bg) generation

    for i in range( len( OBJ['layers'] ) - 1 ):

      L1, L2 = OBJ['layers'][i], OBJ['layers'][i+1]

      # TODO: not sure about this one!
      simpleEdgeBipartiteFile = None

      bg_name = f'{ L1 }-{ L2 }_{ OBJ["weight_metric"] }.bg'
      bg_path = f'{ BASE_DIR }/Analysis/obj{ obj_num }/bg/{ bg_name }'

      if bg_name not in config['layer_paths'].keys():
        WEIGHT_METRIC_FUNC[ OBJ["weight_metric"] ](

        # paths to L1 and L2
          config['layer_paths'][L1],
          config['layer_paths'][L2],

        # paths to L1 community and L2 community
          config['layer_paths'][ f'{ L1 }_{ OBJ["comm_algo"] }' ], 
          config['layer_paths'][ f'{ L2 }_{ OBJ["comm_algo"] }' ], 

        # path to L1/L2 interlayer
          config['layer_paths'][ f'{ L1 }{ L2 }' ], 

        # idk
          simpleEdgeBipartiteFile,

        # path where result is to be stored
          bg_path
        )

      config['layer_paths'][bg_name] = bg_path

  # main()
