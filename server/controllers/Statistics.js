const Product = require("../Schema/ProductSchema");

async function getStats(req, res) {
    try {
        const pipeline = [
            {
                $project: {
                    sold: 1,
                    month: { $month: "$dateOfSale" },
                    price: 1
                }
            },
            {
                $group: {
                    _id: { month: "$month", sold: "$sold" },
                    count: { $sum: 1 },
                    totalAmount: { $sum: "$price" }
                }
            },
            {
                $group: {
                    _id: "$_id.month",
                    soldStats: {
                        $push: {
                            sold: "$_id.sold",
                            count: "$count",
                            totalAmount: "$totalAmount"
                        }
                    }
                }
            },
            {
                $sort: { "_id": 1 }
            }
        ];

        const stats = await Product.aggregate(pipeline);
        res.json(stats);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'An error occurred' });
    }
}

module.exports = { getStats };
