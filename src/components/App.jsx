import { Component } from 'react';
import { SearchBar } from './SearchBar/SearchBar';
import { fetchImages } from 'services/api';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { LoadMore } from './LoadMore/LoadMore';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';

export class App extends Component {
  state = {
    images: [],
    query: '',
    page: 1,
    isLoading: false,
    modalImage: '',
    showModal: false,
  };

  handleSubmit = query => {
    this.setState({ query, page: 1, isLoading: true });
  };

  handleLoadMore = () => {
    this.setState(state => ({ page: state.page + 1 }));
  };

  toggleModal = modalImage => {
    if (!modalImage) {
      this.setState({ modalImage: '', showModal: false });
    }
    this.setState({ modalImage, showModal: true });
  };

  componentDidUpdate = (_, prevState) => {
    const { query, page } = this.state;
    if (query !== prevState.query || page !== prevState.page) {
      this.setState({ isLoading: true });
      fetchImages(this.state.query, page)
        .then(images => {
          this.setState(prevState => ({
            images: page === 1 ? [...images] : [...prevState.images, ...images],
          }));
        })
        .finally(() => {
          this.setState({ isLoading: false });
        });
    }
  };

  render() {
    const { images, isLoading, showModal, modalImage } = this.state;
    const { handleLoadMore, handleSubmit, toggleModal } = this;
    return (
      <>
        <SearchBar onSubmit={handleSubmit} />
        {isLoading && <Loader />}
        <ImageGallery images={images} openModal={toggleModal} />
        {!!images.length && <LoadMore onLoadMore={handleLoadMore} />}
        {showModal && (
          <Modal modalImage={modalImage} closeModal={toggleModal} />
        )}
      </>
    );
  }
}
