import React,{useState} from 'react'

const initialState = {
  memberName: "",
  age: 0,
  memberId:0,
  gender: "",
};

const UserTeamForm = ({
  index,
  member,
  textButton,
  addMember,
  updateMember,
  setEdit,
}) => {

  const [newMember, setNewMember] = useState(member ? member : initialState);
  const { memberName, age, memberId, gender } = newMember;

  const handleChange = (e) => {
    setNewMember({ ...newMember, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(newMember)

    if (memberName !== "" && !member) {
      addMember(newMember);
    } else {
      updateMember(index, newMember);
      setEdit(false);
    }

    setNewMember(initialState);
  };

  return (
    <div className='flex:lg gap-1'>
      <input
        type="text"
        placeholder="Nombre Participante"
        name="memberName"
        value={memberName}
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
        name="age"
        value={age}
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
        name="memberId"
        value={memberId}
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

export default UserTeamForm