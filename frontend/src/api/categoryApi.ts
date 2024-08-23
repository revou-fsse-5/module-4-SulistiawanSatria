interface Category {
  id: string;
  name: string;
  description: string;
}

// Mock data
let categories: Category[] = [
  { id: '1', name: 'Category 1', description: 'This is the first category' },
  { id: '2', name: 'Category 2', description: 'This is the second category' },
];

// Fetch all categories
export const getCategories = async (): Promise<Category[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(categories);
    }, 1000); // Simulate a network delay
  });
};

// Add a new category
export const addCategory = async (category: Category): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      categories.push(category);
      resolve();
    }, 500); // Simulate a network delay
  });
};

// Update a category by ID
export const updateCategory = async (
  id: string,
  updatedCategory: Partial<Category>
): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      categories = categories.map((category) =>
        category.id === id ? { ...category, ...updatedCategory } : category
      );
      resolve();
    }, 500); // Simulate a network delay
  });
};

// Delete a category by ID
export const deleteCategory = async (id: string): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      categories = categories.filter((category) => category.id !== id);
      resolve();
    }, 500); // Simulate a network delay
  });
};
