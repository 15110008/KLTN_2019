import mongoose, {
    Schema
} from 'mongoose';

const TripAccountSchema = new Schema({
    tripId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Trip'
    },
    accountId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Account'
    },
    rating: {
        type: Number,
        default: null
    },
    comment: {
        type: String,
        default: null
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
});

export default mongoose.model('TripAccount', TripAccountSchema);