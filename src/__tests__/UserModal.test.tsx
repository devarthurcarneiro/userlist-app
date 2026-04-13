import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { UserModal } from '../components/UserModal'
import { mockUser } from '../test/mockData'

describe('UserModal', () => {
  it('não renderiza nada quando user é null', () => {
    const { container } = render(<UserModal user={null} onClose={() => {}} />)
    expect(container).toBeEmptyDOMElement()
  })

  it('renderiza o nome completo do usuário', () => {
    render(<UserModal user={mockUser} onClose={() => {}} />)
    expect(screen.getByText('Arthur Henrique')).toBeInTheDocument()
  })

  it('renderiza o username com @', () => {
    render(<UserModal user={mockUser} onClose={() => {}} />)
    expect(screen.getByText('@arthur.h')).toBeInTheDocument()
  })

  it('exibe o email do usuário', () => {
    render(<UserModal user={mockUser} onClose={() => {}} />)
    expect(screen.getByText('arthur@clinica.com')).toBeInTheDocument()
  })

  it('exibe o telefone do usuário', () => {
    render(<UserModal user={mockUser} onClose={() => {}} />)
    expect(screen.getByText('(12) 99999-0000')).toBeInTheDocument()
  })

  it('exibe a empresa do usuário', () => {
    render(<UserModal user={mockUser} onClose={() => {}} />)
    expect(screen.getByText('Reproferty Clínica')).toBeInTheDocument()
  })

  it('exibe a cidade do usuário', () => {
    render(<UserModal user={mockUser} onClose={() => {}} />)
    expect(screen.getByText(/São José dos Campos/i)).toBeInTheDocument()
  })

  it('exibe o catchPhrase da empresa', () => {
    render(<UserModal user={mockUser} onClose={() => {}} />)
    expect(screen.getByText(/"Cuidando de cada detalhe"/i)).toBeInTheDocument()
  })

  it('chama onClose ao clicar no botão X', async () => {
    const handleClose = vi.fn()
    render(<UserModal user={mockUser} onClose={handleClose} />)

    // O botão fechar é identificado pelo ícone SVG dentro de um botão
    const buttons = screen.getAllByRole('button')
    await userEvent.click(buttons[0])

    expect(handleClose).toHaveBeenCalledTimes(1)
  })

  it('chama onClose ao pressionar a tecla ESC', async () => {
    const handleClose = vi.fn()
    render(<UserModal user={mockUser} onClose={handleClose} />)

    await userEvent.keyboard('{Escape}')
    expect(handleClose).toHaveBeenCalledTimes(1)
  })

  it('chama onClose ao clicar no backdrop', async () => {
    const handleClose = vi.fn()
    render(<UserModal user={mockUser} onClose={handleClose} />)

    // O backdrop é o elemento pai com fixed inset-0
    const backdrop = screen.getByText('Arthur Henrique').closest('.fixed')
    if (backdrop) {
      await userEvent.click(backdrop)
    }

    expect(handleClose).toHaveBeenCalled()
  })
})
