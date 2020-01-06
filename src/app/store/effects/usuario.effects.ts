
import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';

import * as usuarioActions from '../actions';
import { of } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';
import { UsuarioService } from '../../services/usuario.service';

@Injectable()
export class UsuarioEffects {

    constructor( 
        private actions$: Actions,
        public usuarioService: UsuarioService
     ) {}

    @Effect()
    cargarUsuario$ = this.actions$.ofType(usuarioActions.CARGAR_USUARIO)
    .pipe(
        switchMap( (action: usuarioActions.CargarUsuario) => {
            return this.usuarioService.getUserById(action.id)
            .pipe( 
                map(user => new usuarioActions.CargarUsuarioSucess(user) ),
                catchError(err => of(new usuarioActions.CargarUsuarioFail(err)))
            );
        })
    );
    
}