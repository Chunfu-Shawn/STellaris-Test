// index:

module.exports = {
    'GET /': async (ctx, next) => {
        ctx.render('index.html', {
            title: 'Spatial Transcriptome Web Tools and Databases',
        });
    }
};