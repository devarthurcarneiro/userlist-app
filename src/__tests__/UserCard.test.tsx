import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { UserCard } from '../components/UserCard'
import { mockUser } from '../test/mockData'

describe('UserCard', () => {
  it('renderiza o nome do usuário', () => {
    render(<UserCard user={mockUser} index={0} onClick={() => {}} />)
    expect(screen.getByText('Arthur Henrique')).toBeInTheDocument()
  })

  it('renderiza o email do usuário', () => {
    render(<UserCard user={mockUser} index={0} onClick={() => {}} />)
    expect(screen.getByText('arthur@clinica.com')).toBeInTheDocument()
  })

  it('renderiza o nome da empresa', () => {
    render(<UserCard user={mockUser} index={0} onClick={() => {}} />)
    expect(screen.getByText('Reproferty Clínica')).toBeInTheDocument()
  })

  it('renderiza a cidade', () => {
    render(<UserCard user={mockUser} index={0} onClick={() => {}} />)
    expect(screen.getByText('São José dos Campos')).toBeInTheDocument()
  })

  it('exibe as iniciais do nome no avatar', () => {
    render(<UserCard user={mockUser} index={0} onClick={() => {}} />)
    // "Arthur Henrique" → "AH"
    expect(screen.getByText('AH')).toBeInTheDocument()
  })

  it('chama onClick ao clicar no card', async () => {
    const handleClick = vi.fn()
    render(<UserCard user={mockUser} index={0} onClick={handleClick} />)

    await userEvent.click(screen.getByRole('button'))
    expect(handleClick).toHaveBeenCalledTimes(1)
    expect(handleClick).toHaveBeenCalledWith(mockUser)
  })

  it('o card é renderizado como um botão acessível', () => {
    render(<UserCard user={mockUser} index={0} onClick={() => {}} />)
    expect(screen.getByRole('button')).toBeInTheDocument()
  })
})
