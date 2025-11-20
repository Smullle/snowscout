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
                <h4 style={{
                    fontSize: '1rem',
                    marginBottom: '0.75rem',
                    color: 'var(--primary-color)',
                    borderBottom: '1px solid rgba(255,255,255,0.1)',
                    paddingBottom: '0.5rem'
                }}>
                    {rangeName} {rangeData.range}
                </h4>
                <ul style={{
                    listStyle: 'none',
                    padding: 0,
                    display: 'grid',
                    gap: '0.5rem'
                }}>
                    {rangeData.items.map((item, idx) => {
                        const handleItemClick = () => {
                            const searchQuery = encodeURIComponent(item.name);
                            window.open(`https://www.google.com/search?q=${searchQuery}`, '_blank');
                        };

                        return (
                            <li key={idx} style={{
                                background: 'rgba(255,255,255,0.03)',
                                padding: '0.5rem 0.75rem',
                                borderRadius: '0.375rem',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                fontSize: '0.9rem',
                                transition: 'background 0.2s, transform 0.1s',
                                cursor: 'pointer'
                            }}
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
        <div className="card" style={{ cursor: 'pointer' }} onClick={() => setExpanded(!expanded)}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '0.75rem' }}>
                <h3 style={{ fontSize: '1.25rem', margin: 0 }}>{category.name}</h3>
                <span style={{
                    fontSize: '1.5rem',
                    transition: 'transform 0.3s',
                    transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)'
                }}>
                    ▼
                </span>
            </div>

            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem', flexWrap: 'wrap' }}>
                {category.sportCompatibility.map(sport => (
                    <span key={sport} style={{
                        background: getSportBadgeColor(sport),
                        color: 'white',
                        padding: '0.25rem 0.75rem',
                        borderRadius: '1rem',
                        fontSize: '0.75rem',
                        fontWeight: '600'
                    }}>
                        {sport}
                    </span>
                ))}
            </div>

            <p style={{ fontSize: '0.85rem', color: '#cbd5e1', margin: 0 }}>
                {category.essentialFor}
            </p>

            {expanded && (
                <div style={{
                    marginTop: '1.5rem',
                    paddingTop: '1.5rem',
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
