import { loadEnv } from 'vite'
import { resolve } from 'path'
const sleep = (s: number) => new Promise((r) => setTimeout(r, (s * 1000) | 0))
const delayedError = async (e: Error) => {
    await sleep(0.1)
    console.error(e)
}
// SSG docs: https://vitejs.dev/guide/ssr.html#pre-rendering-ssg
/*ssrLoadModule(
  url: string,
  server: ViteDevServer,
  context: SSRContext = { global },
  urlStack: string[] = [],
  fixStacktrace?: boolean
)*/

export function feathers({ app, port }: any = {}) {
    const env = loadEnv('', process.cwd())
    const sm = {
        active: true,
        app: app || './api/app.ts',
        root: '',
        port: port || 23030,
        appListener: undefined,
        feathersApp: undefined,
        shotgunVite: undefined,
        config: undefined
    } as any

    sm.app = resolve(sm.app)
    sm.root = new globalThis.URL('.', 'file://' + sm.app).pathname
    if (env.VITE_SSG === 'off') {
        sm.active = false
    }

    return {
        name: 'feathers-vite',
        configResolved(config: any) {
            if (config.command === 'build') {
                sm.active = false
            } else {
                sm.config = config
            }
            if (
                config.server &&
                config.define?.['import.meta.env.SOCKET_URL'] === undefined
            ) {
                const VP = config.server.port || 5173
                config.define ||= {}
                config.define['import.meta.env.SOCKET_URL'] =
                    config.mode === 'production'
                        ? 'window.location'
                        : `window.location.origin.replace('--${VP}', '--${sm.port}').replace(':${VP}', ':${sm.port}')`
            }
        },
        async configureServer(server: any) {
            if (sm.active === false) {
                return
            }
            return async () => {


                // ssrLoadModule MUST be called after server internal middlewares load
                try {
                    //server.close();
                    if (sm.appListener) sm.appListener.close()

                    try {
                        sm.feathersApp = (await (
                            await server.ssrLoadModule(app)
                        ).main()) as any
                    } catch (e) {
                        console.error('Attention     handled', e);
                    }


                    sm.feathersApp.listen(sm.port).then(() => {
                        console.log('APP VITE FEATHERS mise en ecoute :', sm.feathersApp.server)
                    }).catch(() => {
                        sm.feathersApp.server.close();
                        console.log('APP VITE FEATHERS IN USE:', sm.feathersApp)
                    })


                    console.info('Feathers application started :' + sm.port)
                } catch (e) {
                    server.ssrFixStacktrace(e)
                    if (sm.appListener) sm.appListener.close()
                /**/ console.error(e)
                }
            }
        },
        closeBundle() {
            if (sm.appListener) sm.appListener.close()
        },
        async handleHotUpdate({ file, server }: any) {
            // Save your sanity, we are eval'd out of context making debugging a nightmare
            try {
                if (
                    !file.startsWith(sm.root) ||
                    sm.active === false ||
                    sm.appListener === undefined
                ) {
                    return
                }
                // console.log('CLOSING')
                sm.appListener.close()
                // console.log('CLOSED')
                // ssrLoadModule def: https://github.com/vitejs/vite/blob/ed0286186b24748ec7bfa336f83c382363a22f1d/packages/vite/src/node/ssr/ssrModuleLoader.ts#L34
                sm.loadResult = undefined
                sm.loadResult = await server.ssrLoadModule(app)
                if (sm.loadResult === undefined) {
                    // console.log('SYNTAX_ERROR in SSG server')
                    return
                }
                // console.log('SSG server restarting')
                sm.feathersApp = await sm.loadResult.main()
                // console.info('Listening on port...')
                sm.appListener = await sm.feathersApp.listen(sm.port)
                // console.info('Feathers application restarted')
            } catch (e: any) {
                server.ssrFixStacktrace(e)
                delayedError(e)
            }
        }
    }
}

/*
async function createServer() {
  const vite = await createServer({
    server: { middlewareMode: true },
    appType: 'custom',
    plugins: [feathers({ root: 'api', app: './api/app.ts' })]
  })
}

createServer()
*/