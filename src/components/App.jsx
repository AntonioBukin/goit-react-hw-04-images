import React, { useState, useEffect } from 'react';
import { Container } from './App.styled';
import Searchbar from './Searchbar/Searchbar';
import Button from './Button/Button';
import ImageGallery from './ImageGallery/ImageGallery';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';
import { ToastContainer, Slide, toast } from 'react-toastify';
import * as API from '../api/posts';
import 'react-toastify/dist/ReactToastify.css';

export function App() {
  //створюємо окремі стейти
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [totalHits, setTotalHits] = useState(0);
  const [largeImageURL, setLargeImageURL] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (!query) {
      return;
    }
    const fetchPosts = async (query, page) => {
      try {
        setIsLoading(true);
        const { images, totalHits } = await API.postImage(query, page);

        if (images.length === 0) {
          return toast.warning(
            "Sorry we can't find anything, let's try different informations"
          );
        }
        setItems(prevItems => [...prevItems, ...images]);
          setTotalHits(totalHits);
        if (totalHits && page === 1) {
          toast.success(`We found ${totalHits} images`);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPosts(query, page);
  }, [page, query]);

  const toggleModal = (url = '') => {
    setLargeImageURL(url);
    setIsModalOpen(!isModalOpen);
  };

  const handleSubmit = query => {
    setQuery(query);
    setPage(1);
    setItems([]);
  };

  const handleLoadMore = () => {
    setPage(prevState => prevState.page + 1);
  };

  return (
    <Container>
      <Searchbar onSubmit={handleSubmit} isLoading={isLoading} />
      {error && <p>{error}</p>}
      {items.length > 0 && <ImageGallery items={items} onClick={toggleModal} />}
        {page < Math.ceil(totalHits / 12) && (
          <Button onLoadMore={handleLoadMore} isLoading={isLoading}/>
        )}
      <ToastContainer transition={Slide} />
      {isLoading && <Loader />}
      {isModalOpen && <Modal onClose={toggleModal} url={largeImageURL} />
      }
    </Container>
  );
}

