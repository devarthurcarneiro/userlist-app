import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { App } from '../App'
import { mockUsers } from '../test/mockData'

// Mock global do fetch para todos os testes da App
beforeEach(() => {
  vi.spyOn(global, 'fetch').mockResolvedValue({
    ok: true,
    json: async () => mockUsers,
  } as Response)
})

describe('App (integração)', () => {
  it('exibe o skeleton de carregamento inicialmente', () => {
    // Mock que nunca resolve para capturar estado de loading
    vi.spyOn(global, 'fetch').mockImplementation(() => new Promise(() => {}))

    render(<App />)

    // O skeleton usa divs com a classe "skeleton" — verifica pelo heading presente
    expect(screen.getByText(/usuários/i)).toBeInTheDocument()
  })

  it('exibe os usuários após o carregamento', async () => {
    render(<App />)

    await waitFor(() => {
      expect(screen.getByText('Arthur Henrique')).toBeInTheDocument()
    })

    expect(screen.getByText('Beatriz Santos')).toBeInTheDocument()
    expect(screen.getByText('Carlos Oliveira')).toBeInTheDocument()
  })

  it('filtra usuários ao digitar na busca', async () => {
    render(<App />)

    await waitFor(() => {
      expect(screen.getByText('Arthur Henrique')).toBeInTheDocument()
    })

    const searchInput = screen.getByPlaceholderText('Buscar por nome...')
    await userEvent.type(searchInput, 'Beat')

    expect(screen.getByText('Beatriz Santos')).toBeInTheDocument()
    expect(screen.queryByText('Arthur Henrique')).not.toBeInTheDocument()
    expect(screen.queryByText('Carlos Oliveira')).not.toBeInTheDocument()
  })

  it('exibe estado vazio quando a busca não tem resultados', async () => {
    render(<App />)

    await waitFor(() => {
      expect(screen.getByText('Arthur Henrique')).toBeInTheDocument()
    })

    const searchInput = screen.getByPlaceholderText('Buscar por nome...')
    await userEvent.type(searchInput, 'zzzzzz')

    expect(screen.getByText(/nenhum usuário encontrado/i)).toBeInTheDocument()
  })

  it('abre o modal ao clicar em um usuário', async () => {
    render(<App />)

    await waitFor(() => {
      expect(screen.getByText('Arthur Henrique')).toBeInTheDocument()
    })

    await userEvent.click(screen.getAllByText('Arthur Henrique')[0])

    // No modal, o username aparece com @
    expect(screen.getByText('@arthur.h')).toBeInTheDocument()
    expect(screen.getByText('(12) 99999-0000')).toBeInTheDocument()
  })

  it('fecha o modal ao pressionar ESC', async () => {
    render(<App />)

    await waitFor(() => {
      expect(screen.getByText('Arthur Henrique')).toBeInTheDocument()
    })

    await userEvent.click(screen.getAllByText('Arthur Henrique')[0])
    expect(screen.getByText('@arthur.h')).toBeInTheDocument()

    await userEvent.keyboard('{Escape}')
    expect(screen.queryByText('@arthur.h')).not.toBeInTheDocument()
  })

  it('exibe mensagem de erro quando a API falha', async () => {
    vi.spyOn(global, 'fetch').mockRejectedValueOnce(new Error('Sem conexão'))

    render(<App />)

    await waitFor(() => {
      expect(screen.getByText(/algo deu errado/i)).toBeInTheDocument()
    })

    expect(screen.getByText('Sem conexão')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /tentar novamente/i })).toBeInTheDocument()
  })
})
