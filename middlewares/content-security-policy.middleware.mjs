const cspHeader = (_req, res, next) => {
  res.setHeader(
    'Content-Security-Policy',
    `script-src 'self' https://*.stiwoz.cloud; style-src 'self' https://*.stiwoz.cloud;`
  );
  next();
};

export default cspHeader;
