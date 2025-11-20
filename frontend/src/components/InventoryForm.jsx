
import React, { useState } from 'react';

const InventoryForm = ({ onUpdateInventory }) => {
    const [activity, setActivity] = useState('Snowboarding');
    const [skillLevel, setSkillLevel] = useState('Intermediate');
    const [priceRange, setPriceRange] = useState('Any');
    const [items, setItems] = useState([]);
    const [newItem, setNewItem] = useState({ category: 'Snowboard', brand: '', model: '' });

    const addItem = () => {
        if (newItem.brand && newItem.model) {
            setItems([...items, { ...newItem, name: `${newItem.brand} ${newItem.model} ` }]);
            setNewItem({ ...newItem, brand: '', model: '' });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onUpdateInventory({
            items,
            skill_level: skillLevel,
            activity,
            price_range: priceRange
        });
    };

    return (
        <div className="card" style={{ marginBottom: '2rem' }}>
            <h2 style={{ marginBottom: '1.5rem' }}>Your Gear Profile</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Activity</label>
                    <select value={activity} onChange={(e) => setActivity(e.target.value)}>
                        <option value="Snowboarding">Snowboarding</option>
                        <option value="Skiing">Skiing</option>
                        <option value="Both">Both</option>
                    </select>
                </div>
                <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Skill Level</label>
                    <select value={skillLevel} onChange={(e) => setSkillLevel(e.target.value)}>
                        <option value="Beginner">Beginner</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Advanced">Advanced</option>
                    </select>
                </div>
                <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Budget / Price Range</label>
                    <select value={priceRange} onChange={(e) => setPriceRange(e.target.value)}>
                        <option value="Any">Any</option>
                        <option value="Budget">Budget (Under $300)</option>
                        <option value="Mid-Range">Mid-Range ($300 - $600)</option>
                        <option value="High-End">High-End ($600+)</option>
                    </select>
                </div>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
                <h3 style={{ fontSize: '1rem', marginBottom: '1rem' }}>Current Inventory</h3>
                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
                    <select
                        value={newItem.category}
                        onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
                        style={{ width: '150px' }}
                    >
                        <option value="Snowboard">Snowboard</option>
                        <option value="Skis">Skis</option>
                        <option value="Bindings">Bindings</option>
                        <option value="Boots">Boots</option>
                        <option value="Helmet">Helmet</option>
                        <option value="Goggles">Goggles</option>
                        <option value="Jacket">Jacket</option>
                        <option value="Pants">Pants</option>
                        <option value="Gloves">Gloves</option>
                    </select>
                    <input
                        placeholder="Brand"
                        value={newItem.brand}
                        onChange={(e) => setNewItem({ ...newItem, brand: e.target.value })}
                    />
                    <input
                        placeholder="Model"
                        value={newItem.model}
                        onChange={(e) => setNewItem({ ...newItem, model: e.target.value })}
                    />
                    <button type="button" className="btn-secondary" onClick={addItem}>Add</button>
                </div>

                {items.length > 0 && (
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                        {items.map((item, idx) => (
                            <li key={idx} style={{ background: 'rgba(255,255,255,0.05)', padding: '0.5rem 1rem', borderRadius: '0.25rem', marginBottom: '0.5rem', display: 'flex', justifyContent: 'space-between' }}>
                                <span>{item.category}: {item.brand} {item.model}</span>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            <button onClick={handleSubmit} className="btn" style={{ width: '100%' }}>
                Get Recommendations
            </button>
        </div>
    );
};

export default InventoryForm;
