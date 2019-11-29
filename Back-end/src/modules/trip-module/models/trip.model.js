import mongoose, {
    Schema
} from 'mongoose';

const TripSchema = new Schema({
    name: {
        type: String,
    },
    totalPrice: {
        type: Number
    },
    totalDate: {
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

export default mongoose.model('Trip', TripSchema);