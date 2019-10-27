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
        type: [String]
    },
    phone: {
        type: String
    },
    description: {
        type: String,
    },
    price: {
        type: String,
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