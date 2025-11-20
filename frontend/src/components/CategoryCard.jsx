import React, { useState } from 'react';

const CategoryCard = ({ category, priceFilter, onItemSearch }) => {
    const [expanded, setExpanded] = useState(false);

    const getSportBadgeColor = (sport) => {
        if (sport === 'Skiing') return '#60a5fa';
        if (sport === 'Snowboarding') return '#f472b6';
        return '#a78bfa';
    };

    const renderPriceRange = (rangeName, rangeData) => {
        if (!rangeData) return null;
        if (priceFilter !== 'All' && priceFilter !== rangeName) return null;

        return (
            <div key={rangeName} style={{ marginBottom: '1.5rem' }}>
                <h4 className="text-base mb-3 text-sky-400 border-b border-white/10 pb-2" style={{ color: 'var(--primary-color)', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                    {rangeName} {rangeData.range}
                </h4>
                <ul className="list-none p-0 grid gap-2">
                    {rangeData.items.map((item, idx) => {
                        const handleItemClick = () => {
                            const searchQuery = encodeURIComponent(item.name);
                            window.open(`https://www.google.com/search?q=${searchQuery}`, '_blank');
                        };

                        return (
                            <li key={idx} className="bg-white/5 p-2 rounded-md flex justify-between items-center text-sm transition-all cursor-pointer hover:bg-white/10 hover:translate-x-1"
                                style={{ background: 'rgba(255,255,255,0.03)' }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.background = 'rgba(255,255,255,0.08)';
                                    e.currentTarget.style.transform = 'translateX(4px)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
                                    e.currentTarget.style.transform = 'translateX(0)';
                                }}
                                onClick={handleItemClick}
                                title={`Click to search for "${item.name}"`}
                            >
                                <span style={{
                                    flex: 1,
                                    transition: 'text-decoration 0.2s'
                                }}
                                    onMouseEnter={(e) => e.currentTarget.style.textDecoration = 'underline'}
                                    onMouseLeave={(e) => e.currentTarget.style.textDecoration = 'none'}
                                >
                                    {idx + 1}. {item.name}
                                </span>
                                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                                    <span style={{ color: 'var(--accent-color)', fontWeight: '600' }}>{item.price}</span>
                                    {onItemSearch && (
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                onItemSearch(item.name);
                                            }}
                                            style={{
                                                background: 'linear-gradient(135deg, var(--primary-color), var(--secondary-color))',
                                                border: 'none',
                                                borderRadius: '0.375rem',
                                                padding: '0.25rem 0.5rem',
                                                color: 'white',
                                                fontSize: '0.75rem',
                                                fontWeight: '600',
                                                cursor: 'pointer',
                                                transition: 'opacity 0.2s, transform 0.1s',
                                                whiteSpace: 'nowrap'
                                            }}
                                            onMouseEnter={(e) => {
                                                e.currentTarget.style.opacity = '0.85';
                                                e.currentTarget.style.transform = 'scale(1.05)';
                                            }}
                                            onMouseLeave={(e) => {
                                                e.currentTarget.style.opacity = '1';
                                                e.currentTarget.style.transform = 'scale(1)';
                                            }}
                                            title="Search for used items"
                                        >
                                            🔍 Used
                                        </button>
                                    )}
                                </div>
                            </li>
                        );
                    })}
                </ul>
            </div>
        );
    };

    return (
        <div className="card cursor-pointer" onClick={() => setExpanded(!expanded)}>
            <div className="flex justify-between items-start mb-3">
                <h3 className="text-xl m-0">{category.name}</h3>
                <span className="text-2xl transition-transform duration-300" style={{
                    transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)'
                }}>
                    ▼
                </span>
            </div>

            <div className="flex gap-2 mb-2 flex-wrap">
                {category.sportCompatibility.map(sport => (
                    <span key={sport} className="text-white px-3 py-1 rounded-2xl text-xs font-bold" style={{
                        background: getSportBadgeColor(sport)
                    }}>
                        {sport}
                    </span>
                ))}
            </div>

            <p className="text-sm text-slate-300 m-0">
                {category.essentialFor}
            </p>

            {expanded && (
                <div className="mt-6 pt-6 border-t border-white/10" style={{
                    borderTop: '1px solid rgba(255,255,255,0.1)'
                }} onClick={(e) => e.stopPropagation()}>
                    {renderPriceRange('Budget', category.priceRanges.budget)}
                    {renderPriceRange('Mid-Range', category.priceRanges.midRange)}
                    {renderPriceRange('High-End', category.priceRanges.highEnd)}
                </div>
            )}
        </div>
    );
};

export default CategoryCard;
