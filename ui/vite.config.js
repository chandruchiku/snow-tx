// vite.config.js
const config = {
    // configure /Snow to be proxied to the backend , dont rewrite the path
    server: {
        proxy: {
            '/Snow': {
                target: 'http://localhost:5225',
                changeOrigin: true,
            }
        }
    }
}

export default config