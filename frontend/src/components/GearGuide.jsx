import React, { useState } from 'react';
import CategoryCard from './CategoryCard';
import { gearCategories } from '../data/gearGuideData';
import { gearCategoriesJapan } from '../data/gearGuideDataJapan';

const GearGuide = ({ onItemSearch }) => {
    const [activity, setActivity] = useState('Both');
    const [priceRange, setPriceRange] = useState('All');
    const [source, setSource] = useState('Global');

    const currentCategories = source === 'Global' ? gearCategories : gearCategoriesJapan;

    const filteredCategories = activity === 'Both'
        ? currentCategories
        : currentCategories.filter(cat => cat.sportCompatibility.includes(activity));

    return (
        <div className="mb-8">
            <div className="card mb-8">
                <h2 className="mb-6 text-2xl">Gear Guide</h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label className="block mb-2 text-sm">
                            Source
                        </label>
                        <select value={source} onChange={(e) => setSource(e.target.value)}>
                            <option value="Global">Global Recommendations 2025</option>
                            <option value="Japan">Japan Recommendations 2025</option>
                        </select>
                    </div>

                    <div>
                        <label className="block mb-2 text-sm">
                            Activity
                        </label>
                        <select value={activity} onChange={(e) => setActivity(e.target.value)}>
                            <option value="Both">Both</option>
                            <option value="Skiing">Skiing</option>
                            <option value="Snowboarding">Snowboarding</option>
                        </select>
                    </div>

                    <div>
                        <label className="block mb-2 text-sm">
                            Price Range
                        </label>
                        <select value={priceRange} onChange={(e) => setPriceRange(e.target.value)}>
                            <option value="All">All Ranges</option>
                            <option value="Budget">Budget</option>
                            <option value="Mid-Range">Mid-Range</option>
                            <option value="High-End">High-End</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="grid">
                {filteredCategories.map(category => (
                    <CategoryCard
                        key={category.id}
                        category={category}
                        priceFilter={priceRange}
                        onItemSearch={onItemSearch}
                    />
                ))}
            </div>
        </div>
    );
};

export default GearGuide;
