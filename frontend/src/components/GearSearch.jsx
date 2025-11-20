import React, { useState, useEffect } from 'react';
import ItemCard from './ItemCard';

const GearSearch = ({ initialQuery = '' }) => {
    const [query, setQuery] = useState(initialQuery);
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Trigger search when initialQuery changes
    useEffect(() => {
        if (initialQuery) {
            setQuery(initialQuery);
            performSearch(initialQuery);
        }
    }, [initialQuery]);

    const performSearch = async (searchQuery) => {
        if (!searchQuery.trim()) return;

        setLoading(true);
        setError(null);
        try {
            const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';
            const response = await fetch(`${apiUrl}/search?query=${encodeURIComponent(searchQuery)}`);
            if (!response.ok) throw new Error('Search failed');
            const data = await response.json();
            setResults(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = async (e) => {
        e.preventDefault();
        performSearch(query);
    };

    return (
        <div className="mt-8">
            <h2 className="text-gradient text-3xl mb-4">Search Used Gear</h2>
            <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4 mb-8">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search for snowboards, bindings, etc..."
                    className="flex-1"
                />
                <button type="submit" className="btn whitespace-nowrap" disabled={loading}>
                    {loading ? 'Searching...' : 'Search'}
                </button>
            </form>

            {error && <div className="text-pink-500 mb-4">{error}</div>}

            <div className="grid">
                {results.map((item) => (
                    <ItemCard key={item.id} item={item} />
                ))}
            </div>
        </div>
    );
};

export default GearSearch;
