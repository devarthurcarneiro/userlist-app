import { User } from '../../types/user'

export const mockUser: User = {
  id: 1,
  name: 'Arthur Henrique',
  username: 'arthur.h',
  email: 'arthur@clinica.com',
  phone: '(12) 99999-0000',
  website: 'arthur.dev',
  address: {
    street: 'Rua das Flores',
    suite: 'Ap. 42',
    city: 'São José dos Campos',
    zipcode: '12220-000',
    geo: { lat: '-23.18', lng: '-45.88' },
  },
  company: {
    name: 'Reproferty Clínica',
    catchPhrase: 'Cuidando de cada detalhe',
    bs: 'health technology',
  },
}

export const mockUsers: User[] = [
  mockUser,
  {
    id: 2,
    name: 'Beatriz Santos',
    username: 'bsantos',
    email: 'beatriz@email.com',
    phone: '(11) 98888-1111',
    website: 'beatriz.io',
    address: {
      street: 'Av. Paulista',
      suite: 'Sala 10',
      city: 'São Paulo',
      zipcode: '01310-100',
      geo: { lat: '-23.56', lng: '-46.65' },
    },
    company: {
      name: 'TechCorp',
      catchPhrase: 'Inovação que transforma',
      bs: 'software solutions',
    },
  },
  {
    id: 3,
    name: 'Carlos Oliveira',
    username: 'c.oliveira',
    email: 'carlos@mail.com',
    phone: '(21) 97777-2222',
    website: 'carlos.com',
    address: {
      street: 'Rua do Catete',
      suite: 'Casa 5',
      city: 'Rio de Janeiro',
      zipcode: '22220-000',
      geo: { lat: '-22.92', lng: '-43.17' },
    },
    company: {
      name: 'Rio Dev',
      catchPhrase: 'Construindo o futuro',
      bs: 'digital agency',
    },
  },
]
