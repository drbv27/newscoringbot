import React,{useState} from 'react'
import { useFormik } from 'formik'
import MatchChallengeForm from '../components/MatchChallengeForm'


const initialState = {
    name: "",
    slug: "",
    imageURL: "",
    description: "",
    maxTeams: 0,
    maxTurns: 0,
    topMaxTurns: 0,
    playoffs: false,
    finalTeams: 0,
    categories: [],
    available: "",
    maxTime: 0,
    tasks: [],
    taskSecuence: true,
    stopTime: true,
    bonusType: "",
  };

const AddMatchChallenge = () => {
    const [formData, setFormData] = useState(initialState);
    const {
        name,
        slug,
        imageURL,
        description,
        maxTeams,
        maxTurns,
        topMaxTurns,
        tasks,
        taskSecuence,
        stopTime,
        bonusType,
        maxTime,
        playoffs,
        finalTeams,
        available,
      } = formData;
      // add tasks
    const addTask = (task) => {
        setFormData({ ...formData, tasks: [...tasks, task] });
        console.log(tasks)
  };
    const formik = useFormik({
        initialValues:{
            name:"",
            lastname:"",
            email:""
        },
        onSubmit: values => console.log(values)
    })
  return (
    <MatchChallengeForm addTask={addTask} textButton="Añadir" />
  )
}

export default AddMatchChallenge