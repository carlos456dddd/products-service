

import { z } from 'zod';

export const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  role: z.enum(['user', 'admin']).optional().default('user')
});



export default {registerSchema}