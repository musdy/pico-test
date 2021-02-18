import bcrypt from 'bcrypt';
import db from '../../../db/models';
const { User } = db;

/**
 * @param password
 * @param username
 * @param email
 * @return {Promise<this>}
 */
async function createUser({ password, username, email }) {
    const salt = bcrypt.genSaltSync(10);
    const hash = await bcrypt.hash(password, salt);

    const newUser = new User({
        username,
        email,
        password: hash,
        createdAt: Date.now(),
        updatedAt: Date.now(),
    });

    return await newUser.save();
}

/**
 * @param username
 * @return {Promise<Model|null>}
 */
async function getUserByUserName({ username }) {
    return User.findOne({ where: { username } });
}

/**
 * @param username
 * @return {Promise<Model|null>}
 */
async function getUserByEmail({ email }) {
    return User.findOne({ where: { email } });
}

export default { createUser, getUserByUserName, getUserByEmail };
