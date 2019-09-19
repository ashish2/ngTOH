import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  // heroes: Observable<Hero[]>;
  heroes: Hero[];

  value: string = "RandomVal";

  selectedHero: Hero;

  constructor(private heroService: HeroService) { 
    // console.log("tH: ", this.heroes);
  }

  ngOnInit() {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroes().subscribe(heroes => this.heroes = heroes );
  }

  onClick(hero: Hero): void {
    console.log("onC: H", hero);
    this.selectedHero = hero;
  }

  removeSelectedHero() {
    this.selectedHero = undefined;
  }

}
