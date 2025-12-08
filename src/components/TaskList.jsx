import styled from 'styled-components'
import TaskCard from './TaskCard'
import LoadingSpinner from './LoadingSpinner'
import EmptyState from './EmptyState'

const TaskListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`

const TaskList = ({ tasks, loading }) => {
  if (loading) {
    return <LoadingSpinner />
  }

  if (tasks.length === 0) {
    return <EmptyState />
  }

  return (
    <TaskListContainer>
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </TaskListContainer>
  )
}

export default TaskList
