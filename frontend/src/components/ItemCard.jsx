import React from 'react';
import { formatPriceWithUSD } from '../utils/currency';

const ItemCard = ({ item }) => {
  return (
    <div className="card">
      <div className="relative h-48 overflow-hidden rounded-lg" style={{ height: '200px' }}>
        <img
          src={item.image_url || 'https://placehold.co/300x200?text=No+Image'}
          alt={item.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs font-bold" style={{ background: 'rgba(0,0,0,0.7)' }}>
          {item.source}
        </div>
      </div>
      <div className="mt-4">
        <h3 className="text-lg mb-2 h-12 overflow-hidden" style={{ height: '3em', textOverflow: 'ellipsis' }}>
          {item.title}
        </h3>
        <div className="flex justify-between items-center mb-4">
          <span className="text-xl font-bold text-sky-400" style={{ color: 'var(--primary-color)' }}>
            {formatPriceWithUSD(item.price)}
          </span>
          <span className="text-sm text-slate-400">
            {item.status === 'ITEM_STATUS_ON_SALE' ? 'On Sale' : 'Sold Out'}
          </span>
        </div>
        <a
          href={item.item_url}
          target="_blank"
          rel="noopener noreferrer"
          className="btn block text-center mt-4 no-underline"
        >
          View Item
        </a>
      </div>
    </div>
  );
};

export default ItemCard;
