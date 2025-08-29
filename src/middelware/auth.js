import jwt from "jsonwebtoken";


export function authenticate(request, response, next) {

    const header = request.headers.authorization;

    if (!header || !header.startsWith('Bearer ')) {

        return response.status(401).json({
            error: 'Token no autorizado'
        })
    };

    const token = header.split(' ')[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        request.user = decoded
        next();
    } catch (error) {
        return response.status(401).json({ error: 'Token inválido o expirado' });

    }

}