export function getProxyImageUrl(originalUrl: string): string {
    const baseProxy = "/api/image-proxy?url=";
    return `${baseProxy}${encodeURIComponent(originalUrl)}`;
  }
  