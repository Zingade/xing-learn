import { useState } from 'react'


export default function useForm(initialLoginValues)  {
    const [values, setValues] = useState(initialLoginValues);
    const [errors, setErrors] = useState({});

    const handleInputChange = e => {
        const {name, value} = e.target;
        setValues({
          ...values,
          [name]:value,
        })
      }
    return {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange
    }      
    
}

