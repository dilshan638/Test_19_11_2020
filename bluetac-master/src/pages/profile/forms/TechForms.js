import { Grid } from '@material-ui/core';
import React, {useState, useEffect} from 'react'
import { makeStyles } from '@material-ui/core'
import useTechForms, {Form} from '../components/useCIForms';
import Control from '../components/controls/Control';
import * as technologyServices from '../service/technologyServices'


const initialFValues ={
    id :0,
    vender: '',
    technologyArea: ''
    }
  
export default function TechForms(props) {
    const {addOrEditTechnologies,recordForEditTechnology} =props;
        
    const{ 
        values,
        setvalues,
        handleInputChange,
        errors,
       setErrors,
        restForm
       } = useTechForms(initialFValues,true,validate) 
      
       const validate =(fieldValues= values)=>{
        let temp ={...errors}
        if('vender' in fieldValues )
          temp.vender=fieldValues.vender ? "" : "Your Vender Is Required"
          if('technologyArea' in fieldValues )
          temp.technologyArea=fieldValues.technologyArea ? "" : "Your Technologies Area  Is Required"
            
          setErrors({
            ...temp
        })
        if(fieldValues== values)
        return Object.values(temp).every(x => x == "")
     }

     const handleSubmit = e => {
        e.preventDefault()
        if(validate()){
         addOrEditTechnologies(values,restForm);
          
           
        }
    }

    
useEffect(()=>{
    if(recordForEditTechnology!=null)
    setvalues({
        ...recordForEditTechnology
    })
},[recordForEditTechnology])
  
    
   return (
        <Form onSubmit={handleSubmit} >
            <Grid container>
                    <Control.Input
                      label="Vender"
                      name="vender"
                      value={values.vender}
                      onChange={handleInputChange}
                      error={errors.vender}
                      />
                   <Control.Input
                    label="Technology Area"
                    name="technologyArea"
                    value={values.technologyArea}
                    onChange={handleInputChange}
                    error={errors.technologyArea}
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
