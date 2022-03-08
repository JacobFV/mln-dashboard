import sys
import os.path

from finalComponents.maximalWeightedMatchingGenerator import *
from finalComponents.maximalWeightedBipartiteCouplingGenerator import *
from finalComponents.maximalWeightedMatchingWithTiesGenerator_time import *
from finalComponents.maximalWeightedPerfectMatchingGenerator import *
from finalComponents.maximalWeightedMatchingRelaxedWithTiesGenerator import *
from finalComponents.maximalWeightedRelaxedMatchingGenerator import *

from finalComponents.edgeWeightBipartiteGraphGenerator_WithoutSingleton_time import *
from finalComponents.edgeFractionWeightBipartiteGraphGenerator import *
from finalComponents.densityWeightedBipartiteGraphGenerator import *
from finalComponents.participationWeightedBipartiteGraphGenerator import *
from finalComponents.participatingHubsBipartiteGraphGenerator import *

# bgg = bipartite graph generator
WEIGHT_METRIC_FUNC = {
  'we': edge_weight_bgg,
  'wf': edge_fraction_bgg,
  'wd': density_weighted_bgg,
  'wp': participation_weighted_bgg,
  'wh': participating_hubs_bgg
}


def main():
  with open(sys.argv[1], 'r') as mlnFile:
    mlnFilePaths = {}
    #MLN file contaning data set is processed
    for line in mlnFile:
      if line[0] in '#/': continue
      else:
        layers = line.strip().split("=")
        if layers[0].strip() == 'BASE':
          break
        mlnFilePaths[layers[0].strip()] = layers[1].strip()
    BASE_DIR = layers[1].strip()

    for line in mlnFile:
      if line[0] in '#/': continue
      else:
        layers = line.strip().split("=")
        mlnFilePaths[layers[0].strip()] = BASE_DIR + layers[1].strip()

    if 'HeMLN' in mlnFilePaths:
      mlnStructure = mlnFilePaths['HeMLN'].split(",")

      
    #for i in mlnFilePaths:
    #  print(i, mlnFilePaths[i])
        
  with open(sys.argv[2], 'r') as analysisFile:
    count = 1
    flag = 0
    outputDir = {}
    for line in analysisFile:

      if line[0] in '#/': continue
      else:
        if line[0] == "O":
          temp= line.strip().split("=")
          #print(temp)
          outputDirString = temp[1]
          outputDir[count] = outputDirString.strip()
          #print(outputDir)
        else:
          equation = line.strip().split(",")
          #print(equation)
          #print(equation[3].strip().split("-"))
          analysisObjective = equation[3].strip().split("-")#[char for char in (equation[3])]
          numberOfBipartiteLayers = len(analysisObjective)-1
          layers = set(equation[3].strip().split("-"))
          print("***layers", layers)
          print("**exp", analysisObjective)
          print("**number of bipartite", numberOfBipartiteLayers)
          numberOfLayers = len(layers)
          print("number of layers in analysis: ", numberOfLayers)
          #---------------------------------------------------------------------------
          #computing comunities in the multilayer graph
          communityDetectionAlgo = equation[0].lower()
          for i in range(0, numberOfLayers):
            communityFileName = analysisObjective[i]+communityDetectionAlgo
            print("community File Name: ", communityFileName)
            if communityDetectionAlgo == "louvain":
              print("louvain")
              fileString = BASE_DIR + "Layers\\communityFiles\\"+communityFileName+".vcomm"
              print(fileString)
              if  os.path.exists(fileString):
                mlnFilePaths[communityFileName] = fileString
              else:
                print("Call Louvain")
            elif communityDetectionAlgo == "infomap":
              print("infomap")
              fileString = BASE_DIR + "Layers\\communityFiles\\"+communityFileName+".vcomm"
              if os.path.exists(fileString):
                mlnFilePaths[communityFileName] = fileString
              else:
                #call informap with mlnFilePath[mlnstructure[i]]
                print("Call Infomap")
            else:
              print("Please enter the correct community detection algorithm")
          #---------------------------------------------------------------------------
          #generating bipartite graphs
          if (weightMetrics := equation[1].lower()) not in WEIGHT_METRIC_FUNC.keys():
            raise ValueError(f'Invalid weightMetrics: \'{ weightMetrics }\'')

          for i in range(numberOfBipartiteLayers):

            AO1, AO2 = analysisObjective[i], analysisObjective[i+1]
            layer1         = mlnFilePaths[AO1]
            layer2         = mlnFilePaths[AO2]
            layer1CommFile = mlnFilePaths[AO1 + communityDetectionAlgo]
            layer2CommFile = mlnFilePaths[AO2 + communityDetectionAlgo]
            interlayer12   = mlnFilePaths[AO1 + AO2]
            simpleEdgeBipartiteFile = None

            resultFileString = f'expression{ str(count) }/bipartiteFiles/{ AO1 + AO2 }_{ weightMetrics }.bg'

            if count in outputDir.keys():
              resultFileString = f'{ str(outputDir[count]) }/{ resultFileString }'

            if 'we' in mlnFilePaths.keys():
              simpleEdgeBipartiteFile = mlnFilePaths[("we", AO1 + AO2)]

            if not os.path.exists(resultFileString):
              WEIGHT_METRIC_FUNC[ weightMetrics ](
                layer1, 
                layer2, 
                layer1CommFile, 
                layer2CommFile, 
                interlayer12, 
                simpleEdgeBipartiteFile,
                resultFileString
            )

            mlnFilePaths[(weightMetrics, AO1 + AO2)] = resultFileString


          #--------------------------------------------------------------------------
          #applying matching algorithm
          matchingAlgorithm = equation[2].lower()
          processedLayers = [analysisObjective[0]]
          processedLayersFilePath = {}
          for i in range(0, numberOfBipartiteLayers):
            if matchingAlgorithm == "mwm":
              print("MWM")
              if i != 0:# and analysisObjective[i] in processedLayers:
                string = ""
                for j in range(0, i):
                  string += analysisObjective[j]
                if i == numberOfBipartiteLayers -1:
                  if count in outputDir.keys():
                    fileString = str(outputDir[count])
                    resultFileStringmwm = fileString + "/" + "expression"+str(count)+"/"+"MWM/FinalResults/" + \
                              string+\
                              analysisObjective[i] \
                              + analysisObjective[i + 1] + \
                              "_" + weightMetrics + \
                              "_" + communityDetectionAlgo + \
                              "_" + ".mwm"
                  else:

                    resultFileStringmwm = "expression"+str(count)+"/"+"MWM/FinalResults/"  + \
                               string+\
                              analysisObjective[i] \
                              + analysisObjective[i + 1] + \
                              "_" + weightMetrics + \
                              "_" + communityDetectionAlgo + \
                              "_" + ".mwm"
                else:
                  if count in outputDir.keys():
                    fileString = str(outputDir[count])
                    resultFileStringmwm = fileString + "/" + "expression"+str(count)+"/"+ "MWM/FinalResults/" + \
                              string+\
                              analysisObjective[i] \
                              + analysisObjective[i + 1] + \
                              "_" + weightMetrics + \
                              "_" + communityDetectionAlgo + \
                              "_" + ".mwm"
                  else:
                    resultFileStringmwm = "expression"+str(count)+"/"+"MWM/" +string+analysisObjective[i] +\
                             analysisObjective[i + 1] +\
                            "_"+weightMetrics+\
                             "_" + communityDetectionAlgo+\
                             ".mwm"
                if not os.path.exists(resultFileStringmwm):
                  print("processed layers: ", processedLayers)
                  if analysisObjective[i+1] in processedLayers: # check if both layers have been processed
                    print("same layer", analysisObjective[i+1])
                    for j in range(0, i-1):
                      if analysisObjective[j] == analysisObjective[i+1]:
                        break
                    maximalWeightedMatchingExtender(processedLayersFilePath[analysisObjective[i]],
                                  mlnFilePaths[(weightMetrics,analysisObjective[i]+analysisObjective[i+1])],
                                   resultFileStringmwm, j)
                  else:
                    maximalWeightedMatchingExtender(processedLayersFilePath[analysisObjective[i]],
                                  mlnFilePaths[(weightMetrics,analysisObjective[i]+analysisObjective[i+1])],
                                   resultFileStringmwm, -1)
                mlnFilePaths[(
                matchingAlgorithm, analysisObjective[i] + analysisObjective[i + 1])] = resultFileStringmwm

              else:
                if i == numberOfBipartiteLayers -1:
                  string = ""
                  for j in range(0, i):
                    string += analysisObjective[j]
                  if count in outputDir.keys():
                    fileString = str(outputDir[count])
                    resultFileStringmwm = fileString + "/" + "expression"+str(count)+"/" +"MWM/FinalResults/" + \
                              string+\
                              analysisObjective[i] \
                              + analysisObjective[i + 1] + \
                              "_" + weightMetrics + \
                              "_" + communityDetectionAlgo + \
                              "_" + ".mwm"
                  else:
                    resultFileStringmwm = "expression"+str(count)+"/"+"MWM/FinalResults/" + \
                               string+\
                              analysisObjective[i] \
                              + analysisObjective[i + 1] + \
                              "_" + weightMetrics + \
                              "_" + communityDetectionAlgo + \
                              "_" + ".mwm"
                else:
                  if count in outputDir.keys():
                    fileString = str(outputDir[count])
                    resultFileStringmwm = fileString + "/" + "expression"+str(count)+"/" +"MWM/FinalResults/" + \
                              analysisObjective[i] \
                              + analysisObjective[i + 1] + \
                              "_" + weightMetrics + \
                              "_" + communityDetectionAlgo + \
                              "_" + ".mwm"
                  else:
                    resultFileStringmwm = "expression"+str(count)+"/"+"MWM/"+analysisObjective[i]+\
                             analysisObjective[i+1]+ \
                             "_" + weightMetrics + \
                             "_" + communityDetectionAlgo + \
                             ".mwm"
                if not os.path.exists(resultFileStringmwm):
                  maximalWeightedMatchingGenerator(mlnFilePaths[(weightMetrics,analysisObjective[i]+analysisObjective[i+1])],
                                  resultFileStringmwm)
                mlnFilePaths[(matchingAlgorithm, analysisObjective[i]+analysisObjective[i+1])] = resultFileStringmwm
              processedLayers.append(analysisObjective[i+1])
              processedLayersFilePath[analysisObjective[i+1]] = resultFileStringmwm

            elif matchingAlgorithm == "mwbc":
              print("MWBC")
              if i != 0: #analysisObjective[i] in processedLayers:
                string = ""
                for j in range(0, i):
                  string += analysisObjective[j]
                if i == numberOfBipartiteLayers -1:
                  if count in outputDir.keys():
                    fileString = str(outputDir[count])
                    resultFileStringmwbc = fileString + "/" + "expression"+str(count)+"/" +"MWBC/FinalResults/" + \
                              string+\
                              analysisObjective[i] \
                              + analysisObjective[i + 1] + \
                              "_" + weightMetrics + \
                              "_" + communityDetectionAlgo + \
                              "_" + ".mwbc"
                  else:

                    resultFileStringmwbc = "expression"+str(count)+"/"+"MWBC/FinalResults/"  + \
                               string+\
                              analysisObjective[i] \
                              + analysisObjective[i + 1] + \
                              "_" + weightMetrics + \
                              "_" + communityDetectionAlgo + \
                              "_" + ".mwbc"
                else:
                  if count in outputDir.keys():
                    fileString = str(outputDir[count])
                    resultFileStringmwbc = fileString + "/" + "expression"+str(count)+"/" + "MWBC/FinalResults/" + \
                              string+\
                              analysisObjective[i] \
                              + analysisObjective[i + 1] + \
                              "_" + weightMetrics + \
                              "_" + communityDetectionAlgo + \
                              "_" + ".mwbc"
                  else:
                    resultFileStringmwbc = "expression"+str(count)+"/"+"MWBC/" +string+analysisObjective[i] +\
                             analysisObjective[i + 1] +\
                            "_"+weightMetrics+\
                             "_" + communityDetectionAlgo+\
                             ".mwbc"
                if not os.path.exists(resultFileStringmwbc):
                  print("processed layers: ", processedLayers)
                  if analysisObjective[i+1] in processedLayers: # check if both layers have been processed
                    print("same layer", analysisObjective[i+1])
                    for j in range(0, i-1):
                      if analysisObjective[j] == analysisObjective[i+1]:
                        break
                    maximumWeightBipartiteCouplingExtender(processedLayersFilePath[analysisObjective[i]],
                                  mlnFilePaths[(weightMetrics,analysisObjective[i]+analysisObjective[i+1])],
                                   resultFileStringmwbc, j)
                  else:
                    maximumWeightBipartiteCouplingExtender(processedLayersFilePath[analysisObjective[i]],
                                  mlnFilePaths[(weightMetrics,analysisObjective[i]+analysisObjective[i+1])],
                                   resultFileStringmwbc, -1)
                mlnFilePaths[(
                matchingAlgorithm, analysisObjective[i] + analysisObjective[i + 1])] = resultFileStringmwbc

              else:
                if i == numberOfBipartiteLayers -1:
                  string = ""
                  for j in range(0, i):
                    string += analysisObjective[j]
                  if count in outputDir.keys():
                    fileString = str(outputDir[count])
                    resultFileStringmwbc = fileString + "/" + "expression"+str(count)+"/" +"MWBC/FinalResults/" + \
                              string+\
                              analysisObjective[i] \
                              + analysisObjective[i + 1] + \
                              "_" + weightMetrics + \
                              "_" + communityDetectionAlgo + \
                              "_" + ".mwbc"
                  else:
                    resultFileStringmwbc = "expression"+str(count)+"/"+"MWBC/FinalResults/" + \
                               string+\
                              analysisObjective[i] \
                              + analysisObjective[i + 1] + \
                              "_" + weightMetrics + \
                              "_" + communityDetectionAlgo + \
                              "_" + ".mwbc"
                else:
                  if count in outputDir.keys():
                    fileString = str(outputDir[count])
                    resultFileStringmwbc = fileString + "/" + "expression"+str(count)+"/" +"MWBC/FinalResults/" + \
                              analysisObjective[i] \
                              + analysisObjective[i + 1] + \
                              "_" + weightMetrics + \
                              "_" + communityDetectionAlgo + \
                              "_" + ".mwbc"
                  else:
                    resultFileStringmwbc = "expression"+str(count)+"/"+"MWBC/"+analysisObjective[i]+\
                             analysisObjective[i+1]+ \
                             "_" + weightMetrics + \
                             "_" + communityDetectionAlgo + \
                             ".mwbc"
                if not os.path.exists(resultFileStringmwbc):
                  maximumWeightBipartiteCouplingGenerator(mlnFilePaths[(weightMetrics,analysisObjective[i]+analysisObjective[i+1])],
                                  resultFileStringmwbc)
                mlnFilePaths[(matchingAlgorithm, analysisObjective[i]+analysisObjective[i+1])] = resultFileStringmwbc
              processedLayers.append(analysisObjective[i+1])
              processedLayersFilePath[analysisObjective[i+1]] = resultFileStringmwbc
              #print(processedLayers)
            elif matchingAlgorithm == "mwpm":
              print("MWPM")
              if i != 0: #analysisObjective[i] in processedLayers:
                string = ""
                for j in range(0, i):
                  string += analysisObjective[j]
                if i == numberOfBipartiteLayers -1:
                  if count in outputDir.keys():
                    fileString = str(outputDir[count])
                    resultFileStringmwpm = fileString + "/" + "expression"+str(count)+"/" +"MWPM/FinalResults/" + \
                              string+\
                              analysisObjective[i] \
                              + analysisObjective[i + 1] + \
                              "_" + weightMetrics + \
                              "_" + communityDetectionAlgo + \
                              "_" + ".mwpm"
                  else:

                    resultFileStringmwpm = "expression"+str(count)+"/"+"MWPM/FinalResults/"  + \
                               string+\
                              analysisObjective[i] \
                              + analysisObjective[i + 1] + \
                              "_" + weightMetrics + \
                              "_" + communityDetectionAlgo + \
                              "_" + ".mwpm"
                else:
                  if count in outputDir.keys():
                    fileString = str(outputDir[count])
                    resultFileStringmwpm = fileString + "/" + "expression"+str(count)+"/" + "MWPM/FinalResults/" + \
                              string+\
                              analysisObjective[i] \
                              + analysisObjective[i + 1] + \
                              "_" + weightMetrics + \
                              "_" + communityDetectionAlgo + \
                              "_" + ".mwpm"
                  else:
                    resultFileStringmwpm = "expression"+str(count)+"/"+"MWPM/" +string+analysisObjective[i] +\
                             analysisObjective[i + 1] +\
                            "_"+weightMetrics+\
                             "_" + communityDetectionAlgo+\
                             ".mwpm"
                if not os.path.exists(resultFileStringmwpm):
                  print("processed layers: ", processedLayers)
                  if analysisObjective[i+1] in processedLayers: # check if both layers have been processed
                    print("same layer", analysisObjective[i+1])
                    for j in range(0, i-1):
                      if analysisObjective[j] == analysisObjective[i+1]:
                        break
                    maximalWeightedPerfectMatchingExtender(processedLayersFilePath[analysisObjective[i]],
                                  mlnFilePaths[(weightMetrics,analysisObjective[i]+analysisObjective[i+1])],
                                   resultFileStringmwpm, j)
                  else:
                    maximalWeightedPerfectMatchingExtender(processedLayersFilePath[analysisObjective[i]],
                                  mlnFilePaths[(weightMetrics,analysisObjective[i]+analysisObjective[i+1])],
                                   resultFileStringmwpm, -1)
                mlnFilePaths[(
                matchingAlgorithm, analysisObjective[i] + analysisObjective[i + 1])] = resultFileStringmwpm

              else:
                if i == numberOfBipartiteLayers -1:
                  string = ""
                  for j in range(0, i):
                    string += analysisObjective[j]
                  if count in outputDir.keys():
                    fileString = str(outputDir[count])
                    resultFileStringmwpm = fileString + "/" + "expression"+str(count)+"/" +"MWPM/FinalResults/" + \
                              string+\
                              analysisObjective[i] \
                              + analysisObjective[i + 1] + \
                              "_" + weightMetrics + \
                              "_" + communityDetectionAlgo + \
                              "_" + ".mwpm"
                  else:
                    resultFileStringmwpm = "expression"+str(count)+"/"+"MWPM/FinalResults/" + \
                               string+\
                              analysisObjective[i] \
                              + analysisObjective[i + 1] + \
                              "_" + weightMetrics + \
                              "_" + communityDetectionAlgo + \
                              "_" + ".mwpm"
                else:
                  if count in outputDir.keys():
                    fileString = str(outputDir[count])
                    resultFileStringmwpm = fileString + "/" + "expression"+str(count)+"/" +"MWPM/FinalResults/" + \
                              analysisObjective[i] \
                              + analysisObjective[i + 1] + \
                              "_" + weightMetrics + \
                              "_" + communityDetectionAlgo + \
                              "_" + ".mwpm"
                  else:
                    resultFileStringmwpm = "expression"+str(count)+"/"+"MWPM/"+analysisObjective[i]+\
                             analysisObjective[i+1]+ \
                             "_" + weightMetrics + \
                             "_" + communityDetectionAlgo + \
                             ".mwpm"
                if not os.path.exists(resultFileStringmwpm):
                  maximalWeightedPerfectMatchingGenerator(mlnFilePaths[(weightMetrics,analysisObjective[i]+analysisObjective[i+1])],
                                  resultFileStringmwpm)
                mlnFilePaths[(matchingAlgorithm, analysisObjective[i]+analysisObjective[i+1])] = resultFileStringmwpm
              processedLayers.append(analysisObjective[i+1])
              processedLayersFilePath[analysisObjective[i+1]] = resultFileStringmwpm
              #print(processedLayers)
            elif matchingAlgorithm == "mwmt":
              print("MWMT")
              if i != 0: #analysisObjective[i] in processedLayers:
                string = ""
                for j in range(0, i):
                  string += analysisObjective[j]
                if i == numberOfBipartiteLayers -1:
                  if count in outputDir.keys():
                    fileString = str(outputDir[count])
                    resultFileStringmwmt = fileString + "/" + "expression"+str(count)+"/" +"MWMT/FinalResults/" + \
                              string+\
                              analysisObjective[i] \
                              + analysisObjective[i + 1] + \
                              "_" + weightMetrics + \
                              "_" + communityDetectionAlgo + \
                              "_" + ".mwmt"
                  else:

                    resultFileStringmwmt = "expression"+str(count)+"/"+"MWMT/FinalResults/"  + \
                               string+\
                              analysisObjective[i] \
                              + analysisObjective[i + 1] + \
                              "_" + weightMetrics + \
                              "_" + communityDetectionAlgo + \
                              "_" + ".mwmt"
                else:
                  if count in outputDir.keys():
                    fileString = str(outputDir[count])
                    resultFileStringmwmt = fileString + "/" + "expression"+str(count)+"/" + "MWMT/FinalResults/" + \
                              string+\
                              analysisObjective[i] \
                              + analysisObjective[i + 1] + \
                              "_" + weightMetrics + \
                              "_" + communityDetectionAlgo + \
                              "_" + ".mwmt"
                  else:
                    resultFileStringmwmt = "expression"+str(count)+"/"+"MWMT/" +string+analysisObjective[i] +\
                             analysisObjective[i + 1] +\
                            "_"+weightMetrics+\
                             "_" + communityDetectionAlgo+\
                             ".mwmt"
                if not os.path.exists(resultFileStringmwmt):
                  print("processed layers: ", processedLayers)
                  if analysisObjective[i+1] in processedLayers: # check if both layers have been processed
                    print("same layer", analysisObjective[i+1])
                    for j in range(0, i-1):
                      if analysisObjective[j] == analysisObjective[i+1]:
                        break
                    maximalWeightedMatchingWithTiesExtender(processedLayersFilePath[analysisObjective[i]],
                                  mlnFilePaths[(weightMetrics,analysisObjective[i]+analysisObjective[i+1])],
                                   resultFileStringmwmt, j)
                  else:
                    maximalWeightedMatchingWithTiesExtender(processedLayersFilePath[analysisObjective[i]],
                                  mlnFilePaths[(weightMetrics,analysisObjective[i]+analysisObjective[i+1])],
                                   resultFileStringmwmt, -1)
                mlnFilePaths[(
                matchingAlgorithm, analysisObjective[i] + analysisObjective[i + 1])] = resultFileStringmwmt

              else:
                if i == numberOfBipartiteLayers -1:
                  string = ""
                  for j in range(0, i):
                    string += analysisObjective[j]
                  if count in outputDir.keys():
                    fileString = str(outputDir[count])
                    resultFileStringmwmt = fileString + "/" + "expression"+str(count)+"/" +"MWMT/FinalResults/" + \
                              string+\
                              analysisObjective[i] \
                              + analysisObjective[i + 1] + \
                              "_" + weightMetrics + \
                              "_" + communityDetectionAlgo + \
                              "_" + ".mwmt"
                  else:
                    resultFileStringmwmt = "expression"+str(count)+"/"+"MWMT/FinalResults/" + \
                               string+\
                              analysisObjective[i] \
                              + analysisObjective[i + 1] + \
                              "_" + weightMetrics + \
                              "_" + communityDetectionAlgo + \
                              "_" + ".mwmt"
                else:
                  if count in outputDir.keys():
                    fileString = str(outputDir[count])
                    resultFileStringmwmt = fileString + "/" + "expression"+str(count)+"/" +"MWMT/FinalResults/" + \
                              analysisObjective[i] \
                              + analysisObjective[i + 1] + \
                              "_" + weightMetrics + \
                              "_" + communityDetectionAlgo + \
                              "_" + ".mwmt"
                  else:
                    resultFileStringmwmt = "expression"+str(count)+"/"+"MWMT/"+analysisObjective[i]+\
                             analysisObjective[i+1]+ \
                             "_" + weightMetrics + \
                             "_" + communityDetectionAlgo + \
                             ".mwmt"
                if not os.path.exists(resultFileStringmwmt):
                  maximalWeightedMatchingWithTiesGenerator(mlnFilePaths[(weightMetrics,analysisObjective[i]+analysisObjective[i+1])],
                                  resultFileStringmwmt)
                mlnFilePaths[(matchingAlgorithm, analysisObjective[i]+analysisObjective[i+1])] = resultFileStringmwmt
              processedLayers.append(analysisObjective[i+1])
              processedLayersFilePath[analysisObjective[i+1]] = resultFileStringmwmt
              #print(processedLayers)
            elif matchingAlgorithm == "mwrmt":
              print("MWRMT")
              if i != 0: #analysisObjective[i] in processedLayers:
                string = ""
                for j in range(0, i):
                  string += analysisObjective[j]
                if i == numberOfBipartiteLayers -1:
                  if count in outputDir.keys():
                    fileString = str(outputDir[count])
                    resultFileStringmwrmt = fileString + "/" + "expression"+str(count)+"/" +"MWRMT/FinalResults/" + \
                              string+\
                              analysisObjective[i] \
                              + analysisObjective[i + 1] + \
                              "_" + weightMetrics + \
                              "_" + communityDetectionAlgo + \
                              "_" + ".mwrmt"
                  else:

                    resultFileStringmwrmt = "expression"+str(count)+"/"+"MWRMT/FinalResults/"  + \
                               string+\
                              analysisObjective[i] \
                              + analysisObjective[i + 1] + \
                              "_" + weightMetrics + \
                              "_" + communityDetectionAlgo + \
                              "_" + ".mwrmt"
                else:
                  if count in outputDir.keys():
                    fileString = str(outputDir[count])
                    resultFileStringmwrmt = fileString + "/" + "expression"+str(count)+"/" + "MWRMT/FinalResults/" + \
                              string+\
                              analysisObjective[i] \
                              + analysisObjective[i + 1] + \
                              "_" + weightMetrics + \
                              "_" + communityDetectionAlgo + \
                              "_" + ".mwrmt"
                  else:
                    resultFileStringmwrmt = "expression"+str(count)+"/"+"MWRMT/" +string+analysisObjective[i] +\
                             analysisObjective[i + 1] +\
                            "_"+weightMetrics+\
                             "_" + communityDetectionAlgo+\
                             ".mwrmt"
                if not os.path.exists(resultFileStringmwrmt):
                  print("processed layers: ", processedLayers)
                  if analysisObjective[i+1] in processedLayers: # check if both layers have been processed
                    print("same layer", analysisObjective[i+1])
                    for j in range(0, i-1):
                      if analysisObjective[j] == analysisObjective[i+1]:
                        break
                    maximalWeightedMatchingRelaxedWithTiesExtender(processedLayersFilePath[analysisObjective[i]],
                                  mlnFilePaths[(weightMetrics,analysisObjective[i]+analysisObjective[i+1])],
                                   resultFileStringmwrmt, j)
                  else:
                    maximalWeightedMatchingRelaxedWithTiesExtender(processedLayersFilePath[analysisObjective[i]],
                                  mlnFilePaths[(weightMetrics,analysisObjective[i]+analysisObjective[i+1])],
                                   resultFileStringmwrmt, -1)
                mlnFilePaths[(
                matchingAlgorithm, analysisObjective[i] + analysisObjective[i + 1])] = resultFileStringmwrmt

              else:
                if i == numberOfBipartiteLayers -1:
                  string = ""
                  for j in range(0, i):
                    string += analysisObjective[j]
                  if count in outputDir.keys():
                    fileString = str(outputDir[count])
                    resultFileStringmwrmt = fileString + "/" + "expression"+str(count)+"/" +"MWRMT/FinalResults/" + \
                              string+\
                              analysisObjective[i] \
                              + analysisObjective[i + 1] + \
                              "_" + weightMetrics + \
                              "_" + communityDetectionAlgo + \
                              "_" + ".mwrmt"
                  else:
                    resultFileStringmwrmt = "expression"+str(count)+"/"+"MWRMT/FinalResults/" + \
                               string+\
                              analysisObjective[i] \
                              + analysisObjective[i + 1] + \
                              "_" + weightMetrics + \
                              "_" + communityDetectionAlgo + \
                              "_" + ".mwrmt"
                else:
                  if count in outputDir.keys():
                    fileString = str(outputDir[count])
                    resultFileStringmwrmt = fileString + "/" + "expression"+str(count)+"/" +"MWRMT/FinalResults/" + \
                              analysisObjective[i] \
                              + analysisObjective[i + 1] + \
                              "_" + weightMetrics + \
                              "_" + communityDetectionAlgo + \
                              "_" + ".mwrmt"
                  else:
                    resultFileStringmwrmt = "expression"+str(count)+"/"+"MWRMT/"+analysisObjective[i]+\
                             analysisObjective[i+1]+ \
                             "_" + weightMetrics + \
                             "_" + communityDetectionAlgo + \
                             ".mwrmt"
                if not os.path.exists(resultFileStringmwrmt):
                  maximalWeightedMatchingRelaxedWithTiesGenerator(mlnFilePaths[(weightMetrics,analysisObjective[i]+analysisObjective[i+1])],
                                  resultFileStringmwrmt)
                mlnFilePaths[(matchingAlgorithm, analysisObjective[i]+analysisObjective[i+1])] = resultFileStringmwrmt
              processedLayers.append(analysisObjective[i+1])
              processedLayersFilePath[analysisObjective[i+1]] = resultFileStringmwrmt
              #print(processedLayers)
            elif matchingAlgorithm == "mwrm":
              print("MWRM")
              if i != 0: #analysisObjective[i] in processedLayers:
                string = ""
                for j in range(0, i):
                  string += analysisObjective[j]
                if i == numberOfBipartiteLayers -1:
                  if count in outputDir.keys():
                    fileString = str(outputDir[count])
                    resultFileStringmwrm = fileString + "/" + "expression"+str(count)+"/" +"MWRM/FinalResults/" + \
                              string+\
                              analysisObjective[i] \
                              + analysisObjective[i + 1] + \
                              "_" + weightMetrics + \
                              "_" + communityDetectionAlgo + \
                              "_" + ".mwrm"
                  else:

                    resultFileStringmwrm = "expression"+str(count)+"/"+"MWRM/FinalResults/"  + \
                               string+\
                              analysisObjective[i] \
                              + analysisObjective[i + 1] + \
                              "_" + weightMetrics + \
                              "_" + communityDetectionAlgo + \
                              "_" + ".mwrm"
                else:
                  if count in outputDir.keys():
                    fileString = str(outputDir[count])
                    resultFileStringmwrm = fileString + "/" + "expression"+str(count)+"/" + "MWRM/FinalResults/" + \
                              string+\
                              analysisObjective[i] \
                              + analysisObjective[i + 1] + \
                              "_" + weightMetrics + \
                              "_" + communityDetectionAlgo + \
                              "_" + ".mwrm"
                  else:
                    resultFileStringmwrm = "expression"+str(count)+"/"+"MWRM/" +string+analysisObjective[i] +\
                             analysisObjective[i + 1] +\
                            "_"+weightMetrics+\
                             "_" + communityDetectionAlgo+\
                             ".mwrm"
                if not os.path.exists(resultFileStringmwrm):
                  print("processed layers: ", processedLayers)
                  if analysisObjective[i+1] in processedLayers: # check if both layers have been processed
                    print("same layer", analysisObjective[i+1])
                    for j in range(0, i-1):
                      if analysisObjective[j] == analysisObjective[i+1]:
                        break
                    maximalWeightedRelaxedMatchingExtender(processedLayersFilePath[analysisObjective[i]],
                                  mlnFilePaths[(weightMetrics,analysisObjective[i]+analysisObjective[i+1])],
                                   resultFileStringmwrm, j)
                  else:
                    maximalWeightedRelaxedMatchingExtender(processedLayersFilePath[analysisObjective[i]],
                                  mlnFilePaths[(weightMetrics,analysisObjective[i]+analysisObjective[i+1])],
                                   resultFileStringmwrm, -1)
                mlnFilePaths[(
                matchingAlgorithm, analysisObjective[i] + analysisObjective[i + 1])] = resultFileStringmwrm

              else:
                if i == numberOfBipartiteLayers -1:
                  string = ""
                  for j in range(0, i):
                    string += analysisObjective[j]
                  if count in outputDir.keys():
                    fileString = str(outputDir[count])
                    resultFileStringmwrm = fileString + "/" + "expression"+str(count)+"/" +"MWRM/FinalResults/" + \
                              string+\
                              analysisObjective[i] \
                              + analysisObjective[i + 1] + \
                              "_" + weightMetrics + \
                              "_" + communityDetectionAlgo + \
                              "_" + ".mwrm"
                  else:
                    resultFileStringmwrm = "expression"+str(count)+"/"+"MWRM/FinalResults/" + \
                               string+\
                              analysisObjective[i] \
                              + analysisObjective[i + 1] + \
                              "_" + weightMetrics + \
                              "_" + communityDetectionAlgo + \
                              "_" + ".mwrm"
                else:
                  if count in outputDir.keys():
                    fileString = str(outputDir[count])
                    resultFileStringmwrm = fileString + "/" + "expression"+str(count)+"/" +"MWRM/FinalResults/" + \
                              analysisObjective[i] \
                              + analysisObjective[i + 1] + \
                              "_" + weightMetrics + \
                              "_" + communityDetectionAlgo + \
                              "_" + ".mwrm"
                  else:
                    resultFileStringmwrm = "expression"+str(count)+"/"+"MWRM/"+analysisObjective[i]+\
                             analysisObjective[i+1]+ \
                             "_" + weightMetrics + \
                             "_" + communityDetectionAlgo + \
                             ".mwrm"
                if not os.path.exists(resultFileStringmwrm):
                  maximalWeightedRelaxedMatchingGenerator(mlnFilePaths[(weightMetrics,analysisObjective[i]+analysisObjective[i+1])],
                                  resultFileStringmwrm)
                mlnFilePaths[(matchingAlgorithm, analysisObjective[i]+analysisObjective[i+1])] = resultFileStringmwrm
              processedLayers.append(analysisObjective[i+1])
              processedLayersFilePath[analysisObjective[i+1]] = resultFileStringmwrm
              #print(processedLayers)                
            else:
              print("Please enter the correct matching algorithm")
          count += 1


#result <10(A),20(D),30(M); pathname of bipartite file of 10-20(A-D), pathname of bipartite file of 20-30(D-M)>


if __name__== "__main__":
  main()
