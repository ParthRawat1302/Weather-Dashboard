// /project/backend/types/express.d.ts
import { User as SharedUser } from '@shared/types/index.ts';

declare global {
  namespace Express {
    // Extend the User interface itself
    interface User extends SharedUser {}
  }
}

export {};
