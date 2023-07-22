import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { SolicitudComponent } from './solicitud/solicitud.component';
import { EmpresasComponent } from './empresas/empresas.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { AdmiGeneralComponent } from './admi-general/admi-general.component';
import { AdmiEmpresaComponent } from './admi-empresa/admi-empresa.component';
import { ListaSolicitudesComponent } from './lista-solicitudes/lista-solicitudes.component';
import { EmpresaComponent } from './empresa/empresa.component';
import { ListaAdmiEmpresaComponent } from './lista-admi-empresa/lista-admi-empresa.component';
import { ListaUsuariosComponent } from './lista-usuarios/lista-usuarios.component';
import { EditarEmpresaComponent } from './editar-empresa/editar-empresa.component';
import { AgEditaAdmiEmpresaComponent } from './ag-edita-admi-empresa/ag-edita-admi-empresa.component';
import { VerSolicitudComponent } from './ver-solicitud/ver-solicitud.component';
import { AgVeUsuarioComponent } from './ag-ve-usuario/ag-ve-usuario.component';
import { AeEditaPerfilComponent } from './ae-edita-perfil/ae-edita-perfil.component';
import { AeListaUsuariosComponent } from './ae-lista-usuarios/ae-lista-usuarios.component';
import { AeEditaUsuarioComponent } from './ae-edita-usuario/ae-edita-usuario.component';
import { AeAniadeUsuarioComponent } from './ae-aniade-usuario/ae-aniade-usuario.component';
import { AeListaRecursosComponent } from './ae-lista-recursos/ae-lista-recursos.component';
import { AeDatosRecursoComponent } from './ae-datos-recurso/ae-datos-recurso.component';
import { AeEditaRecursoComponent } from './ae-edita-recurso/ae-edita-recurso.component';
import { AeAniadeRecursoComponent } from './ae-aniade-recurso/ae-aniade-recurso.component';
import { AeListaReservasComponent } from './ae-lista-reservas/ae-lista-reservas.component';
import { AeVeReservaComponent } from './ae-ve-reserva/ae-ve-reserva.component';
import { AeEditaReservaComponent } from './ae-edita-reserva/ae-edita-reserva.component';
import { UsuarioEditaPerfilComponent } from './usuario-edita-perfil/usuario-edita-perfil.component';
import { UsuarioVeReservasComponent } from './usuario-ve-reservas/usuario-ve-reservas.component';
import { UsuarioRealizaReservaComponent } from './usuario-realiza-reserva/usuario-realiza-reserva.component';
import { UsuarioInfoReservaComponent } from './usuario-info-reserva/usuario-info-reserva.component';
import { UsuarioEditaReservaComponent } from './usuario-edita-reserva/usuario-edita-reserva.component';
import { UsuarioRealizaReservaRecursoComponent } from './usuario-realiza-reserva-recurso/usuario-realiza-reserva-recurso.component';

//rutas para rederigir dentro de la página
const routes: Routes = [
  {
    path: '',
    redirectTo: '/reservas/login',
    pathMatch: 'full'
  },
  {
    path: 'reservas/login',
    component: LoginComponent
  },
  {
    path: 'reservas/solicitud',
    component: SolicitudComponent
  },
  {
    path: 'reservas/lista_solicitudes',
    component: ListaSolicitudesComponent
  },
  {
    path: 'reservas/lista_solicitudes/aceptadas',
    component: ListaSolicitudesComponent
  },
  {
    path: 'reservas/lista_solicitudes/rechazadas',
    component: ListaSolicitudesComponent
  },
  {
    path: 'reservas/lista_solicitudes/pendientes',
    component: ListaSolicitudesComponent
  },
  {
    path: 'reservas/lista_solicitudes/:id_solicitud',
    component: VerSolicitudComponent
  },
  {
    path: 'reservas/lista_solicitudes/:id_solicitud/actualizar',
    component: VerSolicitudComponent
  },
  {
    path: 'reservas/lista_solicitudes/:id_solicitud/eliminar',
    component: VerSolicitudComponent
  },
  {
    path: 'reservas/lista_solicitudes/:id_solicitud/:nombre_empresa',
    component: VerSolicitudComponent
  },
  {
    path: 'reservas/empresas',
    component: EmpresasComponent
  },
  {
    path: 'reservas/empresas/:id_empresa',
    component: EmpresaComponent
  },
  {
    path: 'reservas/empresas/:nombre_empresa',
    component: EmpresaComponent
  },
  {
    path: 'reservas/empresas/:id_empresa/id',
    component: EmpresaComponent
  },
  {
    path: 'reservas/empresas/eliminar/:id_empresa',
    component: EmpresaComponent
  },
  {
    path: 'reservas/empresas/cambiar/:id_empresa',
    component: EmpresaComponent
  },
  {
    path: 'reservas/empresas/:id_empresa/lista_administradores',
    component: ListaAdmiEmpresaComponent
  },
  {
    path: 'reservas/empresas/:id_empresa/lista_administradores/:id',
    component: AgEditaAdmiEmpresaComponent
  },
  {
    path: 'reservas/empresas/:id_empresa/lista_administradores/:id/eliminar',
    component: AgEditaAdmiEmpresaComponent
  },
  {
    path: 'reservas/empresas/:id_empresa/lista_usuarios',
    component: ListaUsuariosComponent
  },
  {
    path: 'reservas/empresas/:id_empresa/lista_usuarios/:nombre_usuario',
    component: AgVeUsuarioComponent
  },
  {
    path: 'reservas/empresas/:id_empresa/editar_pefil',
    component: EditarEmpresaComponent
  },
  {
    path: 'reservas/admi_general/:nombre_usuario',
    component: AdmiGeneralComponent
  },
  //ADMI Empresa
  {
    path: 'reservas/admi_empresa/:nombre_usuario',
    component: AdmiEmpresaComponent
  },
  {
    path: 'reservas/admi_empresa/:nombre_usuario/editar',
    component: AeEditaPerfilComponent
  },
  {
    path: 'reservas/admi_empresa/:nombre_usuario/editar/guardar',
    component: AeEditaPerfilComponent
  },
  {
    path: 'reservas/admi_empresa/:nombre_usuario/editar/eliminar',
    component: AeEditaPerfilComponent
  },
  {
    path: 'reservas/admi_empresa/:nombre_usuario/:id_empresa/lista_usuarios',
    component: AeListaUsuariosComponent
  },
  {
    path: 'reservas/admi_empresa/:nombre_usuario/:id_empresa/lista_usuarios/aniade',
    component: AeAniadeUsuarioComponent
  },
  {
    path: 'reservas/admi_empresa/:nombre_usuario/:id_empresa/lista_usuarios/aniade/guardar',
    component: AeAniadeUsuarioComponent
  },
  {
    path: 'reservas/admi_empresa/:nombre_usuario/:id_empresa/lista_usuarios/:id',
    component: AeEditaUsuarioComponent
  },
  {
    path: 'reservas/admi_empresa/:nombre_usuario/:id_empresa/lista_usuarios/:id/editar',
    component: AeEditaUsuarioComponent
  },
  {
    path: 'reservas/admi_empresa/:nombre_usuario/:id_empresa/lista_usuarios/:id/eliminar',
    component: AeEditaUsuarioComponent
  },
  {
    path: 'reservas/admi_empresa/:nombre_usuario/:id_empresa/lista_usuarios/:id_reserva/eliminar_reserva',
    component: AeEditaUsuarioComponent
  },
  {
    path: 'reservas/admi_empresa/:nombre_usuario/:id_empresa/lista_recursos',
    component: AeListaRecursosComponent
  },
  {
    path: 'reservas/admi_empresa/:nombre_usuario/:id_empresa/lista_recursos/get',
    component: AeListaRecursosComponent
  },
  {
    path: 'reservas/admi_empresa/:nombre_usuario/:id_empresa/lista_recursos/aniade',
    component: AeAniadeRecursoComponent
  },
  {
    path: 'reservas/admi_empresa/:nombre_usuario/:id_empresa/lista_recursos/aniade/guardar',
    component: AeAniadeRecursoComponent
  },
  {
    path: 'reservas/admi_empresa/:nombre_usuario/:id_empresa/lista_recursos/:id_recursoservicio',
    component: AeDatosRecursoComponent
  },
  {
    path: 'reservas/admi_empresa/:nombre_usuario/:id_empresa/lista_recursos/:id_recursoservicio/editar',
    component: AeEditaRecursoComponent
  },
  {
    path: 'reservas/admi_empresa/:nombre_usuario/:id_empresa/lista_recursos/:id_recursoservicio/eliminar',
    component: AeEditaRecursoComponent
  },
  {
    path: 'reservas/admi_empresa/:nombre_usuario/:id_empresa/lista_reservas',
    component: AeListaReservasComponent
  },
  {
    path: 'reservas/admi_empresa/:nombre_usuario/:id_empresa/lista_reservas/get',
    component: AeListaReservasComponent
  }, 
  {
    path: 'reservas/admi_empresa/:nombre_usuario/:id_empresa/lista_reservas/:id_reserva',
    component: AeVeReservaComponent
  },
  {
    path: 'reservas/admi_empresa/:nombre_usuario/:id_empresa/lista_reservas/:id_reserva/editar',
    component: AeEditaReservaComponent
  },
  {
    path: 'reservas/admi_empresa/:nombre_usuario/:id_empresa/lista_reservas/:id_reserva/editar/guardar',
    component: AeEditaReservaComponent
  },
  {
    path: 'reservas/admi_empresa/:nombre_usuario/:id_empresa/lista_reservas/:id_reserva/eliminar',
    component: AeEditaReservaComponent
  },

  //USUARIOS
  {
    path: 'reservas/usuario/:nombre_usuario',
    component: UsuariosComponent
  },
  {
    path: 'reservas/usuario/:nombre_usuario/editar',
    component: UsuarioEditaPerfilComponent
  },
  {
    path: 'reservas/usuario/:nombre_usuario/editar/guardar',
    component: UsuarioEditaPerfilComponent
  },
  {
    path: 'reservas/usuario/:nombre_usuario/eliminar',
    component: UsuarioEditaPerfilComponent
  },
  {
    path: 'reservas/usuario/:nombre_usuario/reservas',
    component: UsuarioVeReservasComponent
  },
  {
    path: 'reservas/usuario/:nombre_usuario/reservas/ver/:id_reserva',
    component: UsuarioInfoReservaComponent
  },
  {
    path: 'reservas/usuario/:nombre_usuario/reservas/ver/:id_reserva/editar',
    component: UsuarioEditaReservaComponent
  },
  {
    path: 'reservas/usuario/:nombre_usuario/reservas/ver/:id_reserva/editar/guardar',
    component: UsuarioEditaReservaComponent
  },
  {
    path: 'reservas/usuario/:nombre_usuario/reservas/ver/:id_reserva/eliminar',
    component: UsuarioEditaReservaComponent
  },
  {
    path: 'reservas/usuario/:nombre_usuario/reservas/:id_empresa',
    component: UsuarioVeReservasComponent
  }, 
  {
    path: 'reservas/usuario/:nombre_usuario/realiza_reserva',
    component: UsuarioRealizaReservaComponent
  }, 
  {
    path: 'reservas/usuario/:nombre_usuario/realiza_reserva/recurso/:id_recursoservicio',
    component: UsuarioRealizaReservaRecursoComponent
  },
  {
    path: 'reservas/usuario/:nombre_usuario/realiza_reserva/recurso/:id_recursoservicio/get',
    component: UsuarioRealizaReservaRecursoComponent
  },
  {
    path: 'reservas/usuario/:nombre_usuario/realiza_reserva/recurso/:id_recursoservicio/reserva',
    component: UsuarioRealizaReservaRecursoComponent
  },
  {
    path: 'reservas/usuario/:nombre_usuario/realiza_reserva/:id_empresa',
    component: UsuarioRealizaReservaComponent
  }, 
  
  
  {
    path: 'reservas/admi_general/:nombre_usuario/empresas',
    component: AdmiGeneralComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
