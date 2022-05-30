// annotation
module.exports = {
    'GET /annotation': async (ctx, next) => {
        ctx.render('annotation.html', {
            title: 'STW tool: Annotation'
        });
    }
};