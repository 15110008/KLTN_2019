import mongoose, {
    Schema
} from 'mongoose';

const AccountSchema = new Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    phone: {
        type: String
    },
    legacy: {
        password: String
    },
    facebook: {
        facebook_id: String,
        token: String
    },
    google: {
        google_id: String,
        token: String
    }
})
export default mongoose.model('Account', AccountSchema);