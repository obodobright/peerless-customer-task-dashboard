import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { useTasks } from '../context/TaskContext'
import Button from '../components/Button'
import LoadingSpinner from '../components/LoadingSpinner'
import ErrorMessage from '../components/ErrorMessage'
import Modal from '../components/Modal'
import TaskForm from '../components/TaskForm'
import { taskService } from '../services/taskService'

const DetailContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
`

const DetailCard = styled.div`
  background-color: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.xl};
  box-shadow: ${({ theme }) => theme.shadows.md};
`

const DetailHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  padding-bottom: ${({ theme }) => theme.spacing.lg};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`

const Title = styled.h1`
  font-size: 2rem;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`

const StatusBadge = styled.span`
  display: inline-block;
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: 0.875rem;
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

const DetailSection = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`

const SectionTitle = styled.h3`
  font-size: 0.875rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: ${({ theme }) => theme.colors.textLight};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`

const SectionContent = styled.p`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.text};
  line-height: 1.6;
`

const ActionsContainer = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-top: ${({ theme }) => theme.spacing.xl};
  padding-top: ${({ theme }) => theme.spacing.lg};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`

const TaskDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { deleteTask } = useTasks()
  const [task, setTask] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)

  useEffect(() => {
    const fetchTask = async () => {
      try {
        setLoading(true)
        const taskData = await taskService.getTaskById(id)
        setTask(taskData)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchTask()
  }, [id])

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      await deleteTask(id)
      navigate('/')
    }
  }

  if (loading) {
    return <LoadingSpinner />
  }

  if (error || !task) {
    return <ErrorMessage message={error || 'Task not found'} />
  }

  return (
    <DetailContainer>
      <DetailCard>
        <DetailHeader>
          <div>
            <Title>{task.title}</Title>
            <StatusBadge status={task.status}>{task.status}</StatusBadge>
          </div>
        </DetailHeader>

        <DetailSection>
          <SectionTitle>Description</SectionTitle>
          <SectionContent>{task.description}</SectionContent>
        </DetailSection>

        <DetailSection>
          <SectionTitle>Customer</SectionTitle>
          <SectionContent>{task.customerName}</SectionContent>
        </DetailSection>

        <DetailSection>
          <SectionTitle>Priority</SectionTitle>
          <SectionContent style={{ textTransform: 'capitalize' }}>
            {task.priority}
          </SectionContent>
        </DetailSection>

        <DetailSection>
          <SectionTitle>Due Date</SectionTitle>
          <SectionContent>
            {task.dueDate
              ? new Date(task.dueDate).toLocaleDateString()
              : 'Not set'}
          </SectionContent>
        </DetailSection>

        <DetailSection>
          <SectionTitle>Created</SectionTitle>
          <SectionContent>
            {new Date(task.createdAt).toLocaleString()}
          </SectionContent>
        </DetailSection>

        <DetailSection>
          <SectionTitle>Last Updated</SectionTitle>
          <SectionContent>
            {new Date(task.updatedAt).toLocaleString()}
          </SectionContent>
        </DetailSection>

        <ActionsContainer>
          <Button onClick={() => setIsEditModalOpen(true)} primary>
            Edit Task
          </Button>
          <Button onClick={handleDelete} danger>
            Delete Task
          </Button>
          <Button onClick={() => navigate('/')}>Back to Dashboard</Button>
        </ActionsContainer>
      </DetailCard>

      <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
        <TaskForm
          task={task}
          onClose={() => {
            setIsEditModalOpen(false)
            // Refresh task data
            taskService.getTaskById(id).then(setTask)
          }}
        />
      </Modal>
    </DetailContainer>
  )
}

export default TaskDetail
