import { useState } from 'react'
import styled from 'styled-components'
import { useTasks } from '../context/TaskContext'
import TaskList from '../components/TaskList'
import TaskForm from '../components/TaskForm'
import Button from '../components/Button'
import Modal from '../components/Modal'
import LoadingSpinner from '../components/LoadingSpinner'
import ErrorMessage from '../components/ErrorMessage'

const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xl};
`

const DashboardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.md};

  h1 {
    font-size: 2rem;
    color: ${({ theme }) => theme.colors.text};
  } 
  @media (max-width: 768px) {
    h1 {
      font-size: 1.5rem;
    }
  }
`

const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`

const ControlsBar = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.md};
  align-items: center;
`

const ControlGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
  min-width: 180px;

  label {
    font-size: 0.875rem;
    color: ${({ theme }) => theme.colors.textLight};
    font-weight: 600;
  }

  select {
    padding: ${({ theme }) => theme.spacing.sm};
    border-radius: ${({ theme }) => theme.borderRadius.md};
    border: 1px solid ${({ theme }) => theme.colors.border};
    background: ${({ theme }) => theme.colors.surface};
    font-size: 0.95rem;
  }
`

const StatCard = styled.div`
  background-color: ${({ theme }) => theme.colors.surface};
  padding: ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: ${({ theme }) => theme.shadows.md};
  border-left: 4px solid ${({ color, theme }) => color || theme.colors.primary};

  h3 {
    font-size: 0.875rem;
    color: ${({ theme }) => theme.colors.textLight};
    margin-bottom: ${({ theme }) => theme.spacing.sm};
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  p {
    font-size: 2rem;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.text};
  }
`

const Dashboard = () => {
  const { tasks, loading, error } = useTasks()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [statusFilter, setStatusFilter] = useState('all')
  const [sortOrder, setSortOrder] = useState('asc')

  const totalTasks = tasks.length
  const completedTasks = tasks.filter((task) => task.status === 'completed').length
  const pendingTasks = tasks.filter((task) => task.status === 'pending').length
  const inProgressTasks = tasks.filter((task) => task.status === 'in-progress').length

  const filteredTasks =
    statusFilter === 'all'
      ? tasks
      : tasks.filter((task) => task.status === statusFilter)

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    const aDue = a.dueDate ? new Date(a.dueDate).getTime() : Number.MAX_SAFE_INTEGER
    const bDue = b.dueDate ? new Date(b.dueDate).getTime() : Number.MAX_SAFE_INTEGER
    return sortOrder === 'asc' ? aDue - bDue : bDue - aDue
  })

  if (loading && tasks.length === 0) {
    return <LoadingSpinner />
  }

  return (
    <DashboardContainer>
      <DashboardHeader>
        <h1>All Tasks</h1>
        <Button onClick={() => setIsModalOpen(true)} primary>
          + Add New Task
        </Button>
      </DashboardHeader>

      {error && <ErrorMessage message={error} />}

      <ControlsBar>
        <ControlGroup>
          <label htmlFor="statusFilter">Filter by status</label>
          <select
            id="statusFilter"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All</option>
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </ControlGroup>

        <ControlGroup>
          <label htmlFor="sortOrder">Sort by due date</label>
          <select
            id="sortOrder"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="asc">Soonest first</option>
            <option value="desc">Latest first</option>
          </select>
        </ControlGroup>
      </ControlsBar>

      <StatsContainer>
        <StatCard color="#6366f1">
          <h3>Total Tasks</h3>
          <p>{totalTasks}</p>
        </StatCard>
        <StatCard color="#10b981">
          <h3>Completed</h3>
          <p>{completedTasks}</p>
        </StatCard>
        <StatCard color="#f59e0b">
          <h3>In Progress</h3>
          <p>{inProgressTasks}</p>
        </StatCard>
        <StatCard color="#ef4444">
          <h3>Pending</h3>
          <p>{pendingTasks}</p>
        </StatCard>
      </StatsContainer>

      <TaskList tasks={sortedTasks} loading={loading} />

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <TaskForm onClose={() => setIsModalOpen(false)} />
      </Modal>
    </DashboardContainer>
  )
}

export default Dashboard
