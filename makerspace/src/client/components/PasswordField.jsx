import { useState } from 'react';

function PasswordToggle({label,placeholder,onChange}) {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className="max-w-sm">
      <label   className="block mb-2 text-xl font-medium text-gray-900 dark:text-black">{label}</label>
      <div className="relative">
        <input
          id="hs-toggle-password"
          type={passwordVisible ? 'text' : 'password'}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-600 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder={placeholder}
          onChange={onChange}
        />
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="absolute top-0 right-0 p-3.5 rounded-e-md"
        >
          <svg
            className="flex-shrink-0 size-3.5 text-gray-400 dark:text-neutral-600"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {passwordVisible ? (
              <>
                <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
                <circle cx="12" cy="12" r="3"></circle>
              </>
            ) : (
              <>
                <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"></path>
                <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"></path>
                <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"></path>
                <line x1="2" x2="22" y1="2" y2="22"></line>
              </>
            )}
          </svg>
        </button>
      </div>
    </div>
  );
}

export default PasswordToggle;
