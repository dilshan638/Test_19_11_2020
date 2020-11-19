import React , {useState} from 'react'
import { makeStyles } from '@material-ui/core'


const useStyles = makeStyles(theme =>({
    root:{
        '& .MuiFormControl-root':{
            width:'80%',
            margin: theme.spacing(1)
        }
    }
}))

export default function useCIForms(initialFValues, validateOnChange=false,validate)
 {
    const[values, setvalues]= useState(initialFValues);
    const[errors, setErrors]= useState({});  

   
    const handleInputChange=e=>{
        const {name, value} = e.target
        setvalues({
            ...values,
            [name]: value
        }) 

     // if(validateOnChange)
      // validate({[name]:value})
        }

        const restForm =()=>{
            setvalues(initialFValues);
            setErrors({})
        }
   
   
 return {
        values,
        setvalues,
        handleInputChange,
        errors,
        setErrors,
        restForm
    }
}

export  function Form(props) {
    const classes= useStyles();
    const {children, ...other} =props;
   
    return (
       <form  className={classes.root} autoComplete="off" {...other}>
           {props.children}

       </form>
    )
}

