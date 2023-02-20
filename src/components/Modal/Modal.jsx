import { useEffect } from 'react';
import css from '../Modal/Modal.module.css';

export function Modal(largeUrl, closeModal) {
  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return document.removeEventListener('keydown', handleKeyDown);
  }, []);
  // componentDidMount() {
  //   document.addEventListener('keydown', this.handleKeyDown);
  // }

  // componentWillUnmount() {
  //   document.removeEventListener('keydown', this.handleKeyDown);
  // }
  const handleKeyDown = evt => {
    if (evt.code === 'Escape') {
      closeModal();
    }
    console.log(evt.code);
  };
  const handleClick = evt => {
    if (evt.target === evt.currentTarget) {
      closeModal();
    }
  };

  return (
    <div className={css.overlay} onClick={handleClick}>
      <div className={css.modal}>
        <img src={largeUrl} alt="" />
      </div>
    </div>
  );
}
