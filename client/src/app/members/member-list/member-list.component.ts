import { Component, inject, OnInit } from '@angular/core';
import { Member } from '../../_models/member';
import { MemberService } from '../../_services/member.service';
import { MemberCardComponent } from "../member-card/member-card.component";

@Component({
  selector: 'app-member-list',
  standalone: true,
  imports: [MemberCardComponent],
  templateUrl: './member-list.component.html',
  styleUrl: './member-list.component.css',
})
export class MemberListComponent implements OnInit {
  memberService: MemberService = inject(MemberService);
  members: Member[] | null = null;
  ngOnInit(): void {
    this.getMembers();
  }


  getMembers() {
    this.memberService.getMembers().subscribe({
      next: (members) => (this.members = members),
    });
  }
}
