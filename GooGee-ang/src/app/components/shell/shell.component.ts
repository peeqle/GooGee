import {Component, OnInit} from '@angular/core';
import {SocketService} from "../../service/user/socket.service";
import {AuthService} from "../../service/system/auth.service";

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.css']
})
export class ShellComponent implements OnInit {

  constructor(private socketService: SocketService, private authService: AuthService) {
  }

  ngOnInit(): void {

  }
}
