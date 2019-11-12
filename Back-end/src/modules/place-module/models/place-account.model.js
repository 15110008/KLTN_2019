import mongoose, {
    Schema
} from 'mongoose';

const PlaceAccountSchema = new Schema({
    placeId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Place'
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

export default mongoose.model('PlaceAccount', PlaceAccountSchema);