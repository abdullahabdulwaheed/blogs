import mongoose from 'mongoose';

const bannerSchema = mongoose.Schema(
    {
        title: { type: String, required: true },
        subtitle: { type: String, required: true },
        desc: { type: String, required: true },
        image: { type: String, required: true },
        isActive: { type: Boolean, default: true },
        order: { type: Number, default: 0 },
    },
    { timestamps: true }
);

const Banner = mongoose.model('Banner', bannerSchema);

export default Banner;
