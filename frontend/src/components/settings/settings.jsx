import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

const Settings = () => {
    const navigate = useNavigate();
    const [themeColor, setThemeColor] = useState('#0d9488'); // Default teal-600

    useEffect(() => {
        const savedColor = localStorage.getItem('dashboard-theme');
        if (savedColor) {
            setThemeColor(savedColor);
        }
    }, []);

    const handleColorChange = (e) => {
        const newColor = e.target.value;
        setThemeColor(newColor);
        localStorage.setItem('dashboard-theme', newColor);
    };

    return (
        <div className="bg-gray-100 min-h-screen p-8">
            <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 text-teal-600 hover:text-teal-800 font-medium mb-6"
            >
                <FaArrowLeft className="text-sm" />
                Back
            </button>
            <div className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-md border-t-4 border-teal-500">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Dashboard Settings</h2>
                <div className="mb-4">
                    <label htmlFor="themeColor" className="block text-gray-700 text-sm font-semibold mb-2">
                        Dashboard Accent Color
                    </label>
                    <div className="flex items-center gap-4">
                        <input
                            type="color"
                            id="themeColor"
                            value={themeColor}
                            onChange={handleColorChange}
                            className="w-12 h-12 rounded-md border-none cursor-pointer"
                            title="Choose your theme color"
                        />
                        <span className="text-gray-600 font-mono text-sm">{themeColor}</span>
                    </div>
                </div>
                <p className="text-gray-500 text-sm mt-4">
                    Changes will be applied immediately to the dashboard sidebar and table headers.
                </p>
            </div>
        </div>
    );
};

export default Settings;