export type TokenGeneric = {
  exp: number;
  id: number;
  role: {
    name: string;
  };
  email: string;
};

export function parseJwt(token: string): TokenGeneric | null {
  if (!token) return null;
  try {
    return JSON.parse(Buffer.from(token.split(".")[1], "base64").toString());
  } catch (e) {
    console.log("[Middleware] parseJwt", "Parse token fail");
    return null;
  }
}

export function isTokenValid(token: string): boolean {
  if (!token) return false;
  const nowUnix = (+new Date() / 1e3) | 0;
  const decodedToken = parseJwt(token);
  if (!decodedToken) {
    console.log("[Middleware] isTokenValid", "Decode token fail", decodedToken);
    return false;
  }

  return decodedToken.exp > nowUnix;
}
