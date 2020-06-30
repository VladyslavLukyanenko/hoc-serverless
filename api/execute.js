const stripe = require('stripe')(process.env.STRIPE_API_KEY);

export default async (req, res) => {
    const {
        secret,
        email,
        ip,
        cards
    } = req.body;
    if (secret != process.env.SECRET)
        return res.send(403).json({
            success: false
        });
    await stripe.radar.valueListItems.create({
        value_list: process.env.STRIPE_EMAIL_LIST,
        value: email,
    })
    await stripe.radar.valueListItems.create({
        value_list: process.env.STRIPE_IP_LIST,
        value: ip,
    })
    cards.forEach(async (card) => {
        await stripe.radar.valueListItems.create({
            value_list: process.env.STRIPE_CARD_FINGERPRINT_LIST,
            value: card,
        })
    });
    return res.send(200).json({
        success: true
    });
}