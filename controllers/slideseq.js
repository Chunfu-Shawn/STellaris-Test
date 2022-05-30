// slideseq

module.exports = {
    'GET /slideseq': async (ctx, next) => {
        ctx.render('slideseq.html', {
            title: "SCP815-Puck_190921_19",
            Data_Type: 'Slide-seq',
            ST_ID: "SCP815-Puck_190921_19"
        });
    }
};