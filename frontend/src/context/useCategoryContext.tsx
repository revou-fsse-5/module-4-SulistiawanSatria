// src/context/useCategoryContext.tsx
import { useContext } from 'react';
import { CategoryContext } from './CategoryContext'; // Pastikan path benar

export const useCategoryContext = () => {
    const context = useContext(CategoryContext);

    if (!context) {
        throw new Error('useCategoryContext must be used within a CategoryProvider');
    }

    return context;
};
