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

  /* const [newMember, setNewMember] = useState(member ? member : initialState); */
  const [newMember, setNewMember] = useState(initialState);
  const { memberName, age, memberId, gender } = newMember;

  const handleChange = (e) => {
    setNewMember({ ...newMember, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (memberName !== "" && !member) {
      addMember(newMember);
    } else {
      updateMember(index, newMember);
      setEdit(false);
    }

    setNewMember(initialState);
  };

  return (
    <div className='flex:lg gap-1 mt-4 bggrismedio p-2 rounded-md'>
      <h4 className='uppercase font-bold text-center'>Agregar participante</h4>
      <div className='flex-col'>
        <label htmlFor="mamberName">Nombre Participante:</label>
        <input
          type="text"
          placeholder="Nombre y Apellidos"
          name="memberName"
          value={memberName}
          onChange={handleChange}
          className='
                    form-control
                    mt-1
                    block
                    w-full
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
      </div>
      <div className='flex justify-between mt-1'>
        <div className='flex-col grow w-full'>
          <label htmlFor="age">Edad:</label>
          <input
            type="number"
            name="age"
            value={age}
            onChange={handleChange}
            className='
                      form-control
                      mt-1
                      block
                      w-full
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
        </div>
        <div className='flex-col grow w-full'>
          <label htmlFor="memberId">Documento:</label>
          <input
            type="number"
            name="memberId"
            value={memberId}
            onChange={handleChange}
            className='
                      form-control
                      mt-1
                      block
                      w-full
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
        </div>
        <div className='flex-col grow w-full'>
          <label htmlFor="gender">Genero:</label>
          <select name="gender" 
                  id="gender"
                  value={gender}
                  onChange={handleChange}
                  className='
                  form-control
                          mt-1
                          block
                          w-full
                          form-input 
                          rounded-md 
                          border-gray-300 
                          shadow-sm
                          focus:border-indigo-300 
                          focus:ring 
                          focus:ring-indigo-200 
                          focus:ring-opacity-50
                          grow'>
            <option value="">Seleccione</option>
            <option value="male">Masculino</option>
            <option value="female">Femenino</option>
            <option value="nobin">No Binario</option>
          </select>
        </div>
      </div>
      <div className='w-full'>
        <button className='bgoscurostem p-2 text-white rounded mr-2 w-full mt-2' onClick={handleSubmit}>
          {textButton}
        </button>
      </div>
    </div>
    
  )
}

export default UserTeamForm