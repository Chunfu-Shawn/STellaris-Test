// index:
module.exports = {
    'GET /test': async (ctx, next) => {
        ctx.render('index_base.html', {
            title: 'Welcome'
        });
    }
};