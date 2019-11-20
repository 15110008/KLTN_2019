import mongoose, {
    Schema
} from 'mongoose';

const SpotSchema = new Schema({
    placeId1: {
        type: String,
    },
    placeId2: {
        type: String
    },
    length: {
        type: Number,
    },
    time: {
        type: Number
    }
});

export default mongoose.model('Spot', SpotSchema);