import { useForm, Controller } from 'react-hook-form';

export default function MyForm() {
  // Initialize react-hook-form
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      personId: '0560680770', // Default value
      name: 'John Doe',
      gender: 'M',
      languages: ['JavaScript', 'HTML', 'CSS'], // Default courses
    },
  });

  // Form validation logic using react-hook-form
  const onSubmit = (data) => {
    console.log('Form Data:', data);
  };

  // Determine if the submit button should be disabled
  const isSubmitDisabled = isSubmitting || Object.keys(errors).length > 0;

  return (
    <div style={{ padding: '20px' }}>
      <h1>MyForm Component</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Person ID Field */}
        <div>
          <label>Person ID:</label>
          <input
            type="text"
            {...register('personId', {
              required: 'Person ID is required.',
              pattern: {
                value: /^\d{10}$/,
                message: 'Person ID must be exactly 10 digits.',
              },
            })}
          />
          {errors.personId && <p style={{ color: 'red' }}>{errors.personId.message}</p>}
        </div>

        {/* Name Field */}
        <div>
          <label>Name:</label>
          <input
            type="text"
            {...register('name', {
              required: 'Name is required.',
              pattern: {
                value: /^[A-Za-z .]+$/,
                message: 'Name can contain only letters, spaces, and dots.',
              },
            })}
          />
          {errors.name && <p style={{ color: 'red' }}>{errors.name.message}</p>}
        </div>

        {/* Gender Radio Buttons */}
        <div>
          <label>Gender:</label>
          <label>
            <input
              type="radio"
              value="M"
              {...register('gender', { required: true })}
            />
            Male
          </label>
          <label>
            <input
              type="radio"
              value="F"
              {...register('gender', { required: true })}
            />
            Female
          </label>
          {errors.gender && <p style={{ color: 'red' }}>Gender is required.</p>}
        </div>

        {/* Languages Multi-select */}
        <div>
          <label>Languages:</label>
          <Controller
            name="languages"
            control={control}
            render={({ field }) => (
              <select multiple {...field}>
                <option value="JavaScript">JavaScript</option>
                <option value="HTML">HTML</option>
                <option value="CSS">CSS</option>
                <option value="React">React</option>
                <option value="Java">Java</option>
                <option value="C++">C++</option>
                <option value="GoLang">GoLang</option>
              </select>
            )}
          />
        </div>

        {/* Submit Button */}
        <button type="submit" disabled={isSubmitDisabled}>
          Submit
        </button>
      </form>
    </div>
  );
}
