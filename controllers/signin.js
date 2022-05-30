// sign in:

module.exports = {
    'POST /signin': async (ctx, next) => {
        var
            name = ctx.request.name || '',
            password = ctx.request.password || '';
        if (name === 'koa2' && password === '123456') {
            console.log('signin ok!');
            ctx.render('signin-ok.html', {
                title: 'Sign In OK',
                name: 'Mr Node'
            });
        } else {
            console.log('signin failed!');
            ctx.render('signin_failed.html', {
                title: 'Sign In Failed'
            });
        }
    }
};