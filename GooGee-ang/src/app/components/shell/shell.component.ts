import {Component, OnInit} from '@angular/core';
import {ChatService} from "../../service/chat.service";
import {AuthService} from "../../service/auth.service";

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.css']
})
export class ShellComponent implements OnInit {

  constructor(private chatService: ChatService, private authService: AuthService) {
  }

  ngOnInit(): void {

  }
}
