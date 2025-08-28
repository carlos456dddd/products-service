import bcrypt from 'bcrypt';
import 'dotenv/config'
import pkg from '@prisma/client';
const { PrismaClient } = pkg;

import { registerSchema } from '../schemas/userSchema.js';
import { loginSchema } from '../schemas/authSchema.js';

import jwt from 'jsonwebtoken';




const prisma = new PrismaClient();

async function login(request, response) {
    try {

        const { email, password } = loginSchema.parse(request.body);
        const user = await prisma.user.findUnique({
            where: {
                email
            }
        }); //Tengo al usuario buscado a travéz del email
        //Validar la existencia 
        //Si existe permitira la creación de un token 
        if (!user) {
            response.status(401).json({
                error: ' Credenciales invalidas '
            })
        }
        //Si la solicitud, pasa al apartado de credencailes existentes teiene que ser comparada

        const ok = await bcrypt.compare(password, user.password);

        //Haces comparaciones entre (contraseña proporcionada por el usuario, contraseña que se encontro en el sistema en caso de ser encontrado el mismo)

        if (!ok) {
            return response.status(401).json({
                error: ' Invalid password '
            })
        };

        //Validado las creenciales proporcionadas, se procede a la interacción con tokens que ayudaran a interactuar el usuario con el servicio

        const accesToken = jwt.sign({
            id: user.id, email: user.email, role: user.role
        },
            process.env.JWT_SECRET,
            {
                expiresIn: '15m'
            }
        );

        const refresToken = jwt.sign({
            id: user.id
        }, process.env.REFRESH_SECRET,
            {
                expiresIn: '7d'
            }
        );

        response.json({
            accesToken, refresToken,
            user: {
                id: user.id,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {
        console.log(error)
        response.status(400).json({
            error: error.errors || 'bad Recuest'
        })
    }
}



async function register(request, response) {

    try {

        const { email, password, role } = registerSchema.parse(request.body);
        const hashed = await bcrypt.hash(password, 10);
        const user = await prisma.user.create({
            data: {
                email,
                password: hashed,
                role
            }
        })


        response.status(200).json({
            id: user.id,
            email: user.email,
            role: user.role
        })

    } catch (error) {
        console.log('ERROR:', error);

        if (error.code === 'P2002') {

            return response.status(409).json({
                error: 'Email already in use'
            });

        }
        return response.status(400).json({
            error: error.errors || 'Bad request'
        })


    }

}

export { register, login }

// const register = async (request, esponse) => {


// } 
