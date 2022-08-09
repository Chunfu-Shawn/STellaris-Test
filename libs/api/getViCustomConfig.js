import viCustomConfigsDatasets from '../viCustomConfigs-Datasets.json' assert { type : 'json' }
import viCustomConfigsSpace from '../viCustomConfigs-Space.json' assert { type : 'json' }
import viCustomConfigsLayout from '../viCustomConfigs-Layout.json' assert { type : 'json' }
import getDatesetsJSON from "./getDatasetsJSON.js";

export default function getViCustomConfig(id){
    let config ={
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
    } else config.datasets = {}
    // set space config
    if (viCustomConfigsSpace[id] !== undefined) {
        config.coordinationSpace = viCustomConfigsSpace[id].coordinationSpace
    }else config.coordinationSpace = {}
    // set layout config
    if(dataJSON.Method === "ST" || dataJSON.Method === "Visium") {
        config.layout = viCustomConfigsLayout["STorVisium"].layout
    } else config.layout = {}
    return config
}