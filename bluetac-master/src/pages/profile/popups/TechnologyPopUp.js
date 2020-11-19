import React from 'react'
import {Dialog, DialogTitle,DialogContent, Typography,makeStyles} from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import Control from '../../profile/components/controls/Control';




const useStyles = makeStyles(theme=>({
    dialogWraper:{
        padding:theme.spacing(2),
        position:'absolute',
        top:theme.spacing(5)
    }

    
}))
export default function TechnologyPopUp(props) {
    const { title,children, openPopupTechnology, setOpenPopupTechnology} =props;
    const classes =useStyles();
    return (
      
        <Dialog open={openPopupTechnology} maxWidth="md" classes={{paper:classes.dialogWraper}}>
            <DialogTitle>
            <div style={{display: 'flex'}}>
            <Typography variant="h6" style={{flexGrow:1}} >Technologies
            </Typography>
          <Control.Button 
            variant="contained" 
            color="secondary"
            text="X"
            onClick={()=>{setOpenPopupTechnology(false)}}>
            <CloseIcon
            onClick={()=>{setOpenPopupTechnology(false)}}/></Control.Button>
             </div>
            </DialogTitle>
            <DialogContent dividers>
              {children}
              </DialogContent>
              </Dialog>
      

    )
}
