import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { Algorithm, HASH_OPERATION_MESSAGE_DELAY } from '../constants';
import { ErrorBoundary } from '../ErrorBoundary';
import { executeAsync } from '../helpers';
import './popup.css';
import { copyToClipboard, hash } from './Popup.helpers';
import classnames from 'classnames';
import { motion, AnimatePresence } from 'framer-motion';

type HashOperation = {
  status?: 'success' | 'error';
  message?: string;
};

const Popup: React.FC<{}> = () => {
  const [textToHash, setTextToHash] = useState('');
  const [hashOperation, setHashOperation] = useState<HashOperation>({
    message: '',
  });
  const [showTextToHash, setShowTextToHash] = useState(false);

  const toastClassNames = classnames({
    input__toast: true,
    'input__toast--hidden': !hashOperation.status,
    'input__toast--success': hashOperation.status == 'success',
    'input__toast--error': hashOperation.status == 'error',
  });

  const toastMessageClassNames = classnames({
    'input__toast-message': true,
    'input__toast-message--error': hashOperation.status == 'error',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const [_, err] = await executeAsync(async () => {
      const hashedText = await hash(textToHash);
      await copyToClipboard(hashedText);
      return hashedText;
    });

    setHashOperation({
      message: err ? 'Something went wrong' : 'Hash copied to clipboard',
      status: err ? 'error' : 'success',
    });
  };

  useEffect(() => {
    let timeoutId;

    if (hashOperation.status) {
      timeoutId = setTimeout(() => {
        setHashOperation({
          message: '',
        });
      }, HASH_OPERATION_MESSAGE_DELAY * 1000);
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [hashOperation]);

  return (
    <form className="popup__form" onSubmit={handleSubmit}>
      <div className="popup__input-container">
        <div className="input__text-container">
          <label htmlFor="text-to-hash" className="input__label">
            Secret
          </label>

          <input
            id="text-to-hash"
            className="input__text"
            type={showTextToHash ? 'text' : 'password'}
            onChange={e => setTextToHash(e.target.value)}
          />
        </div>
        <button
          className="input__action-button"
          type="button"
          onClick={() => setShowTextToHash(!showTextToHash)}
        >
          {showTextToHash ? '🙈' : '👀'}
        </button>
        <div className={toastClassNames}></div>
        <AnimatePresence>
          {hashOperation.status && (
            <motion.p
              className={toastMessageClassNames}
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                type: 'spring',
                delay: 0.4,
                stiffness: 300,
              }}
              exit={{ y: 10, opacity: 0 }}
            >
              {hashOperation.message}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      <button type="submit" className="btn">
        Hash
      </button>
    </form>
  );
};

const rootContainer = document.createElement('div');
rootContainer.id = 'root';
document.body.appendChild(rootContainer);

const root = ReactDOM.createRoot(rootContainer);
root.render(
  <ErrorBoundary>
    <Popup />
  </ErrorBoundary>
);
