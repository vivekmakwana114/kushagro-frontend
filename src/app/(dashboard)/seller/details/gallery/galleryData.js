export const galleryData = {
  id: 1,
  photos: Array.from({ length: 30 }).map((_, idx) => ({
    url: `https://picsum.photos/512?random=${idx}`,
    name: `Image ${idx + 1}`,
  })),
};
