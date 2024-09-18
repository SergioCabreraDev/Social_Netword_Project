import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { User } from '../../models/User';
import { UserService } from '../../services/user.service';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { event } from 'jquery';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent implements OnInit {



  accounts: User[] = [];
  inputValue: string = '';

  constructor(
    private userService: UserService,
    @Inject(PLATFORM_ID) private platformId: Object
  ){}


  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.loadAccounts()
    } else {
      console.log('No estamos en el navegador, findAll no se ejecutará.');
    }
   
  }

  onChange(arg0: String) {
    console.log(this.inputValue)
    }
    

  loadAccounts(){
    this.userService.findAllUsers().subscribe(res => {
      this.accounts = res;
      console.log(this.accounts);
    })
  }

}
