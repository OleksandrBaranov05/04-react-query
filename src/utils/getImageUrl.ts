
export const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

const imageUrl =  "/default.jpg";

export function getImageUrl(path?: string): string {
  if (!path) return imageUrl;

  
  return `${IMAGE_BASE_URL}${path}`;
}