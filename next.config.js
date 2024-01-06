/** @type {import('next').NextConfig} */
const nextConfig = {
   async rewrites() {
       return [
        //  {
        //     source: '/api/:path*',
        //     destination: 'http://localhost:8000/:path*'
        //  },
        //   {
        //     source: '/auth/:path*',
        //     destination: 'http://localhost:8000/:path*'
        //  }
      ]
  },
  async headers() {
    return [
      {
        // matching all API routes
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "*" },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET,OPTIONS,PATCH,DELETE,POST,PUT",
          },
          {
            key: "Access-Control-Allow-Headers",
            value:
              "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
          },
          {
            key: "Access-Control-Expose-Headers",
            value:
              "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
          },
          {
            key: "Content-Type",
            value: "application/json;charset=utf-8",
          },
           {
            key: "Accept-Encoding",
            value: "gzip, deflate, br",
          },
          {
            key: "Accept",
            value: "*/*",
          }
        ],
      },
    ];
  },
};


module.exports = nextConfig
