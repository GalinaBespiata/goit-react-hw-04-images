import { useState, useEffect } from 'react';

import { SearchBar } from './SearchBar/SearchBar.jsx';
import { Loader } from './Loader/Loader.jsx';
import { ImageGallery } from './ImageGallery/ImageGallery.jsx';
import { getFetch } from 'services/api.js';
import { ButtonLoadMore } from './Button/ButtonLoadMore.jsx';
import { Modal } from './Modal/Modal.jsx';

export const App = () => {
  const [images, setImages] = useState([]);
  const [totalImages, setTotalImages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);

  const loadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const handleOpenModal = largeImgUrl => {
    setModalIsOpen(true);
    setSelectedImage(largeImgUrl);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedImage(null);
  };

  const onSubmit = query => {
    setQuery(query);
    setPage(1);
    setImages([]);
    setTotalImages(0);
  };

  useEffect(() => {
    if (!query) return;
    const fetchImages = async () => {
      try {
        setLoading(true);

        const data = await getFetch(query, page);

        setImages(prevImages => {
          return [...prevImages, ...data.hits];
        });
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchImages();
  }, [page, query]);

  return (
    <div style={{ position: 'relative', textAlign: 'center' }}>
      <SearchBar onSubmit={onSubmit} />

      {error !== null && <p>Ooops, we have mistake!!! {error}</p>}
      <ImageGallery images={images} handleOpenModal={handleOpenModal} />
      {loading && <Loader />}
      {!loading && totalImages !== images.length && (
        <ButtonLoadMore onClick={loadMore} />
      )}
      {modalIsOpen && (
        <Modal largeUrl={selectedImage} closeModal={closeModal} />
      )}
    </div>
  );
};
