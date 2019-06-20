import { Component, OnInit } from '@angular/core';
import { DeseosService } from 'src/app/services/deseos.service';
import { ActivatedRoute } from '@angular/router';
import { Lista } from 'src/app/models/lista.model';
import { ListaItem } from 'src/app/models/lista-item.model';
 
@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.page.html',
  styleUrls: ['./agregar.page.scss'],
})
export class AgregarPage 
{
  lista: Lista;
  nombreItem = '';

  constructor(private deseosService: DeseosService, private route: ActivatedRoute) 
  {
    const listaID = this.route.snapshot.paramMap.get('listaID');  
    this.lista = this.deseosService.obtenerLista(listaID);
  }

  agregarItem()
  {
    if(this.nombreItem.length === 0)
    {
      return;
    }

    const nuevoItem = new ListaItem(this.nombreItem);
    this.lista.items.push(nuevoItem);
    this.nombreItem = '';
    this.guardarStorage();
  }

  cambioCheck(item: ListaItem)
  {
    const pendientes = this.lista.items.filter(itemData => !itemData.completado).length;
    this.lista.terminada = (pendientes === 0);
    this.lista.terminadaEn = (pendientes === 0) ? new Date() : null;
    this.guardarStorage();
  }

  borrarItem(index: number)
  {
    this.lista.items.splice(index, 1);
    this.guardarStorage();
  }

  guardarStorage()
  {
    this.deseosService.guardarStorage();
  }
}
