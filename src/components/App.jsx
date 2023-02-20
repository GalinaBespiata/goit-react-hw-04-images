import { useState, useEffect } from 'react';

import { SearchBar } from './SearchBar/SearchBar.jsx';
import { Loader } from './Loader/Loader.jsx';
import { ImageGallery } from './ImageGallery/ImageGallery.jsx';
import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem.jsx';
import { ButtonLoadMore } from './Button/ButtonLoadMore.jsx';
import { Modal } from './Modal/Modal.jsx';
import axios from 'axios';

export function App() {
  // state = {
  //   images: [],
  //   isHidden: false,
  //   loading: false,
  //   error: null,
  //   modalIsOpen: false,
  //   selectedImage: null,
  //   query: '',
  //   page: 1,
  // };
  const [images, setImages] = useState([]);
  const [isHidden, setIsHidden] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const fetchImages = async () => {
    try {
      setLoading(true);

      const { data } = await axios.get(
        ` https://pixabay.com/api/?q=${query}&page=${page}&key=32908918-e7cc5cba0888a51be5caa34d0&image_type=photo&orientation=horizontal&per_page=12`
      );
      setImages(data.hits);

      if (data.total / 12 <= page) {
        setIsHidden(true);
      }
    } catch (error) {
      this.setState({ error: error.message });
    } finally {
      setLoading(false);
    }
  };
  const showImagesFromTop = () => {
    const sortedImages = images.slice().reverse();
    setImages(sortedImages);
  };
  useEffect(() => {
    fetchImages();
  }, []);
  // componentDidMount() {
  //   this.fetchImages();
  // }
  useEffect(() => {
    if (!query) return;
    console.log('OOOOOOOOO');
    setPage(1);
    fetchImages();
    //  else if (page !== 1) {
    //   this.showImagesFromTop();
    //   this.fetchImages();
    // }
  }, [page]);
  // componentDidUpdate(_, prevState) {
  //   if (prevState.query !== this.state.query) {
  //     this.setState({ page: 1 });
  //     this.fetchImages();
  //   } else if (prevState.page !== this.state.page) {
  //     this.showImagesFromTop();
  //     this.fetchImages();
  //   }
  // }
  const loadMore = () => {
    setPage(prevState => prevState.page + 1);
  };
  const handleOpenModal = largeImgUrl => {
    setModalIsOpen(true);
    setSelectedImage(largeImgUrl);
  };
  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedImage(null);
  };
  const getQuery = query => {
    setQuery(query);
    setPage(1);
    setImages([]);
  };

  return (
    <div style={{ position: 'relative' }}>
      <SearchBar onSubmit={getQuery} />
      {loading && <Loader />}

      {error !== null && <p>Ooops, we have mistake!!! {error}</p>}
      <ImageGallery images={images} handleOpenModal={handleOpenModal} />
      {!isHidden || loading & <ButtonLoadMore onClick={loadMore} />}
      {modalIsOpen && (
        <Modal largeUrl={selectedImage} closeModal={closeModal} />
      )}
      <ImageGalleryItem />
    </div>
  );
}
