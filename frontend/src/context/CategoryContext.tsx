import React, { createContext, useState, useEffect, useCallback, useMemo } from 'react';
import api from '../utils/api';
import { setCache, getCache } from '../utils/cacheUtils';

interface Category {
  id: string;
  name: string;
  description: string;
}

interface CategoryContextState {
  categories: Category[];
  loading: boolean;
  error: string | null;
  page: number;
  totalPages: number;
}

export interface CategoryContextProps extends CategoryContextState {
  fetchCategories: (page?: number) => Promise<void>;
  addCategory: (category: Omit<Category, 'id'>) => Promise<void>;
  updateCategory: (id: string, category: Omit<Category, 'id'>) => Promise<void>;
  deleteCategory: (id: string) => Promise<void>;
}

export const CategoryContext = createContext<CategoryContextProps | undefined>(undefined);

const ITEMS_PER_PAGE = 10;

export const CategoryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<CategoryContextState>({
    categories: [],
    loading: false,
    error: null,
    page: 1,
    totalPages: 1,
  });

  const fetchCategories = useCallback(async (page = 1) => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    const cacheKey = `categories_page_${page}`;
    const cachedData = getCache<{ categories: Category[], totalPages: number }>(cacheKey);

    if (cachedData) {
      setState(prev => ({
        ...prev,
        categories: cachedData.categories,
        totalPages: cachedData.totalPages,
        page,
        loading: false,
      }));
      return;
    }

    try {
      const response = await api.get(`/categories?page=${page}&limit=${ITEMS_PER_PAGE}`);
      if (response.data && Array.isArray(response.data.categories)) {
        setCache(cacheKey, response.data);
        setState(prev => ({
          ...prev,
          categories: response.data.categories,
          totalPages: response.data.totalPages,
          page,
          loading: false,
        }));
      } else {
        throw new Error("Data kategori tidak valid.");
      }
    } catch (error) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: 'Gagal mengambil kategori. Silakan coba lagi.',
      }));
    }
  }, []);

  const addCategory = useCallback(async (category: Omit<Category, 'id'>) => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    try {
      const response = await api.post('/categories', category);
      setState(prev => ({
        ...prev,
        categories: [...(prev.categories ?? []), response.data],
        loading: false,
      }));
      console.log('Kategori baru ditambahkan:', response.data);
    } catch (error) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: 'Gagal menambahkan kategori. Silakan coba lagi.',
      }));
    }
  }, []);

  const updateCategory = useCallback(async (id: string, category: Omit<Category, 'id'>) => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    try {
      const response = await api.put(`/categories/${id}`, category);
      setState(prev => ({
        ...prev,
        categories: (prev.categories ?? []).map(cat => cat.id === id ? response.data : cat),
        loading: false,
      }));
      console.log('Kategori berhasil diperbarui:', response.data);
    } catch (error) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: 'Gagal memperbarui kategori. Silakan coba lagi.',
      }));
    }
  }, []);

  const deleteCategory = useCallback(async (id: string) => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    try {
      await api.delete(`/categories/${id}`);
      setState(prev => ({
        ...prev,
        categories: (prev.categories ?? []).filter(cat => cat.id !== id),
        loading: false,
      }));
      console.log('Kategori berhasil dihapus:', id);
    } catch (error) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: 'Gagal menghapus kategori. Silakan coba lagi.',
      }));
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const memoizedValue = useMemo(() => ({
    ...state,
    fetchCategories,
    addCategory,
    updateCategory,
    deleteCategory,
  }), [state, fetchCategories, addCategory, updateCategory, deleteCategory]);

  return (
    <CategoryContext.Provider value={memoizedValue}>
      {children}
    </CategoryContext.Provider>
  );
};

export const useCategoryContext = () => {
  const context = React.useContext(CategoryContext);
  if (context === undefined) {
    throw new Error('useCategoryContext must be used within a CategoryProvider');
  }
  return context;
};
