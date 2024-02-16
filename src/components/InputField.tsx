import React,{useState,useRef,useEffect} from 'react';
import "./styles.css";
import TodoList from './TodoList';
import { Todo } from './Modal';


function InputField() {
    const inputref=useRef<HTMLInputElement>(null);
    const [todo, setTodo] = useState<string>("");
    const [arr, setarr] = useState<Todo[]>(() => {
      const savedTodoList = localStorage.getItem('todoList');
      return savedTodoList ? JSON.parse(savedTodoList) : [];
  });
  
    const handleclick=()=>{

        if (/^(?=.*[^\s\u0000])[\s\S]*$/.test(todo)){
            setarr([...arr,{id:Date.now(),todo:todo,isdone:false}]);
            setTodo("");
           
        }
    };
    const handlesubmit=(e:React.FormEvent<HTMLFormElement>)=>{
      e.preventDefault();
    }

    //localstorage
    useEffect(() => {
      localStorage.setItem('todoList', JSON.stringify(arr));
  }, [arr]);
   
    
  return (
    <>
     <form className="input" onSubmit={handlesubmit}
     >
      <input
        ref={inputref}
        type="text"
        placeholder="Enter a Task"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
        className="input__box"
      />
      <button type="button" className="input_submit" onClick={handleclick}>
        GO
      </button>
    </form>

    <TodoList todolist={arr} todo={todo}  settodolist={setarr} ></TodoList>
   
    
    
      
    </>
  )
}

export default InputField;
