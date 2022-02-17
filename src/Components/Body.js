import { useFormik } from "formik";
import React, { useState } from 'react'
import '../Sass/Body.scss'
import * as Yup from 'yup'
import Validation from "../Components/Error";


const initialValues = {
  name:'',
  email: '',
  phone: '',
}
const validationSchema = Yup.object({
  name: Yup.string().required("Please enter Name"),
  email: Yup.string().email('Must be a valid email').required("Please enter Email"),
  phone: Yup.number().min(10, 'Min value 10.').required(),                     
});


const Body = () => {
  const [formData, setFormData] = useState(initialValues)

  const { values, errors, handleChange, handleSubmit, isSubmitting } =
    useFormik({
      enableReinitialize: true,
      initialValues,
      validationSchema,
      onSubmit:(values, { resetForm }) => {
        resetForm();
        console.log(values);

      },
    });

  return (
    <form className='contact-form' onSubmit={handleSubmit}>
      <div>
        <div>
          <label > Name</label>
          <input 
          type="text" 
          name='name' 
          value={values.name}
          onChange={handleChange}
           placeholder='Name' />
           <Validation errors={errors} name="name" />
        </div>
        <div>
          <label > Email</label>
          <input 
          type="text" 
          name='email' 
          value={values.email}
          onChange={handleChange}
          placeholder='Email' />
          <Validation errors={errors} name="email" />
        </div>
        <div>
          <label > Phone</label>
          <input 
          type="number" 
          name='phone'
          value={values.phone}
          onChange={handleChange} 
          placeholder='Phone' />
          <Validation errors={errors} name="phone" />
        </div>
      </div>
      <button type="submit">Submit</button>
    </form>
  )
}

export default Body