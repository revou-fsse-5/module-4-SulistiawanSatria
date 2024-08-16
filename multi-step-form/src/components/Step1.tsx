import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

interface Step1Props {
  nextStep: (data: any) => void;
  defaultValues: {
    fullName: string;
    email: string;
    dateOfBirth: string;
  };
}

const schema = yup.object().shape({
  fullName: yup.string().required('Full Name is required'),
  email: yup.string().email('Invalid email format').required('Email is required'),
  dateOfBirth: yup.string().required('Date of Birth is required'),
});

const Step1: React.FC<Step1Props> = ({ nextStep, defaultValues }) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues,
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: any) => {
    nextStep(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-gray-700">Full Name</label>
        <input
          type="text"
          {...register('fullName')}
          className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-500"
        />
        <p className="text-red-500 text-sm">{errors.fullName?.message}</p>
      </div>
      <div>
        <label className="block text-gray-700">Email Address</label>
        <input
          type="email"
          {...register('email')}
          className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-500"
        />
        <p className="text-red-500 text-sm">{errors.email?.message}</p>
      </div>
      <div>
        <label className="block text-gray-700">Date of Birth</label>
        <input
          type="date"
          {...register('dateOfBirth')}
          className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-500"
        />
        <p className="text-red-500 text-sm">{errors.dateOfBirth?.message}</p>
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Next
      </button>
    </form>
  );
};

export default Step1;
