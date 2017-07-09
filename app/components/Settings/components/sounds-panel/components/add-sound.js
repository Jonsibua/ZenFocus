import { remote } from 'electron';
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Button, Dialog, Intent } from '@blueprintjs/core';
import { SoundTypes } from '../../../../enums';

class AddSound extends PureComponent {
  static propTypes = {
    addSound: PropTypes.func.isRequired,
    className: PropTypes.string
  };

  state = {
    isOpen: false,
    src: '',
    title: '',
    soundType: SoundTypes.TICK,
    hasSrc: null,
    hasTitle: null,
  };

  render() {
    const {
      addSound,
      className
    } = this.props;

    const {
      isOpen,
      src,
      title,
      soundType,
      hasSrc,
      hasTitle,
    } = this.state;

    return (
      <div className={className}>
        <Button
          iconName="upload"
          text="Upload Sound File"
          onClick={() => this.setState({ isOpen: true })}
        />

        <Dialog isOpen={isOpen} onClose={() => this.setState({ isOpen: false })}>
          <div className="mx-3 mt-3">
            <div
              role="button"
              tabIndex={0}
              className="pt-input-group mb-1"
              onClick={() => {
                const files = remote.dialog.showOpenDialog();
                if (files) this.setState({ src: files[0], hasSrc: true });
              }}
            >
              <span className="pt-icon pt-icon-music" />
              <input
                readOnly
                className={classNames('pt-input', {
                  'pt-intent-danger': hasSrc === false,
                  'pt-intent-success': hasSrc === true,
                })}
                type="text"
                placeholder="Browse files..."
                value={src}
                dir="auto"
              />
            </div>
            <div className="pt-input-group mb-3">
              <span className="pt-icon pt-icon-tag" />
              <input
                className={classNames('pt-input', {
                  'pt-intent-danger': hasTitle === false,
                  'pt-intent-success': hasTitle === true && title
                })}
                type="text"
                placeholder="Title"
                value={title}
                dir="auto"
                onChange={e => this.setState({ title: e.target.value, hasTitle: true })}
              />
            </div>
            <div>
              <span>Sound Type </span>
              <div className="pt-select">
                <select
                  value={soundType}
                  onChange={e => this.setState({ soundType: e.target.value })}
                >
                  <option value={soundType}>{soundType}</option>
                </select>
              </div>
            </div>
            <Button
              className="float-right"
              iconName="add"
              text="Add sound"
              intent={Intent.SUCCESS}
              onClick={() => {
                if (!title) return this.setState({ hasTitle: false });
                if (!src) return this.setState({ hasSrc: false });
                addSound(title, src, soundType);
                this.setState({ title: '', src: '', hasTitle: null, hasSrc: null, isOpen: false });
              }}
            />
          </div>
        </Dialog>
      </div>
    );
  }
}

export default AddSound;
