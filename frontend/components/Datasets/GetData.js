//const human_ngs = fetch('/api/getDatasetsJSON/human_ngs').then(res=>res.json())
//const mouse_ngs = fetch('/api/getDatasetsJSON/mouse_ngs').then(res=>res.json())
//const mouse_smfish = fetch('http://localhost:3000/api/getDatasetsJSON/mouse_smfish').then(res=>res.json())
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