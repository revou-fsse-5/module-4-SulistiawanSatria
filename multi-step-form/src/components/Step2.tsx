import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

interface Step2Props {
  previousStep: () => void;
  nextStep: (data: any) => void;
  defaultValues: {
    streetAddress: string;
    city: string;
    state: string;
    zipCode: string;
  };
}

const schema = yup.object().shape({
  streetAddress: yup.string().required('Street Address is required'),
  city: yup.string().required('City is required'),
  state: yup.string().required('State is required'),
  zipCode: yup
    .string()
    .matches(/^[0-9]{5}$/, 'Zip Code must be 5 digits')
    .required('Zip Code is required'),
});

const Step2: React.FC<Step2Props> = ({ previousStep, nextStep, defaultValues }) => {
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
        <label className="block text-gray-700">Street Address</label>
        <input
          type="text"
          {...register('streetAddress')}
          className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-500"
        />
        <p className="text-red-500 text-sm">{errors.streetAddress?.message}</p>
      </div>
      <div>
        <label className="block text-gray-700">City</label>
        <input
          type="text"
          {...register('city')}
          className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-500"
        />
        <p className="text-red-500 text-sm">{errors.city?.message}</p>
      </div>
      <div>
        <label className="block text-gray-700">State</label>
        <input
          type="text"
          {...register('state')}
          className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-500"
        />
        <p className="text-red-500 text-sm">{errors.state?.message}</p>
      </div>
      <div>
        <label className="block text-gray-700">Zip Code</label>
        <input
          type="text"
          {...register('zipCode')}
          className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-500"
        />
        <p className="text-red-500 text-sm">{errors.zipCode?.message}</p>
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
          Next
        </button>
      </div>
    </form>
  );
};

export default Step2;
