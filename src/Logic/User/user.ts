// import { Request, Response } from "express";
// import {default as User} from "../../Models/User";

// export class UserRouter {
//   public static async getAllUsers(request: Request, response: Response) {
//     const { firstName, lastName, email, partialTextSearchQuery} = UserRouter.getQueryParams(request.query)
//     if(partialTextSearchQuery){
//       const users = await UserRouter.getUsersFromPartialTextSearchQuery(partialTextSearchQuery)
//       return response.send({users})
//     }
//     const standardQuery = UserRouter.getStandardQuery(firstName, lastName, email)
//     const users = await UserRouter.getUsersFromStandardQuery(standardQuery)
//     return response.send({users});
//   }

//   private static getUsersFromStandardQuery(query: {firstName: string, lastName: string, email: string}){
//     return User.find({ ...query });
//   }

//   private static getStandardQuery(firstName: string, lastName: string, email: string){
//     return {
//       firstName,
//       lastName,
//       email
//     }
//   }

//   private static async getUsersFromPartialTextSearchQuery(partialTextSearchQuery: string){
//     const regexSearch = this.getPartialTextRegularExpression(partialTextSearchQuery)
//       return User.aggregate([
//         { $addFields: { name: { $concat: ["$firstName", " ", "$lastName"] } } },
//         {
//           $match: {
//             $or: [
//               { name: { $regex: regexSearch } },
//               { userName: { $regex: regexSearch } }
//             ]
//           }
//         }
//       ]);
//   }

//   private static getPartialTextRegularExpression(partialTextSearchQuery: string){
//     return new RegExp(partialTextSearchQuery, "i");
//   }

//   private static getQueryParams(requestQuery){
//     return {
//       firstName: this.getFirstName(requestQuery),
//       lastName: this.getLastName(requestQuery),
//       email: this.getEmail(requestQuery),
//       partialTextSearchQuery: this.getPartialTextSearchQuery(requestQuery)
//     }
//   }

//   private static getDefaultUndefinedValue(){
//     return { $ne: null }
//   }

//   private static getFirstName(requestQuery){
//     return requestQuery.firstName || this.getDefaultUndefinedValue();
//   }

//   private static getLastName(requestQuery){
//     return requestQuery.lastName || this.getDefaultUndefinedValue()
//   }

//   private static getEmail(requestQuery){
//     return requestQuery.email || this.getDefaultUndefinedValue()
//   }

//   private static getPartialTextSearchQuery(requestQuery){
//     return requestQuery.partialTextSearchQuery
//   }

// }

//   // private static getUserById(userID: string){
//   //   // NEED TO CONVERT THIS INTO A PROMISE FOR THIS TO WORK>
//   //   return new Promise((resolve, reject) => {
//   //     UserModel.findById(userID, (err, user) => {
//   //       if (err) return err
//   //       return user;
//   //     });
//   //   })
//   // }

//   // Need to hash the password on user registration.
//   // public static async register(request: Request, response: Response) {
//   //   try {
//   //     const { userName, email, password} = request.body
//   //     const hashedPassword = await Authentication.setHashedPassword(password)
//   //     const newUser = UserUtils.createUserFromRequest(userName, email, hashedPassword)
//   //     await UserDatabaseHelper.saveUserToDatabase(newUser)
//   //     return response.status(200).send(newUser)
//   //   } catch(err){
//   //     return response.status(500).send({message: err.message})
//   //   }
//   // }

// //   public static async login(req: Request, res: Response){
// //     console.log('Entered method.')
// //     try {
// //       console.log(req.body)
// //       const {userName, password } = req.body;
// //       const user: IUser = await UserModel.findOne({userName}).lean()
// //       console.log(user)
// //       if(!user){
// //         return res.status(400).send(`No user with userName:${userName} found`)
// //       }
// //       const hashedUserPassword: string = await Authentication.getHashedPassword(user.password)
// //       console.log(hashedUserPassword)
// //       const passwordsMatch = await Authentication.comparePasswordToHashedPassword(password, hashedUserPassword);
// //       if(passwordsMatch) return res.status(200).send({message: 'Passwords match'})
// //       return res.status(404).send({message: `Passwords don't match`});
// //     } catch(err){
// //       res.status(500).send(err)
// //     }
// //   }

// // }

//  export default UserRouter;
