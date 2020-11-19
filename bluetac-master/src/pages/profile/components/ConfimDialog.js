import { Dialog, DialogActions, DialogContent, DialogTitle,IconButton,Typography} from '@material-ui/core'
import React from 'react'
import Control from '../components/controls/Control'
import { makeStyles } from '@material-ui/core'
import NotListedLocationIcon from '@material-ui/icons/NotListedLocation';
const useStyles =makeStyles(theme=>({
    dialog:{
        padding:theme.spacing(2),
        position:'absoult',
        top:theme.spacing(5)
    },
    dialogContent:{
        textAlign:'center'
    },

    dialogTitle:{
        textAlign:'center'
    },

    dialogAction:{
        justifyContent:'center'
    },
    titleIcon:{
    backgroundColor:theme.palette.secondary.light,
    color:theme.palette.secondary.main,
    '&:hover':{
        backgroundColor:theme.palette.secondary.light, 
        cusor:'default' 
    },
    '& .MuiSvgIcon-root':{
        fontSize:'8rem',
    }

    }
}))


export default function ConfimDialog(props) {
    const classes = useStyles();
    const{  confirmDialog, setConfGialog}= props
    return (
        <Dialog open={confirmDialog.isOpen} classes={{paper:classes.dialog}}>

           
             <DialogTitle className={classes.dialogTitle}>
                 <IconButton
                  disableRipple className={classes.titleIcon}>
              <NotListedLocationIcon/>
            </IconButton>
            </DialogTitle>
           
            <DialogContent className={classes.dialogContent}>
                <Typography variant="h6">
                    {confirmDialog.title}
                </Typography>
                <Typography variant="subtitle2">
                    {confirmDialog.subTitle}
                </Typography>
            </DialogContent>

            <DialogActions className={classes.dialogAction}>
                    <Control.Button
                    text="No"
                    color="default"
                    onClick={()=>setConfGialog({...confirmDialog,isOpen:false})}
                    />
                      <Control.Button
                    text="Yes"
                    color="secondary"
                    onClick={confirmDialog.onConfirm}
                    />
            </DialogActions>
        </Dialog>
    )
}
