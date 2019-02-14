// import { Request, Response } from 'express';
// import Streak from '../../Models/Streak';
// import { default as User } from '../../Models/User';

// export class StreakRouter {
//   public static get(req: Request, res: Response) {
//     Streak.find({}, (err, streak) => {
//       if (err) return res.send(err);
//       return res.json(streak);
//     });
//   }

//   public static getById(req: Request, res: Response) {
//     Streak.findById(req.params.id, (err, streak) => {
//       if (err) return res.send(err);
//       return res.json(streak);
//     });
//   }

//   public static update(req: Request, res: Response) {
//     Streak.findOneAndUpdate(
//       { _id: req.params.id },
//       req.body,
//       { new: true },
//       (err, streak) => {
//         if (err) return res.send(err);
//         return res.json(streak);
//       },
//     );
//   }

//   public static delete(req: Request, res: Response) {
//     Streak.remove({ id: req.params.id }, (err) => {
//       if (err) return res.send(err);
//       return res.json({ message: 'Successfully deleted streak' });
//     });
//   }

//   public static async post(req: Request, res: Response) {
//     try {
//       const body = req.body;
//       if (body.participants.length === 0) throw new Error('Validaition error');
//       body.participants = await StreakRouter.getUsersForStreak(body.participants);
//       await StreakRouter.saveStreak(body);
//       res.send(body);
//     } catch (err) {
//       return res.status(500).send(err);
//     }
//   }

//   private static async getUsersForStreak(participants) {
//     return Promise.all<Object>(
//       participants.map(async userID => {
//         const matchedUser = await User.findOne({ _id: userID });
//         if(!matchedUser) throw new Error(`Cannot find user with ID:${userID}`)
//         return matchedUser.toObject();
//       })
//     );
//   }

//   private static async saveStreak(modelToSave: IStreak) {
//     const newStreak = new StreakModel(modelToSave);
//     newStreak.save((err, streak) => {
//       if (err) throw new Error(err.message)
//       return streak
//     })
//   }
// }

// export default StreakRouter;
