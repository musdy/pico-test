import jsonwebtoken from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import projectEnv from '../../../env-config';
import ResponseProducer from '../../../services/responseProducer';
import UserService from './user.service';
import { REGEX } from '../../../enums/helper.enums';

/**
 * @param ctx
 * @param next
 * @return {Promise<{status: string, code: string, message: string, data: Object}|*>}
 */
async function signUp(ctx, next) {
    const { email, password, username } = ctx.request.body;
    const errors = {};
    if (!email || !password || !username) {
        ctx.status = 400;
        ctx.body = ResponseProducer.error('There should be no empty area');
        return next();
    }

    if (!REGEX.email.test(email)) {
        return ResponseProducer.badRequest(ctx, { message: 'Invalid E-mail Address' });
    }
    let user = null;
    user = await UserService.getUserByEmail({ email });
    if (user) {
        errors.email = 'This E-mail already exist';
        user = null;
    }

    user = await UserService.getUserByUserName({ username });
    if (user) {
        errors.username = 'This username already exist';
        user = null;
    }

    if (Object.keys(errors).length) {
        return ResponseProducer.customCode(ctx, 409, {
            message: errors,
        });
    }

    try {
        const { dataValues } = await UserService.createUser({ password, username, email });

        return ResponseProducer.success(ctx, {
            message: 'User created successfully.',
            data: {
                username: dataValues.username,
                token: jsonwebtoken.sign(
                    {
                        user: dataValues.id,
                        expireAt: new Date(new Date().setMonth(new Date().getMonth() + 1)).getTime(), // 1 month
                    },
                    projectEnv.JWT_SECRET_KEY,
                ),
                expireAt: new Date(new Date().setMonth(new Date().getMonth() + 1)).getTime(),
            },
        });
    } catch (err) {
        console.log(err);
        return ResponseProducer.error(ctx, { message: 'There is an error creating User.', data: null });
    }
}

/**
 * @param ctx
 * @return {Promise<*|{status: string, code: string, message: string, data: Object}>}
 */
async function signIn(ctx) {
    const { username, password } = ctx.request.body;
    if (!username || !username.length) {
        return ResponseProducer.badRequest(ctx, { message: 'Username cannot be empty' });
    }
    if (!password || !password.length) {
        return ResponseProducer.badRequest(ctx, { message: 'Password cannot be empty' });
    }

    const user = await UserService.getUserByUserName({ username });
    if (!user) {
        return ResponseProducer.customCode(ctx, 404, { message: 'User not found' });
    }

    if (await bcrypt.compare(password, user.password)) {
        return ResponseProducer.success(ctx, {
            message: 'Login Success',
            data: {
                username: user.username,
                token: jsonwebtoken.sign(
                    {
                        user: user.id,
                        expireAt: new Date(new Date().setMonth(new Date().getMonth() + 1)).getTime(), // 1 month
                    },
                    projectEnv.JWT_SECRET_KEY,
                ),
                expireAt: new Date(new Date().setMonth(new Date().getMonth() + 1)).getTime(),
            },
        });
    }
    return ctx.error(ctx, { message: 'Wrong Username or Password' });
}

export default { signUp, signIn };
