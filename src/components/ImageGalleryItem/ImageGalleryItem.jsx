export const ImageGalleryItem = (
  largeImageURL,
  webformatURL,
  key,
  openModal
) => {
  return (
    <li key={key}>
      <img src={webformatURL} alt="" onClick={() => openModal(largeImageURL)} />
    </li>
  );
};
