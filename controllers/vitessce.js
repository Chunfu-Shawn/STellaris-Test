// vitessce

module.exports = {
    'GET /vitessce': async (ctx, next) => {
        ctx.render('vitessce.html', {
            title: "WT A2-2 Mouse E14.5 Brain Coronal Section",
            Data_Type: 'Stereo-seq',
            ST_ID: "WT A2-2 Mouse E14.5 Brain Coronal Section"
        });
    }
};