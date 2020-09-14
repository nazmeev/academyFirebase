// import { Injectable } from '@angular/core';
// import { Resolve } from '@angular/router';
// import { UserService } from '../services/user.service';

// @Injectable()
// export class UserResolver implements Resolve<any> {
//   constructor(private userService: UserService) {}
  
//   resolve(){
//       console.log('userresolver');
//       return new Promise()
//   }
// //   Resolve() {
// //     console.log()
// //     // this.route.paramMap.subscribe((params: ParamMap) => {
// //     //     this.id = +params.get("id");
// //     //     return this.userService.getUserbyId(id).subscribe(user => {
// //     //           if (user) {
// //     //             return user;
// //     //           } else { 
// //     //             this.router.navigate(['/user-list']);
// //     //             return null;
// //     //           }
// //     //     });
// //     // });
// //   }
// }