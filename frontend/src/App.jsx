import React, { useState, useRef } from 'react';
import GearGuide from './components/GearGuide';
import GearSearch from './components/GearSearch';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const searchRef = useRef(null);

  const handleItemSearch = (itemName) => {
    setSearchQuery(itemName);
    // Scroll to search section
    setTimeout(() => {
      searchRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  return (
    <div className="container">
      <header className="mb-12 text-center">
        <h1 className="text-gradient text-5xl mb-2">
          SnowScout
        </h1>
        <p className="text-slate-400 text-xl">
          Find the best gear for your next adventure.
        </p>
      </header>

      <main>
        <GearGuide onItemSearch={handleItemSearch} />
        <div ref={searchRef}>
          <GearSearch initialQuery={searchQuery} />
        </div>
      </main>

      <footer className="mt-16 text-center text-slate-500 pb-8">
        <p>&copy; 2025 SnowScout. Powered by Mercari.</p>
      </footer>
    </div >
  );
}

export default App;
