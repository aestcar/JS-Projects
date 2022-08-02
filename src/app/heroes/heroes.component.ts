import { Component, OnInit } from '@angular/core';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  // selectedHero?: Hero;  // Puede no ser Hero (null)

  heroes: Hero[] = [];

  constructor(private heroService: HeroService/*, private messageService: MessageService*/) { }  // Singleton usado por todos, instancia de HeroService

  ngOnInit(): void {  // Instancia la clase de getHeroes después de inicializar los componentes
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroes()    // Obtiene los heroes del servicio
        .subscribe(heroes => this.heroes = heroes); // Espera asíncronamente a que los reciban
  }

  add(name: string): void {
    name = name.trim(); // elimina los espacios en blanco en ambos extremos del string
    if (!name) { return; } //  is non-blank
    this.heroService.addHero({ name } as Hero)
      .subscribe(hero => {
        this.heroes.push(hero); // pushes it into to the heroes list for display. (HTKL)
      });
  }

  delete(hero: Hero): void {
    this.heroes = this.heroes.filter(h => h !== hero); // Heroes = todos excepto el que le pasamos por parametros
    this.heroService.deleteHero(hero.id).subscribe();
  }
}