declare global {
    namespace NodeJS {
      interface Global {
        coreProxy: CustomProxyMiddleware;
        configDatabase: ConfigDatabase;
      }
    }
  }