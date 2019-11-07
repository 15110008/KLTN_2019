import mongoose, {
    Schema
} from 'mongoose';

const PlaceSchema = new Schema({
    name: {
        type: String,
    },
    category: {
        type: String
    },
    location: {
        type: String
    },
    phone: {
        type: String,
        default: null
    },
    description: {
        type: String,
    },
    price: {
        type: String,
        default: null
    },
    images: {
        type: [String],
        default: null
    },
    longitude: {
        type: Number
    },
    latitude: {
        type: Number
    },
    rate: {
        type: Number,
        default: null
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    destinationId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Destination'
    },
});

export default mongoose.model('Place', PlaceSchema);