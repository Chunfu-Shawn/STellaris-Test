// annotations
module.exports = {
    'GET /annotation': async (ctx, next) => {
        ctx.render('annotations.html', {
            title: 'STW tool: Annotation'
        });
    }
};