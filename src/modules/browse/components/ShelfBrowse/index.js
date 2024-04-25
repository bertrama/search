import { useSelector } from 'react-redux';
import React, { useState } from 'react';
import './styles.css';
import BrowseLink from '../BrowseLink';
import { Icon, useWindowWidth } from '../../../reusable';
import relatedItems from './test-data';

function findCallNumberBrowse (metadata) {
  const callNumber = metadata.find((item) => {
    return item.term === 'Call Number';
  });

  if (!callNumber) return null;

  const browse = callNumber.description.find((description) => {
    return Object.keys(description).includes('browse');
  });

  return browse?.browse;
}

const getMetadata = (items) => {
  return items.reduce((obj, item) => {
    if (item?.uid) {
      obj[item.uid] = item;
    }
    return obj;
  }, {});
};

function ShelfBrowse () {
  const { uid, metadata } = useSelector((state) => {
    return state.records.record;
  });
  const items = relatedItems;
  const windowWidth = useWindowWidth();
  let itemsPerPage = 5;
  if (windowWidth < 820) {
    itemsPerPage = 3;
  }
  if (windowWidth < 640) {
    itemsPerPage = 1;
  }
  const maxPages = Math.ceil(items.length / itemsPerPage);
  // Calculate the middle starting page
  const middlePage = Math.floor(maxPages / 2);
  const [currentPage, setCurrentPage] = useState(middlePage);
  const [animationClass, setAnimationClass] = useState('');
  const callNumberBrowse = findCallNumberBrowse(metadata.full);

  if (!callNumberBrowse) return null;

  const { type, value, text } = callNumberBrowse;

  const moveCarousel = (direction) => {
    const getDirection = direction === 1 ? 'next' : 'previous';
    setAnimationClass(`animation-out-${getDirection}`);
    const animationDuration = 250;
    setTimeout(() => {
      setAnimationClass(`animation-in-${getDirection}`);
      setCurrentPage((prevPage) => {
        let newPage = prevPage + direction;
        if (newPage < 0) {
          newPage = maxPages - 1;
        }
        if (newPage >= maxPages) {
          newPage = 0;
        }
        return newPage;
      });
    }, animationDuration);
    setTimeout(() => {
      setAnimationClass('');
    }, animationDuration * 2);
  };

  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = items.slice(startIndex, endIndex);

  return (
    <section className='shelf-browse container__rounded'>
      <header className='flex__responsive'>
        <h2 className='margin-y__none heading-medium'>Shelf browse</h2>
        <BrowseLink
          type={type}
          value={value}
        >
          {text}
        </BrowseLink>
      </header>
      <div className='shelf-browse-carousel' aria-label='Shelf browse carousel'>
        <button
          aria-label='Previous items'
          disabled={currentPage === 0}
          onClick={() => {
            return moveCarousel(-1);
          }}
          className='btn no-background'
        >
          <Icon icon='chevron_left' size='24' />
        </button>
        <ul className='list__unstyled flex shelf-browse-items'>
          {currentItems.map((item, index) => {
            const metadata = getMetadata(item);
            const currentItem = metadata.id.value === uid;
            return (
              <li key={index} className={`shelf-browse-item ${currentItem ? 'shelf-browse-item-current' : ''} ${animationClass}`}>
                <a href='' className={`underline__none container__rounded padding-x__s padding-bottom__xs padding-top__${currentItem ? 'xs' : 's'}`}>
                  <dl className='flex'>
                    {currentItem && <p className='margin__none this-item'>This item</p>}
                    {['title', 'author', 'published_year', 'callnumber_browse'].map((key) => {
                      return metadata[key]?.value?.[0] && (
                        <React.Fragment key={key}>
                          <dt className='visually-hidden'>{metadata[key].name}</dt>
                          <dd className={`item-term-${key}`}>{metadata[key].value[0]}</dd>
                        </React.Fragment>
                      );
                    })}
                  </dl>
                </a>
              </li>
            );
          })}
        </ul>
        <button
          aria-label='Next items'
          disabled={currentPage === (maxPages - 1)}
          onClick={() => {
            return moveCarousel(1);
          }}
          className='btn no-background'
        >
          <Icon icon='chevron_right' size='24' />
        </button>
      </div>
      <button
        className='btn btn--secondary btn--small shelf-browse-carousel-return'
        onClick={() => {
          return setCurrentPage(middlePage);
        }}
      >
        Return to current item
      </button>
    </section>
  );
}

export default ShelfBrowse;
