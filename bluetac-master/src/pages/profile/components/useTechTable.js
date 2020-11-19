import { makeStyles, Table, TableCell, TableHead, TableRow } from '@material-ui/core'
import React, { useState } from 'react'


const useStyles = makeStyles(theme=>({
    table :{
        marginTop:theme.spacing(3),
        '& thead th':{
            fontWeight:'600',
            color:theme.palette.primary.main,
            backgroundColor:theme.palette.primary.light,
        },
        '& tbody td':{
            fontWeight: '300',

        },
        '& tbody tr:hover':{
            backgroundColor:'#fffbf2',
            cursor:'pointer',
        },
    },
}))
export default function useTechTable(recordsTech,headCellsTech) {
    const classes = useStyles();
    const TblContainerTech =props=>( //See Different
        <Table className={classes.table}>
               {props.children}
         </Table>
)
           const TblheadTech = props=>{ //See Different
            return(<TableHead>
           <TableRow>
           {
           headCellsTech.map(headCellsTech=>(<TableCell key={headCellsTech.id}>
               {headCellsTech.label}
           </TableCell>))
           }
           </TableRow>
   </TableHead>)
}
 return {
       TblContainerTech,
       TblheadTech
   }
}
