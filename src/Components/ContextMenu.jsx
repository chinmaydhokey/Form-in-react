import React from 'react'
import '../App.css'

function ContextMenu({position, setPostion,setExpense, expenses, setExpenses, rowId, setEditingRowId}) {
  if(!position.left){
    return
  }
  return (
    <div className='context-menu' style={position}>
        <div onClick={()=>{
            setPostion({})
            const {title, category, amount} = expenses.find((obj)=>obj.id===rowId)
            setExpense({title, category, amount})
            setEditingRowId(rowId)
        }}>Edit</div>
        <div onClick={()=>{
            setPostion({})
            setExpenses(expenses.filter((e)=>e.id !== rowId))
        }}>Delete</div>
    </div>
  )
}

export default ContextMenu