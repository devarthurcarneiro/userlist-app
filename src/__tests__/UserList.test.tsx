import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { UserList } from '../components/UserList'
import { mockUsers } from '../test/mockData'

describe('UserList', () => {
  it('renderiza todos os usuários recebidos', () => {
    render(
      <UserList users={mockUsers} onUserClick={() => {}} searchQuery="" />
    )
    expect(screen.getByText('Arthur Henrique')).toBeInTheDocument()
    expect(screen.getByText('Beatriz Santos')).toBeInTheDocument()
    expect(screen.getByText('Carlos Oliveira')).toBeInTheDocument()
  })

  it('exibe estado vazio quando a lista está vazia', () => {
    render(
      <UserList users={[]} onUserClick={() => {}} searchQuery="xyz" />
    )
    expect(screen.getByText(/nenhum usuário encontrado/i)).toBeInTheDocument()
  })

  it('exibe o termo buscado no estado vazio', () => {
    render(
      <UserList users={[]} onUserClick={() => {}} searchQuery="Zezinho" />
    )
    expect(screen.getByText(/"Zezinho"/i)).toBeInTheDocument()
  })

  it('chama onUserClick com o usuário correto ao clicar', async () => {
    const handleClick = vi.fn()
    render(
      <UserList users={mockUsers} onUserClick={handleClick} searchQuery="" />
    )

    await userEvent.click(screen.getByText('Beatriz Santos'))
    expect(handleClick).toHaveBeenCalledWith(mockUsers[1])
  })

  it('renderiza o número correto de botões de usuário', () => {
    render(
      <UserList users={mockUsers} onUserClick={() => {}} searchQuery="" />
    )
    expect(screen.getAllByRole('button')).toHaveLength(mockUsers.length)
  })
})
