export function getProxyImageUrl(originalUrl: string): string {
  const baseProxy = "/api/image-proxy?url=";
  return `${baseProxy}${encodeURIComponent(originalUrl)}`;
}

export function getProxyVideoUrl(originalUrl: string): string {
  const baseProxy = "/api/video-proxy?url=";
  return `${baseProxy}${encodeURIComponent(originalUrl)}`;
}
