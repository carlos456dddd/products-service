import {any, email, z} from 'zod'; //Realizar alguna clase de control revisar documentación de zod

export const loginSchema = z.object ({

    email: z.string().email(),
    password : z.string().min(5),


});

