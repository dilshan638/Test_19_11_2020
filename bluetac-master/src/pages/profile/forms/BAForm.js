import { Grid } from '@material-ui/core';
import React, {useState, useEffect} from 'react'
import { makeStyles } from '@material-ui/core'
import useBAForms, {Form} from '../components/useCIForms';
import Control from '../components/controls/Control';
import * as billingaddressServices from '../service/billingaddressServices'


const initialFValues ={
    id :0,
    fullName: '',
    address: ''
    }

    
export default function BAForm(props) {
    const {addOrEditBillingAddress,recordForEditBAddress} =props;

        
    const{ 
        values,
        setvalues,
        handleInputChange,
        errors,
        setErrors,
        restForm
       } = useBAForms(initialFValues,true,validate) 
     
       const validate =(fieldValues= values)=>{
        let temp ={...errors}
        if('fullName' in fieldValues )
          temp.fullName=fieldValues.fullName ? "" : "Your Name Is Required"
          if('address' in fieldValues )
          temp.address=fieldValues.address ? "" : "Your Address  Is Required"
            
          setErrors({
            ...temp
        })
        if(fieldValues== values)
        return Object.values(temp).every(x => x == "")
     }

     const handleSubmit = e => {
        e.preventDefault()
        if(validate()){
        addOrEditBillingAddress(values,restForm);
        
           
        }
    }

       
useEffect(()=>{
    if(recordForEditBAddress!=null)
    setvalues({
        ...recordForEditBAddress
    })
},[recordForEditBAddress])
  
    
    return (
       <Form onSubmit={handleSubmit} >
            <Grid container>
                    <Control.Input
                      label="Full Name"
                      name="fullName"
                      value={values.fullName}
                     onChange={handleInputChange}
                      error={errors.fullName}
                      />
                   <Control.Input
                    label="Address"
                    name="address"
                    value={values.address}
                    onChange={handleInputChange}
                    error={errors.address}
                    />
                     <div>
                        <Control.Button
                        type="submit"
                        text="Submit"
                         />

                        <Control.Button
                        type="reset"
                        text="Reset"
                        color="default"
                       onClick={restForm}
                        />

                    </div>
                 </Grid>
       </Form>
    )
}
