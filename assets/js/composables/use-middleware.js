import log from '../middleware/log'
import noAccess from '../middleware/noAccess'

export function useMiddleware(router) {
    function nextFactory(context, middleware, index) {
        const subsequentMiddleware = middleware[index];
        // If no subsequent Middleware exists,
        // the default `next()` callback is returned.
        if (!subsequentMiddleware) return context.next;

        return (...parameters) => {
            // Run the default Vue Router `next()` callback first.
            context.next(...parameters);
            // Then run the subsequent Middleware with a new
            // `nextMiddleware()` callback.
            const nextMiddleware = nextFactory(context, middleware, index + 1);
            // const maFonction = window[subsequentMiddleware]
            // maFonction({ ...context, next: nextMiddleware });
			eval(subsequentMiddleware)({...context, next: nextMiddleware})
        };
    }

    router.beforeEach((to, from, next) => {
        if (to.meta.middleware) {
            const middleware = Array.isArray(to.meta.middleware)
                ? to.meta.middleware
                : [to.meta.middleware];

            const context = {
                from,
                next,
                router,
                to,
            };
            const nextMiddleware = nextFactory(context, middleware, 1);
            // const maFonction = window[middleware[0]]
            // return maFonction({ ...context, next: nextMiddleware });
			// let dynamicFunctionName = middleware[0]
			// console.log(typeof this[dynamicFunctionName])
			// return dynamicFunctionName({...context, next: nextMiddleware})
			return eval(middleware[0])({...context, next: nextMiddleware})
        }

        return next();
    });
}