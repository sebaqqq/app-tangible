import {
  Usuario,
  Servicio,
  SolicitudServicio,
  Pago,
  Incidente,
  Vehiculo,
} from '@/types';

export const mockUser: Usuario = {
  id: '1',
  nombre: 'Sebastián González',
  rut: '12.345.678-9',
  email: 'sebastian@example.com',
  telefono: '+56912345678',
  avatarUrl: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
};

export const mockServicios: Servicio[] = [
  {
    id: '1',
    nombre: 'Seguridad Vehicular',
    categoria: 'Automotriz',
    descripcion: 'Protección completa para tu vehículo 24/7',
    icono: 'car',
    precio: 29990,
    beneficios: [
      'Monitoreo GPS',
      'Alarma antirrobo',
      'Asistencia 24/7',
      'Seguro incluido',
    ],
  },
  {
    id: '2',
    nombre: 'Guardaespaldas Personal',
    categoria: 'Personal',
    descripcion: 'Protección personal profesional',
    icono: 'shield-check',
    precio: 89990,
    beneficios: [
      'Personal capacitado',
      'Disponibilidad 24/7',
      'Discreción total',
      'Reportes semanales',
    ],
  },
  {
    id: '3',
    nombre: 'Vigilancia Domiciliaria',
    categoria: 'Inmobiliaria',
    descripcion: 'Seguridad para tu hogar',
    icono: 'home',
    precio: 45990,
    beneficios: [
      'Cámaras HD',
      'Monitoreo remoto',
      'Alertas inmediatas',
      'App móvil',
    ],
  },
  {
    id: '4',
    nombre: 'Escolta Ciudadana',
    categoria: 'Ciudadana',
    descripcion: 'Acompañamiento en espacios públicos',
    icono: 'users',
    precio: 19990,
    beneficios: [
      'Personal uniformado',
      'Rutas seguras',
      'Comunicación constante',
      'Tarifas por hora',
    ],
  },
  {
    id: '5',
    nombre: 'Seguridad Empresarial',
    categoria: 'Empresarial',
    descripcion: 'Soluciones integrales para empresas',
    icono: 'building',
    precio: 199990,
    beneficios: [
      'Control de accesos',
      'Vigilancia perimetral',
      'Personal especializado',
      'Reportes ejecutivos',
    ],
  },
];

export const mockSolicitudes: SolicitudServicio[] = [
  {
    id: '1',
    usuarioId: '1',
    servicioId: '1',
    payload: { vehiculo: 'Toyota Corolla 2020', patente: 'ABCD12' },
    estado: 'Activo',
    fechaCreacion: new Date('2024-01-15'),
    fechaActualizacion: new Date('2024-01-15'),
  },
  {
    id: '2',
    usuarioId: '1',
    servicioId: '3',
    payload: { direccion: 'Los Aromos 123, Las Condes' },
    estado: 'Pendiente',
    fechaCreacion: new Date('2024-01-20'),
    fechaActualizacion: new Date('2024-01-20'),
  },
  {
    id: '3',
    usuarioId: '1',
    servicioId: '2',
    payload: { horario: 'Lunes a Viernes 8:00-17:00' },
    estado: 'Finalizado',
    fechaCreacion: new Date('2024-01-10'),
    fechaActualizacion: new Date('2024-01-18'),
  },
];

export const mockPagos: Pago[] = [
  {
    id: '1',
    usuarioId: '1',
    servicioId: '1',
    solicitudId: '1',
    monto: 29990,
    metodo: 'Tarjeta',
    estado: 'Pagado',
    fecha: new Date('2024-01-15'),
    comprobante: 'COMP-2024-001',
  },
  {
    id: '2',
    usuarioId: '1',
    servicioId: '3',
    monto: 45990,
    metodo: 'Transferencia',
    estado: 'Pendiente',
    fecha: new Date('2024-01-20'),
  },
  {
    id: '3',
    usuarioId: '1',
    servicioId: '2',
    solicitudId: '3',
    monto: 89990,
    metodo: 'Tarjeta',
    estado: 'Pagado',
    fecha: new Date('2024-01-10'),
    comprobante: 'COMP-2024-002',
  },
];

export const mockIncidentes: Incidente[] = [
  {
    id: '1',
    usuarioId: '1',
    categoria: 'Seguridad',
    descripcion: 'Robo a peatón en Plaza Italia',
    lat: -33.4372,
    lng: -70.6341,
    anonimo: false,
    estado: 'Reportado',
    fecha: new Date('2024-01-22'),
  },
  {
    id: '2',
    categoria: 'Tránsito',
    descripcion: 'Choque múltiple en Autopista Central',
    lat: -33.4569,
    lng: -70.6483,
    anonimo: true,
    estado: 'En revisión',
    fecha: new Date('2024-01-21'),
  },
  {
    id: '3',
    usuarioId: '1',
    categoria: 'Emergencia',
    descripcion: 'Incendio en edificio comercial',
    lat: -33.4378,
    lng: -70.6504,
    anonimo: false,
    estado: 'Resuelto',
    fecha: new Date('2024-01-20'),
  },
];

export const mockVehiculos: Vehiculo[] = [
  {
    patente: 'ABCD12',
    marca: 'Toyota',
    modelo: 'Corolla',
    año: 2020,
    color: 'Blanco',
    tipo: 'Automóvil',
    propietario: {
      nombre: 'Sebastián González',
      rut: '12.345.678-9',
    },
    estado: 'Vigente',
    ultimaVerificacion: new Date('2024-01-15'),
    serviciosActivos: ['Seguridad Vehicular'],
    historial: [
      {
        fecha: new Date('2024-01-15'),
        evento: 'Servicio activado',
        descripcion: 'Se activó el servicio de Seguridad Vehicular',
      },
      {
        fecha: new Date('2024-01-10'),
        evento: 'Verificación técnica',
        descripcion: 'Revisión técnica aprobada',
      },
    ],
  },
  {
    patente: 'EFGH34',
    marca: 'Honda',
    modelo: 'Civic',
    año: 2019,
    color: 'Gris',
    tipo: 'Automóvil',
    propietario: {
      nombre: 'María Rodríguez',
      rut: '98.765.432-1',
    },
    estado: 'Robado',
    ultimaVerificacion: new Date('2024-01-20'),
    serviciosActivos: [],
    historial: [
      {
        fecha: new Date('2024-01-20'),
        evento: 'Reporte de robo',
        descripcion: 'Vehículo reportado como robado',
      },
      {
        fecha: new Date('2024-01-18'),
        evento: 'Servicio cancelado',
        descripcion: 'Servicio de seguridad cancelado',
      },
    ],
  },
  {
    patente: 'IJKL56',
    marca: 'Ford',
    modelo: 'Ranger',
    año: 2021,
    color: 'Azul',
    tipo: 'Camioneta',
    propietario: {
      nombre: 'Carlos Pérez',
      rut: '11.222.333-4',
    },
    estado: 'Vigente',
    ultimaVerificacion: new Date('2024-01-22'),
    serviciosActivos: ['Seguridad Vehicular', 'Rastreo GPS'],
    historial: [
      {
        fecha: new Date('2024-01-22'),
        evento: 'Servicio renovado',
        descripcion: 'Servicio de seguridad renovado por 6 meses',
      },
      {
        fecha: new Date('2024-01-15'),
        evento: 'Mantenimiento',
        descripcion: 'Mantenimiento preventivo realizado',
      },
    ],
  },
  {
    patente: 'MNOP78',
    marca: 'Yamaha',
    modelo: 'FZ-16',
    año: 2022,
    color: 'Rojo',
    tipo: 'Moto',
    propietario: {
      nombre: 'Ana Silva',
      rut: '55.666.777-8',
    },
    estado: 'En proceso',
    ultimaVerificacion: new Date('2024-01-21'),
    serviciosActivos: [],
    historial: [
      {
        fecha: new Date('2024-01-21'),
        evento: 'Verificación en proceso',
        descripcion: 'Verificación de documentos en proceso',
      },
      {
        fecha: new Date('2024-01-20'),
        evento: 'Solicitud recibida',
        descripcion: 'Solicitud de servicio recibida',
      },
    ],
  },
];

// Función para buscar vehículo por patente
export const buscarVehiculoPorPatente = (patente: string): Vehiculo | null => {
  const patenteNormalizada = patente.toUpperCase().replace(/\s/g, '');
  return mockVehiculos.find((v) => v.patente === patenteNormalizada) || null;
};

// Función para obtener saludo dinámico
export const getGreetingMessage = (nombre: string): string => {
  const hour = new Date().getHours();
  let greeting = 'Hola';

  if (hour < 12) greeting = 'Buenos días';
  else if (hour < 18) greeting = 'Buenas tardes';
  else greeting = 'Buenas noches';

  return `${greeting}, ${nombre} 👋`;
};
