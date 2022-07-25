//const human_ngs = fetch('/api/getDatasetsJSON/human_ngs').then(res=>res.json())
//const mouse_ngs = fetch('/api/getDatasetsJSON/mouse_ngs').then(res=>res.json())
//const mouse_smfish = fetch('http://localhost:3000/api/getDatasetsJSON/mouse_smfish').then(res=>res.json())
import {speciesOptions} from "./FilterToolbar.js";

export const getDatasetsJSON = async (cb) => {
    try {
        let key = 1
        let allData = await fetch('http://localhost:3000/api/getDatasetsJSON/all')
        let allJSON = await allData.json()
        cb(allJSON.map(item => {
            return {
                key: key++,
                st_id: item.id,
                date_published: item.date_published,
                method: item.method,
                species: item.species,
                strain: item.strain,
                developmental_stage: item.developmental_stage,
                organ: item.organ,
                tissue: item.tissue,
                pathological: item.pathological,
            }
        }))
    }catch (e){
        console.log(e)
    }
}

export const getSummaryOptions = (dataTemp) => {
    let num ={}
    let filterToolbarOption = {}
    num['method'] = {}
    num['species'] = {}
    num['organ'] = {}
    num['pathological'] = {}
    num['date_published'] = []
    // numDatePublished.map(item=>num['date_published'][item]=0)
    for(let i in dataTemp){
        num['method'][dataTemp[i].method]===undefined?
            num['method'][dataTemp[i].method] = 1 : num['method'][dataTemp[i].method] += 1
        num['species'][dataTemp[i].species]===undefined?
            num['species'][dataTemp[i].species] = 1 : num['species'][dataTemp[i].species] +=1
        num['organ'][dataTemp[i].organ] === undefined?
            num['organ'][dataTemp[i].organ] = 1 : num['organ'][dataTemp[i].organ] += 1
        num['pathological'][dataTemp[i].pathological] === undefined?
            num['pathological'][dataTemp[i].pathological] = 1 : num['pathological'][dataTemp[i].pathological] += 1
        // 得到table中最大最小的日期
        num['date_published'][0]===undefined?
            num['date_published'][0] = Date.parse(dataTemp[i].date_published) :
            num['date_published'][0] = Math.min(Date.parse(dataTemp[i].date_published),num['date_published'][0])
        num['date_published'][1]===undefined?
            num['date_published'][1] = Date.parse(dataTemp[i].date_published) :
            //+30*24*60*60*1000 提前30天，避免2022-04 < 2022-04-22
            num['date_published'][1] = Math.max(Date.parse(dataTemp[i].date_published)+30*24*60*60*1000,num['date_published'][1])
    }
    filterToolbarOption['methodsOptions'] = Object.keys(num['method']).sort((a,b)=>{
        return num['method'][b] - num['method'][a];
    })
    filterToolbarOption['speciesOptions'] = Object.keys(num['species']).sort((a,b)=>{
        return num['species'][b] - num['species'][a];
    })
    filterToolbarOption['organOptions'] = Object.keys(num['organ']).sort((a,b)=>{
        return num['organ'][b] - num['organ'][a];
    })
    filterToolbarOption['pathologicalOptions'] = Object.keys(num['pathological']).sort((a,b)=>{
        return num['pathological'][b] - num['pathological'][a];
    })
    filterToolbarOption['date_published'] = num['date_published']
    return filterToolbarOption
}