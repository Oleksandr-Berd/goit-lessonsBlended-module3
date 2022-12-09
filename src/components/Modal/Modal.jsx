import { Component } from 'react';
import { createPortal } from 'react-dom';

const modalRoot = document.querySelector('#modalRoot');
export class Modal extends Component {
  closeByEscape = evt => {
    if (evt.code === 'Escape') {
      this.props.closeModal();
    }
  };

  componentDidMount = () => {
    window.addEventListener('keydown', this.closeByEscape);
  };

  componentWillUnmount = () => {
    window.removeEventListener('keydown', this.closeByEscape);
  };

  render() {
    const { closeModal, modalImage } = this.props;
    return createPortal(
      <div
        className="overlay"
        onClick={evt => {
          evt.stopPropagation();
          closeModal();
        }}
      >
        <div className="modal">
          <img src={modalImage} alt="" />
        </div>
      </div>,
      modalRoot
    );
  }
}
