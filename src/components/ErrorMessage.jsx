import styled from 'styled-components'

const ErrorContainer = styled.div`
  background-color: #fee2e2;
  border: 1px solid #fecaca;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: ${({ theme }) => theme.spacing.md};
  color: #991b1b;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
`

const ErrorIcon = styled.span`
  font-size: 1.25rem;
`

const ErrorMessage = ({ message }) => {
  return (
    <ErrorContainer>
      <ErrorIcon>⚠️</ErrorIcon>
      <span>{message || 'An error occurred. Please try again.'}</span>
    </ErrorContainer>
  )
}

export default ErrorMessage
