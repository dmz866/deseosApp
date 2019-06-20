import { Component, Input, ViewChild } from '@angular/core';
import { DeseosService } from 'src/app/services/deseos.service';
import { Lista } from 'src/app/models/lista.model';
import { Router } from '@angular/router';
import { AlertController, IonList } from '@ionic/angular';
 
@Component({
  selector: 'app-listas',
  templateUrl: './listas.component.html',
  styleUrls: ['./listas.component.scss'],
})
export class ListasComponent 
{
  @ViewChild('listaItem') listaION: IonList;
  @Input() terminada = true;

  constructor(public deseosService: DeseosService, private router: Router, private alertCtrl: AlertController) { }

  listaSeleccionada(lista: Lista)
  {
    const tabName = (this.terminada) ? 'tab2' : 'tab1';
    this.router.navigateByUrl(`/tabs/${tabName}/agregar/${lista.id}`);
  }

  borrarLista(item: Lista)
  {
    this.deseosService.borrarLista(item);
  }

  async editarLista(item: Lista)
  {
    const alert = await this.alertCtrl.create
    ({
      header: 'Editar lista',
      inputs: 
      [
        {
          name: 'titulo',
          type: 'text',
          value: item.titulo,
          placeholder: 'Nombre de la lista'
        }
      ],
      buttons: 
      [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => { this.listaION.closeSlidingItems(); }
        },
        {
          text: 'Actualizar',
          handler: (data) => 
          {
            if(data.titulo.length == 0)
            {
              return;
            }
            
            item.titulo = data.titulo;
            this.deseosService.guardarStorage();
            this.listaION.closeSlidingItems();
          } 
        }
      ]
    });

    alert.present();
  }
}
