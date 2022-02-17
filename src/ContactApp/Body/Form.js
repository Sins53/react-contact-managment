import { useFormik } from "formik";
import React, { useEffect, useState } from 'react'
import '../../Sass/Body.scss'
import * as Yup from 'yup'
import Validation from "../../Components/Error";
import List from "./List";
import { toast } from "react-toastify";


const initialValues = {
  name:'',
  email: '',
  phone: '',
}
const validationSchema = Yup.object({
  name: Yup.string().required("Please enter Name"),
  email: Yup.string().email('Must be a valid email').required("Please enter Email"),
  phone: Yup.string().min(10, 'Min value 10.').max(10, 'Must be below 10').required(),                     
});


const Form = () => {
  const LOCAL_STORAGE_KEY = "formData"
  const [formData, setformData] = useState([]);

  const [updateData, setupdateData] = useState(initialValues)

  const { values, errors, handleChange, handleSubmit } =
    useFormik({
      enableReinitialize: true,
      initialValues : updateData,
      validationSchema,
      onSubmit:(values, { resetForm }) => {
        resetForm();
        handleData(values);
      },
    });

    const handleData = (data) => {
      var id = Math.floor(Math.random() * 100000);
      Object.assign(data, {id: id});
      const newData = [data, ...formData];
      
      setformData(newData);
    }

    const handleDelete = (id) => {
      
      var newArr = formData.filter(function(formData) {
        return formData.id !== id;
      });
      //console.log(newArr)
      setformData(newArr)
      toast("Deleted");
    };


    const handleUpdate = (id) => {
      console.log('inside update')
      console.log('handle updt' , id)
      var newArr = formData.filter(function(formData) {
        return formData.id === id;
      })[0];
      console.log(newArr);
      window.scroll(0,0);
      setupdateData(newArr);
      toast("Pressed Update");
      
      var btnupdate = document.getElementById('update-form');
      btnupdate.style.display = ('block');

      var btndelete = document.getElementById('submit-form');
      btndelete.style.display = ('none');
      //console.log(values);
      //console.log('above this')
      //updateForm(id,values);
    }

    const updateForm = () => {

      //setupdateData(values)
      //console.log(values);
      //console.log('above this');
      //console.log(updateData)
      var id = values.id
      //console.log(id)
      //console.log(formData)
      var newdata = formData.map((item) => {
        if (item.id === id){
          return values
        }else {
          return item
        }

      }) 
      //console.log(formData)
      setformData(newdata);

      var btnupdate = document.getElementById('update-form');
      btnupdate.style.display = ('none');

      var btndelete = document.getElementById('submit-form');
      btndelete.style.display = ('block');
      setupdateData(initialValues);

    }


    useEffect(() => {
      const retriveformData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
      if (retriveformData) setformData(retriveformData);
    }, []);
  
    useEffect(() => {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(formData));
    }, [formData]);

  return (
    <>
    <form className='contact-form' onSubmit={handleSubmit }>
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
      <button type="submit" id={'submit-form'}>Submit</button>
      <button type='button' id={'update-form'} onClick={updateForm} style={{display: 'none'}}>Update</button>
    </form>
    
    {formData.map((item) => {
     // {//console.log(item)}
      return(
        <List 
        name = {item.name}
        email = {item.email}
        phone = {item.phone}
        id = {item.id}
        handleDelete ={() => handleDelete(item.id)}
        handleUpdate ={() => handleUpdate(item.id)}
        />
      )
      
    })}
    </>
    
    
  )
}

export default Form