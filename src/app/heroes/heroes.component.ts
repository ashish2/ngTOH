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

  // selectedHero: Hero;

  moreH: Hero[];
  someMoreH: Hero[];

  constructor(private heroService: HeroService) { 
    // console.log("tH: ", this.heroes);
  }

  ngOnInit() {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroes().subscribe( (heroes) => {
      console.log("HEROES: ", heroes.length, heroes);
      this.heroes = heroes;
    });
  }

  add(name: string): void {
    name = name.trim();
    if(!name) { return }
    this.heroService.addHero( { name } as Hero )
    .subscribe(
      // (hero) => this.heroes.push(hero)
    );
  }

  delete(hero: Hero): void {
    // this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero).subscribe( () => { 
        console.log("subsSCRIBE"); 
        this.heroes = this.heroes.filter(h => h !== hero);
      }
    );
  }

  testObservable(hero: Hero): void {

    // Let's send heroes FTM
    const testOb = this.heroService.testObservable(this.heroes)
    const testOb2 = this.heroService.testObservable(this.heroes)

    // const testOb = this.heroService.testObservable(hero.name)
    testOb.subscribe(
      x => {
        this.moreH = x;
        console.log( "moreH Subscribed to x: ", x)
      }
    )
    testOb.subscribe(
      x => {
        this.someMoreH = x;
        console.log( "someMoreH Subscribed to x: ", x)
      }
    )

  }

  // onClick(hero: Hero): void {
  //   console.log("onC: H", hero);
  //   this.selectedHero = hero;
  // }

  // removeSelectedHero() {
  //   this.selectedHero = undefined;
  // }

}
