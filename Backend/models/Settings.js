import mongoose from 'mongoose';

const settingsSchema = mongoose.Schema(
    {
        siteName: { type: String, required: true, default: 'The Daily Post' },
        siteTitle: { type: String, required: true, default: 'News & Editorial' },
        logo: { type: String, required: true, default: '/logo.png' },
        socials: {
            facebook: { type: String, default: '' },
            twitter: { type: String, default: '' },
            instagram: { type: String, default: '' },
            linkedin: { type: String, default: '' },
        },
    },
    { timestamps: true }
);

const Settings = mongoose.model('Settings', settingsSchema);

export default Settings;
