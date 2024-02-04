import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    photo: {
        type: String,
        default: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fstackoverflow.com%2Fquestions%2F49917726%2Fretrieving-default-image-all-url-profile-picture-from-facebook-graph-api&psig=AOvVaw3KwbPgZp3uaPA2KrTQfKG0&ust=1707130684634000&source=images&cd=vfe&opi=89978449&ved=0CBMQjRxqFwoTCIiI78PDkYQDFQAAAAAdAAAAABAJ'
    }
}, { timestamps: true });
export const UserModel = mongoose.model('User', userSchema);
