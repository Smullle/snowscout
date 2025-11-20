import React from 'react';

const RecommendationList = ({ recommendations }) => {
    if (!recommendations.length) return null;

    return (
        <div style={{ marginTop: '2rem' }}>
            <h2 className="text-gradient" style={{ marginBottom: '1rem' }}>Recommendations For You</h2>
            <div className="grid">
                {recommendations.map((rec, idx) => (
                    <div key={idx} className="card">
                        <h3 style={{ marginBottom: '0.5rem' }}>{rec.item_name}</h3>
                        <p style={{ fontSize: '0.9rem', color: '#cbd5e1', marginBottom: '1rem' }}>{rec.reason}</p>
                        {rec.rating && (
                            <div style={{ marginBottom: '0.5rem' }}>
                                <span style={{ color: 'var(--primary-color)', fontWeight: 'bold' }}>Rating: {rec.rating}</span>
                            </div>
                        )}
                        {rec.source_url && (
                            <div style={{ marginBottom: '0.5rem' }}>
                                <a href={rec.source_url} target="_blank" rel="noopener noreferrer" style={{ color: '#60a5fa', textDecoration: 'underline' }}>
                                    Read Review / Source
                                </a>
                            </div>
                        )}
                        {rec.suggested_upgrade && (
                            <div style={{ fontSize: '0.9rem', color: 'var(--accent-color)', marginTop: '0.5rem', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '0.5rem' }}>
                                <strong>Suggested Upgrade:</strong> {rec.suggested_upgrade}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RecommendationList;
