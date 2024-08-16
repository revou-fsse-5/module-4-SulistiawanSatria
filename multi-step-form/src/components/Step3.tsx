import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

interface Step3Props {
  previousStep: () => void;
  onSubmit: (data: any) => void;
  defaultValues: {
    username: string;
    password: string;
  };
}

const schema = yup.object().shape({
  username: yup.string().required('Username is required'),
  password: yup
    .string()
    .min(8, 'Password must be at least 8 characters')
    .matches(/[a-zA-Z]/, 'Password must contain both letters and numbers')
    .required('Password is required'),
});

const Step3: React.FC<Step3Props> = ({ previousStep, onSubmit, defaultValues }) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues,
    resolver: yupResolver(schema),
  });

  const submitForm = (data: any) => {
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(submitForm)} className="space-y-4">
      <div>
        <label className="block text-gray-700">Username</label>
        <input
          type="text"
          {...register('username')}
          className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-500"
        />
        <p className="text-red-500 text-sm">{errors.username?.message}</p>
      </div>
      <div>
        <label className="block text-gray-700">Password</label>
        <input
          type="password"
          {...register('password')}
          className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-500"
        />
        <p className="text-red-500 text-sm">{errors.password?.message}</p>
      </div>
      <div className="flex justify-between">
        <button
          type="button"
          onClick={previousStep}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
        >
          Back
        </button>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default Step3;
