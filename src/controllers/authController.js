import bcrypt from 'bcrypt';

import pkg from '@prisma/client';
const { PrismaClient } = pkg;

import { registerSchema } from '../schemas/userSchema.js';


const prisma = new PrismaClient();


async function register(request, response) {

    try {

        const {email, password, role} = registerSchema.parse(request.body);
        const hashed = await bcrypt.hash(password, 10);
        const user = await prisma.user.create({
            data: {
                email,
                password: hashed,
                role
            }
        })    


        response.status(200).json({
            id:user.id,
            email:user.email,
            role:user.role
        })

    } catch (error) {
        console.log('ERROR:', error); 

        if (error.code === 'P2002'){

            return response.status(409).json({
                error:'Email already in use'
            });

        }
        return response.status(400).json({
            error: error.errors || 'Bad request'
        })

        
    }
    
}

export {register}

// const register = async (request, esponse) => {


// } 
