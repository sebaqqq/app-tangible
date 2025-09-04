export interface Usuario {
  id: string;
  nombre: string;
  rut: string;
  email: string;
  telefono: string;
  avatarUrl?: string;
}

export interface Servicio {
  id: string;
  nombre: string;
  categoria: 'Automotriz' | 'Personal' | 'Inmobiliaria' | 'Ciudadana' | 'Empresarial';
  descripcion: string;
  icono: string;
  precio?: number;
  beneficios: string[];
}

export interface SolicitudServicio {
  id: string;
  usuarioId: string;
  servicioId: string;
  payload: Record<string, any>;
  estado: 'Pendiente' | 'Activo' | 'Finalizado' | 'Cancelado';
  fechaCreacion: Date;
  fechaActualizacion: Date;
}

export interface Pago {
  id: string;
  usuarioId: string;
  servicioId?: string;
  solicitudId?: string;
  monto: number;
  metodo: 'Tarjeta' | 'Transferencia' | 'Efectivo';
  estado: 'Pendiente' | 'Pagado' | 'Rechazado';
  fecha: Date;
  comprobante?: string;
}

export interface Incidente {
  id: string;
  usuarioId?: string;
  categoria: 'Seguridad' | 'Tránsito' | 'Servicios' | 'Emergencia' | 'Otro';
  descripcion: string;
  lat: number;
  lng: number;
  anonimo: boolean;
  fotos?: string[];
  videoUrl?: string;
  estado: 'Reportado' | 'En revisión' | 'Resuelto' | 'Cerrado';
  fecha: Date;
}

export type RootStackParamList = {
  Onboarding: undefined;
  Auth: undefined;
  Main: undefined;
};

export type TabsParamList = {
  Home: undefined;
  Servicios: undefined;
  Mapa: undefined;
  Pagos: undefined;
  Perfil: undefined;
};