import React from 'react';
import { formatPriceWithUSD } from '../utils/currency';

const ItemCard = ({ item }) => {
  return (
    <div className="card">
      <div style={{ position: 'relative', height: '200px', overflow: 'hidden', borderRadius: '0.5rem' }}>
        <img
          src={item.image_url || 'https://placehold.co/300x200?text=No+Image'}
          alt={item.title}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          background: 'rgba(0,0,0,0.7)',
          padding: '0.25rem 0.5rem',
          borderRadius: '0.25rem',
          fontSize: '0.8rem',
          fontWeight: 'bold'
        }}>
          {item.source}
        </div>
      </div>
      <div style={{ marginTop: '1rem' }}>
        <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', height: '3em', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {item.title}
        </h3>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'var(--primary-color)' }}>
            {formatPriceWithUSD(item.price)}
          </span>
          <span style={{ fontSize: '0.9rem', color: '#94a3b8' }}>
            {item.status === 'ITEM_STATUS_ON_SALE' ? 'On Sale' : 'Sold Out'}
          </span>
        </div>
        <a
          href={item.item_url}
          target="_blank"
          rel="noopener noreferrer"
          className="btn"
          style={{ display: 'block', textAlign: 'center', marginTop: '1rem', textDecoration: 'none' }}
        >
          View Item
        </a>
      </div>
    </div>
  );
};

export default ItemCard;
