import viCustomConfigsDatasets from '../viCustomConfigs-Datasets.json' assert { type : 'json' }
import viCustomConfigsSpace from '../viCustomConfigs-Space.json' assert { type : 'json' }
import viCustomConfigsLayout from '../viCustomConfigs-Layout.json' assert { type : 'json' }
import getDatesetsJSON from "./getDatasetsInfo.js";

export default function getViCustomConfig(id){
    let config = {
        "name": "vitessce",
        "version": "1.0.9",
        "initStrategy": "auto",
        "description": "View Spatial Transcriptome Data",
        "public": true,
    }
    const dataJSON = getDatesetsJSON(id)
    // set datasets config
    if(dataJSON.Method === "ST" || dataJSON.Method === "Visium"){
        config.datasets = viCustomConfigsDatasets["STorVisium"].datasets
    } else config.datasets = viCustomConfigsDatasets[dataJSON.Method].datasets
    // set space config
    viCustomConfigsSpace[id] === undefined ?
        config.coordinationSpace = {} :
        config.coordinationSpace = viCustomConfigsSpace[id].coordinationSpace
    // set layout config
    if(dataJSON.Method === "ST" || dataJSON.Method === "Visium") {
        config.layout = viCustomConfigsLayout["STorVisium"].layout
    } else config.layout = viCustomConfigsLayout[dataJSON.Method].layout
    return config
}