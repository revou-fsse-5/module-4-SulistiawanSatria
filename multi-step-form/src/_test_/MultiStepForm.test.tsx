import { render, screen, fireEvent } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import MultiStepForm from '../components/MultiStepForm';

describe('MultiStepForm Tests', () => {
  test('renders first step of the form correctly', () => {
    act(() => {
      render(<MultiStepForm />);
    });

    // Verifikasi bahwa langkah pertama ditampilkan
    expect(screen.getByText('Personal Info')).toBeInTheDocument();
    expect(screen.getByLabelText('Full Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Email Address')).toBeInTheDocument();
    expect(screen.getByLabelText('Date of Birth')).toBeInTheDocument();
  });

  test('navigates to the second step correctly', async () => {
    act(() => {
      render(<MultiStepForm />);
    });

    // Isi form pada langkah pertama
    fireEvent.change(screen.getByLabelText('Full Name'), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText('Email Address'), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByLabelText('Date of Birth'), { target: { value: '1990-01-01' } });

    // Klik tombol "Next" untuk pindah ke langkah kedua
    await act(async () => {
      fireEvent.click(screen.getByText('Next'));
    });

    // Verifikasi bahwa langkah kedua ditampilkan
    expect(screen.getByText('Address Info')).toBeInTheDocument();
    expect(screen.getByLabelText('Street Address')).toBeInTheDocument();
    expect(screen.getByLabelText('City')).toBeInTheDocument();
    expect(screen.getByLabelText('State')).toBeInTheDocument();
    expect(screen.getByLabelText('Zip Code')).toBeInTheDocument();
  });

  test('displays validation errors if required fields are empty', async () => {
    act(() => {
      render(<MultiStepForm />);
    });

    // Klik tombol "Next" tanpa mengisi input untuk melihat validasi error
    await act(async () => {
      fireEvent.click(screen.getByText('Next'));
    });

    // Verifikasi bahwa pesan error muncul
    expect(screen.getByText('Full Name is required')).toBeInTheDocument();
    expect(screen.getByText('Email is required')).toBeInTheDocument();
    expect(screen.getByText('Date of Birth is required')).toBeInTheDocument();
  });

  test('completes all steps and submits the form', async () => {
    act(() => {
      render(<MultiStepForm />);
    });

    // Isi form pada langkah pertama
    fireEvent.change(screen.getByLabelText('Full Name'), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText('Email Address'), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByLabelText('Date of Birth'), { target: { value: '1990-01-01' } });

    // Klik tombol "Next" untuk pindah ke langkah kedua
    await act(async () => {
      fireEvent.click(screen.getByText('Next'));
    });

    // Isi form pada langkah kedua
    fireEvent.change(screen.getByLabelText('Street Address'), { target: { value: '123 Main St' } });
    fireEvent.change(screen.getByLabelText('City'), { target: { value: 'New York' } });
    fireEvent.change(screen.getByLabelText('State'), { target: { value: 'NY' } });
    fireEvent.change(screen.getByLabelText('Zip Code'), { target: { value: '10001' } });

    // Klik tombol "Next" untuk pindah ke langkah ketiga
    await act(async () => {
      fireEvent.click(screen.getByText('Next'));
    });

    // Isi form pada langkah ketiga
    fireEvent.change(screen.getByLabelText('Username'), { target: { value: 'johndoe' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'StrongPass123' } });

    // Klik tombol "Submit"
    await act(async () => {
      fireEvent.click(screen.getByText('Submit'));
    });

    // Verifikasi bahwa data terakhir terkirim
    // (misalnya dengan memeriksa log atau state final)
    expect(console.log).toHaveBeenCalledWith({
      fullName: 'John Doe',
      email: 'john@example.com',
      dateOfBirth: '1990-01-01',
      streetAddress: '123 Main St',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      username: 'johndoe',
      password: 'StrongPass123',
    });
  });
});
