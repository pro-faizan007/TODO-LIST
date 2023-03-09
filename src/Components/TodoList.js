import React, { useEffect, useState } from 'react'
import "./todo.css";


let gettingItems = () =>{

  const lists = localStorage.getItem("To DO APP") 
  if(lists)
  {
    return JSON.parse(lists)   
  }else{
    return [];
  }
}


const TodoList = () => {

let [inputItems, setInputItems] = useState("");   
let [items, setItems] = useState(gettingItems());   
let [toggleBtn, setToggleBtn] = useState(true)    
let [ editedItem, setEditedItem] = useState(null)  

let addItem = () =>{
   if(!inputItems){
      alert("Please Input Some List!!")
   }else if(inputItems && !toggleBtn){  
          setItems(
             items.map((elem)=>{
               if(elem.id === editedItem){
                 return {...elem, name: inputItems}
               }
               return elem
             })
          )
          setToggleBtn(true)
          setInputItems("")
          setEditedItem(null)

   }else{                            
      const allInputdata = { id: new Date().getTime().toString(), name:inputItems }
      setItems([...items, allInputdata])
   }

   setInputItems("")
}


let removeItem =(id)=>{ 
     
  const updatedItem = items.filter((elem) =>{
      return id!==elem.id
  })

  setItems(updatedItem);
}


let editItem = (id) =>{
  let editedValue = items.find((elem)=>{
      return elem.id ===id
  })

  
  setToggleBtn(false)
  setInputItems(editedValue.name) 
  setEditedItem(id);

}


let remvAll = () =>{
  setItems([])
}



useEffect(()=>{
                       
  localStorage.setItem("Akky's ToDo", JSON.stringify(items)) 

}, [items])


  return (
       <>
       
       <div className='container'>
       <div className='main-div'>

         <center><h1 className='txt'>ToDo List Project</h1></center>
        <div className='inner-div'>
          
         
         <div className='add-items'>
         <input type="text" placeholder='Add Your Item '
          value={inputItems} onChange={(e)=>setInputItems(e.target.value)} ></input>
              
              { 
                toggleBtn ? <i className="fa fa-plus add-btn" onClick={addItem}></i> :
                <i className="far fa-edit add-btn" onClick={addItem}></i> 
              }
  
         </div>


        <div className='data'>
           {
             items.map((currEle)=>{
               return (
                <div className='each-item' key={currEle.id}>
                <h3>{currEle.name}</h3>
           
               <div className='inner-btns'>
                 <i className="far fa-edit" onClick={()=> editItem(currEle.id)}></i>&nbsp;&nbsp;&nbsp;
                <i className="far fa-trash-alt" onClick={()=>removeItem(currEle.id)}></i>
               </div>
       </div>
                  
               )
             })
           }
          </div>
      
         
         <div className='remv-btn'>
         <button onClick={remvAll}>Remove All</button>
         </div>

        </div>
       </div>    
       </div>   
    
       </>
  )
}

export default TodoList;
