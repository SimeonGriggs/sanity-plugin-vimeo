import React from 'react';
import { FaVideo } from 'react-icons/fa';
import { quickFields } from './helpers';

export default {
  name: 'vimeo',
  title: 'Vimeo',
  description: 'Vimeo videos',
  __experimental_actions: [
    /* 'create', 'update', 'delete', 'publish' */
  ],
  icon: FaVideo,
  type: 'document',
  fields: [
    quickFields('name'),
    quickFields('srcset', 'array', [quickFields('vimeoSrcset', 'vimeoSrcset')]),
    quickFields('width', 'number'),
    quickFields('height', 'number'),
    quickFields('aspectRatio', 'number'),
    quickFields('description'),
    quickFields('pictures', 'array', [
      quickFields('vimeoPictures', 'vimeoPictures'),
    ]),
    quickFields('link', 'url'),
    quickFields('duration', 'number'),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'link',
      description: 'description',
      media: 'pictures.2.link',
    },
    prepare(selection) {
      const { title, subtitle, media } = selection;
      return {
        title,
        subtitle,
        media: (
          <img style={{ objectFit: 'cover' }} src={media} alt={`${title}`} />
        ),
      };
    },
  },
};
