import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {ReservasListComponent} from './components/reservas-list/reservas-list.component';
import { ReservasFormComponent } from './components/reservas-form/reservas-form.component';
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

//rutas para rederigir dentro de la página
const routes: Routes = [
  {
    path: '',
    redirectTo: '/reservas/login',
    pathMatch: 'full'
  },
  {
    path: 'reservas',
    component: ReservasListComponent
  },
  {
    path: 'reservas/añadir',
    component: ReservasFormComponent
  },
  {
    path: 'reservas/editar/:fecha',
    component: ReservasFormComponent
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
    path: 'reservas/lista_solicitudes/:id_solicitud',
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
    path: 'reservas/empresas/:nombre_empresa',
    component: EmpresaComponent
  },
  {
    path: 'reservas/empresas/eliminar/:nombre_empresa',
    component: EmpresaComponent
  },
  {
    path: 'reservas/empresas/cambiar/:nombre_empresa',
    component: EmpresaComponent
  },
  {
    path: 'reservas/empresas/:nombre_empresa/lista_administradores',
    component: ListaAdmiEmpresaComponent
  },
  {
    path: 'reservas/empresas/:nombre_empresa/lista_administradores/:id',
    component: AgEditaAdmiEmpresaComponent
  },
  {
    path: 'reservas/empresas/:nombre_empresa/lista_administradores/:id/eliminar',
    component: AgEditaAdmiEmpresaComponent
  },
  {
    path: 'reservas/empresas/:nombre_empresa/lista_usuarios',
    component: ListaUsuariosComponent
  },
  {
    path: 'reservas/empresas/:nombre_empresa/editar_pefil',
    component: EditarEmpresaComponent
  },
  {
    path: 'reservas/admi_general/:nombre_usuario',
    component: AdmiGeneralComponent
  },
  {
    path: 'reservas/admi_empresa/:nombre_usuario',
    component: AdmiEmpresaComponent
  },
  {
    path: 'reservas/usuario/:nombre_usuario',
    component: UsuariosComponent
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
