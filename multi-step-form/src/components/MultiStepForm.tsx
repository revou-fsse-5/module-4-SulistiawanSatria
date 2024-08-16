import React, { useState } from 'react';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';

const steps = ['Personal Info', 'Address Info', 'Account Info'];

const MultiStepForm: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    dateOfBirth: '',
    streetAddress: '',
    city: '',
    state: '',
    zipCode: '',
    username: '',
    password: '',
  });

  const nextStep = (data: any) => {
    setFormData((prev) => ({ ...prev, ...data }));
    setCurrentStep((prev) => prev + 1);
  };

  const previousStep = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const handleSubmit = (data: any) => {
    console.log('Final Submission Data:', { ...formData, ...data });
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-8 border rounded shadow-md">
      {/* Indikator Langkah */}
      <div className="flex items-center justify-between mb-6">
        {steps.map((step, index) => (
          <div key={index} className="flex items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep === index ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-600'}`}>
              {index + 1}
            </div>
            {index < steps.length - 1 && <div className="w-10 h-1 bg-gray-300 mx-2"></div>}
          </div>
        ))}
      </div>

      {/* Form Steps */}
      <div className="transition-opacity duration-500">
        {currentStep === 0 && <Step1 nextStep={nextStep} defaultValues={formData} />}
        {currentStep === 1 && <Step2 nextStep={nextStep} previousStep={previousStep} defaultValues={formData} />}
        {currentStep === 2 && <Step3 previousStep={previousStep} onSubmit={handleSubmit} defaultValues={formData} />}
      </div>
    </div>
  );
};

export default MultiStepForm;
