import mongoose, {
    Schema
} from 'mongoose';

const SpotSchema = new Schema({
    spotId: {
        type: [String],
    },
    length: {
        type: Number,
    },
    time: {
        type: Number
    }
});

export default mongoose.model('Spot', SpotSchema);