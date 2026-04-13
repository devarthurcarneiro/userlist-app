import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { SearchBar } from '../components/SearchBar'

describe('SearchBar', () => {
  it('renderiza o campo de busca com placeholder correto', () => {
    render(<SearchBar value="" onChange={() => {}} resultCount={0} />)
    expect(screen.getByPlaceholderText('Buscar por nome...')).toBeInTheDocument()
  })

  it('exibe o valor atual passado via prop', () => {
    render(<SearchBar value="Arthur" onChange={() => {}} resultCount={1} />)
    const input = screen.getByPlaceholderText('Buscar por nome...')
    expect(input).toHaveValue('Arthur')
  })

  it('chama onChange ao digitar', async () => {
    const handleChange = vi.fn()
    render(<SearchBar value="" onChange={handleChange} resultCount={0} />)

    const input = screen.getByPlaceholderText('Buscar por nome...')
    await userEvent.type(input, 'Be')

    expect(handleChange).toHaveBeenCalledTimes(2)
    expect(handleChange).toHaveBeenLastCalledWith('e')
  })

  it('exibe o contador de resultados quando há texto digitado', () => {
    render(<SearchBar value="Beatriz" onChange={() => {}} resultCount={2} />)
    expect(screen.getByText(/2 resultado/i)).toBeInTheDocument()
  })

  it('não exibe o contador quando o campo está vazio', () => {
    render(<SearchBar value="" onChange={() => {}} resultCount={10} />)
    expect(screen.queryByText(/resultado/i)).not.toBeInTheDocument()
  })

  it('exibe "resultado" no singular quando há apenas 1', () => {
    render(<SearchBar value="a" onChange={() => {}} resultCount={1} />)
    expect(screen.getByText('1 resultado')).toBeInTheDocument()
  })

  it('exibe "resultados" no plural quando há mais de 1', () => {
    render(<SearchBar value="a" onChange={() => {}} resultCount={3} />)
    expect(screen.getByText('3 resultados')).toBeInTheDocument()
  })
})
