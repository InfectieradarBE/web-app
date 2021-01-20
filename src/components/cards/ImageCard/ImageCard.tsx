import React from 'react';
import styles from './ImageCard.module.scss';
import clsx from 'clsx';

interface ImageCardProps {
  imageSrc?: string,
  imageAlt?: string,
  title?: string,
  body?: string,
  openActionText?: string,
  onClick?: () => void;
  className?: string;
}

const ImageCard: React.FC<ImageCardProps> = (props) => {
  return (
    <div
      className={clsx(
        'card border-0 bg-white',
        styles.card,
        props.className
      )}
      onClick={props.onClick}>
      <img className="w-100" src={props.imageSrc} alt={props.imageAlt} />
      <h6 className={clsx(
        'card-title bg-primary px-2 py-1a text-white m-0',
        // 'text-decoration-none',
        'fw-bold fs-btn',
      )}
      >
        {props.title}
      </h6>
      <div className="card-body px-2 py-1a bg-secondary d-flex flex-column">
        <p className="card-text fst-italic flex-grow-1">
          {props.body}
        </p>
        <div className="text-end">
          {props.openActionText ? <button className="btn btn-link text-body p-0">
            {props.openActionText}
            <i className={styles.icon}>
              <svg width="1.25em" height="1.25em" viewBox="0 0 16 16" className="bi bi-arrow-right-short" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8z" />
              </svg>
            </i>
          </button>
            : null}

        </div>
      </div>
    </div>
  );
};

export default ImageCard;
