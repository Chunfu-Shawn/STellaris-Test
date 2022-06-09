// Dataset
module.exports = {
    'GET /datasets': async (ctx, next) => {
        ctx.render('datasets.html', {
            title: 'STW Datasets'
        });
    }
};