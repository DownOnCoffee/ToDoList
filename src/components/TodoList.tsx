import React ,{useState,useRef} from 'react'
import { Todo } from './Modal';
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { MdDone } from "react-icons/md";

interface Props{
    todolist:Todo[];
    todo:string;
    settodolist: React.Dispatch<React.SetStateAction<Todo[]>>;
}

function TodoList({todolist,todo,settodolist}:Props) {
  const inputref=useRef<HTMLInputElement>(null);
  const [edit, setEdit] = useState<boolean>(false);
  const [editTodo, setEditTodo] = useState<string>("");
  const [idelement,setidelement]=useState<number>(0);
 

  const handleEdit = (e: React.FormEvent, id: number) => {
    e.preventDefault();
    if (/^(?=.*[^\s\u0000])[\s\S]*$/.test(editTodo)){
      settodolist(
        todolist.map((item)=>(item.id===id?({...item,todo:editTodo}):item))
      );
    }
   
    setEdit(!edit);
    setEditTodo("");
  };

  const handledone=(id:number)=>{
    console.log(todolist,"before")

    const updatedList=todolist.map((item)=>{
      if (item.id==id){
        return {...item,isdone:true};
        
      }
      else{return item;}
     
    });
    console.log(todolist,"after")
    settodolist(updatedList);
    
    
  }

  const handledelete=(id:number)=>{
    const filteredlist=todolist.filter((item)=>item.id!==id);
    settodolist(filteredlist);
  }
  return (
    <>
    
    {todolist.map((item)=>{
            return <>
            <form className='todos__single' >

            {( item.isdone==true)? (<s className='todos__single--text' >{item.todo}</s>) : (<span className='todos__single--text'>{item.todo}</span>)}
            <div>
            <span
              className="icon" onClick={(e) => {
                if (!item.isdone && !edit){
                  setEdit(!edit);
                  setidelement(item.id);
                }
              }}>
              <AiFillEdit />
            </span>
            <span className="icon" onClick={()=>handledelete(item.id)} >
              <AiFillDelete />
            </span>
            <span className="icon" onClick={()=>handledone(item.id)}>
              <MdDone />
            </span>
          </div>
            </form>

            
           
            </>

    })}
    {edit && (
              <>
              <div className='overlay'>
               <input
               value={editTodo}
               onChange={(e) => setEditTodo(e.target.value)}
               className="editinput"
               ref={inputref}
              /><button className="inputbtn" onClick={(e)=>{handleEdit(e,idelement)}}>Save</button>
              </div></>
             )
      }
  

    </>
  )
}

export default TodoList
