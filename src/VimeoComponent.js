import React, { useState } from 'react';
import client from 'part:@sanity/base/client';
import { addKeys } from './helpers';

import styles from './Vimeo.css';

const VimeoComponent = () => {
  const [count, setCount] = useState(false);
  const [countPages, setCountPages] = useState(false);
  const [doingPage, setDoingPage] = useState(false);

  const vimeoFetchUrl = 'https://api.vimeo.com/me/videos';
  const vimeoAccessToken = process.env.SANITY_STUDIO_VIMEO_ACCESS_TOKEN;

  function importVimeo(url) {
    setDoingPage(`Importing Page https://api.vimeo.com${url}`);

    let nextPage;

    fetch(`https://api.vimeo.com${url}`, {
      headers: {
        Authorization: `Bearer ${vimeoAccessToken}`,
      },
    })
      .then(res => res.json())
      .then(res => {
        nextPage = res.paging.next;
        const transaction = client.transaction();

        res.data.forEach(video => {
          if (video.files) {
            transaction.createOrReplace({
              _id: `vimeo-${video.uri.split('/').pop()}`,
              _type: 'vimeo',
              name: video.name,
              srcset: addKeys(video.files, 'md5'),
              width: video.width,
              height: video.height,
              aspectRatio: video.width / video.height,
              description: video.description || '',
              pictures: addKeys(video.pictures.sizes, 'link'),
              link: video.link,
              duration: video.duration,
            });
          }
        });

        return transaction
          .commit()
          .then(response =>
            nextPage ? importVimeo(nextPage) : setDoingPage(`Finished`)
          )
          .catch(error => {
            console.error('Update failed: ', error.message);
          });
      });
  }

  function fetchVimeo() {
    fetch(vimeoFetchUrl, {
      headers: {
        Authorization: `Bearer ${vimeoAccessToken}`,
      },
    })
      .then(res => res.json())
      .then(res => {
        setCount(res.total);
        setCountPages(Math.ceil(res.total / res.per_page));

        importVimeo(res.paging.first, 'first');
      });
  }

  return (
    <div className={styles.container}>
      {vimeoAccessToken && (
        <>
          <button
            style={{ marginBottom: '1rem' }}
            type="button"
            onClick={() => fetchVimeo()}
          >
            Update Vimeo Posts
          </button>

          {count && countPages && (
            <p>
              <strong>
                Found {countPages} pages with {count} total Videos
              </strong>
            </p>
          )}

          {doingPage && <p>{doingPage}</p>}
        </>
      )}

      {!vimeoAccessToken && <p>No Access Token found in .env.development</p>}
    </div>
  );
};

export default VimeoComponent;
