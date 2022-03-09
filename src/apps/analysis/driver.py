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
          #---------------------------------------------------------------------------
          #computing comunities in the multilayer graph
          communityDetectionAlgo = equation[0].lower()
          for i in range(0, layer_ct):
            communityFileName = analysis_objective[i]+communityDetectionAlgo
            print("community File Name: ", communityFileName)
            if communityDetectionAlgo == "louvain":
              print("louvain")
              fileString = BASE_DIR + "Layers\\communityFiles\\"+communityFileName+".vcomm"
              print(fileString)
              if  os.path.exists(fileString):
                MLN_file_paths[communityFileName] = fileString
              else:
                print("Call Louvain")
            elif communityDetectionAlgo == "infomap":
              print("infomap")
              fileString = BASE_DIR + "Layers\\communityFiles\\"+communityFileName+".vcomm"
              if os.path.exists(fileString):
                MLN_file_paths[communityFileName] = fileString
              else:
                #call infomap with MLN_file_path[MLN_structure[i]]
                print("Call Infomap")
            else:
              print("Please enter the correct community detection algorithm")
          #---------------------------------------------------------------------------
          #generating bipartite graphs
          if (weight_metrics := equation[1].lower()) not in WEIGHT_METRIC_FUNC.keys():
            raise ValueError(f'Invalid weight_metrics: \'{ weight_metrics }\'')

          for i in range(bi_layer_ct):

            AO1, AO2 = analysis_objective[i], analysis_objective[i+1]
            layer1         = MLN_file_paths[AO1]
            layer2         = MLN_file_paths[AO2]
            layer1CommFile = MLN_file_paths[AO1 + communityDetectionAlgo]
            layer2CommFile = MLN_file_paths[AO2 + communityDetectionAlgo]
            interlayer12   = MLN_file_paths[AO1 + AO2]
            simpleEdgeBipartiteFile = None

            resultFileString = f'expression{ str(count) }/bipartiteFiles/{ AO1 + AO2 }_{ weight_metrics }.bg'

            if count in output_dirs.keys():
              resultFileString = f'{ str(output_dirs[count]) }/{ resultFileString }'

            if 'we' in MLN_file_paths.keys():
              simpleEdgeBipartiteFile = MLN_file_paths[("we", AO1 + AO2)]

            if not os.path.exists(resultFileString):
              WEIGHT_METRIC_FUNC[ weight_metrics ](
                layer1, 
                layer2, 
                layer1CommFile, 
                layer2CommFile, 
                interlayer12, 
                simpleEdgeBipartiteFile,
                resultFileString
            )

            MLN_file_paths[(weight_metrics, AO1 + AO2)] = resultFileString


          #--------------------------------------------------------------------------
          #applying matching algorithm
          matchingAlgorithm = equation[2].lower()
          processedLayers = [analysis_objective[0]]
          processedLayersFilePath = {}
          for i in range(0, bi_layer_ct):
            if matchingAlgorithm == "mwm":
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
                    maximalWeightedMatchingExtender(processedLayersFilePath[analysis_objective[i]],
                                  MLN_file_paths[(weight_metrics,analysis_objective[i]+analysis_objective[i+1])],
                                   resultFileStringmwm, j)
                  else:
                    maximalWeightedMatchingExtender(processedLayersFilePath[analysis_objective[i]],
                                  MLN_file_paths[(weight_metrics,analysis_objective[i]+analysis_objective[i+1])],
                                   resultFileStringmwm, -1)
                MLN_file_paths[(
                matchingAlgorithm, analysis_objective[i] + analysis_objective[i + 1])] = resultFileStringmwm

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
                MLN_file_paths[(matchingAlgorithm, analysis_objective[i]+analysis_objective[i+1])] = resultFileStringmwm
              processedLayers.append(analysis_objective[i+1])
              processedLayersFilePath[analysis_objective[i+1]] = resultFileStringmwm

            elif matchingAlgorithm == "mwbc":
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
                matchingAlgorithm, analysis_objective[i] + analysis_objective[i + 1])] = resultFileStringmwbc

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
                MLN_file_paths[(matchingAlgorithm, analysis_objective[i]+analysis_objective[i+1])] = resultFileStringmwbc
              processedLayers.append(analysis_objective[i+1])
              processedLayersFilePath[analysis_objective[i+1]] = resultFileStringmwbc
              #print(processedLayers)
            elif matchingAlgorithm == "mwpm":
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
                matchingAlgorithm, analysis_objective[i] + analysis_objective[i + 1])] = resultFileStringmwpm

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
                MLN_file_paths[(matchingAlgorithm, analysis_objective[i]+analysis_objective[i+1])] = resultFileStringmwpm
              processedLayers.append(analysis_objective[i+1])
              processedLayersFilePath[analysis_objective[i+1]] = resultFileStringmwpm
              #print(processedLayers)
            elif matchingAlgorithm == "mwmt":
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
                matchingAlgorithm, analysis_objective[i] + analysis_objective[i + 1])] = resultFileStringmwmt

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
                MLN_file_paths[(matchingAlgorithm, analysis_objective[i]+analysis_objective[i+1])] = resultFileStringmwmt
              processedLayers.append(analysis_objective[i+1])
              processedLayersFilePath[analysis_objective[i+1]] = resultFileStringmwmt
              #print(processedLayers)
            elif matchingAlgorithm == "mwrmt":
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
                matchingAlgorithm, analysis_objective[i] + analysis_objective[i + 1])] = resultFileStringmwrmt

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
                MLN_file_paths[(matchingAlgorithm, analysis_objective[i]+analysis_objective[i+1])] = resultFileStringmwrmt
              processedLayers.append(analysis_objective[i+1])
              processedLayersFilePath[analysis_objective[i+1]] = resultFileStringmwrmt
              #print(processedLayers)
            elif matchingAlgorithm == "mwrm":
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
                matchingAlgorithm, analysis_objective[i] + analysis_objective[i + 1])] = resultFileStringmwrm

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
                MLN_file_paths[(matchingAlgorithm, analysis_objective[i]+analysis_objective[i+1])] = resultFileStringmwrm
              processedLayers.append(analysis_objective[i+1])
              processedLayersFilePath[analysis_objective[i+1]] = resultFileStringmwrm
              #print(processedLayers)                
            else:
              print("Please enter the correct matching algorithm")
          count += 1


#result <10(A),20(D),30(M); pathname of bipartite file of 10-20(A-D), pathname of bipartite file of 20-30(D-M)>


if __name__== "__main__":

  DEBUG = '-v' in sys.argv

  if '-b' in sys.argv:
    BASE_DIR = os.path.abspath( sys.argv[ sys.argv.index('-b') + 1 ] )
  else:
    BASE_DIR = os.path.abspath('.')

  if DEBUG: print(f'\nBASE_DIR: "{ BASE_DIR }"')

  with open( f'{BASE_DIR}/config.json', 'r') as f: config = json.load(f)

  if DEBUG:
    print('\nlayers: ')
    for k, v in config['layers'].items(): print(f' | {k: >30}: {v}')

  # main()
