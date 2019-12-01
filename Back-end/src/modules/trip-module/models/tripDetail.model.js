import mongoose, {
    Schema
} from 'mongoose';

const TripDetailSchema = new Schema({
    date: {
        type: String,
    },
    day: {
        type: Number,
    },
    totalPlaces: {
        type: Number
    },
    listPlaces: [{
        id: String,
        name: String,
    }],
    listSpot: [{
        startTime: String,
        spotId: [String],
        length: Number,
        spotTime: Number,
        stayTime: Number,
    }],
    isDeleted: {
        type: Boolean,
        default: false
    },
    tripId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Trip'
    },
    destinationId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Destination'
    }
});

export default mongoose.model('TripDetail', TripDetailSchema);