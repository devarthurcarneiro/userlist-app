import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { renderHook, waitFor } from '@testing-library/react'
import { useUsers } from '../hooks/useUsers'
import { mockUsers } from '../test/mockData'

describe('useUsers (hook)', () => {
  beforeEach(() => {
    // Reseta qualquer mock antes de cada teste
    vi.restoreAllMocks()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('começa com loading=true e users vazio', () => {
    // Mock para nunca resolver (simula fetch pendente)
    vi.spyOn(global, 'fetch').mockImplementation(
      () => new Promise(() => {}) // nunca resolve
    )

    const { result } = renderHook(() => useUsers())

    expect(result.current.loading).toBe(true)
    expect(result.current.users).toEqual([])
    expect(result.current.error).toBeNull()
  })

  it('retorna os usuários corretamente após fetch bem-sucedido', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValueOnce({
      ok: true,
      json: async () => mockUsers,
    } as Response)

    const { result } = renderHook(() => useUsers())

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    expect(result.current.users).toEqual(mockUsers)
    expect(result.current.error).toBeNull()
  })

  it('define error quando a API retorna status não-OK', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValueOnce({
      ok: false,
      status: 500,
    } as Response)

    const { result } = renderHook(() => useUsers())

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    expect(result.current.error).toMatch(/500/)
    expect(result.current.users).toEqual([])
  })

  it('define error quando ocorre falha de rede', async () => {
    vi.spyOn(global, 'fetch').mockRejectedValueOnce(new Error('Network failure'))

    const { result } = renderHook(() => useUsers())

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    expect(result.current.error).toBe('Network failure')
    expect(result.current.users).toEqual([])
  })

  it('loading volta para false após o fetch completar', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValueOnce({
      ok: true,
      json: async () => [],
    } as Response)

    const { result } = renderHook(() => useUsers())

    expect(result.current.loading).toBe(true)

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })
  })
})
