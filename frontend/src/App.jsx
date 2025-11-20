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
      <header style={{ marginBottom: '3rem', textAlign: 'center' }}>
        <h1 className="text-gradient" style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>
          SnowScout
        </h1>
        <p style={{ color: '#94a3b8', fontSize: '1.2rem' }}>
          Find the best gear for your next adventure.
        </p>
      </header>

      <main>
        <GearGuide onItemSearch={handleItemSearch} />
        <div ref={searchRef}>
          <GearSearch initialQuery={searchQuery} />
        </div>
      </main>

      <footer style={{ marginTop: '4rem', textAlign: 'center', color: '#64748b', paddingBottom: '2rem' }}>
        <p>&copy; 2025 SnowScout. Powered by Mercari.</p>
      </footer>
    </div >
  );
}

export default App;
