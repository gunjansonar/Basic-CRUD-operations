import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'crud';
  baseUrl="http://localhost:8081/"
  id:number=0;
  name:string='';
  address:string='';
  mobile:number=0;
  customers:any;

  constructor(public http:HttpClient)
  {
    let url=this.baseUrl+'read';
    this.http.get(url).subscribe((data:any)=>
    {
      this.customers=data;
      console.log(this.customers);
    });
  }

  add()
  {
    let obj={
      "name":this.name,
      "address":this.address,
      "mobile":this.mobile
    }
    let url=this.baseUrl+'add';
    this.http.post(url,obj).subscribe((data:any)=>
    {
      if(data==null)
      {
        alert("Exception on server");
      }
      else
      {
        this.customers.push(data);
        this.name='';
        this.address='';
        this.mobile=0;
      }
    });
  }

  update(customer:any)
  {
    let obj={
      "name":this.name,
      "address":this.address,
      "mobile":this.mobile
    }
    let url=this.baseUrl+'update/'+customer.id;
    this.http.put(url,obj).subscribe((data:any)=>
    {
      // console.log(this.customers);
      let index=this.customers.indexOf(data);
      this.customers.splice(index,1,data);
      // this.customers.push(data);
      console.log(this.customers);
    });
  }

  delete(customer:any)
  {
    let url=this.baseUrl+'delete'+customer.id;
    this.http.delete(url).subscribe((data:any)=>
    {
      if(data==1)
      {
        let index=this.customers.indexOf(customer);
        if(index>=0)
        {
          this.customers.splice(index,1);
        }
      }
      else
      {
        alert("Exception on server");
      }
    });
  }
}
