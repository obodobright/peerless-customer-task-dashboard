

import styled from 'styled-components'
import Button from './Button'
import { useTasks } from '../context/TaskContext'
import { useNavigate } from 'react-router-dom'


const DeleteModalContent = styled.div`
display: flex;
flex-direction: column;
gap: ${({ theme }) => theme.spacing.md};
align-items: center;
justify-content: center;

h2 {
  font-size: 1.5rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
}

p {
  font-size: 1rem;
  text-align: center;
}
`

const DeleteModalButtons = styled.div`
display: flex;
gap: ${({ theme }) => theme.spacing.sm};
justify-content: center;
`
export const DeleteModal = ({task, onClose}) => {
    const navigate = useNavigate()
  const { deleteTask } = useTasks()
  const handleDelete = async () => {
    await deleteTask(task.id)
   onClose()  
   navigate('/')
 }

  return (
    <DeleteModalContent>
    <h2>Delete Task</h2>
    <p>Are you sure you want to delete this task?</p>
   <DeleteModalButtons>
    <Button onClick={handleDelete} danger>
      Delete
    </Button>
    <Button onClick={onClose}>Cancel</Button>
   </DeleteModalButtons>
  </DeleteModalContent>
  )
}