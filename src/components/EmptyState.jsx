import styled from 'styled-components'
import Button from './Button'

const EmptyContainer = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing.xxl};
  background-color: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: ${({ theme }) => theme.shadows.md};
`

const EmptyIcon = styled.div`
  font-size: 4rem;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`

const EmptyTitle = styled.h2`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`

const EmptyMessage = styled.p`
  color: ${({ theme }) => theme.colors.textLight};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`

const EmptyState = ({ onCreateTask }) => {
  return (
    <EmptyContainer>
      <EmptyIcon>📋</EmptyIcon>
      <EmptyTitle>No tasks yet</EmptyTitle>
      <EmptyMessage>
        Get started by creating your first customer task
      </EmptyMessage>
      {onCreateTask && (
        <Button onClick={onCreateTask} primary>
          Create Your First Task
        </Button>
      )}
    </EmptyContainer>
  )
}

export default EmptyState
