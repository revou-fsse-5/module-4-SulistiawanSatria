import React, { useEffect, useState } from 'react';
import { useAuthContext } from '../context/AuthContext';
import { useCategoryContext } from '../context/CategoryContext';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton } from '@mui/material';
import { useFormik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

interface Category {
  id: string;
  name: string;
  description: string;
}

const categorySchema = Yup.object().shape({
  name: Yup.string().required('Nama wajib diisi'),
  description: Yup.string().required('Deskripsi wajib diisi'),
});

const Category: React.FC = () => {
  const { user } = useAuthContext();
  const {
    categories,
    fetchCategories,
    addCategory,
    updateCategory,
    deleteCategory
  } = useCategoryContext(); 

  const [openDialog, setOpenDialog] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState<string | null>(null);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  useEffect(() => {
    if (user) {
      fetchCategories();
    }
  }, [user, fetchCategories]);

  const formik = useFormik({
    initialValues: { name: '', description: '' },
    validationSchema: categorySchema,
    onSubmit: async (values: { name: string; description: string }, { resetForm }: FormikHelpers<{ name: string; description: string }>) => {
      if (editingCategory) {
        await updateCategory(editingCategory.id, values);
        setEditingCategory(null);
      } else {
        await addCategory(values);
      }
      resetForm();
      fetchCategories();
    },
  });

  const handleEdit = (category: Category) => {
    setEditingCategory(category);
    formik.setValues({ name: category.name, description: category.description });
  };

  const handleDelete = (id: string) => {
    setCategoryToDelete(id);
    setOpenDialog(true);
  };

  const confirmDelete = async () => {
    if (categoryToDelete) {
      await deleteCategory(categoryToDelete);
      setCategoryToDelete(null);
      fetchCategories();
    }
    setOpenDialog(false);
  };

  if (!user) {
    return <p>Silakan login untuk melihat kategori.</p>;
  }

  return (
    <div>
      <h1>Daftar Kategori</h1>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          name="name"
          label="Nama Kategori"
          value={formik.values.name}
          onChange={formik.handleChange}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
        />
        <TextField
          name="description"
          label="Deskripsi"
          value={formik.values.description}
          onChange={formik.handleChange}
          error={formik.touched.description && Boolean(formik.errors.description)}
          helperText={formik.touched.description && formik.errors.description}
        />
        <Button type="submit">{editingCategory ? 'Update' : 'Tambah'} Kategori</Button>
        {editingCategory && (
          <Button
            onClick={() => {
              setEditingCategory(null);
              formik.resetForm();
            }}
          >
            Batal Edit
          </Button>
        )}
      </form>

      <List>
        {categories && categories.map((category: Category) => (
          <ListItem key={category.id}>
            <ListItemText primary={category.name} secondary={category.description} />
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="edit" onClick={() => handleEdit(category)}>
                <EditIcon />
              </IconButton>
              <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(category.id)}>
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>

      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Konfirmasi Hapus"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Apakah Anda yakin ingin menghapus kategori ini?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Batal</Button>
          <Button onClick={confirmDelete} autoFocus>
            Hapus
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Category;
