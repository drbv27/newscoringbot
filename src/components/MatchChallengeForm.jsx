import React,{useState} from 'react'

const initialState = {
  label: "",
  points: 0,
  penalty: 0,
};

const MatchChallengeForm = ({
  index,
  task,
  textButton,
  addTask,
  updateTask,
  setEdit,
}) => {

  const [newTask, setNewTask] = useState(task ? task : initialState);
  const { label, points, penalty } = newTask;

  const handleChange = (e) => {
    setNewTask({ ...newTask, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (label !== "" && !task) {
      addTask(newTask);
    } else {
      updateTask(index, newTask);
      setEdit(false);
    }

    setNewTask(initialState);
  };

  return (
    <div className='flex:lg gap-1'>
      <input
        type="text"
        placeholder="Nombre Tarea"
        name="label"
        value={label}
        onChange={handleChange}
        className='
                  form-control
                  mt-1
                  form-input 
                  rounded-md 
                  border-gray-300 
                  shadow-sm
                  focus:border-indigo-300 
                  focus:ring 
                  focus:ring-indigo-200 
                  focus:ring-opacity-50
                  grow'
      />
      <input
        type="number"
        name="points"
        value={points}
        onChange={handleChange}
        className='
                  form-control
                  mt-1
                  form-input 
                  rounded-md 
                  border-gray-300 
                  shadow-sm
                  focus:border-indigo-300 
                  focus:ring 
                  focus:ring-indigo-200 
                  focus:ring-opacity-50
                  grow'
      />
      <input
        type="number"
        name="penalty"
        value={penalty}
        onChange={handleChange}
        className='
                  form-control
                  mt-1
                  form-input 
                  rounded-md 
                  border-gray-300 
                  shadow-sm
                  focus:border-indigo-300 
                  focus:ring 
                  focus:ring-indigo-200 
                  focus:ring-opacity-50
                  grow'
      />
      <button className='bg-blue-900 p-2 text-white rounded mr-2 grow' onClick={handleSubmit}>
        {textButton}
      </button>

    </div>
    
  )
}

export default MatchChallengeForm