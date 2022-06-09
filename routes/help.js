//help
module.exports = {
    'GET /help': async (ctx, next) => {
        ctx.render('help.html', {
            title: 'STW help'
        });
    }
};