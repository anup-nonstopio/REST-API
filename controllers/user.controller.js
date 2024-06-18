const User = require("../models/user.model");

async function getAllUsers(req, res) {
    const users = await User.find();
    return res.json(users);
}

async function createNewUser(req, res) {
    const newUser = new User(req.body);

    if(!newUser.first_name || !newUser.last_name || !newUser.email || !newUser.job_title){
        return res.status(400).json({ message: 'All fields are required' });
    }
    await newUser.save();
    return res.status(201).json({ message: 'User created successfully', id: newUser._id});
}

async function getUserById(req, res) {
    const user = await User.findById(req.params.id);

    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    return res.json(user);
}

async function updateUserById(req, res) {
    await User.findByIdAndUpdate(req.params.id, { last_name: "Changed" });
    return res.json({ message: 'User updated successfully' });
} 

async function deleteUserById(req, res) {
    await User.findByIdAndDelete(req.params.id);
    return res.json({ message: 'User deleted successfully' });
}

module.exports = {
    getAllUsers,
    createNewUser,
    getUserById,
    updateUserById,
    deleteUserById,
};
