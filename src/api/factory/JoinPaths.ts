const trimLeadingSlash = (path: string): string => (
  path.charAt(0) === '/' ? path.substring(1) : path
);

const trimTrailingSlash = (path: string): string => (
  path.slice(-1) === '/' ? path.substring(0, path.length - 1) : path
);

export const joinPaths = (...segments: Array<string>): string => {
  if (!segments.length) return '';

  return segments.reduce(
    (path: string, currentSegment: string) => (`${trimTrailingSlash(path)}/${trimLeadingSlash(currentSegment)}`),
  );
};
