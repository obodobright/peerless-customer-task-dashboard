import { useState } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { useTasks } from '../context/TaskContext'
import Button from './Button'
import Modal from './Modal'
import TaskForm from './TaskForm'

const Card = styled.div`
  background-color: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.lg};
  box-shadow: ${({ theme }) => theme.shadows.md};
  transition: transform 0.2s, box-shadow 0.2s;
  border-left: 4px solid
    ${({ status, theme }) => {
      switch (status) {
        case 'completed':
          return theme.colors.success
        case 'in-progress':
          return theme.colors.warning
        case 'pending':
          return theme.colors.danger
        default:
          return theme.colors.primary
      }
    }};

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.lg};
  }
`

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`

const TaskTitle = styled(Link)`
  font-size: 1.25rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  text-decoration: none;
  flex: 1;

  &:hover {
    color: ${({ theme }) => theme.colors.purple};
  }
`

const StatusBadge = styled.span`
  display: inline-block;
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  background-color: ${({ status, theme }) => {
    switch (status) {
      case 'completed':
        return `${theme.colors.success}20`
      case 'in-progress':
        return `${theme.colors.warning}20`
      case 'pending':
        return `${theme.colors.danger}20`
      default:
        return `${theme.colors.primary}20`
    }
  }};
  color: ${({ status, theme }) => {
    switch (status) {
      case 'completed':
        return theme.colors.success
      case 'in-progress':
        return theme.colors.warning
      case 'pending':
        return theme.colors.danger
      default:
        return theme.colors.primary
    }
  }};
`

const TaskDescription = styled.p`
  color: ${({ theme }) => theme.colors.textLight};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  line-height: 1.6;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`

const TaskMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.textLight};
`

const CustomerName = styled.span`
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
`

const CardActions = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-top: ${({ theme }) => theme.spacing.md};
`

const TaskCard = ({ task }) => {
  const { deleteTask } = useTasks()
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      await deleteTask(task.id)
    }
  }

  return (
    <>
      <Card status={task.status}>
        <CardHeader>
          <TaskTitle to={`/task/${task.id}`}>{task.title}</TaskTitle>
          <StatusBadge status={task.status}>{task.status}</StatusBadge>
        </CardHeader>
        <TaskDescription>{task.description}</TaskDescription>
        <TaskMeta>
          <div>
            Customer: <CustomerName>{task.customerName}</CustomerName>
          </div>
          <div>
            {task.dueDate
              ? `Due ${new Date(task.dueDate).toLocaleDateString()}`
              : 'No due date'}
          </div>
        </TaskMeta>
        <CardActions>
          <Button onClick={() => setIsEditModalOpen(true)} small>
            Edit
          </Button>
          <Button onClick={handleDelete} small danger>
            Delete
          </Button>
        </CardActions>
      </Card>

      <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
        <TaskForm task={task} onClose={() => setIsEditModalOpen(false)} />
      </Modal>
    </>
  )
}

export default TaskCard
