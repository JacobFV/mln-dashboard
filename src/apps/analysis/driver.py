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

# maximal weighted matching functions
MATCH_FUNC = {
  'mwm'  : maximalWeightedMatchingExtender,  
  'mwbc' : maximumWeightBipartiteCouplingGenerator,
  'mwpm' : maximalWeightedPerfectMatchingGenerator,
  'mwmt' : maximalWeightedMatchingWithTiesExtender,
  'mwrmt': maximalWeightedMatchingRelaxedWithTiesGenerator,
  'mwrm' : maximalWeightedRelaxedMatchingExtender
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

                for j in range(0, i): string += analysis_objective[j]

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
                  if analysis_objective[i+1] in processedLayers: # check if both layers have been processed

                    for j in range(0, i-1):
                      if analysis_objective[j] == analysis_objective[i+1]: break

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


  """"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
  Evaluating analysis objectives
  In the config file will be a list of objective strings

    objective: "infomap,we,mwm,foo-bar-baz-zir"

  which will each be converted to a dictionary like
      
    OBJ = {
      "comm_algo":      "infomap", 
      "weight_metric":  "we", 
      "matching_algo":  "mwm", 
      "layers":         ['foo', 'bar', 'baz', 'zir']
    }

  The path to layer 'foo' is stored in config['layer_paths']['foo'].
  All information needed for objective is stored in OBJ.

  For each objective XX, a folder will be created for all involved files:

    BASE_DIR/Analysis/objXX/
                        |----- bg/     <-- bipartite graph files
                        |----- comm/   <-- community files
                        |----- mwm/    <-- match files
  
  Each generated file will have its path stored in config['layer_paths'].

  """

  for obj_num, obj in enumerate( config['objectives']) :

    tok = obj.split( ',' )
    OBJ = {
      "comm_algo":      tok[0], 
      "weight_metric":  tok[1], 
      "matching_algo":  tok[2], 
      "layers":         tok[3].split( '-' )
    }

    
    """"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
    Community detection
    The objective may contain a series of N layers: 
        
        OBJ['layers'] = ['foo', 'bar', 'baz', 'zir']

    Iterate and run community detection algorithm (e.g. 'infomap'),
    generating N files:

        foo_infomap.vcomm (path: BASE_DIR/Analysis/objXX/comm/foo_infomap.vcomm)

    where XX is the number of the objective being evaluated.

    """

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


    """"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
    Bipartite graph (bg) generation
    The objective may contain a series of N layers: 
        
        OBJ['layers'] = ['foo', 'bar', 'baz', 'zir']

    Iterate and run bipartite graph functions (e.g. 'we') pairwise,
    generating N-1 files:

        foo-bar_we.bg (path: BASE_DIR/Analysis/objXX/bg/foo-bar_we.bg)
        bar-baz_we.bg (path: BASE_DIR/Analysis/objXX/bg/bar-baz_we.bg)
        baz-zir_we.bg (path: BASE_DIR/Analysis/objXX/bg/baz-zir_we.bg)

    where XX is the number of the objective being evaluated.

    """

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


    """"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
    Maximal weighted matching generation

    ????????????????????????????????????

    """
    previous_layer = None
    new_layer_status = -1

    for i in range( len( OBJ['layers'] ) - 1 ):

      [ L1, L2 ] = OBJ['layers'][i : i+2]
      bg_name    = f'{ L1 }-{ L2 }_{ OBJ["weight_metric"] }.bg'
      match_name = f'{ L1 }-{ L2 }_{ OBJ["weight_metric"] }_{ OBJ["comm_algo"] }_{ OBJ["matching_algo"] }.mwm'
      match_path = f'{ BASE_DIR }/Analysis/obj{ obj_num }/mwm/{ match_name }'

      MATCH_FUNC[ OBJ["matching_algo"] ](
        previous_layer,
        config['layer_paths'][ bg_name ],
        f'{ match_path }/{ match_name }',
        new_layer_status
      )

      config['layer_paths'][ match_name ] = match_path
