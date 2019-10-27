import mongoose, {
    Schema
} from 'mongoose';


const DestinationSchema = new Schema({
    name: {
        type: String,
    },
    avatar: {
        type: String,
        default: null
    },
    images: {
        type: [String],
        default: null
    },
    description: {
        type: String
    },
    longitude: {
        type: Number
    },
    latitude: {
        type: Number
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
});

export default mongoose.model('Destination', DestinationSchema);