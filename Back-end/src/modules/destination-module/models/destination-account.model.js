import mongoose, {
    Schema
} from 'mongoose';

const DestinationAccountSchema = new Schema({
    destinationId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Destination'
    },
    accountId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Account'
    },
    like: {
        type: Boolean,
        default: false,
    },
    comment: {
        type: String
    },
    isDeleted: {
        type: Boolean,
        default: null
    }
});

export default mongoose.model('DestinationAccount', DestinationAccountSchema);