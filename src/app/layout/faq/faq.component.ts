import { Component, OnInit } from '@angular/core';
import { LayoutService } from '../layout.service';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss'],
})

export class FaqComponent implements OnInit {
  faqs: any[] = []
  constructor(
    private service: LayoutService,
  ) { }

  ngOnInit(): void {
    this.getFaqs();
  }


  getFaqs() {
    this.service.getAllFaq(history.state.lang).subscribe((response: any) => {
      if (response.success === true) {
        this.faqs = response.data;
      } else {
        console.log('eror')
      }
    });
  }

}
