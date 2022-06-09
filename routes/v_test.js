// test vitessce

module.exports = {
    'GET /v_test': async (ctx, next) => {
        ctx.render('v_test.html', {
            title: "WT A2-2 Mouse E14.5 Brain Coronal Section",
            Data_Type: 'Stereo-seq',
            ST_ID: "WT A2-2 Mouse E14.5 Brain Coronal Section"
        });
    }
};