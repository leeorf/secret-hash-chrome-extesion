import React, {
  ChangeEvent,
  useEffect,
  useLayoutEffect,
  useState,
} from 'react';
import ReactDOM from 'react-dom/client';
import { Algorithm } from '../constants';
import { ErrorBoundary } from '../ErrorBoundary';
import './options.css';
import packageJson from '../../package.json';

type Settings = {
  loaded: boolean;
  hashAlgorithm: Algorithm;
  rememberSecret: boolean;
  hideSecret: boolean;
};

const Options = () => {
  const [settings, setSettings] = useState<Settings>({
    loaded: false,
    hashAlgorithm: Algorithm.sha1,
    hideSecret: true,
    rememberSecret: false,
  });

  useEffect(() => {
    chrome.storage.sync.get(
      ['rememberSecret', 'hideSecret', 'hashAlgorithm'],
      result => {
        setSettings({
          hashAlgorithm: result.hashAlgorithm ?? settings.hashAlgorithm,
          loaded: true,
          hideSecret: result.hideSecret ?? settings.hideSecret,
          rememberSecret: result.rememberSecret ?? settings.rememberSecret,
        });
      }
    );
  }, []);

  return (
    <div className="settings">
      <aside>
        <div className="navigation">
          <ul className="navigation__list">
            <li>
              <a className="navigation__item" href="#general">
                General
              </a>
            </li>
            <li>
              <a className="navigation__item" href="#security">
                Security
              </a>
            </li>
            <hr />
            <li>
              <a className="navigation__item" href="#about">
                About
              </a>
            </li>
          </ul>
        </div>
      </aside>
      <main className="main-content">
        <section className="main-content__section" id="general">
          <h2>General</h2>

          <div className="row">
            <label htmlFor="">Hash algorithm</label>
            {settings.loaded && (
              <div className="select__container">
                <select
                  className="select"
                  value={settings.hashAlgorithm}
                  onChange={event => {
                    chrome.storage.sync.set({
                      hashAlgorithm: event.target.value,
                    });
                    setSettings({
                      ...settings,
                      hashAlgorithm: event.target.value as Algorithm,
                    });
                  }}
                >
                  {Object.keys(Algorithm).map(algorithm => (
                    <option key={algorithm} value={Algorithm[algorithm]}>
                      {algorithm}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
          <div className="row">
            <label htmlFor="">Hide secret input by default</label>
            {settings.loaded && (
              <button
                aria-checked={settings.hideSecret}
                onClick={() => {
                  chrome.storage.sync.set({
                    hideSecret: !settings.hideSecret,
                  });
                  setSettings({
                    ...settings,
                    hideSecret: !settings.hideSecret,
                  });
                }}
                role="switch"
                type="button"
                className="switch"
              />
            )}
          </div>

          <div className="row">
            <label htmlFor="">Always remember secret</label>
            {settings.loaded && (
              <button
                aria-checked={settings.rememberSecret}
                onClick={() => {
                  chrome.storage.sync.set({
                    rememberSecret: !settings.rememberSecret,
                    secret: '',
                  });
                  setSettings({
                    ...settings,
                    rememberSecret: !settings.rememberSecret,
                  });
                }}
                role="switch"
                type="button"
                className="switch"
              />
            )}
          </div>
        </section>

        <section className="main-content__section" id="about">
          <h2>About</h2>
          <p>Version {packageJson.version}</p>
        </section>
      </main>
    </div>
  );
};

const rootContainer = document.createElement('div');
rootContainer.id = 'root';
document.body.appendChild(rootContainer);

const root = ReactDOM.createRoot(rootContainer);
root.render(
  <ErrorBoundary>
    <Options />
  </ErrorBoundary>
);
