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

export const getMappingModuleOptions = (dataTemp) => {
    let speciesOptions = ["Homo sapiens","Mus musculus"]
    let organOptions = {}
    let tissueHomoOptions = {}
    let tissueMusOptions = {}
    dataTemp.forEach( item => {
        if(item.species === "Homo sapiens")
        {
            if(organOptions["Homo sapiens"]===undefined)
                organOptions["Homo sapiens"] = [item.organ]
            else if(!organOptions["Homo sapiens"].includes(item.organ))
                organOptions["Homo sapiens"].push(item.organ)
            if(tissueHomoOptions[item.organ]===undefined)
                tissueHomoOptions[item.organ] = [item.tissue]
            else if(!tissueHomoOptions[item.organ].includes(item.tissue))
                tissueHomoOptions[item.organ].push(item.tissue)
        }else if(item.species === "Mus musculus"){
            if(organOptions["Mus musculus"]===undefined)
                organOptions["Mus musculus"] = [item.organ]
            else if(!organOptions["Mus musculus"].includes(item.organ))
                organOptions["Mus musculus"].push(item.organ)
            if(tissueMusOptions[item.organ]===undefined)
                tissueMusOptions[item.organ] = [item.tissue]
            else if(!tissueMusOptions[item.organ].includes(item.tissue))
                tissueMusOptions[item.organ].push(item.tissue)
        }
    })

    return {
        "speciesOptions": speciesOptions,
        "organOptions":organOptions,
        "tissueOptions": {
            "Homo sapiens":tissueHomoOptions,
            "Mus musculus":tissueMusOptions
        }
    }
}

export const datasetNum = {
    "Human":{
        //"Spinal Cord": 2,
        "Bone": 6,
        "Breast": 1,
        "Heart": 3,
        //"Testis": 1,
        "Uterus": 2,
        "Colon": 3,
        "Skin": 2,
        "Prostate": 3,
        "Kidney": 1,
        "Liver": 5,
        "Adipose Tissue": 1,
        "Brain": 1,
        "Lung": 2,
        "Embryo": 1
    },
    "Mouse":{
        "Brain": 25,
        "Heart": 9,
        "Embryo": 4,
        //"Prostate": 1,
        "Testis": 2,
        "Hindlimb": 3,
        "Aorta": 1,
        "Kidney": 9,
        "Liver": 6,
        "Colon": 3,
        //"Uterus": 2,
        //"Urinary Bladder": 1,
        //"Bone": 2,
        //"Lung": 4,
        "Ileum": 4,
        "Skeletal Muscle": 2
    }
}

export const sectionNum = {
    "Human":{
        //"Spinal Cord": 2,
        "Bone": 18,
        "Breast": 4,
        "Heart": 19,
        //"Testis": 1,
        "Uterus": 2,
        "Colon": 3,
        "Skin": 16,
        "Prostate": 4,
        "Kidney": 1,
        "Liver": 8,
        "Adipose Tissue": 15,
        "Brain": 12,
        "Lung": 2,
        "Embryo": 7
    },
    "Mouse":{
        "Brain": 460,
        "Heart": 13,
        "Embryo": 28,
        //"Prostate": 1,
        "Testis": 6,
        "Hindlimb": 3,
        "Aorta": 1,
        "Kidney": 94,
        "Liver": 31,
        "Colon": 15,
        //"Uterus": 2,
        //"Urinary Bladder": 1,
        //"Bone": 2,
        //"Lung": 4,
        "Ileum": 4,
        "Skeletal Muscle": 5
    }
}