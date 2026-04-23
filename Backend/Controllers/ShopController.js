import shopRepository from '../Repositories/ShopRepository.js';

/**
 * POST /shop/buy
 * Body: { decorationType: 'plant'|'room', decorationId, targetId }
 *   decorationType = 'plant'  → decorationId is a plantDecorationID, targetId is a userPlantID
 *   decorationType = 'room'   → decorationId is a roomDecorationID, targetId is a roomID
 */
export async function buyDecoration(req, res) {
    const userId = req.userId;
    const { decorationType, decorationId, targetId } = req.body;

    if (!decorationType || !decorationId || !targetId) {
        return res.status(400).json({ message: 'decorationType, decorationId and targetId are required' });
    }
    if (decorationType !== 'plant' && decorationType !== 'room') {
        return res.status(400).json({ message: "decorationType must be 'plant' or 'room'" });
    }

    try {
        // 1. Look up cost
        const cost = decorationType === 'plant'
            ? await shopRepository.getPlantDecorationCost(decorationId)
            : await shopRepository.getRoomDecorationCost(decorationId);

        // 2. Deduct points (throws if insufficient)
        await shopRepository.deductPoints(userId, cost);

        // 3. Assign decoration
        if (decorationType === 'plant') {
            await shopRepository.assignPlantDecoration(targetId, decorationId);
        } else {
            await shopRepository.assignRoomDecoration(targetId, decorationId);
        }

        // 4. Return updated points balance
        const newPoints = await shopRepository.getUserPoints(userId);
        return res.json({ message: 'Purchase successful', pointsRemaining: newPoints });

    } catch (err) {
        if (err.message === 'Insufficient points') {
            return res.status(402).json({ message: 'Insufficient points' });
        }
        console.error('buyDecoration error', err);
        return res.status(500).json({ message: 'Purchase failed', error: err.message });
    }
}

export default { buyDecoration };
