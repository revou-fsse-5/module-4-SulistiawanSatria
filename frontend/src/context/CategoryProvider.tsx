import React, { createContext, useContext, useState } from 'react';

type CategoryContextType = {
  categories: any[];
  fetchCategories: () => void;
  addCategory: (category: any) => void;
  updateCategory: (id: string, category: any) => void;
  deleteCategory: (id: string) => void;
};

const CategoryContext = createContext<CategoryContextType | undefined>(undefined);

export const CategoryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [categories, setCategories] = useState<any[]>([]);

  const fetchCategories = () => {
    // Implementasi fetch categories
  };

  const addCategory = (category: any) => {
    // Implementasi add category
  };

  const updateCategory = (id: string, category: any) => {
    // Implementasi update category
  };

  const deleteCategory = (id: string) => {
    // Implementasi delete category
  };

  const value = {
    categories,
    fetchCategories,
    addCategory,
    updateCategory,
    deleteCategory,
  };

  return <CategoryContext.Provider value={value}>{children}</CategoryContext.Provider>;
};

export const useCategoryContext = () => {
  const context = useContext(CategoryContext);
  if (context === undefined) {
    throw new Error('useCategoryContext harus digunakan dalam CategoryProvider');
  }
  return context;
};
