import { Component, OnInit } from '@angular/core';
import { HeroeModel } from 'src/app/models/heroe.model';
import { NgForm } from '@angular/forms';
import { HeroesService } from 'src/app/services/heroes.service';
import Swal from "sweetalert2";
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.css']
})
export class HeroeComponent implements OnInit {

  heroe = new HeroeModel();
  // activatedRoute: caputura el valor de la url
  constructor(private serviceHeroes: HeroesService, private route: ActivatedRoute) { }

  ngOnInit() {
      const id = this.route.snapshot.paramMap.get('id');
      if( id !== 'nuevo' ){
        this.serviceHeroes.getHeroe(id).subscribe((resp :HeroeModel) => {
            console.log(resp);
            this.heroe = resp;
            this.heroe.id = id;
        });
      }
  }

  
  guardar(form: NgForm) {
    if (form.invalid) {
      console.log("formulario no valido");
    }
    
    Swal.fire({
      title:'Espere',
      text:'Guardando Informacion',
      // type:'info',
      icon:'info',

      allowOutsideClick: false

    });
    Swal.showLoading();
    let peticion: Observable<any>;
    if (this.heroe.id) {
      peticion = this.serviceHeroes.actualizarHeroe(this.heroe);
      this.fnAlert(peticion,false);
    }else{
      peticion = this.serviceHeroes.crearHeroe(this.heroe);
      this.fnAlert(peticion,true);
    }

  }

  fnAlert(peticion:Observable<any>, method){

    let msg: string;

    if(method){
      msg = "Se Registro correctamente";
    }else{
      msg = "Se Actualizo correctamente";
    }

    peticion.subscribe(resp =>{
      Swal.fire({
        title:this.heroe.nombre,
        text:msg,
        icon:'success',
      });
    })
  }

}
