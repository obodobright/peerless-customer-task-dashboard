import styled from 'styled-components'

const StyledButton = styled.button`
  padding: ${({ small, theme }) =>
    small ? `${theme.spacing.xs} ${theme.spacing.sm}` : `${theme.spacing.sm} ${theme.spacing.md}`};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ small }) => (small ? '0.875rem' : '1rem')};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  background-color: ${({ primary, danger, theme }) => {
    if (danger) return theme.colors.danger
    if (primary) return theme.colors.basic
    return theme.colors.surface
  }};
  color: ${({ primary, danger, theme }) => {
    if (primary || danger) return '#ffffff'
    return theme.colors.text
  }};
  border: ${({ primary, danger }) => {
    if (primary || danger) return 'none'
    return '1px solid'
  }};
  border-color: ${({ theme }) => theme.colors.border};

  &:hover:not(:disabled) {
    background-color: ${({ primary, danger, theme }) => {
      if (danger) return '#dc2626'
      if (primary) return theme.colors.basicDark
      return theme.colors.background
    }};
    transform: translateY(-1px);
    box-shadow: ${({ theme }) => theme.shadows.md};
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
  @media (max-width: 768px) {
    font-size: 0.875rem;
  }
`

const Button = ({ children, ...props }) => {
  return <StyledButton {...props}>{children}</StyledButton>
}

export default Button
