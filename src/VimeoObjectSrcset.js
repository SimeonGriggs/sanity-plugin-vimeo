import React from 'react';
import { quickFields } from './helpers';

export default quickFields(
  'vimeoSrcset',
  'object',
  [
    quickFields('created_time'),
    quickFields('fps', 'number'),
    quickFields('height', 'number'),
    quickFields('link'),
    quickFields('md5'),
    quickFields('quality'),
    quickFields('size', 'number'),
    quickFields('type'),
    quickFields('width', 'number'),
  ],
  ['link']
);
