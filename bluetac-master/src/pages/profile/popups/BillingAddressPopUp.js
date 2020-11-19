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
export default function BillingAddressPopUp(props) {
    const { title,children, openPopupBAddress, setOpenPopupBAddress} =props;
    const classes =useStyles();
    return (
      
        <Dialog open={openPopupBAddress} maxWidth="md" classes={{paper:classes.dialogWraper}}>
            <DialogTitle>
            <div style={{display: 'flex'}}>
            <Typography variant="h6" style={{flexGrow:1}} >Billing Address
            </Typography>
          <Control.Button 
            variant="contained" 
            color="secondary"
            text="X"
            onClick={()=>{setOpenPopupBAddress(false)}}>
            <CloseIcon
            onClick={()=>{setOpenPopupBAddress(false)}}/></Control.Button>
             </div>
            </DialogTitle>
            <DialogContent dividers>
              {children}
              </DialogContent>
              </Dialog>
      //Test Comment

    )
}

