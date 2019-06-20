import { Component, Input } from '@angular/core';
import { DeseosService } from 'src/app/services/deseos.service';
import { Lista } from 'src/app/models/lista.model';
import { Router } from '@angular/router';
 
@Component({
  selector: 'app-listas',
  templateUrl: './listas.component.html',
  styleUrls: ['./listas.component.scss'],
})
export class ListasComponent 
{
  @Input() terminada = true;

  constructor(public deseosService: DeseosService, private router: Router) { }

  listaSeleccionada(lista: Lista)
  {
    const tabName = (this.terminada) ? 'tab2' : 'tab1';
    this.router.navigateByUrl(`/tabs/${tabName}/agregar/${lista.id}`);
  }

  borrarLista(item: Lista)
  {
    this.deseosService.borrarLista(item);
  }
}
