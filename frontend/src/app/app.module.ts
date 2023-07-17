import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavegacionComponent } from './components/navegacion/navegacion.component';
import { ReservasFormComponent } from './components/reservas-form/reservas-form.component';
import { ReservasListComponent } from './components/reservas-list/reservas-list.component';

import {ReservasService} from './services/reservas.service';
import {FormsModule} from '@angular/forms';
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
import { AeAniadeUsuarioComponent } from './ae-aniade-usuario/ae-aniade-usuario.component'


@NgModule({
  declarations: [
    AppComponent,
    NavegacionComponent,
    ReservasFormComponent,
    ReservasListComponent,
    LoginComponent,
    SolicitudComponent,
    EmpresasComponent,
    UsuariosComponent,
    AdmiGeneralComponent,
    AdmiEmpresaComponent,
    ListaSolicitudesComponent,
    EmpresaComponent,
    ListaAdmiEmpresaComponent,
    ListaUsuariosComponent,
    EditarEmpresaComponent,
    AgEditaAdmiEmpresaComponent,
    VerSolicitudComponent,
    AgVeUsuarioComponent,
    AeEditaPerfilComponent,
    AeListaUsuariosComponent,
    AeEditaUsuarioComponent,
    AeAniadeUsuarioComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [ReservasService],
  bootstrap: [AppComponent]
})
export class AppModule { }
