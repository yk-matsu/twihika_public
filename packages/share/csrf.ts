import { IncomingMessage } from 'http';
import csurf from 'csurf'
import { ServerResponse } from 'http';

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
export function csrf(req: IncomingMessage, res: ServerResponse) {
    return new Promise((resolve, reject) => {
        csurf({ cookie: true })(req as any, res as any, (result: any) => {
            if (result instanceof Error) {
                return reject(result)
            }
            return resolve(result)
        })
    })
}
