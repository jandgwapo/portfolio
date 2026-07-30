const configuredBase = import.meta.env.BASE_URL;
const base = configuredBase.endsWith('/') ? configuredBase : `${configuredBase}/`;

/** Prefix an internal URL with Astro's configured deployment base. */
export function sitePath(path = '/') {
  if (/^(?:[a-z][a-z\d+.-]*:|#)/i.test(path)) {
    return path;
  }

  const [pathname, ...hashParts] = path.split('#');
  const normalizedPath = pathname.replace(/^\/+/, '');
  const prefixedPath = `${base}${normalizedPath}`;

  return hashParts.length > 0 ? `${prefixedPath}#${hashParts.join('#')}` : prefixedPath;
}
