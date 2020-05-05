import React from 'react';
import { quickFields } from './helpers';

export default quickFields(
  'vimeoPictures',
  'object',
  [
    quickFields('link', 'url'),
    {
      name: 'link_with_play_button',
      title: 'Link With Play Button',
      type: 'url',
    },
    quickFields('width', 'number'),
    quickFields('height', 'number'),
  ],
  ['link', 'md5']
);
