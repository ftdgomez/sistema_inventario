import bcrypt from 'bcryptjs'

const users = [
  {
    name: 'Admin User',
    refid: 'adm',
    email: 'admin@example.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
    isStore: true,
    address: 'Dirección de super usuario',
    contactPhone: '4244564545',
    contactMail: 'admin@example.com',
    hours: [
      'Lunes a vier: de 8:30 a.m. a 5:30 p.m',
      'Sábados: 9:00 a.m. a 3:00 p.m.',
      'Domingos: cerrado'
    ]
  },
  {
    name: 'La candelaria',
    refid: 'can',
    email: 'john@example.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: false,
    isStore: true,
    address: 'Esquina Avilanes, La Candelaria, Caracas (detrás del Centro Comercial Casa Bera).',
    contactPhone: '4242551969',
    contactMail: 'lacandelaria@refrigeracionmc.com',
    hours: [
      'Lunes a vier: de 8:30 a.m. a 5:30 p.m',
      'Sábados: 9:00 a.m. a 3:00 p.m.',
      'Domingos: cerrado'
    ]
  },
  {
    name: 'La Casanova',
    refid: 'cas',
    email: 'jane@example.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: false,
    isStore: true,
    address: 'Av. Casanova, Sabana Grande, Caracas (diagonal a El Arabito, frente a Prolicor)',
    contactPhone: '4241217659',
    contactMail: 'lacasanova@refrigeracionmc.com',
    hours: [
      'Lunes a vier: de 8:30 a.m. a 5:30 p.m',
      'Sábados: 9:00 a.m. a 3:00 p.m.',
      'Domingos: cerrado'
    ]
  },
]

export default users
